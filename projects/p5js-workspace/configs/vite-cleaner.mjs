/** @type {import('vite').UserConfig} */
export const viteCleaner = {
  build: {
    rollupOptions: {
      external: [
        // Módulos Node.js comuns que costumam causar avisos no Astro/Vercel
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
        // Silencia apenas o aviso de compatibilidade de navegador para módulos Node
        if (
          warning.message.includes("externalized for browser compatibility")
        ) {
          return;
        }
        // Silencia avisos de imports externos não utilizados que o adaptador Vercel gera
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") {
          return;
        }
        // Mantém todos os outros avisos importantes
        warn(warning);
      },
    },
  },
};
