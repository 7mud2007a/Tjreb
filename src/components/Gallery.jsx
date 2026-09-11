import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Carousel3D from "./Carousel3D";
import Lightbox from "./Lightbox";
import { galleryItems } from "../data/chocolateData";

const categories = ["الكل", "أفراح", "هدايا", "مناسبات", "توزيعات"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "الكل") return galleryItems;

    return galleryItems.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section
      id="gallery"
      className="section-space overflow-hidden bg-[#241006]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-9 text-right"
        >
          <div className="mb-4 flex items-center justify-end gap-3">
            <span className="h-px w-8 bg-[#FFDB94]/40" />

            <span className="text-[10px] tracking-[0.2em] text-[#FFDB94]/65">
              GHRAOUI COLLECTION
            </span>
          </div>

          <h2 className="text-3xl font-medium text-[#FFF7E8] sm:text-4xl lg:text-5xl">
            تشكيلات
            <span className="text-[#FFDB94]"> من غراوي</span>
          </h2>

          <p className="mt-4 text-sm text-[#D8C8AE]/70">
            لمحات من أعمالنا وتنسيقاتنا الخاصة.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-end overflow-x-auto pb-2"
        >
          <div className="glass flex min-w-max items-center gap-1 rounded-2xl p-1">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-4 py-2 text-[11px] transition-all duration-300 ${
                    active
                      ? "bg-[#FFDB94]/12 text-[#FFDB94] border border-[#FFDB94]/20"
                      : "border border-transparent text-[#D8C8AE]/60 hover:text-[#FFF7E8]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Carousel3D items={filteredItems} />
        </motion.div>

        {/* Small editorial strip */}
        {filteredItems.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {filteredItems.slice(0, 4).map((item, index) => (
              <motion.button
                key={`${item.id || item.src}-${index}`}
                type="button"
                onClick={() => setSelectedImage(item)}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="cinematic-image group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#FFDB94]/10"
              >
                <img
                  src={item.src || item.image}
                  alt={item.alt || item.title || "شوكولا غراوي"}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-[#241006]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="absolute bottom-2 right-2 rounded-lg border border-[#FFDB94]/15 bg-[#241006]/55 px-2 py-1 text-[8px] text-[#FFDB94]/70 backdrop-blur-md">
                  عرض
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
