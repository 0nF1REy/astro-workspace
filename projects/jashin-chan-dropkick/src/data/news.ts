export interface NewsItem {
  id: string;
  href: string;
  date: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

const IMAGE_BASE_PATH = "/assets/images/home/news/thumbnails";

export const newsItems: NewsItem[] = [
  {
    id: "13582",
    href: "/news/13582",
    date: "2026-4-20",
    title: "パチスロリリース記念！SANYO本社襲撃イベント「パチサバト...",
    description:
      "アニメ「邪神ちゃんドロップキック」のパチスロリリースを記念し、ファン参加型の大型企画として「3大キャンペーン」と、併...",
    image: {
      src: `${IMAGE_BASE_PATH}/news_13582.jpg`,
      alt: "Pachislo Event 2026",
    },
  },
  {
    id: "13379",
    href: "/news/13379",
    date: "2025-12-31",
    title: "【1/4】読書会参加者リスト",
    description:
      "参加希望erの方にはメールをお送りしていますが、メールが届かない方がいらっしゃるため参加者リストをこちらに一覧で表記し...",
    image: {
      src: `${IMAGE_BASE_PATH}/news_13379.jpg`,
      alt: "Reading Event 2025",
    },
  },
  {
    id: "11702",
    href: "/news/11702",
    date: "2024-09-12",
    title: "「邪神ちゃん」&「スライム倒して300年」コラボボイスドラマ...",
    description:
      "2024年6月に発表となったアニメ「邪神ちゃんドロップキック」と「スライム倒して300年、知らないうちにレベルMAX...」のコラボボイスドラマがついに公開！",
    image: {
      src: `${IMAGE_BASE_PATH}/news_11702.jpg`,
      alt: "Collaboration 2024",
    },
  },
  {
    id: "10154",
    href: "/news/10154",
    date: "2023-12-25",
    title: "新作ゲーム「邪神ちゃんドロップキック ケイオス」正式サービス...",
    description:
      "新作ゲームが正式サービス開始！ねばねばウォーズに続くブラウザゲームが登場し、現在様々なキャンペーンを実施中です。",
    image: {
      src: `${IMAGE_BASE_PATH}/news_10154.jpg`,
      alt: "Jashin Chaos Game 2023",
    },
  },
  {
    id: "9013",
    href: "/news/9013",
    date: "2022-12-28",
    title: "12/30冬コミケユキヲ先生ブース",
    description:
      "ユキヲ先生がコミケに帰還！頒布する本は大ボリュームの５冊！グッズセットなど豪華なラインナップでお待ちしております。",
    image: {
      src: `${IMAGE_BASE_PATH}/news_9013.jpg`,
      alt: "Comiket 2022",
    },
  },
  {
    id: "7576",
    href: "/news/7576",
    date: "2021-12-28",
    title: "1/23邪神ちゃんドロップキック×絵恋ちゃんスペシャルコラボ...",
    description:
      "とても面白いと評判の「絵恋ちゃんライブ」と「邪神ちゃんサバト」を合体させたヤバいイベントを1月23日に秋葉原で開催！",
    image: {
      src: `${IMAGE_BASE_PATH}/news_7576.jpg`,
      alt: "Eren Collaboration 2021",
    },
  },
  {
    id: "4406",
    href: "/news/4406",
    date: "2020-12-29",
    title: "12月30日 富良野ワイン酒場「千明」１日限定オンライン開店",
    description:
      "いよいよ年の瀬。今年はコミケもなくてがっかりなあなたを富良野ワイン酒場「千明」にご招待いたします。",
    image: {
      src: `${IMAGE_BASE_PATH}/news_4406.jpg`,
      alt: "Furano Online 2020",
    },
  },
  {
    id: "1413",
    href: "/news/1413",
    date: "2019-12-27",
    title: "神保町哀歌紹介マンガ紹介",
    description:
      "おいつきさんが描いて下さった神保町哀歌紹介マンガが素晴らしいので皆さまにご紹介します！",
    image: {
      src: `${IMAGE_BASE_PATH}/news_1413.jpg`,
      alt: "Jinbocho Manga 2019",
    },
  },
];

export const getLatestNews = (limit: number = 6): NewsItem[] => {
  return newsItems.slice(0, limit);
};
