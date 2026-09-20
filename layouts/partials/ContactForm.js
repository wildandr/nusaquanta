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
      <p className="font-reddit-sans text-[12px] text-center lg:text-xl">
        GET IN TOUCH
      </p>
      <div className="flex flex-row mt-8">
        <div className="flex-[50%] border border-primary font-reddit-sans rounded-[16px] mr-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 h-full focus:outline-none bg-transparent"
            placeholder="Your name"
          />
        </div>
        <div className="flex-[50%] border border-primary font-reddit-sans rounded-[16px] ml-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 h-full focus:outline-none bg-transparent"
            placeholder="Your email"
          />
        </div>
      </div>

      <div className="border border-primary font-reddit-sans rounded-[16px] mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 h-full focus:outline-none bg-transparent resize-none"
          placeholder="Your message..."
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-black font-reddit-sans rounded-[16px] mr-2 mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
