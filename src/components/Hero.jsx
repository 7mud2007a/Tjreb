import { motion } from "framer-motion";
import { ArrowUpLeft, MapPin } from "lucide-react";
import { brandInfo } from "../data/chocolateData";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#241006]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,39,9,0.5),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#241006]/30 via-[#241006]/60 to-[#241006]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pb-12 pt-28 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="order-2 text-right lg:order-1"
          >
            <div className="mb-6 flex items-center justify-end gap-3">
              <span className="h-px w-8 bg-[#FFDB94]/40" />
              <span className="text-[10px] tracking-[0.16em] text-[#FFDB94]/70">
                شوكولا فاخرة مصنوعة بعناية
              </span>
            </div>

            <h1 className="max-w-xl text-4xl font-medium leading-[1.15] tracking-tight text-[#FFF7E8] sm:text-5xl lg:text-6xl">
              الفخامة
              <br />
              <span className="text-[#FFDB94]">التي تُهدى</span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-[#D8C8AE] sm:text-base">
              نصنع تفاصيل الشوكولا بعناية، لتبقى مناسباتكم أجمل في الذاكرة.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2 text-xs text-[#D8C8AE]/80">
              <MapPin size={14} className="text-[#FFDB94]" strokeWidth={1.5} />
              <span>{brandInfo.location}</span>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <a
                href={brandInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button glass-button-primary text-xs sm:text-sm"
              >
                اطلب الآن
                <ArrowUpLeft size={16} strokeWidth={1.7} />
              </a>

              <a
                href="#gallery"
                className="glass-button text-xs sm:text-sm"
              >
                استكشف التشكيلة
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: -35 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="order-1 lg:order-2"
          >
            <div className="cinematic-image relative mx-auto aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded-[28px] border border-[#FFDB94]/15 sm:rounded-[34px]">
              <img
                src="/images/images.jpeg"
                alt="تشكيلة شوكولا فاخرة من شوكولا غراوي"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#241006]/75 via-transparent to-[#241006]/10" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="glass-strong rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] tracking-[0.2em] text-[#FFDB94]/60">
                        GHRAOUI
                      </p>
                      <p className="mt-1 text-sm text-[#FFF7E8]">
                        تفاصيل تستحق أن تُهدى
                      </p>
                    </div>

                    <span className="text-lg text-[#FFDB94]/70">
                      ✦
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#why-us"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] tracking-[0.25em] text-[#D8C8AE]/50 sm:flex"
      >
        SCROLL
        <span className="h-px w-8 bg-[#FFDB94]/30" />
      </motion.a>
    </section>
  );
}
