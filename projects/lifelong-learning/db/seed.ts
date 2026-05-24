import { Links, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Links).values([
    {
      title: "Jashin-chan Dropkick",
      url: "https://jashinchan.com/",
      date: new Date(),
      isRead: true,
      upvoteNum: 3,
    },
    {
      title: "Kill la Kill",
      url: "https://www.kill-la-kill.jp/",
      date: new Date(),
      isRead: false,
      upvoteNum: 10000,
    },
    {
      title: "Fire Force",
      url: "https://fireforce-anime.jp/",
      date: new Date(),
      isRead: true,
      upvoteNum: 1000,
    },
  ]);
}
