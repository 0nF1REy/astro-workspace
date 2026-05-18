export type MenuItem = { label: string; href: string; icon: string };

export const menu: MenuItem[] = [
  { label: "Inicio", href: "/", icon: "fa-solid fa-house" },
  { label: "Blogs", href: "/blog", icon: "fa-solid fa-newspaper" },
  { label: "Pokémon", href: "/pokemon", icon: "fa-solid fa-bolt" },
  { label: "Animes", href: "/anime", icon: "fa-solid fa-tv" },
  {
    label: "Collection",
    href: "/api/anime",
    icon: "fa-solid fa-layer-group",
  },
  { label: "Componentes", href: "/components", icon: "fa-solid fa-cubes" },
  { label: "Imagens", href: "/images", icon: "fa-solid fa-image" },
];

export default menu;
