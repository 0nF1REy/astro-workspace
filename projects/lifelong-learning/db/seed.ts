import { Links, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Links).values([
    {
      title: "Jashin-chan Dropkick — [LOCAL]",
      description: "This is a sample description",
      url: "https://jashinchan.com/",
      isRead: true,
    },
    {
      title: "Kill la Kill — [LOCAL]",
      description: "This is a sample description",
      url: "https://www.kill-la-kill.jp/",
      isRead: false,
    },
    {
      title: "Fire Force — [LOCAL]",
      description: "This is a sample description",
      url: "https://fireforce-anime.jp/",
      isRead: true,
    },
  ]);
}
