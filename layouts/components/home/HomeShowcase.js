"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeShowcase({ cards = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !progressRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -Math.max(0, trackRef.current.scrollWidth - trackRef.current.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    }, sectionRef);

    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(trackRef.current);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  return <section ref={sectionRef} className="relative h-[270vh] bg-[#b8e930] text-black motion-reduce:h-auto md:h-[300vh]" aria-labelledby="showcase-heading">
    <div className="sticky top-0 flex h-[100svh] min-h-[650px] flex-col overflow-hidden px-5 py-24 motion-reduce:static motion-reduce:h-auto md:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em]">Selected work / 01—04</p><h2 id="showcase-heading" className="mt-5 max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">Built to do<br />something real.</h2></div><p className="max-w-sm text-sm leading-relaxed text-black/65 md:text-base">A few of the products where strategy, design, and engineering met a real problem.</p></div>
      <div className="mx-auto mt-10 w-full max-w-[1480px] flex-1 overflow-hidden motion-reduce:overflow-visible">
        <div ref={trackRef} className="flex h-full w-full gap-5 will-change-transform motion-reduce:flex-wrap motion-reduce:will-change-auto md:gap-8">
          {cards.map((card, index) => <Link key={card.id} href={`/project/${card.id}`} className="group relative flex h-full min-h-0 w-[82vw] max-w-[780px] shrink-0 flex-col overflow-hidden rounded-2xl bg-black text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black motion-reduce:h-[440px] motion-reduce:w-full md:w-[56vw]">
            <div className="relative min-h-0 flex-1 overflow-hidden"><Image src={card.imageUrl} alt={`${card.title} project interface`} fill sizes="(min-width: 1024px) 56vw, 82vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="flex min-h-36 items-end justify-between gap-4 p-5 md:p-7"><div><p className="text-xs uppercase tracking-[.18em] text-primary">0{index + 1} / {card.industry}</p><h3 className="mt-2 text-2xl font-semibold md:text-3xl">{card.title}</h3><p className="mt-1 line-clamp-2 max-w-xl text-sm text-white/60">{card.summary}</p></div><span className="mb-auto text-2xl text-primary" aria-hidden="true">↗</span></div>
          </Link>)}
        </div>
      </div>
      <div className="mx-auto mt-7 flex w-full max-w-[1480px] items-center gap-5"><span className="text-xs font-bold">SCROLL TO EXPLORE</span><div className="h-px flex-1 bg-black/20"><div ref={progressRef} className="h-px origin-left scale-x-0 bg-black" /></div><Link href="/project" className="text-xs font-bold underline underline-offset-4">ALL WORK ↗</Link></div>
    </div>
  </section>;
}
