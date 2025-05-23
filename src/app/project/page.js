"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterComponent from "@components/project/FilterComponent";
import { BsSearch } from "react-icons/bs";
import Hero from "@components/project/Hero";
import HeroMobile from "@components/project/HeroMobile";

export default function Page() {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const [cardsData, setCardsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  const [productOptions, setProductOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [projectId, setProjectId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && parseInt(id) > 0 && parseInt(id) < 12) {
      setProjectId(id);
    }
  }, []);

  const nama = [
    "Muhammad Rizky Aziz",
    "Rasyid Kusnady",
    "Wildan Dzaky Ramadhani",
    "Nawal Rizky Kautsar",
    "Darriel Markerizal",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nusaquanta.store/api/projects?populate[products]=*&populate[categories]=*&populate[project_teams][populate][person][fields]=full_name&populate[project_teams][populate][jobs][fields]=job_name&populate[image]=*"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        const projects = result.data;
        const formattedData = projects.map((project) => {
          const imageUrl = project.attributes.image?.data?.[0]?.attributes?.url;
          const absoluteImageUrl = imageUrl
            ? `https://nusaquanta.store${imageUrl}`
            : "/default-image.png";

          return {
            id: project.id,
            title: project.attributes.project_name,
            imageUrl: absoluteImageUrl,
            roles: project.attributes.project_teams.data.flatMap((team) =>
              team.attributes.jobs.data.map((job) => job.attributes.job_name)
            ),
            products: project.attributes.products.data.map(
              (product) => product.attributes.product_name
            ),
            categories: project.attributes.categories.data.map(
              (category) => category.attributes.category_name
            ),
            projectTeamIds: project.attributes.project_teams.data.flatMap(
              (team) => {
                const personData = team.attributes.person.data;
                return Array.isArray(personData)
                  ? personData.map((member) => member.attributes.full_name)
                  : [personData.attributes.full_name];
              }
            ),
          };
        });

        setCardsData(formattedData);

        // Extract unique product options
        const allProducts = projects.flatMap((project) =>
          project.attributes.products.data.map(
            (product) => product.attributes.product_name
          )
        );
        setProductOptions([...new Set(allProducts)]);

        // Extract unique role options
        const allRoles = projects.flatMap((project) =>
          project.attributes.project_teams.data.flatMap((team) =>
            team.attributes.jobs.data.map((job) => job.attributes.job_name)
          )
        );
        setRoleOptions([...new Set(allRoles)]);

        // Extract unique category options
        const allCategories = projects.flatMap((project) =>
          project.attributes.categories.data.map(
            (category) => category.attributes.category_name
          )
        );
        setCategoryOptions([...new Set(allCategories)]);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleToggleOption = (option, setSelectedOptions, selectedOptions) => {
    setSelectedOptions(
      selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option]
    );
  };

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
      selectedTeams.some((id) =>
        card.projectTeamIds.includes(nama[selectedTeams - 1])
      );
    const matchText =
      searchText === "" ||
      card.title.toLowerCase().includes(searchText.toLowerCase());
    return matchRole && matchProduct && matchCategory && matchText && matchTeam;
  });

  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePagination = (direction) => {
    if (direction === "next") {
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(filteredCards.length / itemsPerPage))
      );
    } else if (direction === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div
      className="w-full flex-col mt-20 justify-center items-center font-reddit-sans no-scrollbar"
      style={{ overflow: "hidden" }}
    >
      <div className="hidden lg:flex">
        <Hero
          setID={setSelectedTeams}
          projectID={projectId}
          setProjectID={setProjectId}
        />
      </div>
      <div className="lg:hidden">
        <HeroMobile
          setSelectedTeam={setSelectedTeams}
          projectID={projectId}
          setProjectID={setProjectId}
        />
      </div>
      <div className="w-full">
        <div className="flex  w-full my-5 px-10 lg:px-28 xl:px-24">
          <div className="flex px-3 py-2 border border-primary text-primary items-center justify-between w-full rounded-[12px]">
            <input
              type="text"
              className="w-full bg-black text-primary placeholder-primary placeholder-opacity-50 cursor-primary focus:outline-none"
              placeholder="Search our creative work"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
                title="Role"
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
          {currentCards.map((card) => (
            <div
              key={card.id}
              className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex flex-col justify-center items-end overflow-hidden"
            >
              <Link
                href={`/project/${card.id}`}
                className="overflow-hidden rounded-[20px] h-full shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary z-10 w-full"
              >
                <div className="h-full w-full">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
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
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 ${
              currentPage === 1 ? "opacity-30" : ""
            }`}
          >
            <Image
              src="/images/project/chevron-left.png"
              alt="arrow-left"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </button>

          {/* Page numbers */}
          {[
            ...Array(Math.ceil(filteredCards.length / itemsPerPage)).keys(),
          ].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-2 mx-2 ${
                currentPage === page + 1
                  ? "  text-primary"
                  : "text-primary opacity-30  "
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => handlePagination("next")}
            disabled={
              currentPage === Math.ceil(filteredCards.length / itemsPerPage)
            }
            className={`px-4 py-2 mx-2 ${
              currentPage === Math.ceil(filteredCards.length / itemsPerPage)
                ? "opacity-50"
                : ""
            }`}
          >
            <Image
              src="/images/project/chevron-right.png"
              alt="arrow-right"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
