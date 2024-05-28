"use client";
import React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function LastProject() {
  const [direction, setDirection] = useState(-1);

  const projects = [
    { nama: "lustrum" },
    { nama: "porsenigama" },
    { nama: "jobs" },
    { nama: "dreams" },
    { nama: "cia" },
    { nama: "nusa" },
  ];

  const [currentProject, setCurrentProject] = useState(0);

  const handleNextProject = () => {
    setDirection(-1);
    if (currentProject === projects.length - 1) {
      setCurrentProject(0);
    } else {
      setCurrentProject(currentProject + 1);
    }
  };

  const handlePrevProject = () => {
    setDirection(1);
    if (currentProject === 0) {
      setCurrentProject(projects.length - 1);
    } else {
      setCurrentProject(currentProject - 1);
    }
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        position: "absolute",
        width: "100%",
      };
    },
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
      <div className="flex w-full h-full justify-center items-center relative overflow-clip ">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentProject}
            className="w-full justify-center items-center flex"
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
              src={`/images/home/home_project_${projects[currentProject].nama}.png`}
              alt={projects[currentProject].nama}
              width={1000}
              height={1000}
              className="object-contain p-[8%]"
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
