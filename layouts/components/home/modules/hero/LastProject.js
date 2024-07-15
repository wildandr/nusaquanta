"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function LastProject() {
  const [direction, setDirection] = useState(-1);
  const [currentProject, setCurrentProject] = useState(0);

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
  const handleNextProject = () => {
    setDirection(-1);
    if (currentProject === projects.length - 1) {
      setCurrentProject(0);
    } else {
      setCurrentProject(currentProject + 1);
    }
  };

  // Function to handle previous project
  const handlePrevProject = () => {
    setDirection(1);
    if (currentProject === 0) {
      setCurrentProject(projects.length - 1);
    } else {
      setCurrentProject(currentProject - 1);
    }
  };

  // UseEffect to handle automatic change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextProject();
    }, 3000); // Change project every 5 seconds

    return () => clearInterval(interval);
  }, [currentProject]); // Restart interval when currentProject changes

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
    <div className="w-full h-full justify-center items-center flex flex-row relative overflow-hidden">
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
            <Image
              src={`/images/home/project/${projects[currentProject].nama}.png`}
              alt={projects[currentProject].nama}
              width={1000}
              height={1000}
              className="object-contain p-[8%] flex rounded-3xl"
            />
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
