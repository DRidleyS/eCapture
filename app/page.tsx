import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
// ServiceCard and ServiceCarousel moved into client-side components
import ScrollIndicator from "@/components/ScrollIndicator";
import ContactForm from "@/components/ContactForm";
import ServicesSection from "@/components/ServicesSection";
import OpenContactButton from "@/components/OpenContactButton";
import Image from "next/image";
import SetVh from "@/components/SetVh";

export default function Home() {
  const useCases = [
    { text: "Real Estate", color: "#60a5fa" }, // blue-400
    { text: "Rental Properties", color: "#34d399" }, // emerald-400
    { text: "Commercial Operations", color: "#a78bfa" }, // violet-400
    { text: "Insurance Documentation", color: "#fbbf24" }, // amber-400
    { text: "Architecture & Construction", color: "#f87171" }, // red-400
  ];

  return (
    <div className="bg-bottom bg-no-repeat relative min-h-vh">
      <SetVh />
      <div className="fixed inset-0 -z-10">
        <Image
          src="/spacebg.jpg"
          alt="space background"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>
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
                style={{
                  backgroundImage: "url('/spacebg.jpg')",
                  backgroundSize: "180% 180%",
                  backgroundPosition: "center",
                  WebkitTextStroke: "1.2px white",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 8px rgba(255,255,255,0.95)",
                }}
              >
                Space?
              </span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contact us today for a consultation
            </p>
            <OpenContactButton className="rgb-glow px-5 py-2 rounded-lg bg-linear-to-tr from-sky-500 to-indigo-500 text-white font-semibold cta-text shadow-md hover:brightness-105 active:scale-[0.995] transition">
              Get Started
            </OpenContactButton>
          </div>
        </AnimatedSection>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mt-24 mb-12">
            Services
          </h2>

          {/* Desktop-only scroll indicator */}
          <ScrollIndicator />

          <div id="about" />
          <div className="flex flex-col items-center gap-6 md:w-full">
            <ServicesSection />
          </div>
        </div>

        {/* About Elim Section */}
        <AnimatedSection className="max-w-5xl mx-auto mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center relative">
                <Image
                  src="/Elim.JPG"
                  alt="Elim with Camera"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                  className="object-cover rounded-lg"
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
                  <OpenContactButton className="rgb-glow inline-block px-5 py-2 rounded-lg bg-linear-to-tr from-sky-500 to-indigo-500 text-white font-semibold cta-text shadow-md hover:brightness-105 active:scale-[0.995] transition">
                    Book Now
                  </OpenContactButton>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <ContactForm />
    </div>
  );
}

// Service list helper removed — replaced by `ServicesSection` client component
