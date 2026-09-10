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

        {/* Actions Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={brandInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#2A1810]/40 text-sm font-medium text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل معنا</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] bg-[#2A1810]/60 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-[#D4AF37]/20 px-6 py-6 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#FAF6EE] hover:text-[#D4AF37] transition-colors border-b border-[#FAF6EE]/5 pb-2"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${brandInfo.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF37]/30 bg-[#2A1810] text-[#D4AF37] text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>إتصال: {brandInfo.phone}</span>
              </a>
              <a
                href={brandInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-[#1A0F0B] text-sm font-bold shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
