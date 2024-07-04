"use client";

import Teams from "./modules/Teams";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const [isFilterActive, setFilterActive] = useState(false);

  useEffect(() => {
    if (isFilterActive) {
      gsap.to(".description", {
        display: "none",
        opacity: 0,
        duration: 0.5,
      });
      gsap.to(".titel", {
        xPercent: -83,
        duration: 0.5,
        delay: 0.5,
      });
      gsap.fromTo(
        ".name",
        {
          opacity: 0,
          y: -50,
          display: "none",
        },
        {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.5,
          delay: 1.5,
        }
      );
      gsap.fromTo(
        ".foto",
        {
          opacity: 0,
          x: -100,
          display: "none",
        },
        {
          opacity: 1,
          x: 0,
          display: "flex",
          duration: 0.5,
          delay: 1.5,
        }
      );
      gsap.fromTo(
        ".moto",
        {
          opacity: 0,
          xPercent: 100,
          display: "none",
        },
        {
          opacity: 1,
          xPercent: 0,
          display: "flex",
          duration: 0.5,
          delay: 1.5,
        }
      );
    }
    if (!isFilterActive) {
      gsap.to(".description", {
        display: "block",
        opacity: 1,
        delay: 1.5,
        duration: 0.5,
      });
      gsap.to(".titel", {
        xPercent: 0,
        duration: 0.5,
        delay: 0.5,
      });
      gsap.to(".name", {
        opacity: 0,
        y: -50,
        display: "none",
        duration: 0.5,
      });
      gsap.to(".foto", {
        opacity: 0,
        x: -100,
        display: "none",
        duration: 0.5,
      });
      gsap.to(".moto", {
        xPercent: 100,
        display: "none",
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [isFilterActive]);

  return (
    <div className="bg-black flex flex-col relative h-screen w-full justify-between items-center pt-[2%] pb-[5%]">
      <div className=" titel flex flex-col justify-start items-center xl:gap-4 2xl:gap-6 text-center">
        <p className=" font-reddit-sans xl:text-5xl 2xl:text-6xl font-bold">
          <span className="text-black bg-primary">Project</span>
          <span className="text-primary">Showcase</span>
        </p>
        <p className=" font-reddit-sans xl:text-base 2xl:text-xl description">
          Discover the Brilliance Behind Our <br /> Most Innovative Creations
        </p>
        <p className=" font-reddit-sans xl:text-2xl 2xl:text-3xl text-primary self-start hidden name">
          Muhammad Rizky Aziz
        </p>
      </div>
      <button className="moto rounded-2xl border border-white hidden self-start px-[1%] py-[0.5%] ms-[14%] mt-[2%]">
        Download CV
      </button>
      <p className="moto hidden ps-[14%] pe-[35%] mt-[2%] xl:text-lg 2xl:text-2xl">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="flex-row w-full justify-end items-end px-[10%] foto hidden absolute top-[10%]">
        <div className="flex flex-col items-center relative">
          <Image
            src="/images/home/wildan_warna.png"
            alt="ornamen"
            width={1000}
            height={1000}
            className="h-[70vh] w-auto"
          />
          {/* <button
            onClick={setFilterActive.bind(this, false)}
            className={`absolute bottom-[10%] py-2 px-4 font-bold xl:text-base 2xl:text-xl rounded-lg border hover:border-primary hover:text-primary border-secondary text-secondary drop-shadow-lg shadow-secondary`}
          >
            deselect
          </button> */}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <Teams
          isFilterActive={isFilterActive}
          setFilterActive={setFilterActive}
        />
      </div>
    </div>
  );
}
