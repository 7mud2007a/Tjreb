import React from 'react';
import { motion } from 'framer-motion';
import { brandInfo } from '../data/chocolateData';

export default function Occasions() {
  const steps = [
    {
      num: "01",
      title: "الأفراح والأعراس",
      desc: "صواني ضيافة ملكية وتوزيعات خاصة تحمل بصمتكم الخاصة بلمسات القماش والورد والذهب.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop"
    },
    {
      num: "02",
      title: "المناسبات العائلية",
      desc: "تنسيقات دافئة ومميزة تضفي الحلاوة والبهجة على اجتماعاتكم ولقاءاتكم الغالية.",
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      num: "03",
      title: "أعياد الميلاد",
      desc: "تشكيلات شوكولا بأشكال مبهجة وبوكسات فاخرة تجعل من كل ذكرى ميلاد لحظة لا تُنسى.",
      image: "https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?q=80&w=1000&auto=format&fit=crop"
    },
    {
      num: "04",
      title: "الهدايا والتوزيعات",
      desc: "علب هدايا فاخرة مصممة بأناقة تليق بالإهداء وتعكس مدى تقديركم للآخرين.",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="occasions" className="py-24 bg-gradient-to-b from-[#1A0F0B] via-[#2A1810]/40 to-[#1A0F0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#2A1810]/50">
            قصة كل مناسبة
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-arabic">
            رحلة الفرح مع <span className="gold-text-gradient">شوكولا غراوي</span>
          </h2>
          <p className="text-[#FAF6EE]/70 text-base sm:text-lg leading-relaxed">
            نحاكيك بقطع شوكولا تم تصميم كل منها ليكون جزءاً من ذاكرتكم الجميلة.
          </p>
        </div>

        {/* Storytelling Timeline Grid */}
        <div className="space-y-16">
          {steps.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl glass-card group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B]/80 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <span className="text-4xl font-extrabold text-[#D4AF37]/40 font-arabic">
                    {item.num}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6EE]">
                    {item.title}
                  </h3>
                  <p className="text-[#FAF6EE]/75 text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                  <div className="pt-2">
                    <a
                      href={brandInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#2A1810]/60 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all duration-300"
                    >
                      تنسيق طلبيتك الخاصة
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
