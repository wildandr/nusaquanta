import HomeHero from "@components/home/HomeHero";
import HomeInnovation from "@components/home/HomeInnovation";
import RunningText from "@elements/RunningText";
import HomeShowcase from "@components/home/HomeShowcase";

import HomeProduct from "@components/home/HomeProduct";
import RunningSymbol from "@elements/RunningSymbol";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden  ">
      <HomeHero />
      <HomeProduct />
      <RunningText color={"secondary"}/>
      <RunningSymbol />
      <HomeShowcase />
      <HomeInnovation />
      <RunningText />
      {/* <RunningSymbol/> */}
      <RunningText color={"secondary"} />
    </main>
  );
}
