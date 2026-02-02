"use client";

import React, { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import ServiceCard from "./ServiceCard";
import ServiceCarousel from "./ServiceCarousel";

export default function ServicesSection() {
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
          <a href="/real" className="underline cta-interactive inline-block">
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
          attract quality tenants, and let prospects explore properties{" "}
          <span className="text-emerald-400">24/7 from anywhere</span>.{" "}
          <a href="/rentals" className="underline cta-interactive inline-block">
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
          for claims and pre/post-loss documentation. Capture{" "}
          <span className="text-amber-400">every detail</span> of a property's
          condition with{" "}
          <span className="text-amber-400">timestamped 3D scans</span>.
          Essential for insurance adjusters, homeowners, and property managers.{" "}
          <a
            href="/insurance"
            className="underline cta-interactive inline-block"
          >
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
          renovations, and train staff with accurate 3D models. Perfect for{" "}
          <span className="text-violet-400">facility managers</span> who need
          detailed documentation of complex spaces.{" "}
          <a href="/ops" className="underline cta-interactive inline-block">
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
          and reducing costly site visits.{" "}
          <a href="/aec" className="underline cta-interactive inline-block">
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

  if (isDesktop) return <ServiceCarousel items={services} />;

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
