import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { contact } from '@/data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader number="05" eyebrow="Contact" title={contact.headline} description={contact.intro} />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-surface p-8 md:p-12">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="group mt-4 inline-flex items-center gap-3 break-all font-display text-3xl transition-colors duration-300 hover:text-accent md:text-5xl"
                >
                  {contact.email}
                  <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-accent" />
                  {contact.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  Send an email
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                  aria-live="polite"
                >
                  {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Address copied' : 'Copy address'}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <ul className="flex h-full flex-col divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
              {contact.socials.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label} className="flex-1">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-center justify-between gap-4 px-8 py-6 transition-colors duration-300 hover:bg-surface-2"
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium">{social.label}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
