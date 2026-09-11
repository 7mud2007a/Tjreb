import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel3D({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = items.length;

  const next = () => {
    if (!total) return;
    setActiveIndex((current) => (current + 1) % total);
  };

  const previous = () => {
    if (!total) return;
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  if (!items.length) return null;

  return (
    <div className="relative w-full select-none">
      {/* 3D Stage */}
      <div
        className="relative mx-auto h-[390px] w-full max-w-6xl overflow-hidden sm:h-[470px]"
        style={{
          perspective: "1400px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {items.map((item, index) => {
            let offset = index - activeIndex;

            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const isNear = Math.abs(offset) === 1;
            const isVisible = Math.abs(offset) <= 2;

            const translateX =
              offset === 0
                ? 0
                : offset > 0
                  ? 250 + Math.min(offset - 1, 1) * 80
                  : -250 - Math.min(Math.abs(offset) - 1, 1) * 80;

            const translateZ = isActive
              ? 80
              : isNear
                ? -80
                : -280;

            const rotateY =
              offset === 0
                ? 0
                : offset > 0
                  ? -22
                  : 22;

            const scale = isActive
              ? 1
              : isNear
                ? 0.78
                : 0.58;

            return (
              <motion.button
                key={item.id || item.src || index}
                type="button"
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity: isActive
                    ? 1
                    : isNear
                      ? 0.58
                      : isVisible
                        ? 0.18
                        : 0,
                  filter: isActive
                    ? "brightness(1)"
                    : "brightness(.55)",
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute h-[300px] w-[220px] overflow-hidden rounded-[24px] border bg-[#241006] sm:h-[390px] sm:w-[285px] ${
                  isActive
                    ? "border-[#FFDB94]/35 shadow-[0_30px_80px_rgba(0,0,0,.4)]"
                    : "border-[#FFDB94]/10"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <img
                  src={item.src || item.image}
                  alt={item.alt || item.title || "شوكولا غراوي"}
                  className="h-full w-full object-cover"
                  draggable="false"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#241006]/70 via-transparent to-transparent" />

                {isActive && item.title && (
                  <div className="absolute bottom-4 right-4 left-4 text-right">
                    <div className="glass-strong rounded-xl px-4 py-3">
                      <p className="text-sm text-[#FFF7E8]">
                        {item.title}
                      </p>

                      {item.category && (
                        <p className="mt-1 text-[10px] text-[#FFDB94]/60">
                          {item.category}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={previous}
          aria-label="الصورة السابقة"
          className="glass flex h-10 w-10 items-center justify-center rounded-xl text-[#FFDB94] transition hover:bg-[#FFDB94]/10"
        >
          <ChevronRight size={17} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`الصورة ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-7 bg-[#FFDB94]"
                  : "w-1.5 bg-[#FFDB94]/25"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="الصورة التالية"
          className="glass flex h-10 w-10 items-center justify-center rounded-xl text-[#FFDB94] transition hover:bg-[#FFDB94]/10"
        >
          <ChevronLeft size={17} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
