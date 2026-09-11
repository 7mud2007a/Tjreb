import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

const latitude = 34.7356765;
const longitude = 36.7004976;

const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

export default function Location() {
  return (
    <section className="bg-[#241006] pb-24 pt-8 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="flex flex-col justify-between rounded-[24px] border border-[#FFDB94]/10 bg-[#3A1607]/45 p-6 text-right sm:p-8"
          >
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFDB94]/15 bg-[#FFDB94]/5 text-[#FFDB94]">
                <MapPin size={19} strokeWidth={1.5} />
              </div>

              <p className="text-[9px] tracking-[0.2em] text-[#FFDB94]/55">
                FIND US
              </p>

              <h2 className="mt-3 text-2xl font-medium text-[#FFF7E8]">
                زورونا في حمص
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#D8C8AE]/70">
                شارع الغوطة بجانب دوار الغاردينيا
                <br />
                حمص – سوريا
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button mt-8 w-full text-xs"
            >
              فتح الموقع على الخريطة
              <ExternalLink size={15} strokeWidth={1.5} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden rounded-[24px] border border-[#FFDB94]/10 bg-[#3A1607]"
          >
            <iframe
              title="موقع شوكولا غراوي"
              src={mapUrl}
              className="h-[340px] w-full border-0 sm:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
