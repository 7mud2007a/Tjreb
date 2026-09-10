import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { brandInfo } from '../data/chocolateData';

export default function CTA() {
  return (
    <section className="py-20 relative bg-grain overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-[#D4AF37]/40 text-center space-y-8 relative overflow-hidden bg-gradient-to-r from-[#2A1810] via-[#3D2318] to-[#2A1810]">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-arabic leading-tight">
            "{brandInfo.ctaText}"
          </h2>

          <p className="text-[#FAF6EE]/80 text-lg max-w-2xl mx-auto font-light">
            دعنا نساعدك في ابتكار أرقى توزيعات الشوكولا لمناسبتك القادمة بلمسة ملكية حصرية.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#1A0F0B] font-bold text-lg hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-3"
            >
              <span>اطلب الآن</span>
              <ArrowLeft className="w-5 h-5" />
            </a>

            <a
              href={`tel:${brandInfo.phoneRaw}`}
              className="w-full sm:w-auto px-10 py-4 rounded-full border border-[#D4AF37]/40 bg-[#1A0F0B]/60 text-[#FAF6EE] hover:border-[#D4AF37] font-semibold text-lg transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>تواصل معنا</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
