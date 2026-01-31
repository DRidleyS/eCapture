import React from "react";
import NavBarClient from "@/components/NavBarClient";

const AnimatedLink = ({
  href,
  children,
  hoverColor,
}: {
  href: string;
  children: string;
  hoverColor?: string;
}) => {
  const letters = children.split("");

  return (
    <a
      href={href}
      className="group text-white/80 transition-colors inline-flex overflow-hidden hover:text-[var(--hover-color)]"
      style={
        hoverColor
          ? { ["--hover-color" as any]: hoverColor, height: "1.2em" }
          : { height: "1.2em" }
      }
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-flex flex-col transition-transform duration-300 group-hover:-translate-y-[125%]"
          style={{ transitionDelay: `${index * 0.05}s` }}
        >
          <span className="block">{letter === " " ? "\u00A0" : letter}</span>
          <span className="block">{letter === " " ? "\u00A0" : letter}</span>
        </span>
      ))}
    </a>
  );
};

const NavBar = () => {
  return (
    <>
      <nav className="bg-white/10 backdrop-blur-md shadow-lg relative z-[100002]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                href="/"
                className="group text-xl font-bold text-white hover:text-blue-300 transition-all duration-300 inline-flex overflow-hidden"
                style={{ height: "1.5em" }}
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-full">
                  <div className="block">eCapture</div>
                  <div className="block">Home</div>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <AnimatedLink href="/real" hoverColor="#60a5fa">
                Real Estate
              </AnimatedLink>
              <AnimatedLink href="/rentals" hoverColor="#34d399">
                Rental Listings
              </AnimatedLink>
              <AnimatedLink href="/insurance" hoverColor="#fbbf24">
                Insurance Work
              </AnimatedLink>
              <AnimatedLink href="/ops" hoverColor="#a78bfa">
                ComOps
              </AnimatedLink>
              <AnimatedLink href="/aec" hoverColor="#ef4444">
                AEC
              </AnimatedLink>
            </div>

            {/* Mobile: client-only interactive piece mounts here */}
            <div className="md:hidden">
              <NavBarClient />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
