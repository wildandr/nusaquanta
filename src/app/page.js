import Link from 'next/link';
import HomeShowcase from '@components/home/HomeShowcase';
import CapabilityExplorer from '@components/home/CapabilityExplorer';
import HeroProjectStack from '@components/home/HeroProjectStack';
import { getProjectCards, getShowcaseCards } from '@/lib/queries';

const process = [
  ['01', 'Discover', 'Understand your users, business, and the problem worth solving.'],
  ['02', 'Define', 'Turn research into a focused product direction and clear priorities.'],
  ['03', 'Design', 'Shape useful, intuitive experiences before the build begins.'],
  ['04', 'Build', 'Engineer and test the product with your team, not in a silo.'],
  ['05', 'Improve', 'Learn from real use and keep making the experience better.'],
];

export default async function Home() {
  const [featured, { cards }] = await Promise.all([getShowcaseCards(), getProjectCards()]);

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-black font-reddit-sans text-white">
      <section className="relative mx-auto grid min-h-[790px] max-w-[1600px] items-center gap-12 px-5 pb-24 pt-32 md:px-10 lg:min-h-[850px] lg:grid-cols-[1.06fr_.94fr] lg:px-16 lg:pt-28">
        <div className="relative z-10 min-w-0 max-w-[780px]">
          <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-primary"><span className="h-px w-9 bg-primary" /> Independent digital product studio</p>
          <h1 className="text-[clamp(3rem,8.2vw,9rem)] font-semibold leading-[.88] tracking-[-.065em]">Complex ideas.<br /><span className="text-primary">Clear impact.</span></h1>
          <p className="mt-9 text-lg leading-relaxed text-white/65 md:text-xl" style={{ maxWidth: 'min(36rem, calc(100vw - 40px))' }}>We design and build digital products where thoughtful experience meets serious engineering—from first question to real-world use.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/project" className="inline-flex min-h-12 items-center gap-9 rounded-full bg-primary px-6 font-semibold text-black transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore our work <span aria-hidden="true">↗</span></Link>
            <Link href="/#contact" className="inline-flex min-h-12 items-center gap-9 rounded-full border border-white/30 px-6 font-semibold transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Start a conversation <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <HeroProjectStack cards={featured.slice(0, 2)} />
      </section>

      <section className="border-y border-white/15 bg-[#10120e] px-5 py-8 md:px-10 lg:px-16" aria-label="Selected project facts">
        <div className="mx-auto grid max-w-[1480px] gap-8 md:grid-cols-3 md:gap-0">
          <div className="md:border-r md:border-white/15 md:pr-8"><p className="text-4xl font-semibold tracking-tight text-primary md:text-5xl">{cards.length}</p><p className="mt-1 text-sm text-white/60">projects in our archive</p></div>
          <div className="md:border-r md:border-white/15 md:px-8"><p className="text-4xl font-semibold tracking-tight text-primary md:text-5xl">~30 sec</p><p className="mt-1 text-sm text-white/60">per patient in the documented Senyumin workflow</p></div>
          <div className="md:pl-8"><p className="text-4xl font-semibold tracking-tight text-primary md:text-5xl">~70K</p><p className="mt-1 text-sm text-white/60">PPSMB UGM users in its first two weeks</p></div>
        </div>
      </section>

      <CapabilityExplorer cards={featured} />
      <HomeShowcase cards={featured} />

      <section className="mx-auto max-w-[1480px] px-5 py-28 md:px-10 lg:px-16 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-2"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">How we work / 01—05</p><h2 className="max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-.045em] md:text-6xl">Good work comes from a clear process—and room to explore.</h2></div>
        <div className="mt-16 grid border-t border-white/20 md:grid-cols-5">
          {process.map(([number, title, body]) => <div key={number} className="border-b border-white/20 py-7 md:border-r md:px-5 md:last:border-r-0"><p className="text-sm text-primary">{number} /</p><h3 className="mt-10 text-2xl font-semibold">{title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">{body}</p></div>)}
        </div>
      </section>

      <section className="border-t border-white/15 bg-[#141812] px-5 py-24 md:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Built by people, for people</p><h2 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">Curiosity is part of the work.</h2></div>
          <div className="lg:max-w-xl lg:justify-self-end"><p className="text-lg leading-relaxed text-white/65">We bring design, engineering, data, and experimentation together. Meet the people and thinking behind the products.</p><Link href="/about" className="mt-8 inline-flex items-center gap-8 border-b border-primary pb-2 font-semibold text-primary hover:gap-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Get to know us <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </main>
  );
}
