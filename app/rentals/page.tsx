"use client";

import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MatterportEmbed from "@/components/MatterportEmbed";

export default function Rentals() {
  return (
    <main
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url('/rentalspace.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-12 rounded-lg">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Rental Listings{" "}
              <span
                className="text-emerald-400 inline-block"
                style={{ minHeight: "2.4em", minWidth: "600px" }}
              >
                <TypewriterText
                  items={[
                    { text: "Virtual Showings", color: "#34d399" },
                    { text: "Interactive Tours", color: "#34d399" },
                    { text: "Remote Viewing", color: "#34d399" },
                    { text: "Digital Walkthroughs", color: "#34d399" },
                  ]}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Streamline your rental process with immersive 3D tours. Allow
              tenants to explore{" "}
              <span className="text-emerald-400 font-semibold">apartments</span>
              , <span className="text-emerald-400 font-semibold">condos</span>,
              and <span className="text-emerald-400 font-semibold">homes</span>{" "}
              from anywhere in the world.
            </p>
            <p className="text-lg text-white/70">
              Explore available rentals below
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Rental Showcases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Rental 1 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-emerald-400">
                Downtown Loft Apartment
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Modern 2-bedroom loft in the city center with exposed brick,
                high ceilings, and rooftop access.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Rental 2 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-emerald-400">
                Suburban Family Home
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Spacious 4-bedroom home with large backyard, updated kitchen,
                and quiet neighborhood setting.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Rental 3 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-emerald-400">
                Beachside Condo
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Fully furnished 1-bedroom condo with ocean views, resort
                amenities, and steps from the beach.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Rental 4 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-emerald-400">
                Studio in Arts District
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Charming studio apartment in vibrant arts district with hardwood
                floors and natural light.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Rental 5 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-emerald-400">
                Luxury High-Rise Unit
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Upscale 3-bedroom unit on top floor with skyline views,
                concierge service, and premium finishes.
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
            <h2 className="text-4xl font-bold mb-6 text-emerald-400">
              List Your Rental Property
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Stand out from the competition with 3D virtual tours
            </p>
            <a
              href="/contact"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started
            </a>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
