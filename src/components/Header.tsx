
import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Prashant Mishra
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated ? (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="ml-2">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/admin/login">
                <Button variant="ghost" size="sm" className="ml-2">
                  <LogIn className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only">Admin</span>
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Navigation Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-30 bg-white/95 dark:bg-slate-900/95 transform transition-transform duration-300 pt-16 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              {isAuthenticated ? (
                <Link to="/admin" onClick={closeMenu}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/admin/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
