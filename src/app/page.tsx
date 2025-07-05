"use client";
import HowItWorks from "./_components/HowItWorks";
import Hero from "./_components/Hero";
import Footer from "@/components/ui/Footer";
import AboutUs from "./_components/AboutUs";

export default function MechanicsMatch() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Hero />

      <HowItWorks />

      <AboutUs />
      
      <Footer />
    </div>
  );
}
