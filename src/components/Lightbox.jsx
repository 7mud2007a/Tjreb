import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export default function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key === "ArrowLeft") onNext?.();
      if (event.key === "ArrowRight") onPrev?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#160902]/92 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[24px] border border-[#FFDB94]/20 bg-[#241006] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image.src || image.image}
              alt={image.alt || image.title || "شوكولا غراوي"}
              className="max-h-[78vh] w-auto max-w-[90vw] object-contain"
            />

            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#241006] to-transparent px-5 pb-5 pt-14 text-right">
                <p className="text-sm text-[#FFF7E8]">{image.title}</p>
                {image.category && (
                  <p className="mt-1 text-[10px] text-[#FFDB94]/60">
                    {image.category}
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-[#FFDB94]"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="الصورة السابقة"
                className="glass absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-[#FFDB94]"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
            )}

            {onNext && (
              <button
                type="button"
                onClick={onNext}
                aria-label="الصورة التالية"
                className="glass absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-[#FFDB94]"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
