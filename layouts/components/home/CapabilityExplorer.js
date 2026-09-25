"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const capabilities = [
  { label: "Product design", detail: "Research, strategy, and interfaces made around real needs.", projectIndex: 2 },
  { label: "Web platforms", detail: "Reliable experiences and systems that make complicated work feel simple.", projectIndex: 1 },
  { label: "Mobile experiences", detail: "Useful, connected journeys for people on the move.", projectIndex: 3 },
  { label: "Data & AI", detail: "Applied intelligence shaped by a practical problem—not a trend.", projectIndex: 0 },
];

export default function CapabilityExplorer({ cards }) {
  const [active, setActive] = useState(0);
  const current = capabilities[active];
  const project = cards[current.projectIndex];

  return <section className="mx-auto max-w-[1480px] px-5 py-28 md:px-10 lg:px-16 lg:py-40">
    <div className="grid gap-8 lg:grid-cols-[.65fr_1fr] lg:items-end"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">What we bring to the table</p><h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.05em] md:text-6xl">Different disciplines.<br /><span className="text-white/40">One useful outcome.</span></h2></div>
    <div className="mt-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
      <div className="border-t border-white/20" role="tablist" aria-label="Explore capabilities">
        {capabilities.map((item, index) => <button key={item.label} type="button" id={`cap-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="cap-panel" onClick={() => setActive(index)} className={`flex w-full items-center justify-between border-b border-white/20 py-6 text-left text-[clamp(1.35rem,2.4vw,2.5rem)] font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${active === index ? "text-primary" : "text-white/55 hover:text-white"}`}><span><span className="mr-5 align-top text-xs">0{index + 1}</span>{item.label}</span><span aria-hidden="true">↗</span></button>)}
      </div>
      <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${active}`} className="overflow-hidden rounded-2xl border border-white/15 bg-[#151515]">
        <div className="relative aspect-[1.55] overflow-hidden"><Image key={project.id} src={project.imageUrl} alt={`${project.title} project interface`} fill sizes="(min-width: 1024px) 50vw, 90vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#151515] to-transparent" /></div>
        <div className="p-6 md:p-8"><p className="text-sm uppercase tracking-widest text-primary">Featured example / {project.industry}</p><h3 className="mt-3 text-3xl font-semibold">{project.title}</h3><p className="mt-3 max-w-xl text-white/60">{current.detail} {project.summary}</p><Link href={`/project/${project.id}`} className="mt-6 inline-flex gap-5 border-b border-primary pb-1 font-semibold text-primary hover:gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">See the project <span aria-hidden="true">↗</span></Link></div>
      </div>
    </div>
  </section>;
}
