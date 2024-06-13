"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const RunningText = ({ color }) => {
  // const textRef = useRef(null);

  // useEffect(() => {
  //   const textElement = textRef.current;
  //   const textWidth = textElement.offsetWidth;
  //   const screenWidth = window.innerWidth;

  //   // Calculate total width of text content
  //   const totalTextWidth = textWidth * 20; // Assuming 10 repetitions of the text

  //   // Calculate duration based on the total width and screen width
  //   const duration = (totalTextWidth + screenWidth) / screenWidth;

  //   gsap.to(textElement, {
  //     x: `-=${screenWidth}`,
  //     duration: 10,
  //     ease: "none",
  //     repeat: -1,
  //     paused: false,
  //   });
  // }, []);

  return (
    <div className={`w-full bg-${color} py-[4px] overflow-hidden`}>
      <div className="flex-row flex " style={{ whiteSpace: "nowrap" }}>
        <Marquee autoFill={true}>
          <div className="flex flex-row items-center">
            <div className="w-[24px] h-[24px] items-center justify-center">
              <Image
                src="/images/home/logoNsRunningBlack.png"
                width={24}
                height={24}
                alt="Nusa Quanta"
              />
            </div>
            <p className="ml-4 mr-4 font-reddit-sans text-[24px]">
              Leading the Way in Excellence
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-[24px] h-[24px] items-center justify-center">
              <Image
                src="/images/home/logoNsRunningBlack.png"
                width={24}
                height={24}
                alt="Nusa Quanta"
              />
            </div>
            <p className="ml-4 mr-4 font-reddit-sans text-[24px]">
              Crafting Ideas into Reality
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-[24px] h-[24px] items-center justify-center">
              <Image
                src="/images/home/logoNsRunningBlack.png"
                width={24}
                height={24}
                alt="Nusa Quanta"
              />
            </div>
            <p className="ml-4 mr-4 font-reddit-sans text-[24px]">
              Where Creativity Meets Possibility
            </p>
          </div>
        </Marquee>
      </div>
      {/* <div
        className="flex-row flex"
        style={{ whiteSpace: "nowrap", marginLeft: "-100%" }}
      >
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex flex-row items-center">
            <div className="w-[24px] h-[24px] items-center justify-center">
              <Image
                src="/images/home/logoNsRunning.png"
                width={24}
                height={24}
                alt="Nusa Quanta"
              />
            </div>
            <p className="ml-4 mr-4 font-reddit-sans text-[24px]">
              Leading the Way in Excellence
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default RunningText;
