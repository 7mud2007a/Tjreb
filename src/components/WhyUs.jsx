import { motion } from "framer-motion";
import { Sparkles, Gem, Heart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "صناعة بعناية",
    text: "كل تفصيل يُحضّر باهتمام ليصل إليكم بأجمل صورة.",
  },
  {
    icon: Gem,
    title: "جودة مختارة",
    text: "نختار مكوناتنا بعناية لنحافظ على مذاق يليق بغراوي.",
  },
  {
    icon: Heart,
    title: "تفاصيل خاصة",
    text: "نحوّل فكرتكم إلى تشكيلة تحمل طابع مناسبتكم.",
  },
  {
    icon: ShieldCheck,
    title: "ثقة تستمر",
    text: "نهتم بالتفاصيل من أول طلب حتى آخر قطعة.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="section-space relative overflow-hidden bg-[#632709]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl text-right"
        >
          <div className="mb-4 flex items-center justify-end gap-3">
            <span className="h-px w-8 bg-[#FFDB94]/40" />
            <span className="text-[10px] tracking-[0.2em] text-[#FFDB94]/70">
              OUR STORY
            </span>
          </div>

          <h2 className="text-3xl font-medium leading-tight text-[#FFF7E8] sm:text-4xl lg:text-5xl">
            الحكاية تبدأ
            <br />
            <span className="text-[#FFDB94]">من قطعة شوكولا</span>
          </h2>

          <p className="mt-6 text-sm leading-8 text-[#F2DFC2]/75 sm:text-base">
            في شوكولا غراوي، نؤمن أن الشوكولا ليست مجرد مذاق،
            بل تفصيل صغير يصنع فرقاً كبيراً.
            نصمم تشكيلاتنا بعناية لتناسب أفراحكم، هداياكم ومناسباتكم الخاصة.
          </p>
        </motion.div>

        {/* Editorial Content */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="order-2 lg:order-1"
          >
            <div className="cinematic-image relative aspect-[4/3] overflow-hidden rounded-[26px] border border-[#FFDB94]/15">
              <img
                src="https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1400&q=90"
                alt="شوكولا فاخرة"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#241006]/55 to-transparent" />

              <div className="absolute bottom-5 left-5">
                <div className="glass-strong rounded-xl px-4 py-3">
                  <p className="text-[9px] tracking-[0.2em] text-[#FFDB94]/60">
                    GHRAOUI
                  </p>
                  <p className="mt-1 text-xs text-[#FFF7E8]">
                    منذ البداية... نهتم بالتفاصيل
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="order-1 grid gap-3 sm:grid-cols-2 lg:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? 35 : -35,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group rounded-2xl border border-[#FFDB94]/10 bg-[#3F1907]/45 p-5 transition-all duration-500 hover:border-[#FFDB94]/25 hover:bg-[#4A1D08]/60"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFDB94]/15 bg-[#FFDB94]/5 text-[#FFDB94]">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>

                    <span className="text-[10px] text-[#FFDB94]/25">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-[#FFF7E8]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[#D8C8AE]/70">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
