"use client"
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HomeShowcase() {
  const scroller = useRef();
  const skills = useRef();
  const [cardItems, setCardItems] = useState([]);
  const [firstCardItems, setFirstCardItems] = useState([]);
  const [secondCardItems, setSecondCardItems] = useState([]);

  const getResponsiveXPercent = () => {
    if (window.innerWidth >= 1600) {
      return -100 * 0.4;
    } else if (window.innerWidth >= 1280) {
      return -100 * 0.35;
    } else if (window.innerWidth >= 800) {
      return -100 * 0.42;
    } else if (window.innerWidth >= 600) {
      return -100 * 0.42;
    } else if (window.innerWidth >= 300) {
      return -100 * 0.46;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backend.nusaquanta.com/api/projects?populate[products]=*&populate[categories]=*&populate[project_teams][populate][people][fields]=full_name&populate[project_teams][populate][jobs][fields]=job_name&populate[image]=*"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        const projects = result.data;
        const formattedData = projects.map((project) => {
          const imageUrl = project.attributes.image?.data?.[0]?.attributes?.url;
          const absoluteImageUrl = imageUrl
            ? `https://backend.nusaquanta.com${imageUrl}`
            : "/default-image.png";

          return {
            id: project.id,
            title: project.attributes.project_name,
            imageUrl: absoluteImageUrl,
            description:
              project.attributes.description || "No description available",
          };
        });

        // Splitting data into two sets
        const firstSet = formattedData.filter(
          (item) => item.id >= 1 && item.id <= 7
        );
        const secondSet = formattedData.filter(
          (item) => item.id >= 8 && item.id <= 14
        );

        setFirstCardItems(firstSet.slice(0, 7)); // Displaying first 7 items from ID 1-7
        setSecondCardItems(secondSet.slice(0, 7)); // Displaying maximum 6 items from ID 8-13

        // Set all items for animation if needed
        setCardItems(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    const createScrollAnimation = () => {
      let skillSet = gsap.utils.toArray(".skill-set");

      return gsap.to(skillSet, {
        xPercent: getResponsiveXPercent(),
        ease: "none",
        scrollTrigger: {
          start: "top 10%",
          trigger: scroller.current,
          markers: false,
          pin: true,
          pinSpacing: true,
          scrub: 2,
          invalidateOnRefresh: false,
          anticipatePin: 1,
          end: () => "+=" + window.innerWidth ,
        },
      });
    };
    let animation = createScrollAnimation();

    const resizeHandler = () => {
      animation.kill();
      animation = createScrollAnimation();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      animation.kill();
      window.removeEventListener("resize", resizeHandler);
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="py-10 ">
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 0%, rgba(184, 233, 48, 0.00) 100%)",
        }}
        className="absolute top-[250%] lg:top-[190%] left-[-40%] w-full h-full -z-20"
      ></div>
      <div
        id="sliderWrapper"
        ref={scroller}
        className="flex flex-col w-full font-reddit-sans items-center"
      >
        <div className="text-center max-w-sm lg:px-0 lg:max-w-3xl lg:pt-10">
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

        <div className="flex flex-col items-center gap-4 mt-14">
          <section
            ref={skills}
            className="skill-set flex-nowrap flex gap-4 pl-[120rem] md:pl-[105rem] lg:pl-[100rem] xl:pl-[85rem] 2xl:pl-[70rem] items-center justify-center"
          >
            {firstCardItems.map((item, index) => (
              <div
                key={index}
                className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex flex-col justify-center items-end overflow-hidden"
              >
                <Link
                  href={`/project/${item.id}`}
                  className="overflow-hidden rounded-[20px] h-full shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary z-10 w-full"
                >
                  <div className="h-full w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={1000}
                      height={1000}
                      className="object-cover  z-0"
                    />
                  </div>
                </Link>
                <div className=" hoverable bg-gradient-to-b from-transparent to-black to-[80%] -mt-20 flex justify-end items-center gap-2 z-20 h-[80px] lg:max-w-[342px] rounded-b-[20px] py-1 px-3 w-full">
                  <Image
                    src="/images/home/ornamen_bintang.svg"
                    alt="ornamen"
                    width={1000}
                    height={1000}
                    className="w-[6%] h-auto"
                  />
                  <p className="text-primary text-[10px] lg:text-[15px] font-bold z-20 w-full">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </section>
          <section
            ref={skills}
            className="skill-set flex-nowrap flex gap-4 pl-[120rem] md:pl-[105rem] lg:pl-[100rem] xl:pl-[85rem] 2xl:pl-[70rem] items-center justify-center"
          >
            {secondCardItems.map((item, index) =>
              index === secondCardItems.length - 1 ? (
                <Link
                  href="/project"
                  key={index}
                  className="w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-[20px] border-2 border-primary flex justify-center items-center cursor-pointer"
                >
                  <div className="text-primary text-3xl font-bold text-center py-3 flex gap-2 items-center">
                    ALL PROJECT
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="20"
                      viewBox="0 0 18 16"
                      fill="none"
                    >
                      <path
                        d="M13.6957 2.81401L4.13163 2.90026L4.15172 0.67268L17.5188 0.552136L17.5087 1.66592L17.3982 13.9192L15.1706 13.9393L15.2569 4.37517L3.96472 15.6673H0.842385L13.6957 2.81401Z"
                        fill="#B8E930"
                      />
                    </svg>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex flex-col justify-center items-end overflow-hidden"
                >
                  <Link
                    href={`/project/${item.id}`}
                    className="overflow-hidden rounded-[20px] h-full shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary z-10 w-full"
                  >
                    <div className="h-full w-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        className="object-cover  z-0"
                      />
                    </div>
                  </Link>
                  <div className=" hoverable bg-gradient-to-b from-transparent to-black to-[80%] -mt-20 flex justify-end items-center gap-2 z-20 h-[80px] lg:max-w-[342px] rounded-b-[20px] py-1 px-3 w-full">
                    <Image
                      src="/images/home/ornamen_bintang.svg"
                      alt="ornamen"
                      width={1000}
                      height={1000}
                      className="w-[6%] h-auto"
                    />
                    <p className="text-primary text-[10px] lg:text-[15px] font-bold z-20 w-full">
                      {item.title}
                    </p>
                  </div>
                </div>
              )
            )}
          </section>
        </div>
      </div>
      <div className="w-full h-[50vh]"></div>
    </div>
  );
}
