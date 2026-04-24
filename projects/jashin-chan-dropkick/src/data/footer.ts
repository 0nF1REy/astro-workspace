export interface Banner {
  href: string;
  src: string;
  alt: string;
}

export interface SnsItem {
  href: string;
  img: string;
}

const BANNER_PATH = "/assets/images/footer/banners";
const SNS_PATH = "/assets/images/footer/sns";

export const banners: Banner[] = [
  {
    href: "https://recommend.jr-central.co.jp/oshi-tabi/jashinchan/",
    src: `${BANNER_PATH}/jr_central.jpg`,
    alt: "JR東海",
  },
  {
    href: "https://soulchat.jp/Jashinchan-dropkick",
    src: `${BANNER_PATH}/soulchat.jpg`,
    alt: "邪フェス３",
  },
  {
    href: "https://www.eposcard.co.jp/gecard/jashinchan/index.html",
    src: `${BANNER_PATH}/eposcard.png`,
    alt: "エポスカード",
  },
  {
    href: "https://comic-meteor.jp/jyashin/",
    src: `${BANNER_PATH}/comic_meteor.png`,
    alt: "COMICメテオ",
  },
  {
    href: "https://fanicon.net/fancommunities/1012",
    src: `${BANNER_PATH}/fanicon.jpg`,
    alt: "邪教倶楽部",
  },
  {
    href: "https://jashinchan.com/news/8805",
    src: `${BANNER_PATH}/line_stamp.png`,
    alt: "LINEスタンプ",
  },
  {
    href: "https://jashin.booth.pm/",
    src: `${BANNER_PATH}/booth.jpg`,
    alt: "BOOTH",
  },
  {
    href: "https://xfolio.jp/portfolio/flex-comix",
    src: `${BANNER_PATH}/xfolio.jpg`,
    alt: "クロスフォリオ",
  },
  {
    href: "https://s.g123.jp/9lb398is",
    src: `${BANNER_PATH}/jashin_chaos.jpg`,
    alt: "ケイオス",
  },
];

export const snsItems: SnsItem[] = [
  {
    href: "https://www.facebook.com/pages/category/Show/%E9%82%AA%E7%A5%9E%E3%81%A1%E3%82%83%E3%82%93-259657101377617/",
    img: `${SNS_PATH}/icon_fb.png`,
  },
  {
    href: "https://twitter.com/jashinchan_PJ",
    img: `${SNS_PATH}/icon_twitter.png`,
  },
];

export const footerAssets = {
  bgWaveTop: "/assets/images/global/bg_wave_top.png",
  bgWaveBottom: "/assets/images/global/bg_wave_bottom.png",
};
