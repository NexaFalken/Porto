
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import { sectionIds } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Expertise from '@/components/sections/Expertise';
import Gallery from '@/components/sections/Gallery';
import Hero from '@/components/sections/Hero';
import Portfolio from '@/components/sections/Portfolio';
import Projects from '@/components/sections/Projects';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <main>
        <Hero />

        <SiteHeader
          activeId={activeId}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <About />
        <Expertise />
        <Portfolio />
        <Gallery />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
