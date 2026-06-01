import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { GrowthMetrics } from '../components/GrowthMetrics';
import { ThumbnailCarousel } from '../components/ThumbnailCarousel';
import { PosterGallery } from '../components/PosterGallery';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Process } from '../components/Process';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GrowthMetrics />
        <ThumbnailCarousel />
        <PosterGallery />
        <Features />
        <Pricing />
        <Process />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
