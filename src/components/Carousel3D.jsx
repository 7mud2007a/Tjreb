import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export default function Carousel3D({ items = [], onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4 select-none">
      {/* 3D Perspective Viewport */}
      <div
        className="relative h-[420px] sm:h-[480px] w-full flex items-center justify-center perspective-[1200px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          let offset = index - activeIndex;
          if (offset < -Math.floor(items.length / 2)) offset += items.length;
          if (offset > Math.floor(items.length / 2)) offset -= items.length;

          const isActive = offset === 0;
          const isAbsOne = Math.abs(offset) === 1;

          // Calculate 3D Card Transforms
          const translateX = offset * 220; // horizontal spacing in px
          const translateZ = isActive ? 0 : -250;
          const rotateY = offset * -20; // subtle Y axis rotation
          const scale = isActive ? 1 : 0.82;
          const opacity = isActive ? 1 : isAbsOne ? 0.6 : 0;
          const zIndex = 20 - Math.abs(offset) * 5;

          return (
            <div
              key={item.id || index}
              onClick={() => {
                setActiveIndex(index);
                if (isActive && onSelect) onSelect(item, index);
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute top-0 w-[280px] sm:w-[340px] h-[380px] sm:h-[440px] rounded-3xl overflow-hidden cursor-pointer border ${
                isActive
                  ? 'border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.25)]'
                  : 'border-[#D4AF37]/20 shadow-2xl backdrop-blur-sm'
              } bg-[#2A1810] group`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B] via-[#1A0F0B]/30 to-transparent"></div>

              {/* Card Label & Tag */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#D4AF37] bg-[#1A0F0B]/80 border border-[#D4AF37]/30 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{item.category}</span>
                </span>
                <h3 className="text-xl font-bold text-[#FAF6EE] font-arabic leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-[#2A1810] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-[#D4AF37]'
                  : 'w-2.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-[#2A1810] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
