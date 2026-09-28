import { useState, useEffect } from "react";
import Container from "./Container";
import Button from "./Button";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Emergency", href: "#emergency", id: "emergency" },
  { label: "Transport", href: "#transport", id: "transport" },
  { label: "Tourism", href: "#tourism", id: "tourism" },
  { label: "Events", href: "#events", id: "events" },
  { label: "News", href: "#news", id: "news" },
  { label: "Departments", href: "#departments", id: "departments" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "FAQs", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When reaching near the bottom of the page, highlight the last section
      if (scrollPosition + windowHeight >= documentHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // If near the top, highlight home
      if (scrollPosition < 90) {
        setActiveSection("home");
        return;
      }

      // Find the current section in view based on scroll offset
      let currentSection = "home";
      const navbarOffset = 130;

      for (let i = 0; i < links.length; i++) {
        const { id } = links[i];
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - navbarOffset;
          if (scrollPosition >= sectionTop) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e, targetId, href) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
      window.history.pushState(null, "", href);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-ink-navy border-b border-white/[.08] sticky top-0 z-50 backdrop-blur-md bg-ink-navy/95 transition-all">
      <Container className="flex items-center justify-between gap-4 py-3.5 flex-wrap">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home", "#home")}
          className="flex items-center gap-3 text-paper group"
        >
          <span className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-civic-amber to-transit-teal flex items-center justify-center text-ink-navy font-display font-bold text-[1.15rem] shadow-sm group-hover:rotate-6 transition-transform">
            O
          </span>
          <span>
            <span className="block font-display font-bold text-[1.15rem] tracking-[0.01em] leading-tight">
              Orbit Smart City <span className="text-civic-amber text-xs font-mono font-normal">Gov Portal</span>
            </span>
            <span className="block font-mono text-[0.65rem] tracking-[0.1em] uppercase text-paper/70">
              Smart City Mission · India
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex flex-wrap gap-1 items-center" aria-label="Primary">
          {links.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, id, href)}
                aria-current={isActive ? "page" : undefined}
                className={`text-[0.84rem] px-2.5 py-1.5 rounded-md transition-all duration-200 relative select-none ${
                  isActive
                    ? "text-civic-amber font-semibold bg-white/[0.12] ring-1 ring-civic-amber/40 shadow-sm"
                    : "text-paper/[.78] font-medium hover:text-paper hover:bg-white/[.08]"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-civic-amber rounded-full"></span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="#services"
            onClick={(e) => handleNavClick(e, "services", "#services")}
            variant="primary"
            className="hidden sm:inline-flex text-xs py-2 px-3.5 flex-shrink-0"
          >
            Citizen Services
          </Button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-md text-paper/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && (
          <div className="w-full xl:hidden border-t border-white/10 pt-3 pb-2 mt-2">
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-1.5" aria-label="Mobile">
              {links.map(({ label, href, id }) => {
                const isActive = activeSection === id;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(e, id, href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-[0.85rem] px-3 py-2 rounded transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-civic-amber/15 text-civic-amber font-semibold border-l-2 border-civic-amber"
                        : "text-paper/80 font-medium hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-civic-amber animate-pulse"></span>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
