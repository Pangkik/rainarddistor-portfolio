import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const hashItems = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Speaking", href: "#speaking" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashClick = (hash: string) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-bar border-b" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="font-display text-xl md:text-2xl font-black text-foreground tracking-wide"
        >
          raingoesaway<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {hashItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleHashClick(item.href)}
                className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-bar border-b animate-fade-up">
          <ul className="section-container py-6 flex flex-col gap-4">
            {hashItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleHashClick(item.href)}
                  className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors block"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
