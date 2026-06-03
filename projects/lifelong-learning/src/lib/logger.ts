import { insertLog } from "@db/logs";

export interface RequestEvent {
  url: URL;
  status: number;
  contentType: string | null;
}

export class LoggerService {
  static async processRequestEvent(event: RequestEvent) {
    const { url, status, contentType } = event;
    const pathname = url.pathname;

    // Regra de Filtro
    const isNoise =
      pathname.startsWith("/_astro") ||
      pathname.startsWith("/favicon") ||
      pathname.startsWith("/@") ||
      pathname.includes("__") ||
      pathname.endsWith(".map");

    // Regra de Classificação
    const isAsset = contentType ? !contentType.includes("text/html") : false;

    // Decisão de Persistência
    const shouldLog = !isNoise && !isAsset && status !== 200;

    if (shouldLog) {
      await insertLog({
        url: url.toString(),
        status: status,
        date_accessed: new Date(),
      });

      console.log(`[LoggerService] Log de erro registrado para: ${pathname}`);
    }
  }
}
