export interface MenuItem {
  href: string;
  id: string;
  img: string;
  imgHover: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "nav_news",
    href: "/news",
    img: "/assets/images/home/hero/nav/off/nav_news_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_news_on.png",
  },
  {
    id: "nav_onair",
    href: "/onair",
    img: "/assets/images/home/hero/nav/off/nav_onair_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_onair_on.png",
  },
  {
    id: "nav_staffcast",
    href: "/staffcast",
    img: "/assets/images/home/hero/nav/off/nav_staffcast_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_staffcast_on.png",
  },
  {
    id: "nav_story",
    href: "/story",
    img: "/assets/images/home/hero/nav/off/nav_story_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_story_on.png",
  },
  {
    id: "nav_character",
    href: "/character",
    img: "/assets/images/home/hero/nav/off/nav_character_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_character_on.png",
  },
  {
    id: "nav_cddvdbd",
    href: "/disc",
    img: "/assets/images/home/hero/nav/off/nav_cddvdbd_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_cddvdbd_on.png",
  },
  {
    id: "nav_goods",
    href: "/goods",
    img: "/assets/images/home/hero/nav/off/nav_goods_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_goods_on.png",
  },
  {
    id: "nav_movie",
    href: "/movie",
    img: "/assets/images/home/hero/nav/off/nav_movie_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_movie_on.png",
  },
  {
    id: "nav_special",
    href: "/special",
    img: "/assets/images/home/hero/nav/off/nav_special_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_special_on.png",
  },
  {
    id: "nav_business-info",
    href: "/business-info",
    img: "/assets/images/home/hero/nav/off/nav_business-info_off.png",
    imgHover: "/assets/images/home/hero/nav/on/nav_business-info_on.png",
  },
];
