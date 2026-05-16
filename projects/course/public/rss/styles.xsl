<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/">
		<html lang="pt-BR">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title><xsl:value-of select="/rss/channel/title" /> | RSS</title>
				<style>
					:root {
						color-scheme: dark;
						--bg: #12100e;
						--panel: #1a1714;
						--panel-soft: #231e1a;
						--border: rgba(253, 230, 138, 0.12);
						--text: #f8f1e7;
						--muted: #b9aa95;
						--accent: #fb923c;
					}

					* {
						box-sizing: border-box;
					}

					body {
						margin: 0;
						font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
						background:
							radial-gradient(circle at top, rgba(251, 146, 60, 0.12), transparent 34%),
							linear-gradient(180deg, #181411 0%, var(--bg) 100%);
						color: var(--text);
					}

					a {
						color: inherit;
						text-decoration: none;
					}

					.page {
						max-width: 1100px;
						margin: 0 auto;
						padding: 32px 20px 48px;
					}

					.hero {
						display: grid;
						gap: 12px;
						padding: 28px;
						border: 1px solid var(--border);
						border-radius: 24px;
						background: rgba(26, 23, 20, 0.82);
						backdrop-filter: blur(10px);
						box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
					}

					.eyebrow {
						margin: 0;
						color: var(--muted);
						text-transform: uppercase;
						letter-spacing: 0.18em;
						font-size: 0.78rem;
					}

					h1,
					h2,
					h3,
					p {
						margin: 0;
					}

					.title {
						font-size: clamp(2rem, 4vw, 3.5rem);
						line-height: 1;
					}

					.lead {
						max-width: 68ch;
						color: var(--muted);
						line-height: 1.7;
					}

					.items {
						display: grid;
						gap: 16px;
						margin-top: 24px;
					}

					.item {
						display: grid;
						gap: 12px;
						padding: 20px;
						border: 1px solid var(--border);
						border-radius: 20px;
						background: linear-gradient(180deg, rgba(35, 30, 26, 0.95), rgba(26, 23, 20, 0.95));
						box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
					}

					.item__meta {
						display: flex;
						flex-wrap: wrap;
						gap: 10px 14px;
						align-items: center;
						color: var(--muted);
						font-size: 0.9rem;
					}

					.pill {
						display: inline-flex;
						align-items: center;
						gap: 6px;
						padding: 6px 10px;
						border-radius: 999px;
						border: 1px solid rgba(251, 146, 60, 0.22);
						background: rgba(251, 146, 60, 0.12);
						color: var(--text);
						font-size: 0.78rem;
						letter-spacing: 0.06em;
						text-transform: uppercase;
					}

					.item__title {
						font-size: clamp(1.2rem, 2.2vw, 1.6rem);
						line-height: 1.2;
					}

					.item__link {
						width: fit-content;
						color: var(--accent);
						font-weight: 700;
					}

					.categories {
						display: flex;
						flex-wrap: wrap;
						gap: 8px;
					}

					.category {
						padding: 4px 10px;
						border-radius: 999px;
						background: rgba(248, 241, 231, 0.06);
						color: var(--muted);
						font-size: 0.82rem;
					}

					@media (max-width: 640px) {
						.page {
							padding: 18px 14px 34px;
						}

						.hero,
						.item {
							padding: 18px;
						}
					}
				</style>
			</head>
			<body>
				<main class="page">
					<section class="hero">
						<p class="eyebrow">Web Feed</p>
						<h1 class="title"><xsl:value-of select="/rss/channel/title" /></h1>
						<p class="lead">
							Feed RSS da coleção de posts do curso, com os itens mais recentes
							listados abaixo.
						</p>
					</section>

					<section class="items" aria-label="Itens recentes">
						<xsl:for-each select="/rss/channel/item">
							<article class="item">
								<div class="item__meta">
									<span class="pill">Post</span>
									<span>
										<xsl:value-of select="pubDate" />
									</span>
								</div>

								<h2 class="item__title">
									<a class="item__link" target="_blank">
										<xsl:attribute name="href">
											<xsl:value-of select="link" />
										</xsl:attribute>
										<xsl:value-of select="title" />
									</a>
								</h2>

								<xsl:if test="category">
									<div class="categories">
										<xsl:for-each select="category">
											<span class="category">
												<xsl:value-of select="." />
											</span>
										</xsl:for-each>
									</div>
								</xsl:if>
							</article>
						</xsl:for-each>
					</section>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
