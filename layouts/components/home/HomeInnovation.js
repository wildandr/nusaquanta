import Image from "next/image";
import React from "react";

export default function HomeInnovation() {
  return (
    <section className=" w-screen p-6 bg-black justify-center items-center container relative">
      <div className="absolute lg:top-[-10] lg:right-0 lg:w-[339px] lg:h-[339px] h-[10px] w-full items-center justify-center">
        <Image
          src="/images/home/homeInnovation_bg.png"
          width={339}
          height={339}
          objectFit="cover"
          alt="Background Image"
        />
      </div>

      <div className="  block w-full z-10 relative mt-[100px]">
        <div className="flex justify-center items-center flex-col  ">
          <p className="font-reddit-sans font-700 text-[24px] lg:text-[40px] ">
            Pioneering Tomorrow :
          </p>
        </div>
        <div className="text-center">
          <span className="box-decoration-slice font-reddit-sans font-700 text-[22px] lg:text-[40px] bg-secondary text-white w-full">
            A Glimpse into Our Innovations and Future Ventures
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center mt-[135px]">
          <Image
            src="/images/home/homeInnovation_AI.png"
            width={339}
            height={339}
            alt="Artificial Intelligence"
          />

          <div className="flex flex-col mt-3 lg:mt-0 lg:ml-[53px]">
            <p className=" text-primary font-reddit-sans text-[40px] font-700 lg:text-[54px]">
              Next-Generation AI Applications
            </p>
            <p className="mt-3 font-reddit-sans text-justify">
              Continuing our trailblazing journey in AI, we are developing
              next-generation applications focused on enhancing predictive
              analytics and automated decision-making systems. Our upcoming AI
              module aims to revolutionize sectors such as healthcare and
              finance by providing more accurate forecasts and personalized
              customer experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
