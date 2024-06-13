"use client";
import { useState, useEffect } from "react";
import RunningText from "@elements/RunningTextIjo";
import Image from "next/image";
import ProductSection from "./modules/product/ProductSection";

const sections = [
  {
    title: "Product Vision, Development, & Deployment",
    description:
      "Navigate the trajectory of your ideas from conception to realization with precision and creativity. Our holistic approach ensures that every phase of product development is not just executed, but meticulously crafted to meet and exceed market demands.",
    services: [
      { name: "UI UX Design", link: "" },
      { name: "Mobile App Development", link: "" },
      { name: "Website App Development", link: "" },
      { name: "Quality Assurance", link: "" },
      { name: "IoT Device Development", link: "" },
    ],
  },
  {
    title: "Modernization, Digitalization, & Cloud Enablement",
    description:
      "Embrace the future today by transforming your business operations with our cutting-edge modernization and digitalization strategies. Leverage our cloud enablement services to unlock new levels of efficiency and scalability, propelling your business into a new era of competitiveness.",
    services: [
      { name: "Digital Transformation Consulting", link: "" },
      { name: "Legacy System Modernization", link: "" },
      { name: "Cloud Migration Strategy", link: "" },
      { name: "IoT and Edge Computing Solutions", link: "" },
    ],
  },
  {
    title: "Data, Analytics, & Artificial Intelligence",
    description:
      "Turn data into your most valuable asset with our comprehensive analytics and AI solutions that promise not only insights but foresight. Harness the power of intelligent data analysis to make informed decisions that drive your business forward.",
    services: [
      { name: "Business Intelligence Solutions", link: "" },
      { name: "AI-driven Automation", link: "" },
      { name: "Machine Learning Development", link: "" },
      { name: "Data Analytics & Dashboard", link: "" },
    ],
  },
  {
    title: "Product Optimization",
    description:
      "Ensure your products stand the test of time through continuous enhancement and rigorous optimization strategies. Our dedicated maintenance programs are designed to evolve your offerings, keeping them relevant and performing at their peak in the ever-changing market landscape.",
    services: [
      { name: "Continuous Integration and Deployment (CI/CD)", link: "" },
      { name: "Predictive Maintenance & Lifecycle Management", link: "" },
      { name: "Performance Tuning and Optimization", link: "" },
      { name: "Feature Updates and Upgrades", link: "" },
      { name: "User Feedback and Product Adaptation", link: "" },
    ],
  },
];

export default function HomeProduct() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const handlePrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + sections.length) % sections.length
    );
  };

  const updateCarouselWidth = () => {
    const width = document.querySelector(".carousel-container").offsetWidth;
    setCarouselWidth(width);
  };

  useEffect(() => {
    updateCarouselWidth();
    window.addEventListener("resize", updateCarouselWidth);
    return () => {
      window.removeEventListener("resize", updateCarouselWidth);
    };
  }, []);

  return (
    <div className="flex relative flex-col w-full h-screen items-center py-10 overflow-hidden font-reddit-sans">
      <Image
        src="/images/home/bgProduct.png"
        alt="background"
        width={1000}
        height={1000}
        className="w-[60%] h-auto absolute z-[-1] object-cover"
      />
      <RunningText color={"primary text-black rotate-2 absolute z-[10000]"} />
      <Image
        src="/images/home/logoButterfly.png"
        alt="kupu kupu"
        width={1000}
        height={1000}
        className="w-[8%] h-auto absolute left-[27rem] top-[63.3rem] z-[12000] animate-spin-slow"
      />
      <RunningText
        color={
          "primary text-black -rotate-[2deg] -mt-[1.5rem] absolute z-[10000]"
        }
      />

      <div className="w-full px-4 lg:px-20">
        <div className="flex flex-col items-center mt-20 lg:mt-40">
          <div className="lg:inline-flex items-center mt-2">
            <span className="text-white text-[20px] lg:text-[40px] font-bold lg:px-2">
              Empowering
            </span>
            <span className="text-black text-[20px] lg:text-[40px] font-bold ml-1 box-decoration-slice px-2 bg-primary">
              Innovation:
            </span>
          </div>
          <p className="font-bold text-[16px] lg:text-[32px] text-center mt-2">
            Shaping the Future of Product Excellence
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePrevSlide}
            className="absolute left-0  lg:w-24 pl-2 lg:pl-8 h-auto lg:hover:-translate-x-3 lg:transition-transform z-30"
          >
            <Image
              src="/images/home/hero_arrow-left.svg"
              width={1000}
              height={1000}
              alt="Arrow Left"
              className="w-[10px] lg:w-[50%] h-auto"
            />
          </button>
          <div className="carousel-container relative w-full flex justify-center items-center overflow-hidden">
            <div
              className="carousel w-full flex transition-transform duration-500"
              style={{
                transform: `translateX(-${activeIndex * carouselWidth}px)`,
              }}
            >
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="min-w-full flex-shrink-0"
                  style={{ width: carouselWidth }}
                >
                  <ProductSection
                    title={section.title}
                    description={section.description}
                    services={section.services}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNextSlide}
            className="absolute right-0 lg:w-24 pr-2 lg:pr-8 h-auto flex justify-end lg:hover:translate-x-3 lg:transition-transform z-30"
          >
            <Image
              src="/images/home/hero_arrow-right.svg"
              width={1000}
              height={1000}
              alt="Arrow Right"
              className="w-[10px] lg:w-[50%] h-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
