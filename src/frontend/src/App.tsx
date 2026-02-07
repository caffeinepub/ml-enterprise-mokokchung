import { SiteHeader } from './components/site/SiteHeader';
import { HeroSection } from './components/site/sections/HeroSection';
import { ServicesSection } from './components/site/sections/ServicesSection';
import { AboutSection } from './components/site/sections/AboutSection';
import { CoverageSection } from './components/site/sections/CoverageSection';
import { ContactSection } from './components/site/sections/ContactSection';
import { SiteFooter } from './components/site/SiteFooter';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <CoverageSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
