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
          {/* Logo */}
          <a href="/" className="logo">
            <img src="/brand-kit/logo/sm-logo.png" alt="Logo" />
          </a>

          {/* Navbar */}
          {showNav ? (
            <Nav isClicked={isClicked} />
          ) : (
            <a href={backHref} className="header__back-link">
              <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
              <span>{backLabel}</span>
            </a>
          )}

          {/* Menu icons */}
          {showNav && (
            <button
              className="menu-icons"
              aria-controls="primary-navigation"
              aria-expanded={isClicked}
              aria-label={`${isClicked ? "Close menu" : "Open menu"}`}
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
    </header>
  );
};

export default Header;
