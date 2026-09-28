import ProjectListing from "@components/project/ProjectListing";
import { getProjectCards, getPeople } from "@/lib/queries";

export const metadata = {
  title: "Projects & Case Studies",
  description:
    "Portofolio project PT Nusa Quanta Indonesia: AI, data engineering, web & mobile apps. Filter berdasarkan peran, produk, dan kategori.",
  alternates: { canonical: "/project" },
};

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
