"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import FilterComponent from "@components/project/FilterComponent";
import { BsSearch } from "react-icons/bs";
import Hero from "@components/project/Hero";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backend.nusaquanta.com/api/projects?populate[products]=*&populate[categories]=*&populate[project_teams][populate][people][fields]=full_name&populate[project_teams][populate][jobs][fields]=job_name&populate[image]=*",
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_API_TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        const projects = result.data;
        console.log("projects", projects);
        const formattedData = projects.map((project) => {
          const imageUrl = project.attributes.image?.data?.[0]?.attributes?.url;
          const absoluteImageUrl = imageUrl
            ? `https://backend.nusaquanta.com${imageUrl}`
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
            projectTeamId: project.attributes.project_teams.data.map(
              (teams_id) => teams_id.id
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
      selectedTeams.some((id) => card.projectTeamId.includes(id));
    const matchText =
      searchText === "" ||
      card.title.toLowerCase().includes(searchText.toLowerCase());
    return matchRole && matchProduct && matchCategory && matchText && matchTeam;
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://backend.nusaquanta.com/api/projects?filters[$or][1][categories][id][$eq]=3&filters[$or][2][categories][id][$eq]=1&filters[$or][4][products][id][$eq]=2&filters[$or][5][products][id][$eq]=3&populate[products]=*&populate[categories]=*&populate[project_teams][populate][people][fields]=full_name&populate[project_teams][populate][jobs][fields]=job_name&filters[$or][2][project_teams][jobs][id][$eq]&filters[$or][0][categories][id][$eq]=2&filters[$or][3][products][id][$eq]=6&filters[$or][0][project_teams][jobs][id][$eq]=2&filters[$or][1][project_teams][jobs][id][$eq]=3&populate[image]=*&filters[project_name][$contains]=${encodeURIComponent(
          searchText
        )}`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_TOKEN,
          },
        }
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
          roles: project.attributes.project_teams.data.flatMap((team) =>
            team.attributes.jobs.data.map((job) => job.attributes.job_name)
          ),
          products: project.attributes.products.data.map(
            (product) => product.attributes.product_name
          ),
          categories: project.attributes.categories.data.map(
            (category) => category.attributes.category_name
          ),
        };
      });

      setCardsData(formattedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log("cardData updated", cardsData);
  }, [cardsData]);

  return (
    <div
      className="w-full flex-col mt-20 justify-center items-center font-reddit-sans no-scrollbar"
      style={{ overflow: "hidden" }}
    >
      <Hero setID={setSelectedTeams} />
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
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="cards w-[300px] h-[200px] lg:w-[350px] lg:h-[250px] p-1 rounded-[20px] duration-150 border-transparent hover:border-2 hover:border-primary flex flex-col justify-center items-end overflow-hidden"
            >
              <div className="overflow-hidden rounded-[20px] h-full shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] shadow-primary z-10 w-full">
                <Image
                  src={card.imageUrl}
                  alt="project"
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full z-0"
                />
              </div>
              <div className="hoverable bg-gradient-to-b from-transparent to-black to-[80%] -mt-20 flex justify-end items-center gap-2 z-20 h-[80px] lg:max-w-[342px] rounded-b-[20px] py-1 px-3 w-full">
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
