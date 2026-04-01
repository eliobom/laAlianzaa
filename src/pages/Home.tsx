import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Stores from '../components/Stores';
import CustomSections from '../components/CustomSections';
import Footer from '../components/Footer';

export default function Home() {
  const heroBackgroundImageUrl = (import.meta as any).env?.VITE_HERO_BG as string | undefined;

  return (
    <>
      <Hero backgroundImageUrl={heroBackgroundImageUrl} />
      <Stores />
      <CustomSections />
      <AboutUs />
      <Footer />
    </>
  );
}
