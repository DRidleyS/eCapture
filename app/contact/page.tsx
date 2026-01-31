"use client";

import React from "react";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";

export default function ContactFunnel() {
  const router = useRouter();
  const steps = [
    { id: "useCase", title: "What service do you need?" },
    { id: "address", title: "Building address" },
    { id: "squareFootage", title: "Square footage" },
    { id: "neededBy", title: "When do you need it?" },
    { id: "questions", title: "Questions or comments" },
    { id: "review", title: "Review & Submit" },
  ];

  const [stepIdx, setStepIdx] = React.useState(0);
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [form, setForm] = React.useState({
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

  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    q.set("step", String(stepIdx));
    const url = `${window.location.pathname}?${q.toString()}`;
    window.history.replaceState(null, "", url);
  }, [stepIdx]);

  const next = () => setStepIdx((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStepIdx((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          service: form.service,
          address: form.address,
          square_footage: form.squareFootage,
          needed_by: form.neededBy,
          questions: form.questions,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("success");
      setTimeout(() => {
        router.push("/");
      }, 1400);
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  function CustomSelect({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const [measured, setMeasured] = React.useState(0);

    React.useEffect(() => {
      function onDoc(e: MouseEvent) {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      }
      document.addEventListener("click", onDoc);
      return () => document.removeEventListener("click", onDoc);
    }, []);

    React.useEffect(() => {
      // measure content height for smooth transition
      if (dropdownRef.current) {
        setMeasured(dropdownRef.current.scrollHeight);
      }
    }, [options.length]);

    React.useEffect(() => {
      if (open && dropdownRef.current) {
        // re-measure when opening to capture any layout differences
        setMeasured(dropdownRef.current.scrollHeight);
      }
    }, [open]);

    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white flex items-center justify-between"
          aria-haspopup
          aria-expanded={open}
        >
          <span className={value ? "" : "text-white/60"}>
            {value || "Choose a service"}
          </span>
          <svg
            className={`w-4 h-4 text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          ref={dropdownRef}
          className="mt-2 w-full rounded-xl bg-[rgba(255,255,255,0.05)] border border-white/8 shadow-lg z-50 overflow-hidden"
          style={{
            height: open ? measured : 0,
            transition: "height 220ms cubic-bezier(.2,.8,.2,1)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex flex-col" aria-hidden={!open}>
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-white/8 text-white"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    const s = steps[stepIdx]?.id;
    const baseInput =
      "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/60 appearance-none focus:outline-none focus:ring-2 focus:ring-sky-400/30 transition";

    switch (s) {
      case "useCase":
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white/85">
              Choose a service
            </label>
            <CustomSelect
              value={form.service}
              onChange={(v) => setForm({ ...form, service: v })}
              options={[
                { value: "Real Estate", label: "Real Estate" },
                { value: "Rental Properties", label: "Rental Properties" },
                {
                  value: "Insurance Documentation",
                  label: "Insurance Documentation",
                },
                {
                  value: "AEC",
                  label: "Architecture, Engineering & Construction",
                },
                {
                  value: "Commercial Operations",
                  label: "Commercial & Industrial Facility Management",
                },
              ]}
            />
          </div>
        );

      case "address":
        return (
          <div className="space-y-4">
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={baseInput}
              placeholder="123 Main St, City, State"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/85">
                  Your name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={baseInput}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/85">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={baseInput}
                  placeholder="you@email.com"
                />
              </div>
            </div>
          </div>
        );

      case "squareFootage":
        return (
          <div className="space-y-4">
            <input
              type="number"
              min={0}
              value={form.squareFootage}
              onChange={(e) =>
                setForm({ ...form, squareFootage: e.target.value })
              }
              className={baseInput}
              placeholder="e.g. 1500"
            />
            <label className="block text-sm font-medium text-white/85">
              Phone (optional)
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={baseInput}
              placeholder="(123) 456-7890"
            />
          </div>
        );

      case "neededBy":
        return (
          <div className="space-y-4">
            <input
              type="date"
              value={form.neededBy}
              onChange={(e) => setForm({ ...form, neededBy: e.target.value })}
              className={baseInput}
            />
          </div>
        );

      case "questions":
        return (
          <div className="space-y-4">
            <textarea
              value={form.questions}
              onChange={(e) => setForm({ ...form, questions: e.target.value })}
              rows={6}
              className={baseInput + " resize-none"}
              placeholder="Any details you want us to know..."
            />
          </div>
        );

      case "review":
        return (
          <div className="space-y-3 text-white/90">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Service</span>
                <span className="font-medium">{form.service || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Address</span>
                <span className="font-medium">{form.address || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Sq ft</span>
                <span className="font-medium">{form.squareFootage || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Needed by</span>
                <span className="font-medium">{form.neededBy || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Questions</span>
                <span className="font-medium">{form.questions || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Name</span>
                <span className="font-medium">{form.name || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/80">Email</span>
                <span className="font-medium">{form.email || "—"}</span>
              </div>
            </div>

            {status === "error" && (
              <div className="text-rose-400">
                Failed to send. Please try again.
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const progress = Math.round(((stepIdx + 1) / steps.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgba(8,10,12,0.55)] p-6">
      <div className="w-full max-w-lg bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl shadow-lg p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white text-lg font-semibold">Get a Quote</h3>
            <p className="text-white/70 text-sm">Quick, simple, and private</p>
          </div>
          <div className="text-sm text-white/60">
            {stepIdx + 1}/{steps.length}
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-white/6 mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>

        <div className="mb-4">
          <div className="text-sm text-white/80 font-medium mb-2">
            {steps[stepIdx].title}
          </div>
          <div
            key={steps[stepIdx].id}
            className="transition-opacity duration-300 ease-in-out"
            style={{ minHeight: 160 }}
          >
            {renderStep()}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (stepIdx === 0) return router.push("/");
              back();
            }}
            className="px-4 py-2 rounded-lg bg-transparent border border-white/7 text-white/85 hover:bg-white/3 transition"
          >
            {stepIdx === 0 ? "Cancel" : "Back"}
          </button>

          <div className="flex items-center gap-3">
            {stepIdx < steps.length - 1 ? (
              <button
                onClick={next}
                className="px-5 py-2 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 text-white font-medium shadow-md hover:brightness-105 active:scale-[0.995] transition"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={submit}
                className="px-5 py-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-500 text-white font-medium shadow-md hover:brightness-105 active:scale-[0.995] transition disabled:opacity-60"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Request"}
              </button>
            )}
          </div>
        </div>

        {status === "success" && (
          <div className="mt-4 px-4 py-3 bg-emerald-700/10 text-emerald-300 rounded-lg text-center">
            Thanks — we received your request. Redirecting…
          </div>
        )}
      </div>
    </div>
  );
}
