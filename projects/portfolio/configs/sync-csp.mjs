import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(SCRIPT_DIR, "../dist");
const VERCEL_CONFIG = resolve(SCRIPT_DIR, "../vercel.json");

async function getHtmlFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const childPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getHtmlFiles(childPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(childPath);
    }
  }

  return files;
}

function collectHashesFromPolicy(policy, directive) {
  const directiveRegex = new RegExp(`${directive}\\s+([^;]+)`);
  const match = policy.match(directiveRegex);

  if (!match) {
    return [];
  }

  return match[1]
    .trim()
    .split(/\s+/)
    .filter((token) => token.startsWith("'sha256-"));
}

async function extractHashesFromDist() {
  const htmlFiles = await getHtmlFiles(DIST_DIR);
  const scriptHashes = new Set();
  const styleHashes = new Set();

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    const cspMetaMatch = html.match(
      /<meta\s+http-equiv="content-security-policy"\s+content="([^"]+)"\s*\/?/i,
    );

    if (!cspMetaMatch) {
      continue;
    }

    const policy = cspMetaMatch[1];

    for (const hash of collectHashesFromPolicy(policy, "script-src")) {
      scriptHashes.add(hash);
    }

    for (const hash of collectHashesFromPolicy(policy, "style-src")) {
      styleHashes.add(hash);
    }
  }

  return {
    scriptHashes: [...scriptHashes].sort(),
    styleHashes: [...styleHashes].sort(),
  };
}

function buildCspValue(scriptHashes, styleHashes) {
  if (!scriptHashes.length || !styleHashes.length) {
    throw new Error(
      "CSP hashes not found in dist. Run `npm run build` before syncing CSP.",
    );
  }

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
  const { scriptHashes, styleHashes } = await extractHashesFromDist();
  const cspValue = buildCspValue(scriptHashes, styleHashes);
  const rawConfig = await readFile(VERCEL_CONFIG, "utf8");
  const vercelConfig = JSON.parse(rawConfig);

  const allHeaders = vercelConfig?.headers?.[0]?.headers;

  if (!Array.isArray(allHeaders)) {
    throw new Error("Invalid vercel.json format: headers array was not found.");
  }

  const cspHeader = allHeaders.find(
    (header) => header?.key === "Content-Security-Policy",
  );

  if (!cspHeader) {
    throw new Error(
      "Content-Security-Policy header was not found in vercel.json.",
    );
  }

  cspHeader.value = cspValue;

  await writeFile(
    VERCEL_CONFIG,
    `${JSON.stringify(vercelConfig, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `CSP synced successfully with ${scriptHashes.length} script hashes and ${styleHashes.length} style hashes.`,
  );
}

syncVercelCsp().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
