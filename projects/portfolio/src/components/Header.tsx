import { useEffect, useState } from "react";
import Nav from "./Nav";

type HeaderProps = {
  showNav?: boolean;
  backHref?: string;
  backLabel?: string;
};

const Header = ({
  showNav = true,
  backHref = "/",
  backLabel = "Voltar para a home",
}: HeaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleNavClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolling(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={isScrolling ? "header scrolling" : "header"}>
      <div className="header__wrapper">
        <div className="header__content">
          {/* Esquerda: Logo ou Voltar */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {showNav ? (
              <a href="/" className="logo" title="Ir para a página inicial">
                <img src="/brand-kit/logo/sm-logo.png" alt="Logo" />
              </a>
            ) : (
              <a
                href={backHref}
                className="header__back-link"
                title="{backLabel}"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                <span>{backLabel}</span>
              </a>
            )}
          </div>

          {/* Centro: Navbar (quando showNav) */}
          {showNav && <Nav isClicked={isClicked} />}

          {/* Direita: Toggle, Voltar (quando !showNav) e Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              className="bg-toggle-btn"
              title="Alternar fundo animado"
              aria-label="Toggle Background"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </button>
            {showNav && (
              <button
                className="menu-icons"
                aria-controls="primary-navigation"
                aria-expanded={isClicked}
                aria-label={`${isClicked ? "Close menu" : "Open menu"}`}
                title={
                  isClicked
                    ? "Fechar menu de navegação"
                    : "Abrir menu de navegação"
                }
                onClick={handleNavClick}
              >
                {isClicked ? (
                  <i className="fa-solid fa-close" aria-label="true"></i>
                ) : (
                  <i className="fa-solid fa-bars" aria-label="true"></i>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
