import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { brandInfo } from '../data/chocolateData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'من نحن', href: '#why-us' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'المناسبات', href: '#occasions' },
    { name: 'المعرض', href: '#gallery' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1A0F0B]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-4 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark Logo */}
        <a href="#hero" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#2A1810]/60 group-hover:border-[#D4AF37] transition-all">
            <span className="gold-text-gradient font-bold text-xl">غ</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-wide gold-text-gradient font-arabic">
              {brandInfo.name}
            </span>
            <span className="text-[10px] text-[#D4AF37]/70 tracking-widest uppercase -mt-1">
              HAUTE CHOCOLATERIE
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#FAF6EE]/80 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full hover:after:left-0 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={brandInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#2A1810]/40 text-sm font-medium text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل معنا</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] bg-[#2A1810]/80 focus:outline-none z-50 transition-transform active:scale-95"
          aria-label="Toggle Fullscreen Menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Full-Screen Luxury Mobile Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#140A07]/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-300 md:hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 right-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="pt-16 space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30 px-3 py-1 rounded-full">
              القائمة الرئيسية
            </span>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-bold text-[#FAF6EE] hover:text-[#D4AF37] transition-colors font-arabic border-b border-[#D4AF37]/10 pb-3 flex items-center justify-between"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-[#D4AF37]/50">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#D4AF37]/20 space-y-4">
            <a
              href={`tel:${brandInfo.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-[#D4AF37]/40 bg-[#2A1810] text-[#D4AF37] font-bold text-base"
            >
              <Phone className="w-5 h-5" />
              <span>اتصال: {brandInfo.phone}</span>
            </a>
            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#1A0F0B] font-extrabold text-base shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
