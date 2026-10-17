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

  const closeNav = () => {
    setIsClicked(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsClicked(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className={isScrolling ? "header scrolling" : "header"}>
      <div className="header__wrapper">
        <div className="header__content">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {showNav ? (
              <a href="/" className="logo" title="Ir para a página inicial">
                <img src="/brand-kit/logo/sm-logo.png" alt="Logo" />
              </a>
            ) : (
              <a
                href={backHref}
                className="header__back-link"
                title={backLabel}
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                <span>{backLabel}</span>
              </a>
            )}
          </div>

          {showNav && <Nav isClicked={isClicked} onClose={closeNav} />}

          <div
            className="header__actions"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
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
