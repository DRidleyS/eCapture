"use client";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MatterportEmbed from "@/components/MatterportEmbed";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Real() {
  return (
    <main className="min-h-screen text-white relative">
      <div className="fixed inset-0 -z-20">
        <Image
          src="/realspace.jpg"
          alt="real estate background"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-12 rounded-lg">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Real Estate{" "}
            </h1>
            <span
              className="text-blue-400 inline-block text-5xl md:text-7xl font-bold mb-6"
              style={{ minHeight: "2.4em" }}
            >
              <TypewriterText
                items={[
                  { text: "Virtual Tours", color: "#60a5fa" },
                  { text: "3D Showcases", color: "#60a5fa" },
                  { text: "Property Previews", color: "#60a5fa" },
                  { text: "Immersive Walkthroughs", color: "#60a5fa" },
                ]}
              />
            </span>

            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Transform property listings with immersive 3D experiences. Give
              buyers the power to explore homes virtually, from{" "}
              <span className="text-blue-400 font-semibold">
                luxury estates
              </span>{" "}
              to{" "}
              <span className="text-blue-400 font-semibold">modern condos</span>
              , all before stepping foot inside.
            </p>
            <p className="text-lg text-white/70">
              Browse our featured properties below
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Property Showcases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Property 1 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Luxury Waterfront Estate
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Experience this stunning 5-bedroom waterfront property with
                panoramic ocean views, infinity pool, and private dock.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Property 2 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Downtown Penthouse
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Explore this modern penthouse in the heart of the city,
                featuring floor-to-ceiling windows and designer finishes.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Property 3 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Countryside Villa
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Discover this charming villa nestled in rolling hills, complete
                with vineyard views and rustic elegance.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Property 4 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Modern Smart Home
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Tour this cutting-edge smart home with automated systems, solar
                panels, and contemporary design throughout.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Property 5 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Historic Brownstone
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Step into this beautifully restored brownstone blending historic
                charm with modern amenities in a prime location.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-12 rounded-lg">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">
              Ready to Showcase Your Property?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let us create stunning 3D tours that sell homes faster
            </p>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openContactForm"))
              }
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started
            </button>
          </div>
        </section>
      </AnimatedSection>
      <ContactForm />
    </main>
  );
}
