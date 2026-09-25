import Image from "next/image";
import Link from "next/link";

export default function AboutTeam({ founder }) {
  if (!founder) return null;

  return (
    <section id="team" className="scroll-mt-24 bg-primary px-5 py-24 font-reddit-sans text-black md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-7 lg:grid-cols-[.65fr_1fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[.22em]">The founder behind the work</p>
          <h2 className="text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">Built on curiosity.<br />Led with purpose.</h2>
        </div>
        <div className="mt-14 grid overflow-hidden rounded-2xl border border-black/20 bg-[#151515] text-white lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative flex min-h-[420px] items-end justify-center overflow-hidden bg-[#252b20] md:min-h-[570px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(184,233,48,.3),transparent_65%)]" />
            <Image src={founder.cutoutUrl} alt={`Portrait of ${founder.fullName}`} width={650} height={750} sizes="(min-width: 1024px) 45vw, 90vw" className="relative z-10 h-[90%] w-auto object-contain object-bottom" />
            <span className="absolute bottom-6 left-6 z-20 text-xs font-bold uppercase tracking-[.2em] text-primary">Founder / Nusa Quanta</span>
          </div>
          <div className="flex flex-col justify-between gap-10 p-7 md:p-12 lg:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Meet the founder</p>
              <h3 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{founder.fullName}</h3>
              <p className="mt-3 text-lg text-primary">Founder</p>
              <p className="mt-7 max-w-xl leading-relaxed text-white/65">Wildan founded Nusa Quanta around a simple idea: good digital work starts with understanding people and the problems they face. Drawing on experience in design, research, and data, he brings different disciplines together to turn thoughtful ideas into useful products.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Product direction', 'Experience design', 'Research & data'].map((focus) => <span key={focus} className="rounded-full border border-white/25 px-3 py-1.5 text-xs text-white/75">{focus}</span>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-7 border-t border-white/20 pt-6">
              {founder.projectIds[0] && <Link href={`/project/${founder.projectIds[0]}`} className="border-b border-primary pb-1 font-semibold text-primary hover:text-white focus-visible:outline focus-visible:outline-primary">See related work ↗</Link>}
              {founder.linkedin && <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-white/40 pb-1 font-semibold hover:text-primary focus-visible:outline focus-visible:outline-primary">LinkedIn ↗</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
