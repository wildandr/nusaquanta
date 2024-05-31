"use client";
import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import LastProject from "@components/home/modules/hero/LastProject";
import VideoProfile from "./modules/hero/VideoProfile";
import Teams from "./modules/hero/Teams";

export default function HomeHero() {
  const [playVideo, setPlayVideo] = useState(false);

  const handlePlayVideo = () => {
    setPlayVideo(true);
  };
  const handleStopVideo = () => {
    setPlayVideo(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-clip p-4">
      <div className="w-full h-full grid grid-cols-2 gap-4 p-8 bg-black rounded shadow-lg">
        <div className="p-4 h-[45vh] border border-primary rounded-3xl relative z-50">
          <LastProject />
          <div className="w-full flex flex-row justify-between absolute bottom-0">
            <Link
              href={""}
              className="flex flex-row items-center justify-center gap-2 font-reddit-sans text-primary font-600 text-lg 2xl:text-xl p-[2%] z-[69]"
            >
              LAST PROJECT
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
              >
                <path
                  d="M13.6957 2.81401L4.13163 2.90026L4.15172 0.67268L17.5188 0.552136L17.5087 1.66592L17.3982 13.9192L15.1706 13.9393L15.2569 4.37517L3.96472 15.6673H0.842385L13.6957 2.81401Z"
                  fill="#B8E930"
                />
              </svg>
            </Link>
          </div>
          <Image
            src="/images/home/ornamen_bintang.svg"
            alt="ornamen"
            width={1000}
            height={1000}
            className="w-[6%] h-auto m-4 absolute bottom-0 right-0"
          />
        </div>
        <div className="h-[45vh] w-full border border-primary rounded-3xl relative overflow-clip z-50">
          <VideoProfile play={playVideo} />
          <div
            style={{ backdropFilter: "blur(8.149999618530273px)" }}
            className={`bg-gray-900 opacity-75 absolute flex flex-col justify-center items-center w-full h-full z-60 top-0 ${
              playVideo ? "hidden" : "block"
            }`}
          >
            <Image
              src="/images/home/play_button.svg"
              alt="play button"
              width={1000}
              height={1000}
              className={`w-[10%] h-auto m-4 rounded-full bg-gradient-radial hover:scale-125 transition-transform cursor-pointer`}
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 50%, rgba(184, 233, 48, 0.00) 130%)",
              }}
              onClick={handlePlayVideo}
            />
            <p className=" font-reddit-sans text-primary text-xl font-600 text-center">
              Nusa Quanta Compay Profile
            </p>
          </div>

          <Image
            src="/images/home/play_button.svg"
            alt="play button"
            width={1000}
            height={1000}
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 50%, rgba(184, 233, 48, 0.00) 130%)",
            }}
            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[10%] cursor-pointer hover:scale-125 transition-transform ${
              playVideo ? "opacity-0 hover:opacity-100" : "hidden"
            }`}
            onClick={handleStopVideo}
          />

          <Image
            src="/images/home/ornamen_bulat.svg"
            alt="ornamen"
            width={1000}
            height={1000}
            className="w-[6%] h-auto m-4 absolute bottom-0 left-0"
          />
        </div>
        <div className="px-6 gap-4 h-[45vh] rounded-3xl flex flex-col justify-center items-center">
          <div className="flex flex-row gap-8 justify-center items-center">
            <p className="w-[50%] font-reddit-sans xl:text-3xl 2xl:text-[2rem] font-600 z-50">
              Nusa Quanta
            </p>
            <div className="flex w-full">
              <Marquee autoFill={true}>
                <Image
                  src={"/images/home/hero_stripes.svg"}
                  width={1000}
                  height={1000}
                  alt="Moving"
                  className="w-full h-auto"
                />
              </Marquee>
            </div>
          </div>
          <p className="text-primary font-reddit-sans xl:text-6xl 2xl:text-[5.5rem] font-600 flex w-full text-center z-50">
            “Where Creativity Meets Possibility”
          </p>
          <p className="xl:text-sm 2xl:text-base z-50">
            Mission - Committed to being the epicenter of technological
            innovation, providing high-quality solutions that propel client
            success. We harness cutting-edge technology and deep industry
            knowledge to exceed the evolving demands of the industries we serve.
          </p>
        </div>
        <div className="relative overflow-clip px-4 pt-4 h-[45vh] border border-primary rounded-3xl z-[21]">
          <Image
            src="/images/home/ornamen_bintang.svg"
            alt="ornamen"
            width={1000}
            height={1000}
            className="w-[6%] h-auto m-4 absolute top-0 letf-0"
          />
          <Image
            src="/images/home/ornamen_bintang.svg"
            alt="ornamen"
            width={1000}
            height={1000}
            className="w-[6%] h-auto m-4 absolute top-0 right-0"
          />
          <p className="w-full text-center absolute top-0 py-4 text-5xl text-primary font-reddit-sans font-700">
            MEET OUR TEAM
          </p>
          <Teams className="z-[69]" />
        </div>
      </div>

      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 0%, rgba(184, 233, 48, 0.00) 100%)",
        }}
        className="absolute top-[-50%] right-[-20%] w-full h-full"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(96, 31, 235, 0.20) 0%, rgba(96, 31, 235, 0.00) 100%)",
        }}
        className="absolute top-[-10%] left-[-50%] w-full h-full z-20"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(96, 31, 235, 0.20) 0%, rgba(96, 31, 235, 0.00) 100%)",
        }}
        className="absolute bottom-[-20%] right-[-50%] w-full h-full z-20"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 0%, rgba(184, 233, 48, 0.00) 100%)",
        }}
        className="absolute bottom-[-50%] left-[-30%] w-full h-full z-20"
      ></div>
    </div>
  );
}
