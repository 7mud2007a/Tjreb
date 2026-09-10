import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Lightbox({ image, onClose, onPrev, onNext }) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-3 rounded-full bg-[#2A1810]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all z-50"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#2A1810]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all z-50"
          aria-label="Previous Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#2A1810]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0B] transition-all z-50"
          aria-label="Next Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Modal Image Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#1A0F0B] shadow-2xl flex flex-col"
        >
          <img
            src={image.image}
            alt={image.title}
            className="w-full max-h-[70vh] object-contain bg-black/50"
          />
          <div className="p-6 bg-[#2A1810] border-t border-[#D4AF37]/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                {image.category}
              </span>
              <h3 className="text-xl font-bold text-[#FAF6EE] mt-1 font-arabic">
                {image.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
