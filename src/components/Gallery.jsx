import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Sparkles } from 'lucide-react';
import { galleryItems } from '../data/chocolateData';
import Carousel3D from './Carousel3D';
import Lightbox from './Lightbox';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['الكل', 'أفراح', 'مناسبات', 'أعياد ميلاد', 'هدايا', 'توزيعات', 'طلبات خاصة'];

  const filteredItems = selectedCategory === 'الكل'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#1A0F0B] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#2A1810]/50">
            معرض الإبداع
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-arabic">
            معرض <span className="gold-text-gradient">ابتكاراتنا الفاخرة</span>
          </h2>
          <p className="text-[#FAF6EE]/70 text-base sm:text-lg">
            تصفح نماذج من التشكيلات والتنسيقات الفاخرة التي أعددناها بشغف.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#1A0F0B] shadow-lg shadow-[#D4AF37]/20 scale-105'
                  : 'bg-[#2A1810]/60 text-[#FAF6EE]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Perspective Carousel Experience */}
        <div className="mb-16">
          <Carousel3D
            items={filteredItems}
            onSelect={(item, index) => openLightbox(index)}
          />
        </div>

        {/* Grid View */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/20 cursor-pointer h-80"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B] via-[#1A0F0B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-[#D4AF37] uppercase">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-[#FAF6EE] mt-1 font-arabic">
                  {item.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#F3E5AB]">
                  <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>تكبير الصورة</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Component */}
        {lightboxIndex !== null && (
          <Lightbox
            image={filteredItems[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </section>
  );
}
