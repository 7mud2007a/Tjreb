import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import Occasions from "./components/Occasions";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Location from "./components/Location";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#241006] text-[#FFF7E8]">
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

export default App;
