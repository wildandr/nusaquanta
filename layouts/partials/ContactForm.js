"use client";
import { useState } from "react";

const EMAIL = "hello@nusaquanta.tech";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Tanpa backend: buka aplikasi email pengunjung dengan isi sudah terisi.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website inquiry${name ? ` from ${name}` : ""}`
    );
    const body = encodeURIComponent(
      `${message}\n\n—\nDari: ${name || "-"}${email ? ` <${email}>` : ""}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-reddit-sans text-sm font-semibold uppercase tracking-[.2em] text-primary">Tell us about your project</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1 rounded-xl border border-white/30 font-reddit-sans focus-within:border-primary">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-full w-full bg-transparent p-4 focus:outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="min-w-0 flex-1 rounded-xl border border-white/30 font-reddit-sans focus-within:border-primary">
          <span className="sr-only">Your email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-full w-full bg-transparent p-4 focus:outline-none"
            placeholder="Your email"
          />
        </label>
      </div>

      <div className="mt-3 rounded-xl border border-white/30 font-reddit-sans focus-within:border-primary">
        <label htmlFor="contact-message" className="sr-only">Your message</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="h-full w-full resize-none bg-transparent px-4 py-3 focus:outline-none"
          placeholder="Your message..."
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="mb-2 mr-2 cursor-pointer rounded-full bg-primary px-6 py-2 font-reddit-sans font-semibold text-black transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Open email app ↗
          </button>
        </div>
      </div>
    </form>
  );
}
