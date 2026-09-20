import HomeHero from "@components/home/HomeHero";
import HomeInnovation from "@components/home/HomeInnovation";
import RunningText from "@elements/RunningText";
import HomeShowcase from "@components/home/HomeShowcase";
import HomeProduct from "@components/home/HomeProduct";
import RunningSymbol from "@elements/RunningSymbol";
import { getShowcaseCards } from "@/lib/queries";

export default async function Home() {
  const showcaseCards = await getShowcaseCards();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden  ">
      <HomeHero />
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
