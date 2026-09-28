"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutTeam({ people }) {
  const [active, setActive] = useState(0);
  const person = people[active];
  if (!person) return null;

  return <section id="team" className="scroll-mt-24 bg-[#b8e930] px-5 py-24 font-reddit-sans text-black md:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto max-w-[1480px]"><div className="grid gap-7 lg:grid-cols-[.65fr_1fr] lg:items-end"><p className="text-xs font-bold uppercase tracking-[.22em]">The people behind the work</p><h2 className="text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">Different minds.<br />Shared curiosity.</h2></div>
      <div className="mt-14 grid overflow-hidden rounded-2xl border border-black/20 bg-[#151515] text-white lg:grid-cols-[.95fr_1.05fr]">
        <div className="relative flex min-h-[420px] items-end justify-center overflow-hidden bg-[#252b20] md:min-h-[570px]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(184,233,48,.3),transparent_65%)]" /><Image key={person.id} src={person.cutoutUrl} alt={`Portrait of ${person.fullName}`} width={650} height={750} sizes="(min-width: 1024px) 45vw, 90vw" className="relative z-10 h-[90%] w-auto object-contain object-bottom" /><span className="absolute bottom-6 left-6 z-20 text-xs font-bold uppercase tracking-[.2em] text-primary">0{active + 1} / 0{people.length}</span></div>
        <div className="flex flex-col justify-between gap-10 p-7 md:p-12 lg:p-14"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Meet the collective</p><h3 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{person.fullName}</h3><p className="mt-3 text-lg text-primary">{person.role}</p><p className="mt-7 max-w-xl leading-relaxed text-white/60">{person.description || `${person.fullName} works across ${person.topJobs.join(", ").toLowerCase()}, bringing a collaborative perspective to digital products.`}</p><div className="mt-6 flex flex-wrap gap-2">{person.topJobs.map((job) => <span key={job} className="rounded-full border border-white/25 px-3 py-1.5 text-xs text-white/75">{job}</span>)}</div></div><div className="flex flex-wrap gap-7 border-t border-white/20 pt-6">{person.projectIds[0] && <Link href={`/project/${person.projectIds[0]}`} className="border-b border-primary pb-1 font-semibold text-primary hover:text-white focus-visible:outline focus-visible:outline-primary">See related work ↗</Link>}{person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-white/40 pb-1 font-semibold hover:text-primary focus-visible:outline focus-visible:outline-primary">LinkedIn ↗</a>}</div></div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{people.map((member, index) => <button key={member.id} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`flex min-h-24 items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${active === index ? "border-black bg-black text-primary" : "border-black/25 text-black hover:bg-black/10"}`}><Image src={member.photoUrl} alt="" width={50} height={50} className="h-12 w-12 shrink-0 rounded-full object-cover" /><span className="text-sm font-semibold leading-tight">{member.fullName}</span></button>)}</div>
    </div>
  </section>;
}
