import React from 'react';
import { MapPin } from 'lucide-react';
import { brandInfo } from '../data/chocolateData';

export default function Location() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1A0F0B] to-[#23120B] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-right">
              <div className="inline-flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                <MapPin className="w-5 h-5" />
                <span>موقعنا في حمص</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6EE] font-arabic">
                تفضلوا بزيارتنا لتجربة تذوق مباشرة
              </h3>
              <p className="text-[#FAF6EE]/70 text-sm">
                {brandInfo.location}
              </p>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-inner">
            <iframe
              title="موقع شوكولا غراوي - حمص شارع الغوطة"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.432123!2d36.713!3d34.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQzJzgwLjAiTiAzNsKwNDInNDYuOCJF!5e0!3m2!1sar!2s!4v1620000000000!5m2!1sar!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
