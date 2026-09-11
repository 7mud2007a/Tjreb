import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, ArrowUpLeft } from "lucide-react";
import { brandInfo } from "../data/chocolateData";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-space overflow-hidden bg-[#632709]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="cinematic-image relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#FFDB94]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1400&q=90"
              alt="شوكولا غراوي"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#241006]/80 via-[#241006]/15 to-transparent" />

            <div className="absolute bottom-6 right-6 left-6">
              <div className="glass-strong rounded-2xl p-5 text-right">
                <p className="text-[9px] tracking-[0.25em] text-[#FFDB94]/60">
                  GHRAOUI CHOCOLATE
                </p>

                <h3 className="mt-2 text-xl font-medium text-[#FFF7E8]">
                  تفاصيل تستحق أن تُهدى
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col justify-center text-right"
          >
            <div className="mb-4 flex items-center justify-end gap-3">
              <span className="h-px w-8 bg-[#FFDB94]/40" />

              <span className="text-[10px] tracking-[0.2em] text-[#FFDB94]/65">
                GET IN TOUCH
              </span>
            </div>

            <h2 className="text-3xl font-medium leading-tight text-[#FFF7E8] sm:text-4xl">
              دعنا نصنع
              <br />
              <span className="text-[#FFDB94]">تفاصيل مناسبتك</span>
            </h2>

            <p className="mt-5 max-w-md mr-auto text-sm leading-8 text-[#F2DFC2]/75">
              أخبرنا بما تحتاجه، وسنساعدك في اختيار التشكيلة المناسبة
              لمناسبتك.
            </p>

            <div className="mt-8 space-y-2">
              {/* Phone */}
              <a
                href={`tel:${brandInfo.phoneRaw}`}
                className="group flex items-center justify-between rounded-2xl border border-[#FFDB94]/10 bg-[#4A1D08]/35 px-5 py-4 transition-all duration-300 hover:border-[#FFDB94]/25 hover:bg-[#4A1D08]/55"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFDB94]/15 bg-[#FFDB94]/5 text-[#FFDB94]">
                  <Phone size={17} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] text-[#FFDB94]/50">
                    اتصل بنا
                  </p>
                  <p className="mt-1 text-sm text-[#FFF7E8]">
                    {brandInfo.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center justify-between rounded-2xl border border-[#FFDB94]/10 bg-[#4A1D08]/35 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFDB94]/15 bg-[#FFDB94]/5 text-[#FFDB94]">
                  <MapPin size={17} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] text-[#FFDB94]/50">
                    موقعنا
                  </p>
                  <p className="mt-1 text-sm text-[#FFF7E8]">
                    {brandInfo.location}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={brandInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-[#FFDB94]/10 bg-[#4A1D08]/35 px-5 py-4 transition-all duration-300 hover:border-[#FFDB94]/25 hover:bg-[#4A1D08]/55"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFDB94]/15 bg-[#FFDB94]/5 text-[#FFDB94]">
                  <MessageCircle size={17} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] text-[#FFDB94]/50">
                    واتساب
                  </p>
                  <p className="mt-1 text-sm text-[#FFF7E8]">
                    تواصل معنا مباشرة
                  </p>
                </div>
              </a>
            </div>

            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button glass-button-primary mt-6 w-full text-xs sm:w-auto sm:self-end"
            >
              اطلب عبر واتساب
              <ArrowUpLeft size={16} strokeWidth={1.7} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
