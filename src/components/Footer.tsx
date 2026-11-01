import { Hexagon } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-muted md:flex-row md:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <Hexagon className="h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="font-display text-xl text-fg">{profile.name}</p>
            <p className="mt-1 text-xs tracking-wide">{profile.signature}</p>
          </div>
        </div>
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <a
          href="#intro"
          className="transition-colors duration-300 hover:text-accent"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
