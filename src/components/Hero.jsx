import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { brandInfo } from '../data/chocolateData';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-grain">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[30rem] h-[30rem] bg-[#5A3826]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-center lg:text-right"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#2A1810]/60 text-xs font-semibold text-[#D4AF37] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>شوكولا فاخرة مصنوعة يدويًا في سوريا</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-[#FAF6EE] font-arabic">
            تذوّق الفخامة مع <br />
            <span className="gold-text-gradient underline decoration-[#D4AF37]/30 underline-offset-8">
              {brandInfo.name}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#FAF6EE]/80 max-w-2xl leading-relaxed font-light">
            {brandInfo.description}
          </p>

          {/* Location details badge */}
          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#D4AF37]/90 pt-2">
            <MapPin className="w-4 h-4" />
            <span>{brandInfo.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#1A0F0B] font-bold text-lg hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
            >
              <span>اطلب الآن</span>
              <ArrowLeft className="w-5 h-5" />
            </a>

            <a
              href="#gallery"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#D4AF37]/40 bg-[#2A1810]/50 text-[#FAF6EE] hover:border-[#D4AF37] hover:bg-[#2A1810] font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
            >
              <span>استكشف مجموعتنا</span>
              <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
            </a>
          </div>
        </motion.div>

        {/* Hero Visual Imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Ambient Backglow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent rounded-3xl blur-2xl transform rotate-3"></div>

            {/* Main Featured Image Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#2A1810]">
              <img
                src="https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1200&auto=format&fit=crop"
                alt="شوكولا غراوي الفاخرة"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B] via-transparent to-transparent opacity-80"></div>

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl glass-panel border border-[#D4AF37]/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#1A0F0B] font-bold text-xl shadow-lg shrink-0">
                  غ
                </div>
                <div>
                  <h4 className="font-bold text-[#FAF6EE] text-base">جودة وصنعة يدوية عالية</h4>
                  <p className="text-xs text-[#D4AF37]/90">تصاميم شوكولا ملكية لمختلف المناسبات</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
