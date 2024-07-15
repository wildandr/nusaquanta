"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function TeamsMobile({
  setID,
  setIndeks,
  indeks,
  setSelectedTeam,
  projectID,
  isFilterActive,
  setFilterActive,
}) {
  useEffect(() => {
    if (!(projectID === null) && !isNaN(parseInt(projectID))) {
      console.log("projectIDTeams", projectID);
      setIndeks(parseInt(projectID) - 1);
    }
  }, [projectID]);

  const listNama = [
    {
      nama: "aziz",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "rasyid",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "wildan",
      role1: "UI/UX Designer",
      role2: "Data Scientist",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "nawal",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "darel",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
  ];

  const className = {
    right:
      "absolute right-0 w-[10%] h-auto z-[11] px-[2%] hover:scale-150 transition-transform duration-300 cursor-pointer",
    center: "h-full w-auto object-contain z-10",
    left: "absolute left-0 w-[10%] h-auto z-[11] px-[2%] hover:scale-150 transition-transform duration-300 cursor-pointer",
  };

  const prefIndex = indeks - 1 >= 0 ? indeks - 1 : indeks + listNama.length - 1;
  const nextIndex = indeks + 1 < listNama.length ? indeks + 1 : 0;

  const activeImageRef = useRef(null);
  const prevImageRef = useRef(null);
  const nextImageRef = useRef(null);

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setID(-1);
    setSelectedTeam([]);
    setFilterActive(false);
    gsap.to(activeImageRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIndeks((prevIndeks) => (prevIndeks + 1) % listNama.length);
      },
    });
    gsap.to(prevImageRef.current, {
      opacity: 0,
      duration: 0.5,
    });
    gsap.to(nextImageRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  };

  const handlePrev = () => {
    setDirection(-1);
    setID(-1);
    setSelectedTeam([]);
    setFilterActive(false);
    gsap.to(activeImageRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIndeks(
          (prevIndeks) => (prevIndeks - 1 + listNama.length) % listNama.length
        );
      },
    });
    gsap.to(prevImageRef.current, {
      opacity: 0,
      duration: 0.5,
    });
    gsap.to(nextImageRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  };

  useEffect(() => {
    if (direction === 1) {
      gsap.fromTo(
        activeImageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }
    if (direction === -1) {
      gsap.fromTo(
        activeImageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }

    gsap.fromTo(
      prevImageRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.5 }
    );
    gsap.fromTo(
      nextImageRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.5 }
    );
  }, [indeks]);

  useEffect(() => {
    if (isFilterActive) {
      gsap.to(prevImageRef.current, {
        opacity: 0,
        duration: 0.5,
      });
      gsap.to(nextImageRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
    if (!isFilterActive) {
      gsap.to(prevImageRef.current, {
        opacity: 0.5,
        duration: 0.5,
      });
      gsap.to(nextImageRef.current, {
        opacity: 0.5,
        duration: 0.5,
      });
    }
  });

  return (
    <div className="flex w-full h-full justify-center relative items-center">
      <Image
        src={`/images/home/${
          listNama[indeks] ? listNama[indeks].nama : ""
        }_warna.png`}
        alt="teams"
        width={500}
        height={500}
        ref={activeImageRef}
        className="h-full w-auto object-contain z-10"
      />
      <Image
        src={`/images/home/${
          listNama[indeks - 1]
            ? listNama[indeks - 1].nama
            : listNama[listNama.length - 1].nama
        }_grayscale.png`}
        alt="teams"
        width={500}
        height={500}
        ref={prevImageRef}
        className="absolute bottom-0 right-[-10%] md:right-0 h-[80%] w-auto opacity-50"
      />
      <Image
        src={`/images/home/${
          listNama[indeks + 1] ? listNama[indeks + 1].nama : listNama[0].nama
        }_grayscale.png`}
        alt="teams"
        width={500}
        height={500}
        ref={nextImageRef}
        className="absolute bottom-0 left-[-10%] md:left-0 h-[80%] w-auto opacity-50"
      />
      <Image
        src={"/images/home/hero_arrow-right.svg"}
        width={1000}
        height={1000}
        alt="Arrow Right"
        onClick={handleNext}
        className="absolute right-0 w-[10%] h-auto z-[11] px-[2%] hover:scale-150 transition-transform duration-300 cursor-pointer"
      />
      <Image
        src={"/images/home/hero_arrow-left.svg"}
        width={1000}
        height={1000}
        alt="Arrow Left"
        onClick={handlePrev}
        className="absolute left-0 w-[10%] h-auto z-[11] px-[2%] hover:scale-150 transition-transform duration-300 cursor-pointer"
      />
    </div>
  );
}
