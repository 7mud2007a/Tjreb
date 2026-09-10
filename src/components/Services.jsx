import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, Cake, Gift, PartyPopper, Palette, ArrowUpLeft } from 'lucide-react';
import { services, brandInfo } from '../data/chocolateData';

export default function Services() {
  const iconMap = {
    HeartHandshake,
    Sparkles,
    Cake,
    Gift,
    PartyPopper,
    Palette,
  };

  return (
    <section id="services" className="py-24 relative bg-[#1A0F0B]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#2A1810]/50">
            خدماتنا الفاخرة
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-arabic">
            لمسات سحرية لكل <span className="gold-text-gradient">مناسبة</span>
          </h2>
          <p className="text-[#FAF6EE]/70 text-base sm:text-lg leading-relaxed">
            من الأفراح الكبيرة إلى الهدايا الشخصية، نقدم تشكيلات متميزة ومصممة خصيصاً لتلبي أرقى الأذواق.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/20 flex flex-col justify-between"
              >
                {/* Image background wrapper */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B] via-[#1A0F0B]/40 to-transparent"></div>

                  {/* Category Badge Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl glass-panel border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#FAF6EE] group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#FAF6EE]/75 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/10 flex items-center justify-between">
                    <a
                      href={brandInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
                    >
                      <span>استفسر الآن</span>
                      <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
