import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import SpeakingSection from "@/components/SpeakingSection";
import AwardsSection from "@/components/AwardsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Rainard Distor | Writer and Researcher on AI Governance</title>
      <meta
        name="description"
        content="Rainard Distor is a writer and researcher working on AI governance and digital policy in Southeast Asia. ASEAN-IPR Cybersecurity Essay Champion."
      />
      <link rel="canonical" href="https://raingoesaway.com/" />
      <meta property="og:title" content="Rainard Distor | Writer and Researcher on AI Governance" />
      <meta
        property="og:description"
        content="Writer and researcher on AI governance and digital policy in Southeast Asia."
      />
      <meta property="og:url" content="https://raingoesaway.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://raingoesaway.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://raingoesaway.com/og-image.png" />
    </Helmet>

    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <SpeakingSection />
      <AwardsSection />
      <BlogSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
