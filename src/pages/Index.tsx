import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedWork from "@/components/FeaturedWork";
import ClientSection from "@/components/ClientSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="text-foreground min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/bg.jpg')] bg-cover bg-center bg-fixed opacity-80" />
        <div className="relative">
          <AboutSection />
          <ServicesSection />
          <FeaturedWork />
          <ClientSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
