export interface MenuItem {
  href: string;
  id: string;
  label: string;
}

export const menuItems: MenuItem[] = [
  { href: "/news", id: "jd-news", label: "News" },
  { href: "/on-air", id: "jd-onair", label: "On Air" },
  { href: "/staffcast", id: "jd-staffcast", label: "Staff/Cast" },
  { href: "/story", id: "jd-story", label: "Story" },
  { href: "/character", id: "jd-character", label: "Character" },
  { href: "/disc", id: "jd-disc", label: "Disc" },
  { href: "/goods", id: "jd-goods", label: "Goods" },
  { href: "/movie", id: "jd-movie", label: "Movie" },
  { href: "/special", id: "jd-special", label: "Special" },
];
