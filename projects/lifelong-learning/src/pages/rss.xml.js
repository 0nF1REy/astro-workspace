import { baseData } from "@data/siteData";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = (await getCollection("posts"))
    .filter((post) => !post.data.isDraft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: baseData.title,
    description: baseData.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: `/blog/v2/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>pt-BR</language>`,
  });
}
