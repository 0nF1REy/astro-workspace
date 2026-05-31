/**
 * Utilitários de suporte para rotas de API
 * Centraliza helpers de resposta JSON, tratamento de erros e integração com mock server
 * Usado para padronizar respostas entre endpoints de API
 */

/**
 * Resposta para rotas acessadas fora do ambiente de desenvolvimento
 */
export const devOnlyResponse = (): Response =>
  new Response(
    JSON.stringify({
      success: false,
      message: "json-server disponível apenas em desenvolvimento.",
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

/**
 * Resposta quando o json-server não está em execução
 */
export const serverUnavailableResponse = (): Response =>
  new Response(
    JSON.stringify({
      success: false,
      message:
        "json-server não está rodando. Execute npm run server em desenvolvimento.",
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

/**
 * Detecta se um erro é causado por indisponibilidade do servidor
 * (connection refused, fetch failed)
 */
export const isServerUnavailableError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  const cause = error.cause as { code?: string } | undefined;

  return (
    error.message.includes("fetch failed") || cause?.code === "ECONNREFUSED"
  );
};

/**
 * Helper genérico para resposta JSON
 * @param data - Dados a serem serializados em JSON
 * @param status - Código HTTP (padrão: 200)
 */
export const jsonResponse = (data: unknown, status = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Base URL para dev-server mock API
 */
export const MOCK_API_BASE = "http://localhost:3000";
export const getResourceUrl = (resource: string) =>
  `${MOCK_API_BASE}/${resource}`;
