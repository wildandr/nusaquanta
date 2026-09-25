'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const phrases = [
  'Product strategy',
  'Experience design',
  'Engineering',
  'Data & AI',
];

function PhraseSet({ reverse = false }) {
  const orderedPhrases = reverse ? [...phrases].reverse() : phrases;
  const repeatedPhrases = [...orderedPhrases, ...orderedPhrases];

  return (
    <div className="signature-marquee-group flex items-center whitespace-nowrap py-1.5 md:py-2">
      {repeatedPhrases.map((phrase, index) => (
        <span key={`${phrase}-${index}`} className="signature-marquee-item text-lg font-semibold tracking-tight md:text-2xl">
          {phrase}
        </span>
      ))}
    </div>
  );
}

function useVisiblePlayback() {
  const elementRef = useRef(null);
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;

    const syncPlayback = () => {
      element.dataset.playing = String(inView && !motionPreference.matches && !document.hidden);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: '100px 0px' });

    observer.observe(element);
    motionPreference.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return elementRef;
}

function LoopStrip({ reverse = false, seconds = 34 }) {
  const trackRef = useVisiblePlayback();

  return (
    <div
      ref={trackRef}
      data-direction={reverse ? 'right' : 'left'}
      data-playing="false"
      className="signature-marquee-track"
      style={{ '--marquee-duration': `${seconds}s` }}
    >
      <PhraseSet reverse={reverse} />
      <PhraseSet reverse={reverse} />
    </div>
  );
}

export function HeroRibbon() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 z-[10000] h-36 w-screen -translate-x-1/2 overflow-hidden md:h-52">
      <div className="hidden absolute -left-[10%] -top-2 w-[120%] rotate-[6deg] bg-primary text-black lg:flex lg:top-8 lg:rotate-[6deg]">
        <LoopStrip seconds={36} />
      </div>
    </div>
  );
}

export function CrossedRibbons() {
  const sectionRef = useVisiblePlayback();

  return (
    <section ref={sectionRef} aria-hidden="true" data-playing="false" className="relative isolate h-40 w-full overflow-hidden bg-black md:h-56">
      <div className="absolute -left-[12%] top-[5.75rem] z-[1] w-[124%] rotate-[5deg] bg-primary text-black md:top-[6.25rem] md:rotate-[3.5deg]">
        <LoopStrip seconds={34} />
      </div>
      <div className="absolute -left-[12%] top-[4.5rem] z-[2] w-[124%] -rotate-[5deg] bg-primary text-black md:top-[3.5rem] md:-rotate-[3.5deg]">
        <LoopStrip reverse seconds={40} />
      </div>
      <div className="pointer-events-none absolute left-[28%] top-[100px] z-[3] -translate-x-1/2 -translate-y-1/2">
        <Image src="/images/home/logoButterfly.png" alt="" width={112} height={112} sizes="112px" className="signature-ribbon-pinwheel h-24 w-24 md:h-32 md:w-32" />
      </div>
    </section>
  );
}
