interface SectionHeaderProps {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  compact?: boolean;
}

export default function SectionHeader({ number, eyebrow, title, description, compact = false }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${compact ? 'mb-10 md:mb-14' : 'mb-14 md:mb-20'}`}>
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {number && <span className="font-display text-base normal-case tracking-normal text-accent">{number}</span>}
        {number && <span className="h-px w-8 bg-line" />}
        {eyebrow}
      </p>
      <h2 className={`mt-5 font-display leading-[1.15] ${compact ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'}`}>{title}</h2>
      {description && <p className="mt-6 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
