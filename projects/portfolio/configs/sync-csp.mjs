import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(SCRIPT_DIR, "../dist");
const VERCEL_CONFIG = resolve(SCRIPT_DIR, "../vercel.json");

async function getHtmlFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const childPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getHtmlFiles(childPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(childPath);
    }
  }
  return files;
}

function collectHashesFromPolicy(policy, directive) {
  const directiveRegex = new RegExp(`${directive}\\s+([^;]+)`);
  const match = policy.match(directiveRegex);
  if (!match) return [];
  return match[1]
    .trim()
    .split(/\s+/)
    .filter((token) => token.startsWith("'sha256-"));
}

async function extractAllHashesFromDist() {
  const htmlFiles = await getHtmlFiles(DIST_DIR);
  const allScriptHashes = new Set();
  const allStyleHashes = new Set();

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    const matches = html.matchAll(
      /<meta\s+http-equiv="content-security-policy"\s+content="([^"]+)"/gi,
    );

    for (const match of matches) {
      const policy = match[1];
      collectHashesFromPolicy(policy, "script-src").forEach((h) =>
        allScriptHashes.add(h),
      );
      collectHashesFromPolicy(policy, "style-src").forEach((h) =>
        allStyleHashes.add(h),
      );
    }
  }
  return {
    scriptHashes: [...allScriptHashes].sort(),
    styleHashes: [...allStyleHashes].sort(),
  };
}

function buildCspValue(scriptHashes, styleHashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(" ")}`,
    `style-src 'self' ${styleHashes.join(" ")}`,
    "font-src 'self'",
    "img-src 'self' data: https://avatars.githubusercontent.com",
    "connect-src 'self' https://api.github.com",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

async function syncVercelCsp() {
  const { scriptHashes, styleHashes } = await extractAllHashesFromDist();
  const cspValue = buildCspValue(scriptHashes, styleHashes);
  const rawConfig = await readFile(VERCEL_CONFIG, "utf8");
  const vercelConfig = JSON.parse(rawConfig);

  if (vercelConfig.headers && Array.isArray(vercelConfig.headers)) {
    vercelConfig.headers.forEach((route) => {
      const cspHeader = route.headers.find(
        (h) => h.key === "Content-Security-Policy",
      );
      if (cspHeader) cspHeader.value = cspValue;
    });
  }

  await writeFile(VERCEL_CONFIG, JSON.stringify(vercelConfig, null, 2) + "\n");
  console.log(`CSP Global Synced: ${styleHashes.length} style hashes.`);
}

syncVercelCsp().catch((err) => {
  console.error(err);
  process.exit(1);
});
