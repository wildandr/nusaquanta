"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const spring = { type: "spring", stiffness: 95, damping: 20, mass: 0.9 };
const tiltSpring = { stiffness: 180, damping: 20, mass: 0.6 };

// Posisi kartu depan/belakang
const frontPosition = { x: "16%", y: "23%", rotateZ: 7 };
const backPosition = { x: "-12%", y: "-27%", rotateZ: -7 };

function ProjectCard({ card, isFront, reduceMotion, onDismiss }) {
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
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateX.set(-y * 16);
    rawRotateY.set(x * 20);
    tooltipX.set(event.clientX - bounds.left + 18);
    tooltipY.set(event.clientY - bounds.top + 18);
  };

  const target = isFront
    ? { ...frontPosition, scale: hovered ? 1.06 : 1, opacity: 1 }
    : { ...backPosition, scale: hovered ? 0.99 : 0.94, opacity: 1 };

  return (
    <motion.div
      className="absolute left-[10%] top-[24%] w-[78%]"
      style={{
        zIndex: isFront ? 2 : 1,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={
        reduceMotion
          ? false
          : isFront
            ? { ...frontPosition, scale: 0.8, opacity: 0 }
            : { ...backPosition, scale: 0.7, opacity: 0 }
      }
      animate={reduceMotion ? { ...target, transition: { duration: 0 } } : target}
      // kartu lama terbang keluar frame + fade saat digantikan
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { x: "110%", y: "5%", rotateZ: 24, scale: 0.9, opacity: 0 }
      }
      transition={reduceMotion ? { duration: 0 } : spring}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch" && !reduceMotion) setHovered(true);
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
          sizes="(min-width: 1024px) 38vw, 75vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 to-transparent px-5 pb-5 pt-14 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[.18em] text-primary">
              Selected work
            </span>
            <p className="mt-1 text-lg font-semibold md:text-xl line-clamp-2">
              {card.title}
            </p>
          </div>
          <span
            className="text-2xl text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap rounded-full border border-primary bg-black px-3 py-1.5 text-xs font-semibold text-primary md:block"
          style={{ x: tooltipX, y: tooltipY }}
          animate={{
            opacity: hovered && !reduceMotion ? 1 : 0,
            scale: hovered && !reduceMotion ? 1 : 0.85,
          }}
          transition={{ duration: 0.18 }}
        >
          View {card.title}
        </motion.span>
      </Link>
    </motion.div>
  );
}

/**
 * Display project: dua kartu bertumpuk yang berganti secara acak dari
 * SELURUH daftar project. Saat berganti: kartu depan terbang keluar,
 * kartu belakang naik ke depan (spring), kartu baru muncul di belakang.
 */
export default function HeroProjectStack({ cards = [], intervalMs = 5000 }) {
  const [frontCard, setFrontCard] = useState(cards[0]);
  const [backCard, setBackCard] = useState(cards[1]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || cards.length < 3) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setFrontCard((currentFront) => {
          // kartu belakang naik ke depan; kartu acak baru masuk sebagai belakang
          setBackCard((currentBack) => {
            const pool = cards.filter(
              (c) => c.id !== currentFront.id && c.id !== currentBack.id
            );
            return pool.length > 0
              ? pool[Math.floor(Math.random() * pool.length)]
              : currentFront; // fallback (tidak terjadi dengan 18 kartu)
          });
          return cards.find((c) => c.id === backCardIdRef.current) ?? currentFront;
        });
      }
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [cards, intervalMs, reduceMotion]);

  // lacak id kartu belakang terkini untuk dipromosikan (tanpa race state)
  const backCardIdRef = useRef(backCard?.id);
  backCardIdRef.current = backCard?.id;

  if (cards.length < 2 || !frontCard || !backCard) return null;

  return (
    <div
      className="relative mx-auto aspect-[1.03] w-full max-w-[700px] [perspective:1100px] self-center"
      style={{ width: "min(100%, max(280px, calc(100svh - 290px)))" }}
      aria-label="Featured Nusa Quanta projects"
    >
      <AnimatePresence>
        {backCard.id !== frontCard.id && (
          <ProjectCard
            key={backCard.id}
            card={backCard}
            isFront={false}
            reduceMotion={reduceMotion}
          />
        )}
        <ProjectCard
          key={frontCard.id}
          card={frontCard}
          isFront={true}
          reduceMotion={reduceMotion}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute bottom-[6%] left-0 z-[3] -rotate-[7deg] rounded-full border border-dashed border-primary bg-black px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs">
        Ideas into use ↗
      </div>
    </div>
  );
}
