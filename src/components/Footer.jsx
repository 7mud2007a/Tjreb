import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { brandInfo } from '../data/chocolateData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#140A07] border-t border-[#D4AF37]/20 pt-16 pb-8 text-[#FAF6EE]/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#2A1810]">
                <span className="gold-text-gradient font-bold text-xl">غ</span>
              </div>
              <span className="font-bold text-2xl gold-text-gradient font-arabic">
                {brandInfo.name}
              </span>
            </div>
            <p className="text-sm text-[#FAF6EE]/70 max-w-sm leading-relaxed">
              {brandInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-base font-bold text-[#D4AF37]">روابط السريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-[#D4AF37] transition-colors">الرئيسية</a></li>
              <li><a href="#why-us" className="hover:text-[#D4AF37] transition-colors">من نحن</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">خدماتنا</a></li>
              <li><a href="#occasions" className="hover:text-[#D4AF37] transition-colors">المناسبات</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">المعرض</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-base font-bold text-[#D4AF37]">معلومات الفرع</h4>
            <div className="space-y-2 text-sm text-[#FAF6EE]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>{brandInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <a href={`tel:${brandInfo.phoneRaw}`} className="hover:text-[#D4AF37]">
                  {brandInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and developer credit */}
        <div className="pt-8 border-t border-[#FAF6EE]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EE]/50 gap-4">
          <p>© {currentYear} {brandInfo.name}. جميع الحقوق محفوظة.</p>
          <p>
            تصميم وتطوير{' '}
            <a
              href="https://aboudweb.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline font-semibold"
            >
              Aboud Web
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
