'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const spring = { type: 'spring', stiffness: 95, damping: 20, mass: 0.9 };
const tiltSpring = { stiffness: 180, damping: 20, mass: 0.6 };

function ProjectCard({ card, index, isFront, reduceMotion }) {
  const [hovered, setHovered] = useState(false);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, tiltSpring);
  const rotateY = useSpring(rawRotateY, tiltSpring);
  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);

  const resetTilt = () => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const moveTilt = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateX.set(-y * 16);
    rawRotateY.set(x * 20);
    tooltipX.set(event.clientX - bounds.left + 18);
    tooltipY.set(event.clientY - bounds.top + 18);
  };

  const frontPosition = { x: '16%', y: '23%', rotateZ: 7, scale: hovered ? 1.06 : 1 };
  const backPosition = { x: '-12%', y: '-27%', rotateZ: -7, scale: hovered ? 0.99 : 0.94 };

  return (
    <motion.div
      className="absolute left-[10%] top-[24%] w-[78%]"
      style={{ zIndex: isFront ? 2 : 1, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={false}
      animate={reduceMotion ? (isFront ? { ...frontPosition, scale: 1 } : backPosition) : (isFront ? frontPosition : backPosition)}
      transition={reduceMotion ? { duration: 0 } : spring}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch' && !reduceMotion) setHovered(true);
      }}
      onPointerMove={moveTilt}
      onPointerLeave={resetTilt}
    >
      <Link
        href={`/project/${card.id}`}
        aria-label={`View ${card.title} project`}
        className="group relative block aspect-[1.45] overflow-hidden rounded-2xl border border-white/20 bg-[#171717] shadow-[0_35px_90px_rgba(0,0,0,.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <Image
          src={card.imageUrl}
          alt={`${card.title} digital product interface`}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 38vw, 75vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 to-transparent px-5 pb-5 pt-14 text-white">
          <div><span className="text-[10px] font-bold uppercase tracking-[.18em] text-primary">Selected work / 0{index + 1}</span><p className="mt-1 text-lg font-semibold md:text-xl">{card.title}</p></div>
          <span className="text-2xl text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span>
        </div>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap rounded-full border border-primary bg-black px-3 py-1.5 text-xs font-semibold text-primary md:block"
          style={{ x: tooltipX, y: tooltipY }}
          animate={{ opacity: hovered && !reduceMotion ? 1 : 0, scale: hovered && !reduceMotion ? 1 : 0.85 }}
          transition={{ duration: 0.18 }}
        >
          View {card.title}
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function HeroProjectStack({ cards = [] }) {
  const [frontIndex, setFrontIndex] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduceMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || cards.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setFrontIndex((current) => (current + 1) % cards.length);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [cards.length, reduceMotion]);

  if (cards.length < 2) return null;

  return (
    <div className="relative mx-auto aspect-[1.03] w-full max-w-[700px] [perspective:1100px]" aria-label="Featured Nusa Quanta projects">
      {cards.slice(0, 2).map((card, index) => (
        <ProjectCard key={card.id} card={card} index={index} isFront={frontIndex === index} reduceMotion={reduceMotion} />
      ))}
      <div className="pointer-events-none absolute bottom-[6%] left-0 z-[3] -rotate-[7deg] rounded-full border border-dashed border-primary bg-black px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs">Ideas into use ↗</div>
    </div>
  );
}
