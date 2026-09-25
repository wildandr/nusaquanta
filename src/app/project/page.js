import ProjectListing from "@components/project/ProjectListing";
import { getProjectCards } from "@/lib/queries";

export const metadata = {
  title: "Projects & Case Studies",
  description:
    "Explore Nusa Quanta's digital product work across web platforms, product design, mobile experiences, and data & AI.",
  alternates: { canonical: "/project" },
};

export default async function ProjectPage() {
  const { cards, capabilityOptions, industryOptions } = await getProjectCards();
  return <ProjectListing cards={cards} capabilityOptions={capabilityOptions} industryOptions={industryOptions} />;
}
