import React from 'react';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { brandInfo } from '../data/chocolateData';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#1A0F0B] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#2A1810]/50">
            تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-arabic">
            يسعدنا <span className="gold-text-gradient">خدمتكم واستقبال طلباتكم</span>
          </h2>
          <p className="text-[#FAF6EE]/70 text-base sm:text-lg">
            فريقنا جاهز لمساعدتكم في اختيار وتنسيق أجمل قطع الشوكولا لمناسباتكم السعيدة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone Card */}
          <div className="glass-card p-8 rounded-3xl text-center space-y-4 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#3D2318] to-[#1A0F0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-lg">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#FAF6EE]">رقم الاتصال المباشر</h3>
            <p className="text-[#FAF6EE]/70 text-sm">يسعدنا استقبال اتصالاتكم واستفساراتكم</p>
            <a
              href={`tel:${brandInfo.phoneRaw}`}
              className="inline-block px-6 py-3 rounded-full bg-[#D4AF37] text-[#1A0F0B] font-bold text-lg dir-ltr hover:bg-[#F3E5AB] transition-colors"
            >
              {brandInfo.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="glass-card p-8 rounded-3xl text-center space-y-4 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#3D2318] to-[#1A0F0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-lg">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#FAF6EE]">عنوان المحل</h3>
            <p className="text-[#FAF6EE]/70 text-sm">أهلاً وسهلاً بكم في فرعنا</p>
            <p className="text-[#D4AF37] font-semibold text-base">
              {brandInfo.location}
            </p>
          </div>

          {/* WhatsApp Card */}
          <div className="glass-card p-8 rounded-3xl text-center space-y-4 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#3D2318] to-[#1A0F0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-lg">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#FAF6EE]">محادثة واتساب</h3>
            <p className="text-[#FAF6EE]/70 text-sm">ارسل استفسارك أو طلبك مباشرة</p>
            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              تواصل عبر WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
