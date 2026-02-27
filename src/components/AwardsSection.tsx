import { Award, GraduationCap } from "lucide-react";

const awards = [
  {
    title: "[PLACEHOLDER] Outstanding AI Research Award",
    org: "International AI Ethics Institute",
    year: "2025",
    type: "award",
    description: "Recognized for exceptional contributions to AI policy research and ethical governance frameworks.",
  },
  {
    title: "[PLACEHOLDER] Technology Policy Fellowship",
    org: "Global Digital Governance Foundation",
    year: "2024",
    type: "scholarship",
    description: "Competitive fellowship supporting research on the intersection of technology policy and human rights.",
  },
  {
    title: "[PLACEHOLDER] Emerging Voice in AI Ethics",
    org: "World Economic Forum",
    year: "2024",
    type: "award",
    description: "Selected as one of 30 emerging voices shaping the global conversation on responsible AI development.",
  },
  {
    title: "[PLACEHOLDER] Graduate Research Scholarship",
    org: "Centre for AI & Society",
    year: "2023",
    type: "scholarship",
    description: "Full scholarship for graduate research in AI governance and technology policy.",
  },
];

const AwardsSection = () => {
  return (
    <section id="awards" className="py-24 md:py-32 bg-background">
      <div className="section-container">
        <div className="green-line mb-16" />
        <p className="section-label mb-4">Recognition</p>
        <h2 className="section-heading mb-12">
          AWARDS & <span className="green-gradient-text">SCHOLARSHIPS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, i) => (
            <div key={i} className="glass-card p-6 group">
              <div className="flex items-start justify-between mb-4">
                {award.type === "award" ? (
                  <Award size={20} className="text-primary" />
                ) : (
                  <GraduationCap size={20} className="text-primary" />
                )}
                <span className="section-label">{award.year}</span>
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-foreground mb-1 group-hover:text-primary transition-colors tracking-tight">
                {award.title}
              </h3>
              <p className="text-sm font-body text-primary/70 mb-3">{award.org}</p>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
