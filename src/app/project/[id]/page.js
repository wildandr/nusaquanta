"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";


const imageMapping = {
  1: "/images/project/aziz.jpeg",
  2: "/images/project/rasyid.jpeg",
  3: "/images/project/wildan.jpeg",
  4: "/images/project/nawal.jpeg",
  5: "/images/project/darel.jpeg",
};

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `https://backend.nusaquanta.com/api/projects/${params.id}?populate[products]=*&populate[categories]=*&populate[project_teams][populate][person][fields]=full_name&populate[project_teams][populate][jobs][fields]=job_name&populate[image]=*&populate[project_detail]=*`,
          {
            headers: {
              Authorization: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const projectData = result.data;

        // Format the image URL
        const imageUrl =
          projectData.attributes.image?.data?.[0]?.attributes?.url;
        const absoluteImageUrl = imageUrl
          ? `https://backend.nusaquanta.com${imageUrl}`
          : "/default-image.png";

        // Update project data with formatted image URL
        const formattedProject = {
          ...projectData,
          absoluteImageUrl: absoluteImageUrl,
        };

        setProject(formattedProject);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProjectDetails();
  }, [params.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  // Extract the team members
  const teamMembers = project.attributes.project_teams.data;
  const displayedMembers = teamMembers.slice(0, 2);
  const remainingMembers = teamMembers.slice(2);
  const remainingCount = teamMembers.length - displayedMembers.length;

  const handleNavigation = () => {
    router.push("/project");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center mt-24 px-5 lg:px-0">
      <div className="flex flex-col max-w-3xl items-center">
        <div className="flex items-start md:items-center gap-2 w-full justify-start ">
          <button
            onClick={handleNavigation}
            className="text-primary font-light sm:py-1"
          >
            Project
          </button>
          <h1 className="text-primary font-light">/</h1>
          <h1 className="text-primary font-semibold">
            {project.attributes.project_detail.data.attributes.headline}
          </h1>
        </div>
        <h1 className="text-primary text-5xl sm:text-5xl font-bold w-full">
          {project.attributes.project_name}
        </h1>
        <div className="flex flex-col sm:flex-row justify-start w-full mt-5 gap-2">
          <div className="flex items-center gap-1">
            {teamMembers.map((team, index) => {
              const personId = team.attributes.person.data.id;
              const personImage =
                imageMapping[personId] || "/images/default.jpeg";
              const fullName = team.attributes.person.data.attributes.full_name;
              const jobs = team.attributes.jobs.data
                .map((job) => job.attributes.job_name)
                .join(", ");

              return (
                <div
                  key={team.id}
                  className={`flex flex-row items-center mb-4 ${
                    index !== 0 ? "-ml-6" : ""
                  }`}
                  style={{ zIndex: 100 - index }}
                >
                  <Image
                    src={personImage}
                    alt={fullName}
                    width={48}
                    height={48}
                    className="w-[3rem] h-[3rem] rounded-full object-cover shadow-[7px_1px_15px_0_rgba(0,0,0,0.5)]"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-primary font-bold">
              {displayedMembers
                .map(
                  (member) => member.attributes.person.data.attributes.full_name
                )
                .join(", ")}
              {remainingCount > 0 && (
                <span
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="relative cursor-pointer ml-1 "
                >
                  & Others
                  {showTooltip && (
                    <div className="absolute left-0 sm:right-0 bg-secondary text-white p-2 rounded shadow-lg sm:w-[150px]">
                      {remainingMembers.map((member, index) => (
                        <div key={member.id}>
                          {index > 0 && ", "}
                          {member.attributes.person.data.attributes.full_name}
                        </div>
                      ))}
                    </div>
                  )}
                </span>
              )}
            </h1>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <h1 className="text-primary font-light text-[14px] sm:text-base">
                  Collaboration with{" "}
                </h1>
                <h1 className="text-primary font-bold text-[14px] sm:text-base">
                  {project.attributes.project_detail.data.attributes.client}
                </h1>
              </div>
              <h1 className="text-primary">•</h1>
              <h1 className="text-primary text-[14px] sm:text-base">
                {project.attributes.project_detail.data.attributes.year}
              </h1>
            </div>
          </div>
        </div>
        {/*Section untuk membaca .md  */}
        <div className=" mt-10 rounded-lg w-full text-primary ">
          <Image
            src={project.absoluteImageUrl}
            alt={project.attributes.project_name}
            width={1920}
            height={1080}
            className="rounded-lg"
          />
          <ReactMarkdown className="prose max-w-none text-white text-justify w-full mt-10">
            {project.attributes.project_detail.data.attributes.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
