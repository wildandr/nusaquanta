"use client";

import Teams from "./modules/Teams";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import RunningText from "@elements/RunningText";

export default function Hero({ setID, projectID, setProjectID }) {
  const [isFilterActive, setFilterActive] = useState(false);
  const [activeImage, setActiveImage] = useState(3);
  const [people, setPeople] = useState([]);

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
          z: 11,
          display: "none",
        },
        {
          opacity: 1,
          x: 0,
          z: 11,
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
      gsap.fromTo(
        ".roles",
        {
          display: "none",
          opacity: 0,
          xPercent: 100,
        },
        {
          display: "flex",
          opacity: 1,
          duration: 0.5,
          xPercent: 0,
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
        z: 11,
        display: "none",
        duration: 0.5,
      });
      gsap.to(".moto", {
        xPercent: 100,
        display: "none",
        opacity: 0,
        duration: 0.5,
      });
      gsap.to(".roles", {
        display: "none",
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [isFilterActive]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://nusaquanta.store/api/people"
          // {
          //     headers: {
          //         Authorization: process.env.NEXT_PUBLIC_API_TOKEN,
          //     },
          // }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPeople(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="bg-black flex flex-col relative h-screen w-full justify-between items-center pt-[2%] pb-[5%]">
      <div className="roles absolute flex-col justify-center top-[5%] ps-[15%] hidden gap-[1rem] z-[11]">
        <p className="font-bold text-primary text-2xl">Role</p>
        <p className="font-bold text-primary text-4xl">
          {people.length > 0
            ? people[activeImage - 1].topRoles[0]?.job_name
            : ""}
        </p>
        <p className="font-bold text-primary text-2xl">
          {people.length > 0
            ? people[activeImage - 1].topRoles[1]?.job_name
            : ""}
        </p>
        <p className="font-bold text-primary text-2xl">
          {people.length > 0
            ? people[activeImage - 1].topRoles[2]?.job_name
            : ""}
        </p>
      </div>
      <div className=" titel flex flex-col justify-start items-center xl:gap-4 2xl:gap-6 text-center">
        <p className=" font-reddit-sans xl:text-5xl 2xl:text-6xl font-bold z-10">
          <span className="text-black bg-primary">Project</span>
          <span className="text-primary">Showcase</span>
        </p>
        <p className=" font-reddit-sans xl:text-base 2xl:text-xl description">
          Discover the Brilliance Behind Our <br /> Most Innovative Creations
        </p>
        <p className=" font-reddit-sans xl:text-2xl 2xl:text-3xl text-primary self-start hidden name">
          {people.length > 0 ? people[activeImage - 1].full_name : ""}
        </p>
      </div>
      <Link
        href={people.length > 0 ? people[activeImage - 1].cv : ``}
        className="moto rounded-2xl border border-white hidden self-start px-[1%] py-[0.5%] ms-[14%] mt-[2%] hover:bg-primary hover:text-black z-[69]"
      >
        Download CV
      </Link>
      <p className="moto hidden ps-[14%] pe-[35%] mt-[2%] xl:text-lg 2xl:text-2xl z-10">
        {people.length > 0 ? people[activeImage - 1].description : ""}
      </p>

      <div className="flex flex-col justify-center items-center h-[60vh] z-[11]">
        <Teams
          isFilterActive={isFilterActive}
          setFilterActive={setFilterActive}
          setID={setID}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
          projectID={projectID}
          setProjectID={setProjectID}
        />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center top-0">
        <div className="flex-row w-full justify-end items-end px-[10%] foto hidden absolute top-[10%] z-10">
          <Image
            src={`/images/home/${listNama[activeImage - 1].nama}_warna.png`}
            alt="ornamen"
            width={1000}
            height={1000}
            className="flex h-[70vh] w-auto z-10"
          />
        </div>
        <RunningText
          color={"secondary absolute bottom-[6%] opacity-50 z-[20]"}
        />
        <div
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 0%, rgba(184, 233, 48, 0.00) 100%",
          }}
          className="absolute top-[-30%] left-[-40%] w-full h-full z-10"
        ></div>
        <div
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(96, 31, 235, 0.20) 0%, rgba(96, 31, 235, 0.00) 100%)",
          }}
          className="absolute bottom-[-20%] right-[-50%] w-full h-full z-10"
        ></div>
        <Image
          src={"/images/project/logo_nusaquanta.svg"}
          width={1000}
          height={1000}
          alt="logo"
          className="absolute bottom-[-10%] opacity-10 h-full w-auto z-10"
        />
        <div className="relative min-h-screen w-full flex justify-center items-center">
          <Image
            src={"/images/project/3d_kiri.png"}
            width={1000}
            height={1000}
            alt="ornamen"
            className="absolute right-[0] h-[70%] w-auto opacity-30 top-[10%]"
          />
          <Image
            src={"/images/project/3d_kanan.png"}
            width={1000}
            height={1000}
            alt="ornamen"
            className="absolute left-[0] h-[70%] w-auto opacity-30 top-[10%]"
          />
        </div>
      </div>
    </div>
  );
}
