import { Links, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Links).values([
    {
      title: "Jashin-chan Dropkick — [LOCAL]",
      url: "https://jashinchan.com/",
      date: new Date(),
      isRead: true,
      upvoteNum: 3,
    },
    {
      title: "Kill la Kill — [LOCAL]",
      url: "https://www.kill-la-kill.jp/",
      date: new Date(),
      isRead: false,
      upvoteNum: 10000,
    },
    {
      title: "Fire Force — [LOCAL]",
      url: "https://fireforce-anime.jp/",
      date: new Date(),
      isRead: true,
      upvoteNum: 1000,
    },
  ]);
}
