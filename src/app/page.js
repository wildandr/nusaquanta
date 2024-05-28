import HomeHero from "@components/home/HomeHero";
import HomeShowcase from "@components/home/HomeShowcase";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden lg:overflow-visible ">
      
      <HomeShowcase />
    </main>
  );
}
