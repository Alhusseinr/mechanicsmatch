"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useRouter } from "next/navigation";
import TrustPilotReviews from "@/components/ui/TrustPilotReviews";
import AboutUs from "@/components/ui/AboutUs";
import NavBar from "@/components/ui/NavBar";
import HowItWorks from "@/components/ui/HowItWorks";
import TrustedMechanicsList from "@/components/ui/TrustedMechanicsList";
import FadeIn from "@/components/ui/FadeIn";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";



export default function MechanicsMatch() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <Hero />

      <HowItWorks />

      {/* not yet until we have shops onboarded */}
      {/* <TrustedMechanicsList /> */}

      <AboutUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
