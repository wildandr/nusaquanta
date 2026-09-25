import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getProjectDetail } from '@/lib/queries';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProjectDetail(id);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary || project.fullTitle,
    alternates: { canonical: `/project/${project.id}` },
    openGraph: { title: project.title, description: project.summary, ...(project.imageUrl ? { images: [{ url: project.imageUrl }] } : {}) },
  };
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = await getProjectDetail(id);
  if (!project) notFound();

  return <main className="min-h-screen overflow-x-clip bg-black font-reddit-sans text-white">
    <section className="mx-auto max-w-[1480px] px-5 pb-16 pt-32 md:px-10 lg:px-16 lg:pb-24 lg:pt-40">
      <Link href="/project" className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-primary">← All work</Link>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.5fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Case study / {project.industry}</p><h1 className="mt-5 text-[clamp(3.8rem,8vw,8rem)] font-semibold leading-[.9] tracking-[-.06em]">{project.title}</h1></div><p className="max-w-lg text-xl leading-relaxed text-white/65">{project.summary}</p></div>
      <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/20 pt-5 text-sm"><div><span className="text-white/45">Field</span><p className="mt-1">{project.industry}</p></div>{project.year && <div><span className="text-white/45">Year</span><p className="mt-1">{project.year}</p></div>}{project.client && <div><span className="text-white/45">Collaboration</span><p className="mt-1">{project.client}</p></div>}<div><span className="text-white/45">Capabilities</span><p className="mt-1">{project.capabilities.join(' · ')}</p></div></div>
    </section>

    <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16"><div className="relative aspect-[1.5] overflow-hidden rounded-2xl bg-[#181818]">{project.imageUrl ? <Image src={project.imageUrl} alt={`${project.title} digital product interface`} fill priority sizes="(min-width: 1600px) 1480px, 95vw" className="object-cover" /> : <div className="flex h-full items-end bg-[radial-gradient(circle_at_65%_30%,#3c5720,transparent_42%)] p-10 md:p-20"><span className="text-[clamp(3rem,8vw,8rem)] font-semibold leading-none tracking-tight text-primary">{project.title}</span></div>}</div></div>

    {project.challenge && <section className="mx-auto grid max-w-[1480px] gap-12 px-5 py-28 md:px-10 lg:grid-cols-[.45fr_1fr] lg:px-16 lg:py-40"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">The project in focus</p><div className="space-y-12"><div className="border-t border-white/20 pt-6"><p className="text-sm text-primary">01 / Challenge</p><h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{project.challenge}</h2></div><div className="border-t border-white/20 pt-6"><p className="text-sm text-primary">02 / Approach</p><p className="mt-5 max-w-3xl text-xl leading-relaxed text-white/70 md:text-2xl">{project.solution}</p></div>{project.outcome && <div className="border-t border-white/20 pt-6"><p className="text-sm text-primary">03 / Documented outcome</p><div className="mt-5 flex flex-wrap items-start gap-8">{project.metric && <p className="text-5xl font-semibold text-primary md:text-7xl">{project.metric}</p>}<p className="max-w-xl text-xl leading-relaxed text-white/70">{project.outcome}</p></div></div>}</div></section>}

    <section className="border-t border-white/15 bg-[#111510] px-5 py-24 md:px-10 lg:px-16 lg:py-32"><div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[.45fr_1fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Project notes</p><h2 className="mt-5 text-4xl font-semibold tracking-tight">A closer look.</h2></div><ReactMarkdown className="prose prose-invert max-w-3xl text-white/75 prose-headings:font-semibold prose-headings:text-white prose-a:text-primary prose-strong:text-white prose-li:marker:text-primary">{project.description}</ReactMarkdown></div></section>

    {project.team.length > 0 && <section className="mx-auto max-w-[1480px] px-5 py-20 md:px-10 lg:px-16"><div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-6"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Credits</p><h2 className="mt-3 text-3xl font-semibold">People behind this project.</h2></div><Link href="/about#team" className="text-sm font-semibold text-primary hover:underline focus-visible:outline focus-visible:outline-primary">Meet the team ↗</Link></div><div className="mt-7 flex flex-wrap gap-6">{project.team.map((member) => <div key={member.key} className="flex items-center gap-3"><Image src={member.photoUrl} alt={`Portrait of ${member.fullName}`} width={54} height={54} className="h-14 w-14 rounded-full object-cover" /><div><p className="font-semibold">{member.fullName}</p><p className="text-sm text-white/50">{member.jobs.slice(0, 2).join(' · ')}</p></div></div>)}</div></section>}
    <section className="mx-auto max-w-[1480px] px-5 pb-28 md:px-10 lg:px-16"><div className="flex flex-wrap items-end justify-between gap-6 rounded-2xl bg-primary p-8 text-black md:p-12"><div><p className="text-xs font-bold uppercase tracking-widest">Have a challenge in mind?</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Let&apos;s make it useful.</h2></div><Link href="/#contact" className="rounded-full bg-black px-6 py-3 font-semibold text-primary transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">Start a conversation ↗</Link></div></section>
  </main>;
}
