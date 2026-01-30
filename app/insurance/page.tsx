"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MatterportEmbed from "@/components/MatterportEmbed";
import ContactForm from "@/components/ContactForm";

export default function Insurance() {
  const [showContactForm, setShowContactForm] = useState(false);
  return (
    <main
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url('/insurancespace.jpg')",
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
              Insurance Work{" "}
              <span
                className="text-amber-400 inline-block"
                style={{ minHeight: "2.4em" }}
              >
                <TypewriterText
                  items={[
                    { text: "Damage Documentation", color: "#fbbf24" },
                    { text: "Claims Processing", color: "#fbbf24" },
                    { text: "Property Assessment", color: "#fbbf24" },
                    { text: "Loss Verification", color: "#fbbf24" },
                  ]}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Accelerate insurance claims with precise 3D documentation. Capture
              comprehensive evidence for{" "}
              <span className="text-amber-400 font-semibold">water damage</span>
              , <span className="text-amber-400 font-semibold">fire loss</span>,
              and{" "}
              <span className="text-amber-400 font-semibold">
                structural issues
              </span>{" "}
              with immersive detail.
            </p>
            <p className="text-lg text-white/70">
              View sample documentation below
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Case 1 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                Water Damage Assessment
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Comprehensive documentation of basement flooding showing
                affected areas, water lines, and structural damage.
              </p>
              <MatterportEmbed modelId="1mwDw6T2bEA" />
            </div>
          </AnimatedSection>

          {/* Case 2 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                Fire Loss Documentation
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Detailed 3D capture of fire damage throughout residential
                property for accurate claim processing.
              </p>
              <MatterportEmbed modelId="V6mB85vLEb4" />
            </div>
          </AnimatedSection>

          {/* Case 3 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                Storm Damage Survey
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Complete property scan showing roof damage, broken windows, and
                interior water intrusion from severe weather.
              </p>
              <MatterportEmbed modelId="1mwDw6T2bEA" />
            </div>
          </AnimatedSection>

          {/* Case 4 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                Mold Remediation Report
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Pre and post-remediation documentation showing extent of mold
                growth and successful treatment areas.
              </p>
              <MatterportEmbed modelId="1mwDw6T2bEA" />
            </div>
          </AnimatedSection>

          {/* Case 5 */}
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                Structural Damage Analysis
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Thorough documentation of foundation cracks, wall separation,
                and compromised structural elements.
              </p>
              <MatterportEmbed modelId="1mwDw6T2bEA" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-12 rounded-lg">
            <h2 className="text-4xl font-bold mb-6 text-amber-400">
              Need Professional Documentation?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Fast, accurate 3D scans for insurance claims and adjusters
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started
            </button>
          </div>
        </section>
      </AnimatedSection>

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </main>
  );
}
