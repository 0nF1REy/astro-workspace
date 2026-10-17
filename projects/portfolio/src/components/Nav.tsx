import { useState } from "react";

const links = [
  { label: "início", href: "/#home", id: "home" },
  { label: "sobre mim", href: "/#about", id: "about" },
  { label: "projetos", href: "/#work", id: "work" },
  { label: "contato", href: "/#contact", id: "contact" },
];

type NavProps = {
  isClicked: boolean;
  onClose?: () => void;
};

const Nav = ({ isClicked, onClose }: NavProps) => {
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <nav
      id="primary-navigation"
      aria-label="Navegação principal"
      className={`nav ${isClicked ? "showMenu" : ""}`}
      onClick={handleBackdropClick}
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
                if (onClose) {
                  onClose();
                }
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
