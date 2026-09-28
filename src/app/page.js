import HomeHero from "@components/home/HomeHero";
import HomeInnovation from "@components/home/HomeInnovation";
import RunningText from "@elements/RunningText";
import HomeShowcase from "@components/home/HomeShowcase";
import HomeProduct from "@components/home/HomeProduct";
import RunningSymbol from "@elements/RunningSymbol";
import { getProjectCards, getShowcaseCards } from "@/lib/queries";

export default async function Home() {
  const [{ cards: projects }, showcaseCards] = await Promise.all([
    getProjectCards(),
    getShowcaseCards(),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden  ">
      <HomeHero projects={projects} />
      <HomeProduct />
      <RunningText color={"secondary"} />
      <RunningSymbol />
      <HomeShowcase cards={showcaseCards} />
      <HomeInnovation />
      <RunningText />
      {/* <RunningSymbol/> */}
      <RunningText color={"secondary"} />
    </main>
  );
}
