"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";

export default function Teams({
  isFilterActive,
  setFilterActive,
  setID,
  activeImage,
  setActiveImage,
  projectID,
  setProjectID,
}) {
  useEffect(() => {
    if (!(projectID === null) && !isNaN(parseInt(projectID))) {
      console.log("projectIDTeams", projectID);
      setActiveImage(parseInt(projectID));
      setID([parseInt(projectID)]);

      handleSetFilter2();
    }
  }, [projectID]);

  const listNama = [
    {
      nama: "aziz",
      namaLengkap: "Muhammad Rizky Aziz",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "rasyid",
      namaLengkap: "Rasyid Kusnady",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "wildan",
      namaLengkap: "Wildan Dzaky Ramadhani",
      role1: "UI/UX Designer",
      role2: "Data Scientist",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "nawal",
      namaLengkap: "Nawal Rizky Kautsar",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
    {
      nama: "darel",
      namaLengkap: "Darriel Markerizal",
      role1: "Frontend Developer",
      role2: "Backend Developer",
      project: "#",
      linkedin: "#",
    },
  ];

  const stateGrayscale = [
    {
      filename: "warna",
      className: "relative h-[100%] w-auto z-[72] warna",
      classNameFilter: "absolute right-0 h-[100%] w-auto z-[72]",
    },
    {
      filename: "grayscale",
      className: "relative h-[95%] w-auto z-[71] grayscale",
      translatePositive: "translate-x-[22%]",
      translateNegative: "-translate-x-[22%]",
    },
    {
      filename: "grayscale",
      className: "relative h-[90%] w-auto z-[70] grayscale",
      translatePositive: "translate-x-[50%]",
      translateNegative: "-translate-x-[50%]",
    },
    {
      filename: "grayscale",
      className: "relative h-[85%] w-auto z-[69] grayscale",
      translatePositive: "translate-x-[85%]",
      translateNegative: "-translate-x-[85%]",
    },
    {
      filename: "grayscale",
      className: "relative h-[80%] w-auto z-[68] grayscale",
      translatePositive: "translate-x-[115%]",
      translateNegative: "-translate-x-[115%]",
    },
  ];

  const handleClick = (index) => {
    setActiveImage(index);
  };

  const handleHover = (index) => {
    setActiveImage(index);
  };

  const handleSetFilter = () => {
    setFilterActive(!isFilterActive);

    if (isFilterActive) {
      setID([]);
    }
    if (!isFilterActive) {
      setID([activeImage]);
    }

    gsap.to(".container-teams", {
      y: isFilterActive ? 0 : 300,
      display: isFilterActive ? "flex" : "none",
      opacity: isFilterActive ? 1 : 0,
      duration: 0.5,
    });
    gsap.to(".role1", {
      x: isFilterActive ? 0 : -300,
      opacity: isFilterActive ? 1 : 0,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(".role2", {
      x: isFilterActive ? 0 : 300,
      opacity: isFilterActive ? 1 : 0,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(".fullname", {
      scale: isFilterActive ? 1 : 0,
      opacity: isFilterActive ? 1 : 0,
      delay: 1,
      duration: 0.5,
    });
  };

  const handleSetFilter2 = () => {
    setFilterActive(!isFilterActive);

    gsap.to(".container-teams", {
      y: isFilterActive ? 0 : 300,
      display: isFilterActive ? "flex" : "none",
      opacity: isFilterActive ? 1 : 0,
      duration: 0.5,
    });
    gsap.to(".role1", {
      x: isFilterActive ? 0 : -300,
      opacity: isFilterActive ? 1 : 0,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(".role2", {
      x: isFilterActive ? 0 : 300,
      opacity: isFilterActive ? 1 : 0,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(".fullname", {
      scale: isFilterActive ? 1 : 0,
      opacity: isFilterActive ? 1 : 0,
      delay: 1,
      duration: 0.5,
    });
  };

  const getTranslateX = () => {
    if (activeImage === 1) {
      return "translate-x-[10%]";
    }
    if (activeImage === 5) {
      return "translate-x-[-10%]";
    }
    if (activeImage === 2) {
      return "translate-x-[5%]";
    }
    if (activeImage === 4) {
      return "translate-x-[-5%]";
    }
    if (activeImage === 3) {
      return "translate-x-0";
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div
        className={`relative flex w-full h-full items-end transition-transform duration-500 ease-in-out ${getTranslateX()} z-10 overflow-y-clip`}
      >
        <div
          data-aos="fade-up"
          className="relative flex container-teams h-full items-end justify-center z-[30] transition-all duration-300 ease-in-out"
        >
          {Array(5)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => {
              const distance = Math.abs(activeImage - index);
              const grayscaleIndex = Math.min(
                distance,
                stateGrayscale.length - 1
              );

              const isLeft = index < activeImage;

              return (
                <Image
                  key={index}
                  onMouseEnter={() => handleHover(index)}
                  src={`/images/home/${listNama[index - 1].nama}_${
                    activeImage === index ? "warna" : "grayscale"
                  }.png`}
                  alt="ornamen"
                  width={1000}
                  height={1000}
                  className={`${
                    activeImage === index
                      ? stateGrayscale[0].className
                      : grayscaleIndex < stateGrayscale.length
                      ? `${stateGrayscale[grayscaleIndex].className} ${
                          isLeft
                            ? stateGrayscale[grayscaleIndex].translatePositive
                            : stateGrayscale[grayscaleIndex].translateNegative
                        }`
                      : ""
                  } transition-all duration-300 ease-in-out cursor-pointer`}
                  onClick={() => handleClick(index)}
                />
              );
            })}
        </div>
      </div>
      <div className="absolute flex w-full justify-between items-end px-[5%] top-[25%] font-bold">
        <div className=" font-reddit-sans text-primary pt-[3%] role1">
          <p className="xl:text-base 2xl:text-2xl">Role</p>
          <p className="xl:text-2xl 2xl:text-4xl">
            {listNama[activeImage - 1].role1}
          </p>
        </div>
        <p className=" font-reddit-sans text-primary xl:text-5xl self-start text-center fullname">
          {listNama[activeImage - 1].namaLengkap}
        </p>
        <div className=" font-reddit-sans text-primary pt-[3%] text-right role2">
          <p className="xl:text-base 2xl:text-2xl">Role</p>
          <p className="xl:text-2xl 2xl:text-4xl">
            {listNama[activeImage - 1].role2}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center items-center absolute bottom-[10%] py-[2%] z-[20]">
        <button
          onClick={handleSetFilter}
          className={`py-2 px-4 font-bold xl:text-base 2xl:text-xl rounded-lg border hover:border-primary hover:text-primary ${
            !isFilterActive
              ? "border-white text-white shadow-white"
              : "border-secondary text-secondary drop-shadow-lg shadow-secondary"
          }`}
        >
          {isFilterActive ? "deselect" : "Select as Filter"}
        </button>
      </div>
    </>
  );
}
