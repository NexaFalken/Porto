import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { projects, type Project } from '@/data/portfolio';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <div
          className={`group relative overflow-hidden rounded-3xl border border-line bg-surface-2 md:col-span-7 ${reversed ? 'md:order-last' : ''}`}
        >
          <div className="aspect-[4/3] overflow-hidden md:aspect-[16/11]">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
        </div>

        <div className="md:col-span-5">
          <p className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            <span className="font-display text-base normal-case tracking-normal text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            {project.category}
          </p>
          {project.status && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {project.status}
            </span>
          )}
          <h3 className="mt-5 font-display text-4xl leading-[1.15] md:text-5xl">{project.title}</h3>
          <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

          {project.stack && project.stack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {item}
                </li>
              ))}
            </ul>
          )}

          {project.links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
      <div className="space-y-24 md:space-y-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
