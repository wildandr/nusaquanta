import HomeHero from "@components/home/HomeHero";
import HomeInnovation from "@components/home/HomeInnovation";
import RunningText from "@elements/RunningText";
import HomeShowcase from "@components/home/HomeShowcase";
import RunningSymbol from "@elements/RunningSymbol";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden  ">
      <HomeHero />
      <RunningText />
      <RunningSymbol />
      <HomeShowcase />
      <HomeInnovation />
      <RunningText />
      {/* <RunningSymbol/> */}
    </main>
  );
}
