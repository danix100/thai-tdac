import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowToApply from "@/components/HowToApply";
import InfoSection from "@/components/InfoSection";
import CountryFlagsSection from "@/components/CountryFlagsSection";
import VisaGuideSection from "@/components/VisaGuideSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowToApply />
      <InfoSection />
      <CountryFlagsSection />
      <VisaGuideSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
