import React from "react";
import Image from "next/image";
import FilterComponent from "@components/project/FilterComponent";
import { BsSearch } from "react-icons/bs";

export default function Page() {
   const roleOptions = [
     "FrontEnd Developer",
     "BackEnd Developer",
     "UI/UX Designer",
     "Project Manager",
     "Quality Assurance",
     "IoT Developer",
     "Mobile App Developer",
     "Machine Learning Engineer",
     "Data Scientist",
   ];

   const productOptions = [
     "Mobile Apps",
     "Website",
     "Web App",
     "Data Analysis",
     "Machine Learning",

   ];
   const categoryOptions = [
     "Event",
     "Dashboard",
     "Service",
      "e-Commerce",
      "Community",
      "Education"
   ];
  const cardsData = [
    {
      id: 1,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 2,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
    },
 
  ];

  return (
    <div className="w-full  flex-col mt-40 justify-center items-center font-reddit-sans">
      <div className="lg:px-24">
        <div className=" flex flex-col w-full  my-5  ">
          <div className="flex px-3 py-2 border border-primary text-primary items-center justify-between w-full rounded-[12px]">
            <input
              type="text"
              className="w-full bg-black  text-primary placeholder-primary placeholder-opacity-50 cursor-primary focus:outline-none "
              placeholder="Search our creative work"
            />
            <button>
              <BsSearch />
            </button>
          </div>
          <FilterComponent title="Filter by Role" options={roleOptions} />
          <FilterComponent title="Filter by Product" options={productOptions} />
          <FilterComponent title="Filter by Category" options={categoryOptions} />
        </div>
        <div className="w-full flex gap-5 flex-wrap justify-center my-10">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex flex-col justify-center items-end overflow-hidden"
            >
              <div className="overflow-hidden rounded-[20px] h-full  shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary z-10">
                <Image
                  src={card.imageUrl}
                  alt="project"
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full z-0"
                />
              </div>
              <div className="hoverable bg-gradient-to-b from-transparent to-black to-[80%] -mt-20 flex justify-end items-center gap-2 z-20 h-[60px] max-w-[292px] lg:max-w-[342px] lg:h-[80px] rounded-b-[20px] py-1 px-3">
                <Image
                  src={card.ornamentUrl}
                  alt="ornamen"
                  width={1000}
                  height={1000}
                  className="w-[6%] h-auto"
                />
                <p className="text-primary text-[10px] lg:text-[15px] font-bold z-20 w-full">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
