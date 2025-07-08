"use client";
import { useState } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKLE0UyLgeLG3lTgWDh8ph8YYu4p3EWS9TpZGhtEvSs2mHhWq4oeoPA41Qwtb_Qd3CQQ/exec";
    
export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const formBody = new URLSearchParams(form).toString();
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      setError("There was a problem submitting the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-white px-4 py-8">
      <main className="flex flex-col items-center w-full max-w-3xl gap-12 mt-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            NeuroCogAI
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 max-w-xl">
            Transforming AI Efficiency with Neuroscience
          </h2>
          <p className="text-gray-400 max-w-2xl mt-2">
            Inspired by the brain, NeuroCogAI delivers next-generation AI efficiency. We bridge neuroscience and artificial intelligence to unlock new levels of performance, adaptability, and innovation for your business.
          </p>
        </section>

        {/* Key Benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center shadow-lg border border-gray-700">
            <span className="text-3xl mb-2">🧠</span>
            <h3 className="font-semibold text-lg mb-1">Neuroscience-Driven</h3>
            <p className="text-gray-400 text-sm text-center">Our models are inspired by the latest neuroscience research, enabling smarter, more adaptive AI.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center shadow-lg border border-gray-700">
            <span className="text-3xl mb-2">⚡</span>
            <h3 className="font-semibold text-lg mb-1">Unmatched Efficiency</h3>
            <p className="text-gray-400 text-sm text-center">Achieve more with less. NeuroCogAI optimizes resource use, delivering faster, greener, and more cost-effective AI.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center shadow-lg border border-gray-700">
            <span className="text-3xl mb-2">🚀</span>
            <h3 className="font-semibold text-lg mb-1">Innovation Unleashed</h3>
            <p className="text-gray-400 text-sm text-center">Push the boundaries of what's possible with AI that learns and adapts like the human brain.</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="w-full bg-gray-900/80 rounded-2xl p-8 shadow-xl border border-gray-700 flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Contact Us</h3>
          <p className="text-gray-400 mb-6 text-center">Interested in learning more or partnering with us? Fill out the form below and we'll get in touch.</p>
          {submitted ? (
            <div className="text-green-400 font-semibold text-center">Thank you for reaching out! We'll be in touch soon.</div>
          ) : (
            <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
              <input
                className="rounded px-4 py-2 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="rounded px-4 py-2 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="rounded px-4 py-2 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 text-white font-semibold py-2 rounded shadow hover:opacity-90 transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </section>
      </main>
      <footer className="mt-16 text-gray-500 text-xs text-center w-full">
        &copy; {new Date().getFullYear()} NeuroCogAI. All rights reserved.
      </footer>
    </div>
  );
}
