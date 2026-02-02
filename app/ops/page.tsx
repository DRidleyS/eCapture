"use client";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MatterportEmbed from "@/components/MatterportEmbed";
import ContactForm from "@/components/ContactForm";
import OpenContactButton from "@/components/OpenContactButton";
import Image from "next/image";

export default function Ops() {
  return (
    <main className="min-h-screen text-white relative">
      <div className="fixed inset-0 -z-20">
        <Image
          src="/opsspace.jpg"
          alt="operations background"
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
              Commercial Operations{" "}
            </h1>
            <span
              className="text-violet-400 inline-block text-5xl md:text-7xl font-bold mb-6"
              style={{ minHeight: "2.4em" }}
            >
              <TypewriterText
                items={[
                  { text: "Facility Management", color: "#a78bfa" },
                  { text: "Space Planning", color: "#a78bfa" },
                  { text: "Asset Tracking", color: "#a78bfa" },
                  { text: "Operational Insights", color: "#a78bfa" },
                ]}
              />
            </span>

            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Optimize commercial operations with digital twin technology.
              Manage{" "}
              <span className="text-violet-400 font-semibold">warehouses</span>,{" "}
              <span className="text-violet-400 font-semibold">factories</span>,
              and{" "}
              <span className="text-violet-400 font-semibold">
                office spaces
              </span>{" "}
              with precision and efficiency.
            </p>
            <p className="text-lg text-white/70">
              Explore commercial applications below
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Commercial Showcases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Case 1 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-violet-400">
                Distribution Warehouse
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Complete 3D scan of 200,000 sq ft warehouse for inventory
                management, layout optimization, and safety planning.
              </p>
              <MatterportEmbed modelId="5Xz3ZrGKsMm" />
            </div>
          </AnimatedSection>

          {/* Case 2 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-violet-400">
                Manufacturing Plant
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Digital documentation of production floor for workflow analysis,
                equipment placement, and facility upgrades.
              </p>
              <MatterportEmbed modelId="5Xz3ZrGKsMm" />
            </div>
          </AnimatedSection>

          {/* Case 3 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-violet-400">
                Corporate Office Space
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Multi-floor office capture for space planning, lease
                documentation, and remote facility management.
              </p>
              <MatterportEmbed modelId="5Xz3ZrGKsMm" />
            </div>
          </AnimatedSection>

          {/* Case 4 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-violet-400">
                Retail Store Network
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Standardized 3D documentation across multiple retail locations
                for merchandising, compliance, and training.
              </p>
              <MatterportEmbed modelId="5Xz3ZrGKsMm" />
            </div>
          </AnimatedSection>

          {/* Case 5 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-violet-400">
                Data Center Facility
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Precise as-built documentation of data center infrastructure for
                capacity planning and maintenance operations.
              </p>
              <MatterportEmbed modelId="5Xz3ZrGKsMm" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-12 rounded-lg">
            <h2 className="text-4xl font-bold mb-6 text-violet-400">
              Streamline Your Operations
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Digital twins and 3D documentation for smarter facility management
            </p>
            <OpenContactButton className="rgb-glow px-5 py-2 rounded-lg bg-linear-to-tr from-violet-500 to-fuchsia-500 text-white font-semibold cta-text shadow-md hover:brightness-105 active:scale-[0.995] transition">
              Get Started
            </OpenContactButton>
          </div>
        </section>
      </AnimatedSection>
      <ContactForm />
    </main>
  );
}
