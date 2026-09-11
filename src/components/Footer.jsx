import { ArrowUpLeft, MapPin, Phone } from "lucide-react";
import { brandInfo } from "../data/chocolateData";

export default function Footer() {
  return (
    <footer className="border-t border-[#FFDB94]/10 bg-[#241006]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">

          <div className="text-right">
            <p className="text-lg font-medium text-[#FFF7E8]">
              {brandInfo.name}
            </p>

            <p className="mt-2 text-[9px] tracking-[0.25em] text-[#FFDB94]/50">
              HAUTE CHOCOLATERIE
            </p>

            <p className="mt-5 max-w-sm mr-auto text-xs leading-7 text-[#D8C8AE]/60">
              شوكولا فاخرة بتفاصيل تليق بمناسباتكم وهداياكم.
            </p>
          </div>

          <div className="text-right">
            <p className="mb-4 text-xs text-[#FFDB94]">تواصل</p>

            <a
              href={`tel:${brandInfo.phoneRaw}`}
              className="mb-3 flex items-center justify-end gap-3 text-xs text-[#D8C8AE]/70 transition hover:text-[#FFDB94]"
            >
              {brandInfo.phone}
              <Phone size={14} strokeWidth={1.5} />
            </a>

            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-end gap-3 text-xs text-[#D8C8AE]/70 transition hover:text-[#FFDB94]"
            >
              واتساب
              <ArrowUpLeft size={14} strokeWidth={1.5} />
            </a>
          </div>

          <div className="text-right">
            <p className="mb-4 text-xs text-[#FFDB94]">الموقع</p>

            <div className="flex items-start justify-end gap-3 text-xs leading-6 text-[#D8C8AE]/70">
              <span>{brandInfo.location}</span>
              <MapPin
                size={15}
                className="mt-1 shrink-0 text-[#FFDB94]/70"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <div className="my-8 soft-divider" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
          <p className="text-[10px] text-[#D8C8AE]/40">
            © {new Date().getFullYear()} {brandInfo.name}. جميع الحقوق محفوظة.
          </p>

          <a
            href="https://aboudweb.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#D8C8AE]/45 transition hover:text-[#FFDB94]"
          >
            تصميم وتطوير Aboud Web
          </a>
        </div>
      </div>
    </footer>
  );
}
