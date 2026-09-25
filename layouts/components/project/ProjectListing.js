"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PAGE_SIZE = 9;

export default function ProjectListing({ cards = [], capabilityOptions = [], industryOptions = [] }) {
  const [query, setQuery] = useState("");
  const [capability, setCapability] = useState("All capabilities");
  const [industry, setIndustry] = useState("All industries");
  const [page, setPage] = useState(1);

  const featured = cards.find((card) => card.id === 1) || cards[0];
  const filtered = useMemo(() => cards.filter((card) => {
    const text = `${card.title} ${card.fullTitle} ${card.summary} ${card.industry} ${card.capabilities.join(" ")}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) &&
      (capability === "All capabilities" || card.capabilities.includes(capability)) &&
      (industry === "All industries" || card.industry === industry);
  }), [cards, query, capability, industry]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const updateQuery = (value) => { setQuery(value); setPage(1); };
  const updateCapability = (value) => { setCapability(value); setPage(1); };
  const updateIndustry = (value) => { setIndustry(value); setPage(1); };
  const reset = () => { setQuery(""); setCapability("All capabilities"); setIndustry("All industries"); setPage(1); };

  return <main className="min-h-screen overflow-x-clip bg-black font-reddit-sans text-white">
    <section className="mx-auto max-w-[1480px] px-5 pb-16 pt-36 md:px-10 lg:px-16 lg:pb-24 lg:pt-44"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Selected work / The archive</p><div className="mt-7 grid gap-7 lg:grid-cols-[1fr_.45fr] lg:items-end"><h1 className="text-[clamp(4.5rem,11vw,10rem)] font-semibold leading-[.85] tracking-[-.07em]">Work with<br /><span className="text-primary">purpose.</span></h1><p className="max-w-md text-lg leading-relaxed text-white/60">Digital products built around real needs. Explore the challenges, craft, and thinking behind the work.</p></div></section>

    {featured && <section className="mx-auto max-w-[1480px] px-5 md:px-10 lg:px-16"><Link href={`/project/${featured.id}`} className="group grid overflow-hidden rounded-2xl border border-white/15 bg-[#171a13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:grid-cols-[1.15fr_.85fr]"><div className="relative aspect-[1.45] overflow-hidden lg:aspect-auto"><Image src={featured.imageUrl} alt={`${featured.title} project interface`} fill priority sizes="(min-width: 1024px) 55vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="flex flex-col justify-between gap-10 p-7 md:p-10 lg:p-14"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Featured case study / {featured.industry}</p><div><h2 className="text-4xl font-semibold tracking-tight md:text-6xl">{featured.title}</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">{featured.summary}</p></div><div className="flex items-end justify-between border-t border-white/20 pt-6"><span className="text-sm text-white/60">{featured.capabilities.join(" · ")}</span><span className="text-3xl text-primary" aria-hidden="true">↗</span></div></div></Link></section>}

    <section className="mx-auto max-w-[1480px] px-5 py-24 md:px-10 lg:px-16 lg:py-32" id="all-work"><div className="flex flex-col justify-between gap-5 border-b border-white/20 pb-8 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Explore by interest</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">All projects<span className="ml-3 align-top text-base text-primary">{String(filtered.length).padStart(2, "0")}</span></h2></div><p className="max-w-sm text-sm text-white/50">Find a project by capability, field, or name.</p></div>
      <div className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,230px)_minmax(0,230px)]">
        <label className="flex min-w-0 cursor-text items-center gap-3 rounded-xl border border-white/30 px-4 focus-within:border-primary"><span aria-hidden="true" className="text-primary">⌕</span><span className="sr-only">Search projects</span><input type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search projects" className="min-h-12 w-full min-w-0 bg-transparent outline-none placeholder:text-white/40" /></label>
        <label className="sr-only" htmlFor="capability-filter">Filter by capability</label><select id="capability-filter" value={capability} onChange={(event) => updateCapability(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/30 bg-black px-4 text-white outline-none focus:border-primary"><option>All capabilities</option>{capabilityOptions.map((option) => <option key={option}>{option}</option>)}</select>
        <label className="sr-only" htmlFor="industry-filter">Filter by industry</label><select id="industry-filter" value={industry} onChange={(event) => updateIndustry(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/30 bg-black px-4 text-white outline-none focus:border-primary"><option>All industries</option>{industryOptions.map((option) => <option key={option}>{option}</option>)}</select>
      </div>
      {visible.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((card) => <Link key={card.id} href={`/project/${card.id}`} className="group overflow-hidden rounded-xl border border-white/15 bg-[#121212] transition-colors hover:border-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><div className="relative aspect-[1.45] overflow-hidden bg-[#1d1d1d]">{card.imageUrl ? <Image src={card.imageUrl} alt={`${card.title} project interface`} fill sizes="(min-width: 1280px) 29vw, (min-width: 768px) 46vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex h-full items-end bg-[radial-gradient(circle_at_70%_25%,#3c5720,transparent_45%)] p-8"><span className="text-4xl font-semibold tracking-tight text-primary">{card.title}</span></div>}</div><div className="flex min-h-52 flex-col p-5 md:p-6"><p className="text-xs font-semibold uppercase tracking-widest text-primary">{card.industry}{card.year ? ` / ${card.year}` : ""}</p><h3 className="mt-4 text-2xl font-semibold leading-tight">{card.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">{card.summary}</p><div className="mt-auto flex items-end justify-between gap-3 pt-5 text-xs text-white/40"><span>{card.capabilities.slice(0, 2).join(" · ")}</span><span className="text-xl text-primary" aria-hidden="true">↗</span></div></div></Link>)}</div> : <div className="rounded-xl border border-white/15 px-6 py-16 text-center"><h3 className="text-2xl font-semibold">No projects match yet.</h3><p className="mt-2 text-white/55">Try a different search or clear the filters.</p><button type="button" onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Clear filters</button></div>}
      {totalPages > 1 && <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-6"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="disabled:opacity-35 hover:text-primary focus-visible:outline focus-visible:outline-primary">← Previous</button><span className="text-sm text-white/50">{page} / {totalPages}</span><button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="disabled:opacity-35 hover:text-primary focus-visible:outline focus-visible:outline-primary">Next →</button></div>}
    </section>
  </main>;
}
