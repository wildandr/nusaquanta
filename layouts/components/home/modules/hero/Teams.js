"use client";
import { useState } from "react";
import Image from "next/image";

export default function Teams() {
  const [activeImage, setActiveImage] = useState(3); // gambar tengah (indeks 3)

  const stateGrayscale = [
    {
      filename: "warna",
      className:
        "relative h-[85%] w-auto z-[72] transition-all duration-500 ease-in-out cursor-pointer",
    },
    {
      filename: "grayscale",
      className:
        "relative h-[80%] w-auto z-[71] transition-all duration-500 ease-in-out cursor-pointer",
      translatePositive: "translate-x-[25%]",
      translateNegative: "-translate-x-[25%]",
    },
    {
      filename: "grayscale",
      className:
        "relative h-[75%] w-auto z-[70] transition-all duration-500 ease-in-out cursor-pointer",
      translatePositive: "translate-x-[65%]",
      translateNegative: "-translate-x-[65%]",
    },
    {
      filename: "grayscale",
      className:
        "relative h-[70%] w-auto z-[69] transition-all duration-500 ease-in-out cursor-pointer",
      translatePositive: "translate-x-[115%]",
      translateNegative: "-translate-x-[115%]",
    },
    {
      filename: "grayscale",
      className:
        "relative h-[65%] w-auto z-[68] transition-all duration-500 ease-in-out cursor-pointer",
      translatePositive: "translate-x-[165%]",
      translateNegative: "-translate-x-[165%]",
    },
  ];

  const handleClick = (index) => {
    setActiveImage(index);
  };

  // Tentukan nilai translate-x berdasarkan posisi aktif gambar
  const getTranslateX = () => {
    if (activeImage === 1) {
      return "translate-x-[18%]";
    }
    if (activeImage === 5) {
      return "translate-x-[-18%]";
    }
    if (activeImage === 2) {
      return "translate-x-[12%]";
    }
    if (activeImage === 4) {
      return "translate-x-[-12%]";
    }
    if (activeImage === 3) {
      return "translate-x-0";
    }
  };

  return (
    <div
      className={`relative flex w-full h-full items-end transition-transform duration-500 ease-in-out ${getTranslateX()}`}
    >
      <div className="relative flex w-full h-full items-end justify-center z-[30]">
        {Array(5)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => {
            const distance = Math.abs(activeImage - index);
            const grayscaleIndex = Math.min(
              distance,
              stateGrayscale.length - 1
            );

            const isLeft = index < activeImage;

            return (
              <Image
                key={index}
                src={`/images/home/wildan_${
                  activeImage === index ? "warna" : "grayscale"
                }.png`}
                alt="ornamen"
                width={1000}
                height={1000}
                className={`${
                  activeImage === index
                    ? stateGrayscale[0].className
                    : grayscaleIndex < stateGrayscale.length
                    ? `${stateGrayscale[grayscaleIndex].className} ${
                        isLeft
                          ? stateGrayscale[grayscaleIndex].translatePositive
                          : stateGrayscale[grayscaleIndex].translateNegative
                      }`
                    : ""
                }`}
                onClick={() => handleClick(index)}
              />
            );
          })}
      </div>
    </div>
  );
}
