import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowToApply from "@/components/HowToApply";
import InfoSection from "@/components/InfoSection";
import CountryFlagsSection from "@/components/CountryFlagsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowToApply />
      <InfoSection />
      <CountryFlagsSection />
      <Footer />
    </div>
  );
};

export default Index;
