import { Mic } from "lucide-react";

const engagements = [
  {
    event: "[PLACEHOLDER] World AI Summit 2025",
    topic: "AI Governance in the Age of Foundation Models",
    role: "Keynote Speaker",
    date: "March 2025",
    description: "Delivered keynote on regulatory challenges posed by increasingly capable AI systems and the need for international governance cooperation.",
  },
  {
    event: "[PLACEHOLDER] UNESCO Digital Ethics Forum",
    topic: "Ethics of AI in Education and Research",
    role: "Panelist",
    date: "January 2025",
    description: "Participated in a panel discussion on the ethical implications of AI integration in educational institutions and academic research.",
  },
  {
    event: "[PLACEHOLDER] Tech Policy Institute Annual Conference",
    topic: "Data Sovereignty and AI Training",
    role: "Invited Speaker",
    date: "October 2024",
    description: "Presented research on digital rights frameworks and their intersection with large‑scale AI model development.",
  },
  {
    event: "[PLACEHOLDER] African AI Policy Symposium",
    topic: "Inclusive AI Governance for Developing Nations",
    role: "Workshop Lead",
    date: "June 2024",
    description: "Led a workshop on building inclusive technology policy frameworks tailored to the needs of the Global South.",
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
