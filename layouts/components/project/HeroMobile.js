import TeamsMobile from "./modules/TeamsMobile";
import { useEffect, useState } from "react";
import RunningText from "@elements/RunningText";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function HeroMobile({
  setSelectedTeam,
  projectID,
  setProjectID,
}) {
  const [id, setID] = useState(-1);
  const [people, setPeople] = useState([]);
  const [indeks, setIndeks] = useState(2);
  const [isFilterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://backend.nusaquanta.com/api/people"
          // {
          //   headers: {
          //     Authorization: process.env.NEXT_PUBLIC_API_TOKEN,
          //   },
          // }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPeople(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    if (!(projectID === null) && !isNaN(parseInt(projectID))) {
      console.log("projectIDTeams", projectID);
      handleClickFilter(parseInt(projectID) - 1);
    }
  }, [projectID]);

  const handleClickFilter = (indeks) => {
    setID(id > -1 ? -1 : indeks);
    setSelectedTeam(id > -1 ? [] : [indeks + 1]);
    setFilterActive(!isFilterActive);
  };

  useEffect(() => {
    if (isFilterActive) {
      gsap.to(".btn", {
        opacity: 1,
        display: "flex",
        duration: 0.5,
      });
      gsap.to(".desc", {
        opacity: 1,
        display: "flex",
        duration: 0.5,
      });
    }
    if (!isFilterActive) {
      gsap.to(".btn", {
        opacity: 0,
        display: "none",
        duration: 0.5,
      });
      gsap.to(".desc", {
        opacity: 0,
        display: "none",
        duration: 0.5,
      });
    }
  }, [isFilterActive]);

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex flex-col w-[80%] justify-center items-center py-[5%] gap-4 relative">
        <p className=" font-reddit-sans text-2xl md:text-4xl font-bold">
          <span className="text-black bg-primary">Project</span>
          <span className="text-primary">Showcase</span>
        </p>
        <p className=" font-reddit-sans xl:text-base 2xl:text-xl description text-center md:text-xl">
          Discover the Brilliance Behind Our Most Innovative Creations
        </p>
        <div className="flex flex-col w-full items-center">
          <Link
            href={people.length > 0 ? people[indeks].cv : ``}
            className="btn hidden rounded-2xl border border-white w-fit px-[5%] py-[0.5%] mt-[2%] hover:bg-primary hover:text-black z-[69]"
          >
            Download CV
          </Link>
          <p className="desc hidden mt-[2%] z-10 tetx-sm md:text-base text-justify">
            {people.length > 0 ? people[indeks].description : ""}
          </p>
        </div>

        <div className="absolute w-full h-full flex justify-center top-0">
          <div
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(184, 233, 48, 0.20) 0%, rgba(184, 233, 48, 0.00) 100%",
            }}
            className="absolute bottom-[0] left-[-130%] w-[200%] h-[200%]"
          ></div>
          <div
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(96, 31, 235, 0.20) 0%, rgba(96, 31, 235, 0.00) 100%)",
            }}
            className="absolute top-[0] right-[-130%] w-[200%] h-[200%]"
          ></div>
          <Image
            src={"/images/project/logo_nusaquanta.svg"}
            width={1000}
            height={1000}
            alt="logo"
            className="absolute bottom-[-150%] opacity-10 w-full h-auto"
          />
        </div>
      </div>
      <div className="w-full h-[50vh] border border-primary rounded-3xl relative overflow-clip z-50 mb-[5%] pt-[10%]">
        <div className="absolute w-full px-[10%] flex flex-col top-[5%] items-center font-reddit-sans text-primary font-bold">
          <div className="w-full flex ite justify-center text-center">
            <div>
              <p className="text-xl">Role</p>
              <p className="text-base">
                {people[indeks] ? people[indeks].topRoles[0].job_name : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between z-[11]">
            <div className="w-[35%]">
              <p className="text-xl">Role</p>
              <p className="text-base">
                {people[indeks] ? people[indeks].topRoles[1].job_name : ""}
              </p>
            </div>
            <div className="w-[35%] flex flex-col items-end">
              <p className="text-xl">Role</p>
              <p className="text-base w-full text-right">
                {people[indeks] ? people[indeks].topRoles[2].job_name : ""}
              </p>
            </div>
          </div>
        </div>
        <TeamsMobile
          indeks={indeks}
          setIndeks={setIndeks}
          setID={setID}
          setSelectedTeam={setSelectedTeam}
          projectID={projectID}
          setProjectID={setProjectID}
          isFilterActive={isFilterActive}
          setFilterActive={setFilterActive}
        />
        <div className="absolute flex w-full justify-center items-center bottom-[10%]">
          <button
            onClick={() => handleClickFilter(indeks)}
            className={`py-2 px-4 font-bold xl:text-base 2xl:text-xl rounded-lg border z-[71] ${
              id > -1
                ? "border-secondary text-secondary"
                : "border-white text-white"
            }`}
          >
            {id > -1 ? "Deselect" : "Select as Filter"}
          </button>
        </div>
      </div>
    </div>
  );
}
