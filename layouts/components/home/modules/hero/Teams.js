"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Teams() {
  const [activeImage, setActiveImage] = useState(3); // gambar tengah (indeks 3)

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

  const stateGrayscale = [
    {
      filename: "warna",
      className: "relative h-[85%] w-auto z-[72]",
    },
    {
      filename: "grayscale",
      className: "relative h-[80%] w-auto z-[71]",
      translatePositive: "translate-x-[25%]",
      translateNegative: "-translate-x-[25%]",
    },
    {
      filename: "grayscale",
      className: "relative h-[75%] w-auto z-[70]",
      translatePositive: "translate-x-[65%]",
      translateNegative: "-translate-x-[65%]",
    },
    {
      filename: "grayscale",
      className: "relative h-[70%] w-auto z-[69]",
      translatePositive: "translate-x-[115%]",
      translateNegative: "-translate-x-[115%]",
    },
    {
      filename: "grayscale",
      className: "relative h-[65%] w-auto z-[68]",
      translatePositive: "translate-x-[165%]",
      translateNegative: "-translate-x-[165%]",
    },
  ];

  const handleClick = (index) => {
    setActiveImage(index);
  };

  const handleHover = (index) => {
    setActiveImage(index);
  };

  const getTranslateX = () => {
    if (activeImage === 1) {
      return "translate-x-[18%]";
    }
    if (activeImage === 5) {
      return "translate-x-[-18%]";
    }
    if (activeImage === 2) {
      return "translate-x-[12%]";
    }
    if (activeImage === 4) {
      return "translate-x-[-12%]";
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
        className={`relative flex w-full h-full items-end transition-transform duration-500 ease-in-out ${getTranslateX()}`}
      >
        <div
          data-aos="fade-up"
          className="relative flex w-full h-full items-end justify-center z-[30]"
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
      <div className="absolute flex flex-row items-center justify-center bottom-0 left-0 w-full">
        <div className="flex flex-col w-full px-6">
          <p className=" text-primary font-reddit-sans font-900 text-sm">
            Role
          </p>
          <p className=" text-primary font-reddit-sans font-600 text-base">
            {listNama[activeImage - 1].role1}
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center pb-[2%] gap-2">
          <Link
            className="flex felx-row justify-center items-center w-[80%] text-center bg-secondary py-[3%] rounded-sm font-reddit-sans text-white text-[0.5rem] hover:bg-primary hover:text-secondary transition-colors duration-300 ease-in-out gap-1"
            href={listNama[activeImage - 1].project}
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
            href={listNama[activeImage - 1].linkedin}
          >
            LinkedIn
          </Link>
        </div>
        <div className="flex flex-col w-full items-end justify-center px-6">
          <p className=" text-primary font-reddit-sans font-900 text-sm">
            Role
          </p>
          <p className=" text-primary font-reddit-sans font-600 text-base">
            {listNama[activeImage - 1].role2}
          </p>
        </div>
      </div>
    </>
  );
}
