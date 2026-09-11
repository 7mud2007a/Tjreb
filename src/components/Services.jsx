import { motion } from "framer-motion";
import {
  Gift,
  Heart,
  Cake,
  Sparkles,
  Package,
  UtensilsCrossed,
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "تشكيلات فاخرة",
    text: "شوكولا مختارة بتنسيقات أنيقة.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Gift,
    title: "هدايا خاصة",
    text: "هدية بتفاصيل مصممة لمن تهديهم.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Heart,
    title: "توزيعات المناسبات",
    text: "توزيعات أنيقة للأفراح والمناسبات.",
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Cake,
    title: "أعياد الميلاد",
    text: "لمسات شوكولا تضيف فرحاً للتفاصيل.",
    image:
      "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Package,
    title: "طلبات خاصة",
    text: "ننفذ أفكاركم بتنسيق يخصكم.",
    image:
      "https://images.unsplash.com/photo-1548907040-4d42bfc2a2f8?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: UtensilsCrossed,
    title: "ضيافة المناسبات",
    text: "تشكيلات مميزة لضيوفكم.",
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-space relative overflow-hidden bg-[#241006]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-right"
        >
          <div className="mb-4 flex items-center justify-end gap-3">
            <span className="h-px w-8 bg-[#FFDB94]/40" />

            <span className="text-[10px] tracking-[0.2em] text-[#FFDB94]/65">
              OUR SERVICES
            </span>
          </div>

          <h2 className="text-3xl font-medium text-[#FFF7E8] sm:text-4xl lg:text-5xl">
            نصنعها
            <span className="text-[#FFDB94]"> كما تتخيلها</span>
          </h2>

          <p className="mt-4 max-w-xl mr-auto text-sm leading-7 text-[#D8C8AE]/70">
            من التشكيلات الفاخرة إلى التفاصيل المصممة خصيصاً لمناسبتكم.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  x: index % 2 === 0 ? 25 : -25,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-[#FFDB94]/10 bg-[#3A1607]/45"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#241006] via-[#241006]/15 to-transparent" />

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFDB94]/20 bg-[#241006]/45 text-[#FFDB94] backdrop-blur-md">
                    <Icon size={17} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="px-5 pb-5 pt-4 text-right">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-medium text-[#FFF7E8]">
                        {service.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-6 text-[#D8C8AE]/65">
                        {service.text}
                      </p>
                    </div>

                    <span className="pt-0.5 text-[9px] text-[#FFDB94]/25">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
