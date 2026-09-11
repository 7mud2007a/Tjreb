import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { brandInfo } from "../data/chocolateData";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#632709] py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,219,148,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[9px] tracking-[0.3em] text-[#FFDB94]/60">
            MAKE IT SPECIAL
          </span>

          <h2 className="mt-5 text-3xl font-medium leading-tight text-[#FFF7E8] sm:text-4xl lg:text-5xl">
            مناسبتك تستحق
            <br />
            <span className="text-[#FFDB94]">تفصيلاً مختلفاً</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#F2DFC2]/70">
            أخبرنا بما تتخيله، ودعنا نحوله إلى تشكيلة شوكولا تليق بلحظتكم.
          </p>

          <a
            href={brandInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button glass-button-primary mt-8 text-sm"
          >
            ابدأ طلبك الآن
            <ArrowUpLeft size={16} strokeWidth={1.7} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
