import { Mic } from "lucide-react";

const engagements = [
  {
    event: "Use of AI in CagAI",
    topic: "Human Dignity in Technology",
    role: "Guest Speaker",
    date: "February 2026",
    url: "https://www.facebook.com/share/p/16VqfLcbn7/",
    description: "Defined Artificial Intelligence as a simulation of human thinking dependent on human data, emphasized that technological advancements must uphold human dignity, and conducted a practical session on proper prompting for research.",
  },
  {
    event: "ASEAN-IPR Regional Conference on Cybersecurity",
    topic: "PSYbersecurity: Empowering Youth to Defend Data in a Digital World",
    role: "Presenter (Regional Champion)",
    date: "February 2025",
    url: "https://jakartapm.dfa.gov.ph/sample-sites/1009-young-filipino-takes-top-prize-at-asean-ipr-cybersecurity-essay-writing-competition",
    description: "Presented a winning research paper to a delegation of experts, diplomats, and youth leaders, offering insights on cybersecurity's role in fostering a culture of peace within the ASEAN region.",
  },
  {
    event: "ASEAN Data Science Explorers (ADSE) National Finals",
    topic: "Circular Economy and Carbon Footprint Reduction (PeekPick)",
    role: "Co-Founder & Strategy Lead",
    date: "May 2025",
    url: "https://www.facebook.com/photo.php?fbid=1141171944715100&set=a.471769984988636&type=3#",
    description: "Pitched an innovative mobile bartering platform concept to a judging panel of industry leaders from SAP and the ASEAN Foundation, utilizing data visualization to model environmental impact.",
  },
  {
    event: "AYFN Cultural Exchange Program (Autumn Japan Culture Camp)",
    topic: "Cross-Cultural Leadership and UN Sustainable Development Goals",
    role: "National Delegate",
    date: "October 2025",
    url: "https://ayfnhq.org/scholarship-awardees-ayfn-scholarship-2025-for-asean-youth-timor-leste/",
    description: "Facilitated cultural exchange workshops and diplomatic simulations in Osaka, Japan, to build stronger diplomatic ties and leadership skills among international youth leaders.",
  },
];

const SpeakingSection = () => {
  return (
    <section id="speaking" className="py-24 md:py-32 bg-background">
      <div className="section-container">
        <div className="green-line mb-16" />
        <p className="section-label mb-4">Speaking</p>
        <h2 className="section-heading mb-12">
          ENGAGEMENTS & <span className="green-gradient-text">TALKS</span>
        </h2>

        <div className="space-y-0">
          {engagements.map((eng, i) => (
            <div
              key={i}
              className="group py-8 first:pt-0 last:border-b-0 hover:bg-muted/20 transition-colors px-6 -mx-6 rounded-xl"
              style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.06)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  <Mic size={16} className="text-primary" />
                  <span className="section-label">{eng.date}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold uppercase text-foreground mb-1 tracking-tight">
                    {eng.event}
                  </h3>
                  <p className="text-sm font-body text-primary mb-2">
                    {eng.role} — <em>{eng.topic}</em>
                  </p>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">
                    {eng.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
