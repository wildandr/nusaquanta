import Link from 'next/link';
import AboutTeam from '@components/about/AboutTeam';
import { getPeople } from '@/lib/queries';

export const metadata = {
  title: 'About Us',
  description: 'Meet Wildan Dzaky Ramadhani, the founder of Nusa Quanta, and discover the thinking behind our digital product studio.',
  alternates: { canonical: '/about' },
};

const principles = [
  ['01', 'Start with the question', 'We make space to understand the people and systems behind a challenge before choosing a solution.'],
  ['02', 'Work across disciplines', 'Design, engineering, and data belong in the same conversation from the beginning.'],
  ['03', 'Make it useful', 'A strong idea earns its place when it works clearly and reliably in the real world.'],
];

export default async function AboutPage() {
  const founder = (await getPeople()).find((person) => person.fullName === 'Wildan Dzaky Ramadhani');
  return <main className="min-h-screen overflow-x-clip bg-black font-reddit-sans text-white">
    <section className="mx-auto max-w-[1480px] px-5 pb-28 pt-36 md:px-10 lg:px-16 lg:pb-40 lg:pt-44"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">About / Nusa Quanta</p><h1 className="mt-8 max-w-[1150px] text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.9] tracking-[-.065em]">People first.<br /><span className="text-primary">Possibility always.</span></h1><div className="mt-14 grid gap-10 border-t border-white/20 pt-8 lg:grid-cols-2"><p className="text-sm uppercase tracking-[.2em] text-primary">Independent minds, connected work.</p><p className="max-w-2xl text-xl leading-relaxed text-white/65 md:text-2xl">Nusa Quanta brings together people who care about designing and engineering useful digital experiences. We explore the problem, collaborate across disciplines, and build with the people who will use the result in mind.</p></div></section>
    <section className="border-y border-white/15 bg-[#111510] px-5 py-24 md:px-10 lg:px-16 lg:py-32"><div className="mx-auto max-w-[1480px]"><div className="grid gap-8 lg:grid-cols-2"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">What guides us</p><h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Curiosity, craft,<br />and collaboration.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{principles.map(([number, title, body]) => <div key={number} className="border-t border-primary/60 pt-6"><p className="text-sm text-primary">{number} /</p><h3 className="mt-12 text-2xl font-semibold">{title}</h3><p className="mt-4 max-w-sm leading-relaxed text-white/55">{body}</p></div>)}</div></div></section>
    <AboutTeam founder={founder} />
    <section className="mx-auto grid max-w-[1480px] gap-8 px-5 py-28 md:px-10 lg:grid-cols-2 lg:px-16 lg:py-40"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Beyond the portrait</p><h2 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">The work is the story.</h2></div><div className="lg:pt-12"><p className="max-w-lg text-lg leading-relaxed text-white/60">Wildan&apos;s approach comes to life through the people he works with and the products they build together. Explore the work and the thinking behind it.</p><Link href="/project" className="mt-8 inline-flex gap-8 border-b border-primary pb-2 font-semibold text-primary hover:gap-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore our work <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
