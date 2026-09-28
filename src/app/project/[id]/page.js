import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getProjectDetail } from "@/lib/queries";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = await getProjectDetail(id);
    if (!project) return { title: "Project tidak ditemukan" };
    const description =
        project.detail.headline ||
        project.detail.description?.slice(0, 155) ||
        project.title;
    return {
        title: project.title,
        description,
        alternates: { canonical: `/project/${project.id}` },
        openGraph: {
            title: project.title,
            description,
            images: [{ url: project.imageUrl }],
        },
    };
}

export default async function ProjectDetail({ params }) {
    const { id } = await params;
    const project = await getProjectDetail(id);

    if (!project) {
        notFound();
    }

  // Extract the team members
  const teamMembers = project.team;
  const displayedMembers = teamMembers.slice(0, 2);
  const remainingMembers = teamMembers.slice(2);
  const remainingCount = teamMembers.length - displayedMembers.length;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center mt-24 px-5 sm:px-0">
      <div className="flex flex-col max-w-3xl items-center">
        <div className="flex items-center gap-2 w-full justify-start ">
          <Link
            href="/project"
            className="text-primary font-light py-1"
          >
            Project
          </Link>
          <h1 className="text-primary font-light">/</h1>
          <h1 className="text-primary font-medium">
            {project.slug}
          </h1>
        </div>
        <h1 className="text-primary text-5xl sm:text-5xl font-bold w-full">
          {project.title}
        </h1>
        <div className="flex flex-col sm:flex-row justify-start w-full mt-5 gap-2">
          <div className="flex items-center gap-1">
            {teamMembers.map((member, index) => {
              return (
                <div
                  key={member.key}
                  className={`flex flex-row items-center mb-4 ${
                    index !== 0 ? "-ml-6" : ""
                  }`}
                  style={{ zIndex: 100 - index }}
                >
                  <Image
                    src={member.photoUrl}
                    alt={member.fullName}
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
              {displayedMembers.map((member) => member.fullName).join(", ")}
              {remainingCount > 0 && (
                <span className="relative cursor-pointer ml-1 group">
                  & Others
                  <div className="hidden group-hover:block absolute right-0 bg-secondary text-white p-2 rounded shadow-lg ">
                    {remainingMembers.map((member) => (
                      <div key={member.key}>
                        {member.fullName}
                      </div>
                    ))}
                  </div>
                </span>
              )}
            </h1>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <h1 className="text-primary font-light text-[14px] sm:text-base">
                  Collaboration with{" "}
                </h1>
                <h1 className="text-primary font-bold text-[14px] sm:text-base">
                  {project.detail.client}
                </h1>
              </div>
              <h1 className="text-primary">•</h1>
              <h1 className="text-primary text-[14px] sm:text-base">
                {project.detail.year}
              </h1>
            </div>
          </div>
        </div>
        {/*Section untuk membaca .md  */}
        <div className=" mt-10 rounded-lg w-full text-primary ">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1920}
            height={1080}
            className="rounded-lg"
          />
          <ReactMarkdown
            className="prose max-w-none text-white text-justify w-full mt-10"
          >
            {project.detail.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
