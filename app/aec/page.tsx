"use client";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MatterportEmbed from "@/components/MatterportEmbed";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function AEC() {
  return (
    <main className="min-h-screen text-white relative">
      <div className="fixed inset-0 -z-20">
        <Image
          src="/aecspace.jpg"
          alt="aec background"
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
              AEC Services{" "}
              <span
                className="text-red-400 inline-block"
                style={{ minHeight: "2.4em" }}
              >
                <TypewriterText
                  items={[
                    { text: "As-Built Documentation", color: "#ef4444" },
                    { text: "Construction Progress", color: "#ef4444" },
                    { text: "BIM Integration", color: "#ef4444" },
                    { text: "Site Analysis", color: "#ef4444" },
                  ]}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Transform AEC workflows with reality capture. Document{" "}
              <span className="text-red-400 font-semibold">
                construction sites
              </span>
              ,{" "}
              <span className="text-red-400 font-semibold">
                renovation projects
              </span>
              , and{" "}
              <span className="text-red-400 font-semibold">
                existing conditions
              </span>{" "}
              with millimeter accuracy.
            </p>
            <p className="text-lg text-white/70">View project examples below</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Project Showcases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Project 1 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-red-400">
                High-Rise Construction
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Weekly progress documentation of 40-story commercial tower for
                stakeholder updates and quality control.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Project 2 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-red-400">
                Historic Renovation
              </h2>
              <p className="text-lg text-white/80 mb-6">
                As-built capture of 100-year-old building for restoration
                planning, code compliance, and preservation records.
              </p>
              <MatterportEmbed modelId="1mwDw6T2bEA" /> // Water damage (AEC)
            </div>
          </AnimatedSection>

          {/* Project 3 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-red-400">
                MEP Coordination
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Detailed scan of mechanical, electrical, and plumbing systems
                for clash detection and BIM model verification.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Project 4 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-red-400">
                Infrastructure Project
              </h2>
              <p className="text-lg text-white/80 mb-6">
                3D documentation of bridge structure for engineering analysis,
                maintenance planning, and structural monitoring.
              </p>
              <MatterportEmbed modelId="8CzZPMoH7vp" />
            </div>
          </AnimatedSection>

          {/* Project 5 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-red-400">
                Site Development
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Pre-construction site scan for topography mapping, grading
                plans, and environmental impact assessment.
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
            <h2 className="text-4xl font-bold mb-6 text-red-400">
              Elevate Your AEC Projects
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Professional reality capture for the built environment
            </p>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openContactForm"))
              }
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
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
