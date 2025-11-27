"use client";

import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MatterportEmbed from "@/components/MatterportEmbed";

export default function Ops() {
  return (
    <main
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url('/opsspace.jpg')",
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
              Commercial Operations{" "}
              <span
                className="text-violet-400 inline-block"
                style={{ minHeight: "2.4em", minWidth: "600px" }}
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
            </h1>
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
              <MatterportEmbed modelId="8CzZPMoH7vp" />
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
              <MatterportEmbed modelId="8CzZPMoH7vp" />
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
              <MatterportEmbed modelId="8CzZPMoH7vp" />
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
              <MatterportEmbed modelId="8CzZPMoH7vp" />
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
              <MatterportEmbed modelId="8CzZPMoH7vp" />
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
            <a
              href="/contact"
              className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started
            </a>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
