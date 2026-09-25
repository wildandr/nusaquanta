"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function LastProject() {
  const [direction, setDirection] = useState(-1);
  const [currentProject, setCurrentProject] = useState(0);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    { nama: "1" },
    { nama: "2" },
    { nama: "3" },
    { nama: "4" },
    { nama: "5" },
    { nama: "6" },
    { nama: "7" },
    { nama: "8" },
    { nama: "9" },
    { nama: "10" },
    { nama: "11" },
    { nama: "12" },
    { nama: "13" },
    { nama: "14" },
    { nama: "15" },
    { nama: "16" },
    { nama: "17" },
    { nama: "18" },
  ];

  // Function to handle next project
  const handleNextProject = useCallback(() => {
    setDirection(-1);
    setCurrentProject((project) => (project + 1) % projects.length);
  }, [projects.length]);

  // Function to handle previous project
  const handlePrevProject = useCallback(() => {
    setDirection(1);
    setCurrentProject(
      (project) => (project - 1 + projects.length) % projects.length
    );
  }, [projects.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // UseEffect to handle automatic change every 5 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      handleNextProject();
    }, 3000); // Change project every 5 seconds

    return () => clearInterval(interval);
  }, [handleNextProject, isVisible]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full justify-center items-center flex flex-row relative overflow-hidden"
    >
      <div className="flex w-[20%] justify-center items-center">
        <button
          onClick={handlePrevProject}
          className="w-full h-auto p-[35%] hover:-translate-x-3 transition-transform"
        >
          <Image
            src={"/images/home/hero_arrow-left.svg"}
            width={1000}
            height={1000}
            alt="Arrow Left"
            className="w-full h-auto z-69"
          />
        </button>
      </div>
      <div className="flex w-full h-full justify-center items-center relative overflow-clip">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentProject}
            className="w-full justify-center items-center flex rounded-xl"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "tween",
                duration: 1,
              },
              opacity: { duration: 0.5 },
            }}
          >
            <div className="w-[84%] rounded-[2rem] overflow-hidden">
              <Image
                src={`/images/home/project/${projects[currentProject].nama}.png`}
                alt={projects[currentProject].nama}
                width={1000}
                height={1000}
                sizes="(min-width: 1024px) 35vw, 80vw"
                className="w-full h-auto flex"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex w-[20%] h-full justify-center items-center">
        <button
          onClick={handleNextProject}
          className="w-full h-auto p-[35%] hover:translate-x-3 transition-transform"
        >
          <Image
            src={"/images/home/hero_arrow-right.svg"}
            width={1000}
            height={1000}
            alt="Arrow Right"
            className="w-full h-auto z-69"
          />
        </button>
      </div>
    </div>
  );
}
