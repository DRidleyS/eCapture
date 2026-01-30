"use client";

import React, { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import ServiceCard from "@/components/ServiceCard";
import ServiceCarousel from "@/components/ServiceCarousel";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setShowScrollIndicator(false);
      else setShowScrollIndicator(true);
    };
    // run once to initialize
    if (typeof window !== "undefined") onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <div className="max-w-4xl mx-auto text-center mb-16 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg min-h-[470px] md:min-h-[235px] flex flex-col justify-between">
          <h1 className="text-5xl font-bold text-white mb-6">
            Immersive 3D Virtual Tours for{" "}
            <TypewriterText items={useCases} pauseOnInvisible={true} />
          </h1>
          <p className="text-xl text-white/80">
            Professional Matterport scanning services bringing spaces to life in
            stunning 3D
          </p>
        </div>

        {/* CTA Section */}
        <AnimatedSection className="max-w-4xl mx-auto text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 shadow-lg">
            <h2 className="text-3xl font-semibold text-white mb-4 ">
              Ready to Showcase Your{" "}
              <span
                className="font-extrabold bg-center bg-no-repeat bg-cover bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: "url('/spacebg.jpg')" }}
              >
                Space?
              </span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contact us today for a consultation
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Get Started
            </button>
          </div>
        </AnimatedSection>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mt-24 mb-12">
            Services
          </h2>

          {/* Desktop-only scroll indicator */}
          <div className={`hidden lg:flex justify-center mt-8 transition-opacity duration-500 ${showScrollIndicator ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <a
              href="#about"
              className="text-white/80 hover:text-white"
              aria-label="Scroll to about section"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white/70 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          <div id="about" />
          {/* hide scroll indicator once user scrolls */}
          <script dangerouslySetInnerHTML={{__html: `window.addEventListener('load', function(){const el=document.documentElement;});`}} />
          <div className="flex flex-col items-center gap-6 md:w-full">
            {/* Build services list and render a carousel on desktop, stacked on mobile */}
            {/* Services data */}
            {/** We'll prepare the same descriptions as JSX so they can be reused */}
            <ServiceListHelper />
          </div>
        </div>

        {/* About Elim Section */}
        <AnimatedSection className="max-w-5xl mx-auto mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <img
                  src="/Elim.JPG"
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
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
}

function ServiceListHelper() {
  const services = [
    {
      title: "Real Estate",
      color: "#60a5fa",
      modelId: "8CzZPMoH7vp",
      link: "/real",
      description: (
        <p>
          <span className="text-blue-400">Sell homes faster</span> with
          immersive 3D tours. Buyers can explore every room, get a feel for the
          space, and schedule showings with confidence. Virtual tours{" "}
          <span className="text-blue-400">increase engagement</span> and help
          properties <span className="text-blue-400">stand out</span> in the
          famously competitive LA market.{" "}
          <a href="/real" className="underline">
            See more.
          </a>
        </p>
      ),
    },
    {
      title: "Rental Properties",
      color: "#34d399",
      modelId: "8CzZPMoH7vp",
      link: "/rentals",
      description: (
        <p>
          <span className="text-emerald-400">Transform rental listings</span>{" "}
          with interactive 3D tours that blow static photos out of the water.{" "}
          <span className="text-emerald-400">Reduce unnecessary showings</span>,
          attract quality tenants, and let prospects explore properties
          <span className="text-emerald-400"> 24/7 from anywhere</span>. Perfect
          for landlords and property management companies in LA.{" "}
          <a href="/rentals" className="underline">
            See more.
          </a>
        </p>
      ),
    },
    {
      title: "Insurance Documentation",
      color: "#fbbf24",
      modelId: "V6mB85vLEb4",
      link: "/insurance",
      description: (
        <p>
          <span className="text-amber-400">Comprehensive property records</span>
          for claims and pre/post-loss documentation. Capture
          <span className="text-amber-400"> every detail</span> of a property's
          condition with{" "}
          <span className="text-amber-400">timestamped 3D scans</span>.
          Essential for insurance adjusters, homeowners, and property managers.
          <a href="/insurance" className="underline">
            See more.
          </a>
        </p>
      ),
    },
    {
      title: "Commercial & Industrial Facility Management",
      color: "#a78bfa",
      modelId: "5Xz3ZrGKsMm",
      link: "/ops",
      description: (
        <p>
          Create <span className="text-violet-400">digital twins</span> of
          warehouses, factories, and commercial spaces.{" "}
          <span className="text-violet-400">Streamline maintenance</span>, plan
          renovations, and train staff with accurate 3D models. Perfect for
          <span className="text-violet-400"> facility managers</span> who need
          detailed documentation of complex spaces.{" "}
          <a href="/ops" className="underline">
            See more.
          </a>
        </p>
      ),
    },
    {
      title: "Architecture, Engineering & Construction",
      color: "#ef4444",
      modelId: "1mwDw6T2bEA",
      link: "/aec",
      description: (
        <p>
          <span className="text-red-400">Document construction progress</span>,
          capture as-built conditions, and collaborate with teams remotely. 3D
          scans provide{" "}
          <span className="text-red-400">accurate spatial data</span>
          for architects and engineers,{" "}
          <span className="text-red-400">
            streamlining project management
          </span>{" "}
          and reducing costly site visits.
          <a href="/aec" className="underline">
            See more.
          </a>
        </p>
      ),
    },
  ];

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isDesktop) {
    return <ServiceCarousel items={services} />;
  }

  return (
    <>
      {services.map((s) => (
        <AnimatedSection key={s.title}>
          <ServiceCard
            title={s.title}
            color={s.color}
            modelId={s.modelId}
            link={s.link}
            description={s.description}
          />
        </AnimatedSection>
      ))}
    </>
  );
}
