"use client";
import React, { useState } from "react";
import Image from "next/image";
import FilterComponent from "@components/project/FilterComponent";
import { BsSearch } from "react-icons/bs";
import Hero from "@components/project/Hero";

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
    "Education",
  ];

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleToggleOption = (option, setSelectedOptions, selectedOptions) => {
    setSelectedOptions(
      selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option]
    );
  };

  const cardsData = [
    {
      id: 1,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
      roles: ["FrontEnd Developer", "UI/UX Designer"],
      products: ["Website"],
      categories: ["Event"],
      projectTeams: ["aziz", "rasyid"],
    },
    {
      id: 2,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
      roles: ["FrontEnd Developer", "UI/UX Designer"],
      products: ["Web App"],
      categories: ["Education"],
      projectTeams: ["nawal", "darel"],
    },
    {
      id: 3,
      imageUrl: "/images/home/home_project_porsenigama.png",
      ornamentUrl: "/images/home/ornamen_bintang.svg",
      title: "Interactive Custom Website for Lustrum KMTSL XI National Event",
      roles: ["FrontEnd Developer", "UI/UX Designer"],
      products: ["Website"],
      categories: ["Event"],
      projectTeams: ["rasyid", "wildan"],
    },
  ];

  const filteredCards = cardsData.filter((card) => {
    const matchRole =
      selectedRoles.length === 0 ||
      selectedRoles.some((role) => card.roles.includes(role));
    const matchProduct =
      selectedProducts.length === 0 ||
      selectedProducts.some((product) => card.products.includes(product));
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => card.categories.includes(category));
    const matchTeam =
      selectedTeams.length === 0 ||
      selectedTeams.some((team) => card.projectTeams.includes(team));
    return matchRole && matchProduct && matchCategory && matchTeam;
  });

  return (
    <div
      className="w-full flex-col mt-20 justify-center items-center font-reddit-sans no-scrollbar"
      style={{ overflow: "hidden" }}
    >
      <Hero />
      <div className="w-full">
        <div className="flex  w-full my-5 px-10 lg:px-28 xl:px-24">
          <div className="flex px-3 py-2 border border-primary text-primary items-center justify-between w-full rounded-[12px]">
            <input
              type="text"
              className="w-full bg-black text-primary placeholder-primary placeholder-opacity-50 cursor-primary focus:outline-none"
              placeholder="Search our creative work"
            />
            <button>
              <BsSearch />
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full my-5 pl-10 md:px-10 lg:px-28 xl:px-24">
          <div className="filter w-full flex flex-col md:flex-row my-5 gap-5">
            <div className="md:w-[40%] lg:w-[12%]">
              <p className="text-white text-[16px] mt-2">Filter by Role</p>
            </div>
            <div
              className="overflow-scroll no-scrollbar"
              style={{ overflow: "auto" }}
            >
              <FilterComponent
                title="a"
                options={roleOptions}
                selectedOptions={selectedRoles}
                onOptionToggle={(option) =>
                  handleToggleOption(option, setSelectedRoles, selectedRoles)
                }
              />
            </div>
          </div>
          <div className="filter flex flex-col md:flex-row my-5 gap-5">
            <div className="lg:w-[12%]">
              <p className="text-white text-[16px] mt-2">Filter by Product</p>
            </div>
            <div
              className="overflow-scroll no-scrollbar"
              style={{ overflow: "auto" }}
            >
              <FilterComponent
                options={productOptions}
                selectedOptions={selectedProducts}
                onOptionToggle={(option) =>
                  handleToggleOption(
                    option,
                    setSelectedProducts,
                    selectedProducts
                  )
                }
              />
            </div>
          </div>
          <div className="filter flex flex-col md:flex-row my-5 gap-5">
            <div className="lg:w-[12%]">
              <p className="text-white text-[16px] mt-2">Filter by Category</p>
            </div>
            <div
              className="overflow-scroll no-scrollbar"
              style={{ overflow: "auto" }}
            >
              <FilterComponent
                options={categoryOptions}
                selectedOptions={selectedCategories}
                onOptionToggle={(option) =>
                  handleToggleOption(
                    option,
                    setSelectedCategories,
                    selectedCategories
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-5 flex-wrap justify-center my-10 px-5">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex flex-col justify-center items-end overflow-hidden"
            >
              <div className="overflow-hidden rounded-[20px] h-full shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary z-10">
                <Image
                  src={card.imageUrl}
                  alt="project"
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full z-0"
                />
              </div>
              <div className="hoverable bg-gradient-to-b from-transparent to-black to-[80%] -mt-20 flex justify-end items-center gap-2 z-20 h-[80px] lg:max-w-[342px]  rounded-b-[20px] py-1 px-3">
                <Image
                  src="/images/home/ornamen_bintang.svg"
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
