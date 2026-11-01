import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const about = document.getElementById('about');
      setVisible(about ? about.getBoundingClientRect().bottom <= 0 : window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/90 text-fg shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:bottom-8 md:right-8 ${visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
