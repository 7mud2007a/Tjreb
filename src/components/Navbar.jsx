import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpLeft } from "lucide-react";
import { brandInfo } from "../data/chocolateData";

const links = [
  { label: "الرئيسية", href: "#hero" },
  { label: "من نحن", href: "#why-us" },
  { label: "خدماتنا", href: "#services" },
  { label: "المناسبات", href: "#occasions" },
  { label: "المعرض", href: "#gallery" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          scrolled
            ? "bg-[#241006]/75 backdrop-blur-2xl border-b border-[#FFDB94]/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={closeMenu}
            className="relative z-[110] flex items-center gap-3"
          >
            <div className="text-right">
              <div className="text-base font-semibold tracking-wide text-[#FFF7E8] sm:text-lg">
                {brandInfo.name}
              </div>

              <div className="mt-0.5 text-[8px] tracking-[0.28em] text-[#FFDB94]/60 sm:text-[9px]">
                HAUTE CHOCOLATERIE
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] text-[#D8C8AE] transition-colors duration-300 hover:text-[#FFDB94]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={brandInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button glass-button-primary hidden text-[12px] lg:inline-flex"
          >
            تواصل معنا
            <ArrowUpLeft size={15} strokeWidth={1.7} />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="glass relative z-[110] flex h-11 w-11 items-center justify-center rounded-xl text-[#FFDB94] lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={21} strokeWidth={1.6} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={21} strokeWidth={1.6} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col overflow-y-auto bg-[#241006]/96 backdrop-blur-3xl lg:hidden"
          >
            {/* Background detail */}
            <div className="pointer-events-none absolute left-[-120px] top-[15%] h-[300px] w-[300px] rounded-full bg-[#632709]/30 blur-[100px]" />

            <div className="relative flex min-h-[100dvh] flex-col px-6 pb-7 pt-28 sm:px-10">
              
              <div className="mb-10 flex items-center justify-between border-b border-[#FFDB94]/10 pb-5">
                <div>
                  <p className="text-[9px] tracking-[0.3em] text-[#FFDB94]/50">
                    MENU
                  </p>
                  <p className="mt-1 text-sm text-[#D8C8AE]">
                    القائمة الرئيسية
                  </p>
                </div>

                <span className="text-xs text-[#FFDB94]/35">
                  01 — 06
                </span>
              </div>

              <nav className="flex flex-1 flex-col">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ x: -35, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.12 + index * 0.07,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center justify-between border-b border-[#FFDB94]/10 py-4"
                  >
                    <span className="text-xl font-medium text-[#FFF7E8] transition-colors duration-300 group-hover:text-[#FFDB94]">
                      {link.label}
                    </span>

                    <span className="text-[10px] tracking-widest text-[#FFDB94]/35">
                      0{index + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="mt-8"
              >
                <div className="mb-4">
                  <p className="text-xs text-[#D8C8AE]">
                    {brandInfo.location}
                  </p>

                  <a
                    href={`tel:${brandInfo.phoneRaw}`}
                    className="mt-1 inline-block text-sm text-[#FFDB94]"
                  >
                    {brandInfo.phone}
                  </a>
                </div>

                <a
                  href={brandInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="glass-button glass-button-primary w-full text-sm"
                >
                  تواصل عبر واتساب
                  <ArrowUpLeft size={16} strokeWidth={1.7} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
