"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HomeShowcase() {
  const scroller = useRef();
  const skills = useRef();

  useEffect(() => {
    let skillSet = gsap.utils.toArray(".skill-set");

    let to = gsap.to(skillSet, {
      xPercent: () => -100 * (skillSet.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (skillSet.length - 1),

        end: () => "+=" + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <div
      id="sliderWrapper"
      ref={scroller}
      className="flex flex-col  w-full font-reddit-sans items-center py-5"
    
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
          className="skill-set flex-nowrap flex gap-4 pl-[58rem] items-center justify-center "
        >
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-0 overflow-hidden rounded-[20px]  shadow-[0_0_10px_1px_rgba(0,0,0,0.5)] shadow-primary flex justify-center items-end">
        <Image
          src="/assets/porseni.png"
          alt="coba"
          width={1000}
          height={1000}
          className="object-cover w-full h-full z-0 "
        />
        <div className="hoverable bg-gradient-to-b from-transparent to-black to-[80%]  h-[80px] flex items-end fixed max-w-[350px]  rounded-b-[20px] py-2">
      
        <p className="text-primary text-[14px] font-bold z-20 w-full px-10">
          Interactive Custom Website for Lustrum KMTSL XI National Event
        </p>
        </div>
      </div>
      
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1  rounded-[20px]  border-2 border-primary flex justify-center items-end  overflow-hidden">
      <div className="overflow-hidden rounded-[20px] h-full z-0  shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary ">
      <Image
              src="/assets/porseni.png"
              alt="coba"
              width={1000}
              height={1000}
              className="object-cover w-full h-full z-0"
            />
            
            </div>
            <div className="bg-gradient-to-b from-transparent to-black fixed max-w-[340px] z-20 rounded-b-[20px] mx-2 py-2">
        <p className="text-primary text-[14px] font-bold text-center  w-full px-10">
          Interactive Custom Website for Lustrum KMTSL XI National Event
        </p>
        </div>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-0 overflow-hidden rounded-[20px]  shadow-[0_0_10px_1px_rgba(0,0,0,0.5)] shadow-primary flex justify-center items-end">
        <Image
          src="/assets/dashboard.png"
          alt="coba"
          width={1000}
          height={1000}
          className="object-cover w-full h-full z-0 "
        />
        <div className=" bg-gradient-to-b from-transparent to-black to-[120%]  h-[130px] flex items-end fixed max-w-[350px]  rounded-b-[20px] py-2">
      
        <p className="text-primary text-[14px] font-bold z-20 w-full px-10">
          Interactive Custom Website for Lustrum KMTSL XI National Event
        </p>
        </div>
      </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary  flex  justify-center items-end ">
            <Image
              src="/assets/porseni.png"
              alt="coba"
              width={350}
              height={350}
              className="object-cover w-full h-full z-10 shadow-inner "
            />
            <p className="text-primary text-[14px] text-center z-20 fixed max-w-64">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] shadow-md shadow-primary flex justify-center items-end">
            <p className="text-primary text-[14px] text-center py-3">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary  flex  justify-center items-end ">
            <Image
              src="/assets/porseni.png"
              alt="coba"
              width={350}
              height={350}
              className="object-cover w-full h-full z-10 shadow-inner "
            />
            <p className="text-primary text-[14px] text-center z-20 fixed max-w-64">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] shadow-md shadow-primary flex justify-center items-end">
            <p className="text-primary text-[14px] text-center py-3">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
        </section>
        <section
          ref={skills}
          className="skill-set flex-nowrap flex gap-4 pl-[58rem] items-center justify-center "
        >
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary  flex  justify-center items-end ">
            <Image
              src="/assets/porseni.png"
              alt="coba"
              width={350}
              height={350}
              className="object-cover w-full h-full z-10 shadow-inner "
            />
            <p className="text-primary text-[14px] text-center z-20 fixed max-w-64">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] shadow-md shadow-primary flex justify-center items-end">
            <p className="text-primary text-[14px] text-center py-3">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary  flex  justify-center items-end ">
            <Image
              src="/assets/porseni.png"
              alt="coba"
              width={350}
              height={350}
              className="object-cover w-full h-full z-10 shadow-inner "
            />
            <p className="text-primary text-[14px] text-center z-20 fixed max-w-64">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] shadow-md shadow-primary flex justify-center items-end">
            <p className="text-primary text-[14px] text-center py-3">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary  flex  justify-center items-end ">
            <Image
              src="/assets/porseni.png"
              alt="coba"
              width={350}
              height={350}
              className="object-cover w-full h-full z-10 shadow-inner "
            />
            <p className="text-primary text-[14px] text-center z-20 fixed max-w-64">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] shadow-md shadow-primary flex justify-center items-end">
            <p className="text-primary text-[14px] text-center z-20 fixed max-w-64">
              {" "}
              Interactive Custom Website for Lustrum KMTSL XI National Event
            </p>
          </div>
          <div className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary flex justify-center items-center">
            <p className="text-primary text-3xl font-bold text-center py-3">
              {" "}
              ALL PROJECT
            </p>
          </div>
         
        </section>
      </div>
    </div>
  );
}
