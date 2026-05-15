export type MenuItem = { label: string; href: string };

export const menu: MenuItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Blogs", href: "/blog" },
  { label: "Pokémon", href: "/pokemon" },
  { label: "Animes", href: "/anime" },
  { label: "Collection", href: "/api/anime" },
  { label: "Componentes", href: "/components" },
  { label: "Imagens", href: "/images" },
];

export default menu;
