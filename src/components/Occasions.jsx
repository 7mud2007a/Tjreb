import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";

const occasions = [
  {
    number: "01",
    title: "الأفراح",
    text: "تفاصيل شوكولا تليق بيومكم الكبير وتكمل جمال المناسبة.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "الهدايا",
    text: "هدية بسيطة، لكن بتفاصيل استثنائية تبقى في الذاكرة.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "أعياد الميلاد",
    text: "احتفال بطعم مختلف مع تفاصيل شوكولا تضيف فرحاً للحظة.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "04",
    title: "المناسبات الخاصة",
    text: "لأن بعض اللحظات لا تتكرر، تستحق تفاصيل مصممة لها.",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Occasions() {
  return (
    <section
      id="occasions"
      className="section-space overflow-hidden bg-[#632709]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-12 text-right"
        >
          <div className="mb-4 flex items-center justify-end gap-3">
            <span className="h-px w-8 bg-[#FFDB94]/40" />

            <span className="text-[10px] tracking-[0.2em] text-[#FFDB94]/65">
              FOR EVERY MOMENT
            </span>
          </div>

          <h2 className="text-3xl font-medium leading-tight text-[#FFF7E8] sm:text-4xl lg:text-5xl">
            لكل مناسبة...
            <br />
            <span className="text-[#FFDB94]">قطعة تستحقها</span>
          </h2>
        </motion.div>

        <div className="space-y-20 lg:space-y-28">
          {occasions.map((occasion, index) => {
            const reversed = index % 2 !== 0;

            return (
              <motion.article
                key={occasion.number}
                initial={{
                  opacity: 0,
                  x: reversed ? -70 : 70,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="cinematic-image relative overflow-hidden rounded-[26px] border border-[#FFDB94]/10">
                  <div className="aspect-[16/10]">
                    <img
                      src={occasion.image}
                      alt={occasion.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#241006]/60 via-transparent to-transparent" />

                  <span className="absolute bottom-5 right-5 text-xs tracking-[0.2em] text-[#FFDB94]/60">
                    {occasion.number}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`text-right ${
                    reversed ? "lg:[direction:ltr]" : ""
                  }`}
                >
                  <div className="mb-5 flex items-center justify-end gap-3">
                    <span className="text-[10px] tracking-[0.2em] text-[#FFDB94]/45">
                      GHRAOUI
                    </span>

                    <span className="h-px w-10 bg-[#FFDB94]/25" />
                  </div>

                  <h3 className="text-3xl font-medium text-[#FFF7E8] sm:text-4xl">
                    {occasion.title}
                  </h3>

                  <p className="mt-5 max-w-md mr-auto text-sm leading-8 text-[#D8C8AE]/75">
                    {occasion.text}
                  </p>

                  <a
                    href="#contact"
                    className="glass-button mt-7 text-xs"
                  >
                    اكتشف التفاصيل
                    <ArrowUpLeft size={15} strokeWidth={1.7} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
