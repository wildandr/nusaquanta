import ProjectListing from "@components/project/ProjectListing";
import { getProjectCards, getPeople } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ searchParams }) {
  const params = await searchParams;
  const [{ cards, roleOptions, productOptions, categoryOptions }, people] =
    await Promise.all([getProjectCards(), getPeople()]);

  return (
    <ProjectListing
      cards={cards}
      roleOptions={roleOptions}
      productOptions={productOptions}
      categoryOptions={categoryOptions}
      people={people}
      initialProjectId={params?.id ?? null}
    />
  );
}
