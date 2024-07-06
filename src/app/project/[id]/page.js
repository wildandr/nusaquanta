"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const imageMapping = {
  1: "/images/project/aziz.jpeg",
  2: "/images/project/rasyid.jpeg",
  3: "/images/project/wildan.jpeg",
  4: "/images/project/nawal.jpeg",
  5: "/images/project/darel.jpeg",
};

const staticMarkdown = `


## About The Project 
The Porsenigama website serves as a comprehensive platform to introduce and promote Porsenigama, the largest sports event at Gadjah Mada University (UGM). Designed for UGM students, the website provides real-time updates on event timelines, schedules, standings, and detailed information on the sports and arts branches featured in the event, along with lists of participating athletes. 

## Goals 
- **Introduce Porsenigama:** Highlight Porsenigama as the premier sports event at UGM. 
- **Real-Time Information:** Provide up-to-date schedules, standings, and event details for students and participants. 
- **Comprehensive Event Details:** Offer detailed information on sports and arts branches, and lists of participating athletes. 
## The User & Audience 
- **UGM Students:** Students seeking detailed and up-to-date information on Porsenigama. 
- **Athletes and Participants:** Participants needing to track schedules, standings, and event specifics. 
- **General Public:** Anyone interested in learning about the sports and arts branches featured in Porsenigama. 

## Development Scope 
- **Front-End Development:** Utilized Next.js to create a dynamic, responsive, and user-friendly interface. 
- **Back-End Integration:** Employed Strapi for seamless data management and real-time updates. 
- **Key Features Implemented:** 
  - **Real-Time Schedules and Standings:** Provided live updates for event schedules and standings. 
  - **Sports and Arts Information:** Detailed descriptions of various branches and event specifics. 
  - **Athlete Lists:** Comprehensive lists of participating athletes. 
  - **User Engagement:** Focused on delivering high user engagement through real-time updates and detailed event information. 

## Process 
- **Requirement Gathering:** Conducted surveys and interviews with UGM students and event organizers to define functional and non-functional requirements. 
- **Planning and Design:** Developed wireframes and mockups using Figma, incorporating stakeholder feedback to refine the design. 
- **Development:** Built using Next.js for the front-end and Strapi for the back-end, ensuring dynamic interfaces and real-time updates. 
- **Testing:** Conducted thorough testing, including unit tests, integration tests, and user acceptance testing (UAT) to validate functionality. 
- **Deployment:** Deployed the website after final checks to ensure all features were operational. 
- **Release and Monitoring:** Launched the website and monitored user feedback to make ongoing improvements. 

## Results 
- Successfully introduced Porsenigama as the largest sports event at UGM, enhancing visibility and engagement. 
- Provided UGM students with real-time updates on event schedules and standings. 
- Offered detailed information on sports and arts branches and participating athletes. 
- Achieved high user satisfaction, evidenced by positive feedback and engagement metrics. 

**Team:** 
- Wildan Dzaky Ramadhani (UI/UX Designer) 
- Rasyid Kusnady (Project Manager, Frontend Developer, Backend Developer) 
- Darriel Markerizal (UI/UX Designer, Frontend Developer, Backend Developer) 
- Muhammad Rizky Aziz (Frontend Developer)
`;

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
        setProject(result.data);
        
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
    <div className="bg-black text-white min-h-screen flex flex-col items-center mt-24 px-5 sm:px-0">
      <div className="flex flex-col max-w-3xl items-center">
        <div className="flex items-center gap-2 w-full justify-start ">
          <button
            onClick={handleNavigation}
            className="text-primary font-light py-1"
          >
            Project
          </button>
          <h1 className="text-primary font-light">/</h1>
          <h1 className="text-primary font-medium">
            {project.attributes.project_name}
          </h1>
        </div>
        <h1 className="text-primary text-5xl sm:text-6xl font-bold w-full">
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
          <div className="flex flex-col gap-1">
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
                  className="relative cursor-pointer ml-1"
                >
                  & Others
                  {showTooltip && (
                    <div className="absolute right-0 bg-secondary text-white p-2 rounded shadow-lg ">
                      {remainingMembers.map((member) => (
                        <div key={member.id}>
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose text-white text-justify"
          >
            {staticMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
