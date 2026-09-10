import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Occasions from './components/Occasions';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Location from './components/Location';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#1A0F0B] text-[#FAF6EE] font-arabic selection:bg-[#D4AF37] selection:text-[#1A0F0B]">
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Occasions />
        <Gallery />
        <Contact />
        <Location />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
