import { useState } from "react";

const links = [
  { label: "início", href: "/#home", id: "home" },
  { label: "sobre mim", href: "/#about", id: "about" },
  { label: "projetos", href: "/#work", id: "work" },
  { label: "contato", href: "/#contact", id: "contact" },
];

const Nav = ({ isClicked }: { isClicked: boolean }) => {
  const [active, setActive] = useState("home");

  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 88;
      const elementTop =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }

    setActive(targetId);
  };

  return (
    <nav
      id="primary-navigation"
      aria-label="Navegação principal"
      className={`nav ${isClicked ? "showMenu" : ""}`}
    >
      <ul className="menu">
        {links.map(({ label, href, id }) => (
          <li key={label}>
            <a
              className={`${active === id ? "active" : ""}`}
              href={href}
              title={`Ir para a seção ${label}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
