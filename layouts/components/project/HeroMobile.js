import TeamsMobile from "./modules/TeamsMobile";
import { useEffect, useState } from "react";

export default function HeroMobile({ setSelectedTeam }) {
  const [id, setID] = useState(-1);
  const [people, setPeople] = useState([]);
  const [indeks, setIndeks] = useState(2);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://backend.nusaquanta.com/api/people",
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
        setPeople(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTeams();
  }, []);

  const handleClickFilter = (indeks) => {
    setID(id > -1 ? -1 : indeks);
    setSelectedTeam(id > -1 ? [] : [indeks + 1]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex flex-col w-[80%] justify-center items-center py-[5%] gap-4">
        <p className=" font-reddit-sans text-2xl md:text-4xl font-bold">
          <span className="text-black bg-primary">Project</span>
          <span className="text-primary">Showcase</span>
        </p>
        <p className=" font-reddit-sans xl:text-base 2xl:text-xl description text-center md:text-xl">
          Discover the Brilliance Behind Our Most Innovative Creations
        </p>
      </div>
      <div className="w-full h-[50vh] border border-primary rounded-3xl relative overflow-clip z-50 mb-[5%] pt-[10%]">
        <div className="absolute w-full px-[10%] flex flex-col top-[5%] items-center font-reddit-sans text-primary font-bold">
          <div className="w-full flex ite justify-center text-center">
            <div>
              <p className="text-xl">Role</p>
              <p className="text-base">
                {people.length > 0 ? people[indeks].topRoles[0].job_name : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between z-[11]">
            <div className="w-[35%]">
              <p className="text-xl">Role</p>
              <p className="text-base">
                {people.length > 0 ? people[indeks].topRoles[1].job_name : ""}
              </p>
            </div>
            <div className="w-[35%] flex flex-col items-end">
              <p className="text-xl">Role</p>
              <p className="text-base w-full text-right">
                {people.length > 0 ? people[indeks].topRoles[2].job_name : ""}
              </p>
            </div>
          </div>
        </div>
        <TeamsMobile
          indeks={indeks}
          setIndeks={setIndeks}
          setID={setID}
          setSelectedTeam={setSelectedTeam}
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