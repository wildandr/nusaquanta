import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@partials/ContactForm';

export default function Footer() {
  return <footer id="contact" className="scroll-mt-20 border-t border-white/15 bg-black px-5 pt-24 font-reddit-sans text-white md:px-10 lg:px-16 lg:pt-32">
    <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-[1fr_.7fr] lg:gap-20"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Have something in mind?</p><h2 className="mt-7 max-w-3xl text-5xl font-semibold leading-[.96] tracking-[-.055em] md:text-7xl lg:text-8xl">Let&apos;s make<br /><span className="text-primary">it matter.</span></h2><p className="mt-8 max-w-lg text-lg leading-relaxed text-white/60">Tell us what you&apos;re working on. We&apos;d love to hear about the challenge and explore where we can help.</p><a href="mailto:hello@nusaquanta.tech" className="mt-8 inline-block border-b border-primary pb-2 text-lg font-semibold text-primary hover:text-white focus-visible:outline focus-visible:outline-primary">hello@nusaquanta.tech ↗</a></div><div className="rounded-2xl border border-white/20 bg-[#111510] p-6 md:p-8"><ContactForm /></div></div>
    <div className="mx-auto mt-24 flex max-w-[1480px] flex-col justify-between gap-7 border-t border-white/20 py-7 text-sm text-white/50 md:flex-row md:items-center"><div className="flex items-center gap-3"><Image src="/images/home/main_logo.svg" alt="Nusa Quanta logo" width={32} height={32} /><span>Nusa Quanta · Yogyakarta, Indonesia</span></div><nav aria-label="Footer navigation" className="flex gap-6"><Link href="/" className="hover:text-primary">Home</Link><Link href="/project" className="hover:text-primary">Work</Link><Link href="/about" className="hover:text-primary">About</Link></nav><p>© {new Date().getFullYear()} Nusa Quanta</p></div>
  </footer>;
}
