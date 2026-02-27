import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
{ label: "About", href: "#about" },
{ label: "Works", href: "#works" },
{ label: "Speaking", href: "#speaking" },
{ label: "Awards", href: "#awards" },
{ label: "Blog", href: "#blog" },
{ label: "Contact", href: "#contact" }];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "glass-bar border-b" : "bg-transparent"}`
      }>

      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          className="font-display text-xl md:text-2xl font-black uppercase text-foreground tracking-wide">RAINGOESAWAY


        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
          <li key={item.href}>
              <button
              onClick={() => handleClick(item.href)}
              className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300">

                {item.label}
              </button>
            </li>
          )}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu">

          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen &&
      <div className="md:hidden glass-bar border-b animate-fade-up">
          <ul className="section-container py-6 flex flex-col gap-4">
            {navItems.map((item) =>
          <li key={item.href}>
                <button
              onClick={() => handleClick(item.href)}
              className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors w-full text-left">

                  {item.label}
                </button>
              </li>
          )}
          </ul>
        </div>
      }
    </header>);

};

export default Navbar;