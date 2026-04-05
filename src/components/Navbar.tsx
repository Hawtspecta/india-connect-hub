import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" as const },
    { label: "Services", href: "#services", id: "services" as const },
    { label: "Work", href: "#work", id: "work" as const },
    { label: "Voices", href: "#testimonials", id: "testimonials" as const },
    { label: "Contact", href: "#contact", id: "contact" as const },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <motion.a
            href="#"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className={cn(
              "font-display text-xl md:text-2xl font-bold tracking-wide transition-colors duration-500 inline-block origin-left",
              scrolled ? "text-foreground" : "text-cream",
            )}
          >
            <span className="text-primary">INDIAN</span> CULTURAL HUB
          </motion.a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "font-body text-sm tracking-widest uppercase transition-colors duration-300 relative pb-0.5",
                    scrolled
                      ? isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                      : isActive
                        ? "text-cream"
                        : "text-cream/80 hover:text-cream",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-px origin-center transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                      scrolled ? "bg-primary" : "bg-cream",
                    )}
                    aria-hidden
                  />
                </a>
              );
            })}
            <a
              href="#contact"
              className={cn(
                "font-body text-sm tracking-widest uppercase px-6 py-2.5 border transition-all duration-300",
                scrolled
                  ? activeSection === "contact"
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  : activeSection === "contact"
                    ? "border-cream bg-cream/15 text-cream hover:bg-primary hover:border-primary hover:text-primary-foreground"
                    : "border-cream/80 text-cream hover:bg-primary hover:border-primary hover:text-primary-foreground",
              )}
            >
              Enquire
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={cn(
                "block w-6 h-0.5 transition-all duration-300",
                scrolled ? "bg-foreground" : "bg-cream",
                menuOpen ? "rotate-45 translate-y-2" : "",
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 transition-all duration-300",
                scrolled ? "bg-foreground" : "bg-cream",
                menuOpen ? "opacity-0" : "",
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 transition-all duration-300",
                scrolled ? "bg-foreground" : "bg-cream",
                menuOpen ? "-rotate-45 -translate-y-2" : "",
              )}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "font-display text-3xl transition-colors",
                    isActive ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                >
                  {link.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
