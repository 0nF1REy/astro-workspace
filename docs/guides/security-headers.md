# Auditoria de Cabeçalhos de Segurança HTTP

[← Voltar ao README](../../README.md)

Este guia explica como auditar os cabeçalhos HTTP de segurança de um site em produção, o que cada ferramenta retorna e como interpretar os resultados para alcançar a nota máxima no SecurityHeaders.com.

## Índice

- [Por que auditar headers?](#por-que-auditar-headers)
- [Ferramentas utilizadas](#ferramentas-utilizadas)
- [Inspecionar headers com curl](#inspecionar-headers-com-curl)
- [Escanear com SecurityHeaders.com](#escanear-com-securityheaderscom)
- [O que cada header significa](#o-que-cada-header-significa)
- [Tabela de notas](#tabela-de-notas)
- [Onde configurar no projeto](#onde-configurar-no-projeto)
- [Fluxo de manutenção recomendado](#fluxo-de-manutencao-recomendado)
- [Importante: cache do scanner](#importante-cache-do-scanner)

---

## Por que auditar headers?

Cabeçalhos HTTP de segurança são instruções que o servidor envia ao navegador para definir como ele deve se comportar ao carregar o site. Eles protegem contra ataques comuns como XSS, clickjacking, MIME sniffing e vazamento de informações via Referer.

Um site sem esses cabeçalhos entrega a build correta, mas deixa o navegador sem defesas extras — mesmo que o código em si seja seguro.

---

## Ferramentas utilizadas

| Ferramenta                                         | O que faz                                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `curl -sSI <url>`                                  | Faz uma requisição HTTP e exibe apenas os cabeçalhos da resposta, sem baixar o corpo da página |
| [securityheaders.com](https://securityheaders.com) | Scanner externo que analisa os cabeçalhos e atribui uma nota de `F` a `A+`                     |

---

## Inspecionar headers com curl

```bash
curl -sSI https://alan-ryan.vercel.app/
```

### Flags explicadas

| Flag | Significado                                                          |
| ---- | -------------------------------------------------------------------- |
| `-s` | Silent — suprime a barra de progresso                                |
| `-S` | Show error — mesmo com `-s`, mostra erros reais caso ocorram         |
| `-I` | Head only — faz uma requisição `HEAD` e retorna apenas os cabeçalhos |

### Exemplo de retorno saudável

```
HTTP/2 200
content-security-policy: default-src 'self'; script-src 'self' 'sha256-...'; style-src 'self' 'sha256-...'; ...
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: same-origin
cross-origin-embedder-policy: require-corp
permissions-policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
referrer-policy: strict-origin-when-cross-origin
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-vercel-cache: HIT
```

### O que observar no retorno

- **`HTTP/2 200`** — o servidor respondeu com sucesso.
- **`x-vercel-cache: HIT`** — a Vercel serviu a resposta do cache CDN. Se for `MISS`, o arquivo foi buscado direto no servidor de origem (comum na primeira requisição após um deploy).
- **`last-modified`** — data e hora da última versão do arquivo gerado. Útil para confirmar que o deploy mais recente está no ar.
- **`strict-transport-security`** — confirma HTTPS forçado. O valor `preload` indica que o domínio pode ser adicionado à lista HSTS dos navegadores.
- Ausência de qualquer header de segurança na lista indica que ele **não está sendo entregue** — mesmo que esteja configurado localmente.

---

## Escanear com SecurityHeaders.com

Acesse a URL do scanner forçando um novo scan (sem cache):

```
https://securityheaders.com/?q=https://alan-ryan.vercel.app/&followRedirects=on&hide=on
```

O parâmetro `hide=on` força o site a não exibir o resultado em cache e refaz o scan imediatamente.

### O que o scanner retorna

**Summary** — nota geral (`A+`, `A`, `B`, `C`, `D`, `E`, `F`) e lista dos headers encontrados.

**Missing Headers** — headers que o scanner esperava encontrar mas não recebeu. Cada ausente derruba a nota.

**Raw Headers** — todos os cabeçalhos brutos recebidos na resposta, incluindo os da infraestrutura (Vercel, CDN).

**Upcoming Headers** — headers que ainda não são obrigatórios para a nota máxima, mas que são recomendados pela especificação atual.

**Additional Information** — observações sobre headers que foram encontrados, como `server` e `strict-transport-security`.

### Atenção ao Report Time

O `Report Time` exibido pode ser de um scan anterior em cache. Se ele mostrar uma data/hora anterior ao seu último deploy, o resultado não é confiável — use o parâmetro `hide=on` ou clique em "Scan" novamente para forçar uma nova análise.

---

## O que cada header significa

| Header                         | O que faz                                                                                                                          | Valor recomendado                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `Content-Security-Policy`      | Define de quais origens o navegador pode carregar scripts, estilos, imagens, fontes e outros recursos                              | `default-src 'self'; ...`                      |
| `X-Frame-Options`              | Impede que a página seja carregada dentro de um `<iframe>` em outros domínios (proteção contra clickjacking)                       | `SAMEORIGIN`                                   |
| `X-Content-Type-Options`       | Impede que o navegador tente adivinhar o tipo do conteúdo (MIME sniffing)                                                          | `nosniff`                                      |
| `Referrer-Policy`              | Controla quanta informação da URL origem é enviada ao navegar para outro site                                                      | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`           | Restringe quais APIs do navegador (câmera, microfone, geolocalização etc.) o site pode acessar                                     | `camera=(), microphone=(), geolocation=()`     |
| `Strict-Transport-Security`    | Força o navegador a usar HTTPS por um período definido, mesmo se o usuário digitar `http://`                                       | `max-age=63072000; includeSubDomains; preload` |
| `Cross-Origin-Opener-Policy`   | Isola o contexto de janela do site contra ataques cross-origin como Spectre                                                        | `same-origin`                                  |
| `Cross-Origin-Resource-Policy` | Impede que outros sites carreguem recursos do seu domínio via `<img>`, `<script>` etc.                                             | `same-origin`                                  |
| `Cross-Origin-Embedder-Policy` | Exige que todos os recursos carregados pela página declarem permissão explícita via CORS ou CORP — necessário para o `A+` completo | `require-corp`                                 |

---

## Tabela de notas

O SecurityHeaders.com atribui a nota com base nos headers obrigatórios presentes:

| Nota      | Condição                                                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `A+`      | Todos os headers obrigatórios + nenhum header inseguro detectado                                                                                   |
| `A`       | Todos os seis headers obrigatórios presentes (`CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`) |
| `B`       | A maioria dos headers presente, com algum faltando                                                                                                 |
| `C` / `D` | Vários headers ausentes                                                                                                                            |
| `F`       | Sem nenhum header de segurança                                                                                                                     |

> **Nota sobre `A+`:** além de ter todos os headers, o scanner verifica se nenhum header com informação sensível está sendo exposto desnecessariamente (como `Server: nginx/1.x.x` com versão específica). A Vercel já ofusca o valor de `server` por padrão, o que ajuda nesse critério.

---

## Onde configurar no projeto

No portfolio, os cabeçalhos de segurança são definidos em dois lugares:

**`vercel.json`** — headers HTTP enviados pela infraestrutura da Vercel em todas as rotas:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), browsing-topics=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; ..."
        },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Resource-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```

**`astro.config.mjs`** — o Astro com `security: { csp: true }` injeta um `<meta http-equiv="content-security-policy">` no HTML gerado, como camada de defesa adicional no client-side:

```js
export default defineConfig({
  security: {
    csp: true,
  },
});
```

> O `vercel.json` tem prioridade sobre o meta tag do Astro para o header HTTP real. O `csp: true` do Astro serve como fallback e também gera hashes de script automaticamente, o que permite remover `'unsafe-inline'` da CSP futuramente.

---

## Fluxo de manutenção recomendado

Para evitar manutenção manual dos hashes da CSP em cada alteração de build, o projeto possui uma automação dedicada:

- `npm run csp:sync`: lê os hashes CSP gerados no `dist/*.html` e atualiza automaticamente o `Content-Security-Policy` no `vercel.json`
- `npm run build:secure`: executa `astro build` e, em seguida, sincroniza a CSP automaticamente

Fluxo sugerido antes de publicar:

1. `npm run build:secure`
2. revisar o diff do `vercel.json`
3. commitar as alterações
4. realizar deploy

Com isso, a política continua estrita (sem `unsafe-inline`) e permanece alinhada ao conteúdo real gerado no build.

---

## Importante: cache do scanner

O SecurityHeaders.com armazena os resultados em cache por um período de tempo. Isso significa que imediatamente após um deploy, o scanner pode continuar exibindo a nota do deploy anterior com o `Report Time` antigo.

Para garantir que o scan reflita o estado atual do site:

1. Use o parâmetro `hide=on` na URL do scanner
2. Verifique o `Report Time` e compare com o horário do seu último deploy
3. Se necessário, aguarde alguns minutos e re-escaneie

Uma maneira confiável de confirmar o estado real sem depender do scanner é usar o `curl`:

```bash
curl -sSI https://alan-ryan.vercel.app/
```

Se todos os headers da tabela acima aparecerem na resposta, o deploy está correto — independente do que o scanner em cache exibir.
