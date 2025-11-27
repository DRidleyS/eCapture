"use client";

import React from "react";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  const useCases = [
    { text: "Real Estate", color: "#60a5fa" }, // blue-400
    { text: "Rental Properties", color: "#34d399" }, // emerald-400
    { text: "Commercial Operations", color: "#a78bfa" }, // violet-400
    { text: "Insurance Documentation", color: "#fbbf24" }, // amber-400
    { text: "Architecture & Construction", color: "#f87171" }, // red-400
  ];

  return (
    <div
      className="min-h-screen bg-bottom bg-no-repeat"
      style={{
        backgroundImage: "url(/spacebg.jpg)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-100">
        <div className="max-w-4xl mx-auto text-center mb-16 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h1 className="text-5xl font-bold text-white mb-6">
            Immersive 3D Virtual Tours for{" "}
            <TypewriterText items={useCases} pauseOnInvisible={true} />
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Professional Matterport scanning services bringing spaces to life in
            stunning 3D
          </p>
        </div>

        {/* About Elim Section */}
        <AnimatedSection className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <img
                  src="/elim.png"
                  alt="Elim with Camera"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl mb-4 text-white font-semibold">
                  Meet Elim
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-28">
                  As a{" "}
                  <span className="text-blue-400">passionate entrepreneur</span>{" "}
                  in Los Angeles, Elim brings energy and expertise to every
                  project. With his
                  <span className="text-amber-400">
                    {" "}
                    state-of-the-art Matterport camera
                  </span>{" "}
                  and keen eye for detail, he captures spaces in{" "}
                  <span className="text-emerald-400">stunning 3D</span> that
                  help businesses showcase their properties like never before.
                  His commitment to{" "}
                  <span className="text-red-400">
                    quality and client satisfaction
                  </span>{" "}
                  has made him a trusted partner for real estate agents,
                  architects, and business owners across LA.
                </p>
                <div className="mt-6 bg-white/20 backdrop-blur-md border-l-4 border-blue-400 p-4 rounded text-center">
                  <p className="text-white text-sm mb-3">
                    Ready to capture your space in stunning 3D?
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Our Services
          </h2>

          {/* Real Estate */}
          <AnimatedSection className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Real Estate
              </h3>
              <p className="text-white/80 text-lg mb-6">
                <span className="text-blue-400">Sell homes faster</span> with
                immersive 3D tours. Buyers can explore every room, get a feel
                for the space, and schedule showings with confidence. Virtual
                tours <span className="text-blue-400">increase engagement</span>{" "}
                and help properties{" "}
                <span className="text-blue-400">stand out</span> in the famously
                competitive LA market.{" "}
                <a href="/real" className="underline">
                  Learn more.
                </a>
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{ height: "480px" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://my.matterport.com/show/?m=8CzZPMoH7vp"
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>

          {/* Rentals */}
          <AnimatedSection className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Rental Properties
              </h3>
              <p className="text-white/80 text-lg mb-6">
                <span className="text-emerald-400">
                  Transform rental listings
                </span>{" "}
                with interactive 3D tours that blow static photos out of the
                water.{" "}
                <span className="text-emerald-400">
                  Reduce unnecessary showings
                </span>
                , attract quality tenants, and let prospects explore properties
                <span className="text-emerald-400"> 24/7 from anywhere</span>.
                Perfect for landlords and property management companies in LA.{" "}
                <a href="/rentals" className="underline">
                  Learn More.
                </a>
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{ height: "480px" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://my.matterport.com/show/?m=8CzZPMoH7vp"
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>

          {/* Insurance */}
          <AnimatedSection className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Insurance Documentation
              </h3>
              <p className="text-white/80 text-lg mb-6">
                <span className="text-amber-400">
                  Comprehensive property documentation
                </span>{" "}
                for claims and pre-loss records. Capture{" "}
                <span className="text-amber-400">every detail</span> of a
                property's condition with
                <span className="text-amber-400"> timestamped 3D scans</span>.
                Essential for insurance adjusters, homeowners, and property
                managers protecting their investments.{" "}
                <a href="/insurance" className="underline">
                  Learn More.
                </a>
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{ height: "480px" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://my.matterport.com/show/?m=8CzZPMoH7vp"
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>

          {/* AEC */}
          <AnimatedSection className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Architecture, Engineering & Construction
              </h3>
              <p className="text-white/80 text-lg mb-6">
                <span className="text-red-400">
                  Document construction progress
                </span>
                , capture as-built conditions, and collaborate with teams
                remotely. 3D scans provide{" "}
                <span className="text-red-400">accurate spatial data</span> for
                architects and engineers,{" "}
                <span className="text-red-400">
                  streamlining project management
                </span>{" "}
                and reducing costly site visits.{" "}
                <a href="/aec" className="underline">
                  Learn More.
                </a>
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{ height: "480px" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://my.matterport.com/show/?m=8CzZPMoH7vp"
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>

          {/* Operations/Facility Management */}
          <AnimatedSection className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Commercial & Industrial Facility Management
              </h3>
              <p className="text-white/80 text-lg mb-6">
                Create <span className="text-violet-400">digital twins</span> of
                warehouses, factories, and commercial spaces.{" "}
                <span className="text-violet-400">Streamline maintenance</span>,
                plan renovations, and train staff with accurate 3D models.
                Perfect for{" "}
                <span className="text-violet-400">facility managers</span> who
                need detailed documentation of complex spaces.{" "}
                <a href="/ops" className="underline">
                  Learn More.
                </a>
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{ height: "480px" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://my.matterport.com/show/?m=8CzZPMoH7vp"
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA Section */}
        <AnimatedSection className="max-w-4xl mx-auto text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 shadow-lg">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Ready to Showcase Your Space?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contact us today for a consultation
            </p>
            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Get Started
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
