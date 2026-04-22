export interface NewsItem {
  id: string;
  href: string;
  date: string;
  title: string;
  description: string;
  image: {
    src: string;
    srcset: string;
    alt: string;
  };
}

export const newsItems: NewsItem[] = [
  {
    id: "13582",
    href: "/news/13582",
    date: "2026-4-20",
    title: "パチスロリリース記念！SANYO本社襲撃イベント「パチサバト...",
    description:
      "アニメ「邪神ちゃんドロップキック」のパチスロリリースを記念し、ファン参加型の大型企画として「3大キャンペーン」と、併...",
    image: {
      src: "https://jashinchan.com/wp-content/uploads/2026/04/image-1-300x169.jpeg",
      srcset:
        "https://jashinchan.com/wp-content/uploads/2026/04/image-1-300x169.jpeg 300w, https://jashinchan.com/wp-content/uploads/2026/04/image-1-1024x576.jpeg 1024w",
      alt: "Release Event",
    },
  },
  {
    id: "13538",
    href: "/news/13538",
    date: "2026-3-12",
    title: "【4/3-5】台北「秋葉原動漫祭」に邪神ちゃんブース出展決定...",
    description:
      "24年9月の台湾イベントに続き、この度「秋葉原動漫祭2026 IN TAIPEI」に邪神ちゃんブースを出展することが...",
    image: {
      src: "https://jashinchan.com/wp-content/uploads/2026/03/スクリーンショット-2026-03-12-11.06.35-300x207.png",
      srcset:
        "https://jashinchan.com/wp-content/uploads/2026/03/スクリーンショット-2026-03-12-11.06.35-300x207.png 300w, https://jashinchan.com/wp-content/uploads/2026/03/スクリーンショット-2026-03-12-11.06.35-1024x708.png 1024w",
      alt: "Taipei Event",
    },
  },
  {
    id: "13497",
    href: "/news/13497",
    date: "2026-2-5",
    title: "痛車天国公式版権無料配布キャンペーン第１弾",
    description:
      "2025年11月、北九州ポップカルチャーフェスティバルにて開催されたトークイベント「走るポップカルチャー！痛車文化の...",
    image: {
      src: "https://jashinchan.com/wp-content/uploads/2026/02/『邪神ちゃんドロップキック』『おねがいティーチャー』-痛車提供画像-300x169.jpg",
      srcset:
        "https://jashinchan.com/wp-content/uploads/2026/02/『邪神ちゃんドロップキック』『おねがいティーチャー』-痛車提供画像-300x169.jpg 300w",
      alt: "Itasha Campaign",
    },
  },
  {
    id: "13490",
    href: "/news/13490",
    date: "2026-2-4",
    title: "邪神ちゃんドロップキック 同時視聴プロジェクトスタート！",
    description:
      "■ プロジェクト概要 邪神ちゃんのパチスロ化に向けて、もっと多くの人に邪神ちゃんを知ってもらいたいということで、「邪...",
    image: {
      src: "https://jashinchan.com/wp-content/uploads/2026/02/13-300x169.png",
      srcset:
        "https://jashinchan.com/wp-content/uploads/2026/02/13-300x169.png 300w",
      alt: "Viewing Project",
    },
  },
  {
    id: "13476",
    href: "/news/13476",
    date: "2026-1-16",
    title: "邪神ちゃん巡回POP UP SHOP企画スタート！",
    description:
      "邪神ちゃんが秋葉原、博多、大阪を巡るポップアップストア企画がスタート！ コトブキヤ秋葉原▶1/30(金)～2/8(日...",
    image: {
      src: "https://jashinchan.com/wp-content/uploads/2026/01/告知用画像ポスター_3店舗記載：B2-212x300.jpg",
      srcset:
        "https://jashinchan.com/wp-content/uploads/2026/01/告知用画像ポスター_3店舗記載：B2-212x300.jpg 212w",
      alt: "Pop Up Shop",
    },
  },
  {
    id: "13425",
    href: "/news/13425",
    date: "2026-1-9",
    title: "邪神ちゃん法人向け情報ページを開設しました！",
    description:
      "この度、邪神ちゃんドロップキックの法人向け情報をまとめた専用ページを開設いたしました。 法人向け情報ページはこちら：...",
    image: {
      src: "https://jashinchan.com/wp-content/uploads/2026/01/邪神ちゃんんドロップキック_BUSINESS-INFO-300x169.png",
      srcset:
        "https://jashinchan.com/wp-content/uploads/2026/01/邪神ちゃんんドロップキック_BUSINESS-INFO-300x169.png 300w",
      alt: "Business Info",
    },
  },
];
