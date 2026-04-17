import Hero from "../components/home/Hero";
import Journey from "../components/home/Journey";
import Methodology from "../components/home/Methodology";
import Newsletter from "../components/home/Newsletter";
import { PedagogicalStatement } from "../components/home/PedagogicalStatement";
import { Pillars } from "../components/home/Pillars";
import { Stats } from "../components/home/Stats";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <Pillars />
      <Stats />
      <Journey />
      <PedagogicalStatement className="mt-20" />
      <Methodology />
      <Newsletter />
    </main>
  );
}