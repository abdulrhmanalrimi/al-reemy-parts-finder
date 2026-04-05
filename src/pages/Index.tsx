import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import InquirySection from "@/components/InquirySection";
import AboutSection from "@/components/AboutSection";
import BrandsSection from "@/components/BrandsSection";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <HeroSection />
    <ProductsSection />
    <InquirySection />
    <AboutSection />
    <BrandsSection />
    <MapSection />
    <ContactSection />
    <ReviewsSection />
    <Footer />
  </div>
);

export default Index;
