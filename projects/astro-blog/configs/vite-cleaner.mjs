/** @type {import('vite').UserConfig} */
export const viteCleaner = {
  build: {
    rollupOptions: {
      external: [
        "node:fs",
        "node:fs/promises",
        "node:path",
        "node:url",
        "node:module",
        "node:events",
        "node:stream",
        "node:util",
        "node:crypto",
        "node:os",
        "node:child_process",
        "node:worker_threads",
        "node:tty",
        "node:string_decoder",
        "fs",
        "path",
        "url",
        "module",
        "util",
        "crypto",
        "os",
      ],
      onwarn(warning, warn) {
        if (
          warning.message.includes("externalized for browser compatibility")
        ) {
          return;
        }
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") {
          return;
        }
        warn(warning);
      },
    },
  },
};
