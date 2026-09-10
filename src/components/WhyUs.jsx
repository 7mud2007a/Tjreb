import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gem, Sparkles, Heart } from 'lucide-react';
import { whyChooseUs, brandInfo } from '../data/chocolateData';

export default function WhyUs() {
  const icons = [Award, Gem, Sparkles, Heart];

  return (
    <section id="why-us" className="py-24 relative bg-gradient-to-b from-[#1A0F0B] via-[#23120B] to-[#1A0F0B] overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#2A1810]/50">
            لماذا تختارنا؟
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-arabic">
            سر الفخامة في <span className="gold-text-gradient">{brandInfo.name}</span>
          </h2>
          <p className="text-[#FAF6EE]/70 text-base sm:text-lg leading-relaxed">
            نحن لا نقدم مجرد شوكولا، بل نصنع تجربة حسية فريدة تعكس الأصالة والاهتمام بالدقة والتفاصيل التي تليق بمناسباتكم.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl relative group hover:border-[#D4AF37]/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3D2318] to-[#1A0F0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#1A0F0B] transition-all duration-300 shadow-lg">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#FAF6EE] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#FAF6EE]/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
