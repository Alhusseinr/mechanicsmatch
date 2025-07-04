'use client';

import { useState } from "react";
import Search from "../../components/ui/Search";



export default function Hero() {

  return (
    <section className="relative">
      <div className="relative isolate px-4 lg:pt-8 sm:pt-7 sm:px-6 lg:px-8">
        {/* Background decoration - top */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-4xl py-10 lg:py-10">
          <div className="hero-text-container">
            {/* Heading */}
            <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight sm:leading-tight lg:leading-tight mb-0">
              Find Trusted Mechanics
              <br className="hidden sm:inline" /> Near You
            </h1>

            {/* Subheading */}
            <p className="text-center mt-6 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl max-w-2xl mx-auto text-balance px-4 sm:px-0">
              Built for performance shops, tuners and general repair. Connect
              with verified professionals in your area.
            </p>

            {/* Search Section */}
            <Search />
          </div>
        </div>

        {/* Background decoration - bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </section>
  );
}
