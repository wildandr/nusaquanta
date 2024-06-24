"use client";
import Image from "next/image";
import React, { useState } from "react";
import data from "../../../config/homeInnovationData.json"; // Adjust the path to your JSON file

export default function HomeInnovation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data.slides;

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <section className="w-screen lg:p-6 bg-black justify-center items-center relative mb-20">
      <div className="absolute lg:top-[-10] lg:right-0 lg:w-[339px] lg:h-[339px] h-[10px] w-full items-center justify-center">
        <Image
          src="/images/home/homeInnovation_bg.png"
          width={339}
          height={339}
          objectFit="cover"
          alt="Background Image"
        />
      </div>

      <div className="block w-full z-10 relative mt-[100px]">
        <div className="flex justify-center items-center flex-col">
          <p className="font-reddit-sans font-700 text-[24px] lg:text-[40px]">
            Pioneering Tomorrow:
          </p>
        </div>
        <div className="text-center">
          <span className="box-decoration-slice font-reddit-sans font-700 text-[22px] lg:text-[40px] bg-secondary text-white w-full">
            A Glimpse into Our Innovations and Future Ventures
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center mt-[135px] relative">
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 lg:w-24 pl-2 lg:pl-8 h-auto flex justify-end lg:hover:-translate-x-3 lg:transition-transform z-30 focus:outline-none transform  top-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/home/hero_arrow-left.svg"
              width={1000}
              height={1000}
              alt="Arrow Left"
              className="w-[10px] lg:w-[50%] h-auto"
            />
          </button>

          <div className="flex flex-col lg:flex-row items-center container mx-auto p-6">
            <Image
              src={slides[currentSlide].imageSrc}
              width={339}
              height={339}
              alt={slides[currentSlide].imageAlt}
            />

            <div className="flex flex-col mt-3 lg:mt-0 lg:ml-[53px]">
              <p className="text-primary font-reddit-sans text-[40px] font-700 lg:text-[54px]">
                {slides[currentSlide].title}
              </p>
              <p className="mt-3 font-reddit-sans text-justify">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>

          <button
            onClick={handleNextSlide}
            className="absolute right-0 lg:w-24 pr-2 lg:pr-8 h-auto flex justify-end lg:hover:translate-x-3 lg:transition-transform z-30 focus:outline-none transform  top-1/2 -translate-y-1/2"
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
    </section>
  );
}
