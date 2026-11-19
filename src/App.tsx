
import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import BackToTop from '@/components/BackToTop';
import CursorGlow from '@/components/CursorGlow';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import IntroOverlay from '@/components/IntroOverlay';

import { sectionIds } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';

import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Expertise from '@/components/sections/Expertise';
import Gallery from '@/components/sections/Gallery';
import Hero from '@/components/sections/Hero';
import JourneyFilm from '@/components/sections/JourneyFilm';
import Portfolio from '@/components/sections/Portfolio';
import Projects from '@/components/sections/Projects';

const CONSTRUCTION_DURATION_MS = 14000;

export default function App() {
  // Force dark mode temporarily while preserving the saved preference.
  const {
    theme,
    toggleTheme,
    setTemporaryTheme,
  } = useTheme('dark');

  const activeId = useActiveSection(sectionIds);

  const [constructionStarted, setConstructionStarted] = useState(false);
  const [constructionComplete, setConstructionComplete] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  const startConstruction = useCallback(() => {
    setConstructionStarted(true);
  }, []);

  const finishIntroOverlay = useCallback(() => {
    setIntroVisible(false);
  }, []);

  useEffect(() => {
    if (!constructionStarted) return;

    const timer = window.setTimeout(() => {
      setConstructionComplete(true);
      setTemporaryTheme(null);
    }, CONSTRUCTION_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [constructionStarted, setTemporaryTheme]);

  return (
    <div className="relative isolate">
      <CursorGlow />

      <main className="relative z-10">
        <Hero
          constructionStarted={constructionStarted}
          constructionComplete={constructionComplete}
        />

        <SiteHeader
          activeId={activeId}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <JourneyFilm />
        <About />
        <Expertise />
        <Portfolio />
        <Gallery />
        <Projects />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <BackToTop />

      {introVisible && (
        <IntroOverlay
          onConstructionStart={startConstruction}
          onComplete={finishIntroOverlay}
        />
      )}
    </div>
  );
}
