import { SiteHeader } from './components/site/SiteHeader';
import { HeroSection } from './components/site/sections/HeroSection';
import { ServicesSection } from './components/site/sections/ServicesSection';
import { AboutSection } from './components/site/sections/AboutSection';
import { CoverageSection } from './components/site/sections/CoverageSection';
import { TrackingSection } from './components/site/sections/TrackingSection';
import { LabelPrintSection } from './components/site/sections/LabelPrintSection';
import { BookingSection } from './components/site/sections/BookingSection';
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
        <TrackingSection />
        <LabelPrintSection />
        <BookingSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
