import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Comparador from "./components/Comparador";
import HowItWorks from "./components/HowItWorks";
import Pharmacies from "./components/Pharmacies";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Navbar />
      <main>
        <Hero onSearch={setSearchTerm} />
        <Features />
        <Comparador initialTerm={searchTerm} />
        <HowItWorks />
        <Pharmacies />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
