"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HomeShowcase() {
  const scroller = useRef();
  const skills = useRef();
  
  const getResponsiveXPercent = () => {
    if (window.innerWidth >= 1600) {
      // Large screens (desktop)
      return -100 * 0.3;
    } else if (window.innerWidth >= 1280) {
     
      return -100 * 0.35;
    } else if(window.innerWidth >=800) {
       // Medium screens (tablets)
      return -100 * 0.40;
    }
     else if(window.innerWidth >=600) {
       // Medium screens (tablets)
      return -100 * 0.42;
    }
     else if(window.innerWidth >=300) {
       // Medium screens (tablets)
      return -100 * 0.45;
    }
  };

  const createScrollAnimation = () => {
    let skillSet = gsap.utils.toArray(".skill-set");

    return gsap.to(skillSet, {
      xPercent: getResponsiveXPercent,
      ease: "none",
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        end: () => "+=" + window.innerWidth,
      },
    });
  };

  useEffect(() => {
    let animation = createScrollAnimation();

    const resizeHandler = () => {
      animation.kill();
      animation = createScrollAnimation();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      animation.kill();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  const cardItems = Array.from({ length: 7 });
 


  return (
    <div className="py-10 overflow-hidden">
      
    <div
      id="sliderWrapper"
      ref={scroller}
      className="flex flex-col  w-full font-reddit-sans items-center py-20"
    >
      <div className="  text-center max-w-sm lg:px-0 lg:max-w-3xl ">
        <p className="text-white text-[16px] lg:text-2xl font-bold">
          Showcase of Excellence:
        </p>
        <div className="lg:inline-flex items-center mt-2">
          <span className="text-white text-[24px] lg:text-[40px] font-bold box-decoration-slice p-2 bg-secondary lg:px-2">
            Real-World Applications{" "}
          </span>
          <span className="text-white text-[24px] lg:text-[40px] font-bold ml-2">
            of Our Services
          </span>
        </div>
        <p className="font-medium px-10 text-[10px] lg:text-base lg:px-0 mt-2">
          Explore our curated showcase of flagship projects that exemplify the
          application and impact of our services across diverse industries.{" "}
        </p>
      </div>

      <div className=" flex flex-col items-center gap-4 mt-14 ">
      <section
            ref={skills}
            className="skill-set flex-nowrap flex gap-4 pl-[58rem] items-center justify-center"
          >
            {cardItems.map((_, index) => (
              <div key={index} className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex justify-center items-end overflow-hidden">
                <div className="overflow-hidden rounded-[20px] h-full z-0 shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary">
                  <Image
                    src="/images/home/home_project_porsenigama.png"
                    alt={`project-${index}`}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full z-0"
                  />
                </div>
                <div className="hoverable bg-gradient-to-b from-transparent to-black to-[80%] flex justify-end items-center gap-2 fixed h-[60px] max-w-[292px] lg:max-w-[342px] lg:h-[80px] rounded-b-[20px] py-1 px-3">
                  <Image
                    src="/images/home/ornamen_bintang.svg"
                    alt="ornamen"
                    width={1000}
                    height={1000}
                    className="w-[6%] h-auto"
                  />
                  <p className="text-primary text-[10px] lg:text-[15px] font-bold z-20 w-full">
                    Interactive Custom Website for Lustrum KMTSL XI National Event
                  </p>
                </div>
              </div>
            ))}
          </section>
        <section
          ref={skills}
          className="skill-set flex-nowrap flex gap-4 pl-[58rem] items-center justify-center "
        >
          {cardItems.map((_, index) => (
  index === 6 ? (
    <Link href="/" key={index} className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary flex justify-center items-center">
      <div className="text-primary text-3xl font-bold text-center py-3 flex gap-2 items-center">
        ALL PROJECT
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 18 16" fill="none">
          <path
            d="M13.6957 2.81401L4.13163 2.90026L4.15172 0.67268L17.5188 0.552136L17.5087 1.66592L17.3982 13.9192L15.1706 13.9393L15.2569 4.37517L3.96472 15.6673H0.842385L13.6957 2.81401Z"
            fill="#B8E930"
          />
        </svg>
      </div>
    </Link>
  ) : (
    <div key={index} className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex justify-center items-end overflow-hidden">
      <div className="overflow-hidden rounded-[20px] h-full z-0 shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary">
        <Image
          src="/images/home/home_project_porsenigama.png"
          alt={`project-${index}`}
          width={1000}
          height={1000}
          className="object-cover w-full h-full z-0"
        />
      </div>
      <div className="hoverable bg-gradient-to-b from-transparent to-black to-[80%] flex justify-end items-center gap-2 fixed h-[60px] max-w-[292px] md:max-w-[342px] lg:h-[80px] rounded-b-[20px] py-1 px-3">
        <Image
          src="/images/home/ornamen_bintang.svg"
          alt="ornamen"
          width={1000}
          height={1000}
          className="w-[6%] h-auto"
        />
        <p className="text-primary text-[10px] lg:text-[15px] font-bold z-20 w-full">
          Interactive Custom Website for Lustrum KMTSL XI National Event
        </p>
      </div>
    </div>
  )
))}

        </section>
       
      </div>
      </div>
    </div>
  );
}
