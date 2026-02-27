import { User, BookOpen, Shield, PenTool } from "lucide-react";
import aboutPhoto from "@/assets/about-photo.jpeg";

const expertiseAreas = [
  { icon: Shield, title: "AI Policy & Governance", description: "Analyzing regulatory frameworks and ethical guidelines shaping AI development worldwide." },
  { icon: BookOpen, title: "Research & Analysis", description: "Deep analytical work on the societal impacts of emerging technologies and AI systems." },
  { icon: PenTool, title: "Writing & Commentary", description: "Publishing essays, articles, and thought pieces on technology, ethics, and the future." },
  { icon: User, title: "AI Alignment", description: "Contributing to AI alignment research as an Outlier AI specialist, ensuring safe and beneficial AI." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative">
      <div className="section-container">
        <div className="green-line mb-16" />

        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left — Bio (60%) */}
          <div className="md:col-span-3">
            <p className="section-label mb-4">About</p>
            <h2 className="section-heading mb-8">
              HELLO,
              <br />
              I'M <span className="green-gradient-text">RAINARD</span>
            </h2>
            <div className="space-y-5 text-sm font-body text-muted-foreground leading-relaxed max-w-lg">
              <p>
                A writer, researcher, and AI alignment specialist from the rural Philippines, dedicated to understanding how artificial intelligence intersects with ethics, governance, and the communities often left behind by technological progress.
              </p>
              <p>
                With a background in classical philosophy, legal studies, and hands-on AI alignment work at Outlier AI, the mission is to bridge the gap between cutting-edge technology and the people who need to understand it most — from policymakers in ASEAN boardrooms to farmers' grandchildren in Western Visayas.
              </p>
              <p>
                Through published policy research, international speaking engagements, and recognition as Champion of the ASEAN-IPR Cybersecurity Youth Essay Competition, contributing to the critical conversation about how we build, regulate, teach, and live alongside AI, especially for those who have never been part of that conversation before.
              </p>
            </div>
          </div>

          {/* Right — Photo + Green Circle (40%) */}
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="relative">
              {/* Green crystal circle behind photo */}
              <div
                className="absolute rounded-2xl"
                style={{
                  width: "calc(100% + 3rem)",
                  height: "calc(100% + 3rem)",
                  top: "-1.5rem",
                  left: "-1.5rem",
                  background: "radial-gradient(ellipse, hsl(145 76% 40% / 0.7), hsl(145 76% 40% / 0.3))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid hsl(145 76% 40% / 0.3)",
                  boxShadow: "0 0 60px hsl(145 76% 40% / 0.2)",
                }}
              />
              {/* Photo */}
              <div className="relative z-10 w-64 h-80 md:w-72 md:h-96 overflow-hidden rounded-2xl">
                <img
                  src={aboutPhoto}
                  alt="Professional photo at CYBERCON event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {expertiseAreas.map((area) => (
            <div key={area.title} className="glass-card p-6 group">
              <area.icon className="w-6 h-6 text-primary mb-4 group-hover:text-foreground transition-colors" />
              <h3 className="font-display text-lg font-bold uppercase text-foreground mb-2 tracking-tight">
                {area.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
