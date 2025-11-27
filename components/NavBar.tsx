"use client";

import React from "react";

const AnimatedLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const letters = children.split("");

  return (
    <a
      href={href}
      className="text-white/80 hover:text-white transition-colors inline-flex overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ height: "1.2em" }}
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-flex flex-col transition-transform duration-300"
          style={{
            transitionDelay: isHovered ? `${index * 0.05}s` : "0s",
            transform: isHovered ? "translateY(-125%)" : "translateY(0)",
          }}
        >
          <span className="block">{letter === " " ? "\u00A0" : letter}</span>
          <span className="block">{letter === " " ? "\u00A0" : letter}</span>
        </span>
      ))}
    </a>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="bg-white/10 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                href="/"
                className="text-xl font-bold text-white hover:text-blue-300 transition-colors"
              >
                eCapture
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <AnimatedLink href="/real">Real Estate</AnimatedLink>
              <AnimatedLink href="/rentals">Rental Listings</AnimatedLink>
              <AnimatedLink href="/insurance">Insurance Work</AnimatedLink>
              <AnimatedLink href="/ops">ComOps</AnimatedLink>
              <AnimatedLink href="/aec">AEC</AnimatedLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center text-white"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white/10 backdrop-blur-md z-5000">
          <div className="flex justify-between items-center p-4 border-b border-white/20">
            <span className="text-xl font-bold text-white">eCapture</span>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a
              href="/real"
              className="text-2xl text-white hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Real Estate
            </a>
            <a
              href="/rentals"
              className="text-2xl text-white hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Rental Listings
            </a>
            <a
              href="/ops"
              className="text-2xl text-white hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              ComOps
            </a>
            <a
              href="/insurance"
              className="text-2xl text-white hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Insurance Work
            </a>
            <a
              href="/aec"
              className="text-2xl text-white hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              AEC
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
