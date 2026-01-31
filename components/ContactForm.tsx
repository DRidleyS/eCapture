"use client";

import React, { useState, FormEvent } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    address: "",
    squareFootage: "",
    neededBy: "",
    questions: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("openContactForm", onOpen as EventListener);
    return () =>
      window.removeEventListener("openContactForm", onOpen as EventListener);
  }, []);

  const close = () => setOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          address: formData.address,
          square_footage: formData.squareFootage,
          needed_by: formData.neededBy,
          questions: formData.questions,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("success");
      setTimeout(() => {
        close();
      }, 2000);
    } catch (error) {
      console.error("Email send error:", error);
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
      onClick={close}
    >
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white mb-6">Get Started</h2>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="text-emerald-400 text-5xl mb-4">✓</div>
            <p className="text-white text-xl">Message sent successfully!</p>
            <p className="text-white/60 mt-2">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Address of building
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                placeholder="123 Main St, City, State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Square footage</label>
                <input
                  type="number"
                  min={0}
                  value={formData.squareFootage}
                  onChange={(e) =>
                    setFormData({ ...formData, squareFootage: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  placeholder="e.g. 1200"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Needed by</label>
                <input
                  type="date"
                  value={formData.neededBy}
                  onChange={(e) =>
                    setFormData({ ...formData, neededBy: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">
                Service Interested In
              </label>
              <select
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white/50"
              >
                <option value="" className="bg-gray-800">
                  Select a service
                </option>
                <option value="Real Estate" className="bg-gray-800">
                  Real Estate
                </option>
                <option value="Rental Properties" className="bg-gray-800">
                  Rental Properties
                </option>
                <option value="Insurance Documentation" className="bg-gray-800">
                  Insurance Documentation
                </option>
                <option value="AEC" className="bg-gray-800">
                  Architecture, Engineering & Construction
                </option>
                <option value="Commercial Operations" className="bg-gray-800">
                  Commercial & Industrial Facility Management
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">
                Questions (optional)
              </label>
              <textarea
                value={formData.questions}
                onChange={(e) =>
                  setFormData({ ...formData, questions: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                placeholder="Any specific questions for the team"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                placeholder="Tell us about your project..."
              />
            </div>

            {status === "error" && (
              <div className="text-red-400 text-sm">
                Failed to send message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
