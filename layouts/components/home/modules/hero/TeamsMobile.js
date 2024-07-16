"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function TeamsMobile() {
  const listNama = [
    {
      nama: "aziz",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "/project?id=1",
      linkedin: "https://www.linkedin.com/in/rizkyazizz",
    },
    {
      nama: "rasyid",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "/project?id=2",
      linkedin: "https://www.linkedin.com/in/rasyidkusnady/",
    },
    {
      nama: "wildan",
      role1: "UI/UX Designer",
      role2: "Data Scientist",
      project: "/project?id=3",
      linkedin: "https://www.linkedin.com/in/wildanzake/",
    },
    {
      nama: "nawal",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "/project?id=4",
      linkedin: "https://www.linkedin.com/in/nawalrizky/",
    },
    {
      nama: "darel",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "/project?id=5",
      linkedin: "https://www.linkedin.com/in/markerizal/",
    },
  ];

  const className = {
    right:
      "absolute right-0 w-[10%] h-auto z-[11] px-[2%] hover:scale-150 transition-transform duration-300 cursor-pointer",
    center: "h-full w-auto object-contain z-10",
    left: "absolute left-0 w-[10%] h-auto z-[11] px-[2%] hover:scale-150 transition-transform duration-300 cursor-pointer",
  };

  const [indeks, setIndeks] = useState(2);
  const prefIndex = indeks - 1 >= 0 ? indeks - 1 : indeks + listNama.length - 1;
  const nextIndex = indeks + 1 < listNama.length ? indeks + 1 : 0;

  const activeImageRef = useRef(null);
  const prevImageRef = useRef(null);
  const nextImageRef = useRef(null);

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
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

  return (
    <div className="flex w-full h-full justify-center relative items-center">
      <Image
        src={`/images/home/${listNama[indeks].nama}_warna.png`}
        alt="teams"
        width={500}
        height={500}
        ref={activeImageRef}
        className="h-full w-auto object-contain z-10"
      />
      <Image
        src={`/images/home/${listNama[prefIndex].nama}_grayscale.png`}
        alt="teams"
        width={500}
        height={500}
        ref={prevImageRef}
        className="absolute bottom-0 right-[-10%] md:right-0 h-[80%] w-auto opacity-50"
      />
      <Image
        src={`/images/home/${listNama[nextIndex].nama}_grayscale.png`}
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
      <div className="flex flex-col w-[50%] justify-center items-center pb-[5%] gap-2 absolute bottom-0 z-10">
        <Link
          className="flex felx-row justify-center items-center w-[80%] text-center bg-secondary py-[3%] rounded-sm font-reddit-sans text-white text-[0.5rem] hover:bg-primary hover:text-secondary transition-colors duration-300 ease-in-out gap-1"
          href={listNama[indeks].project}
        >
          PROJECT{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
          >
            <path
              d="M7.2018 1.74294L2.09643 1.78898L2.10715 0.599881L9.24256 0.535534L9.2372 1.13008L9.17822 7.67095L7.98912 7.68167L8.03516 2.5763L2.00733 8.60413L0.340604 8.60413L7.2018 1.74294Z"
              fill="white"
            />
          </svg>
        </Link>
        <Link
          className="flex felx-row justify-center items-center w-[80%] text-center bg-transparent border border-white py-[3%] rounded-sm font-reddit-sans text-white text-[0.5rem] hover:bg-white hover:text-secondary transition-colors duration-300 ease-in-out"
          href={listNama[indeks].linkedin}
        >
          LinkedIn
        </Link>
      </div>
    </div>
  );
}
