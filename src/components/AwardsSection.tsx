import { Award, GraduationCap } from "lucide-react";

const awards = [
  {
    title: "Regional Champion (1st Place), Cybersecurity Youth Essay Competition",
    org: "ASEAN Institute of Peace and Reconciliation (ASEAN-IPR)",
    year: "2025",
    type: "award",
    url: "https://www.facebook.com/watch/?v=2758249764562792",
    description: "Secured 1st place out of 70+ applicants (Top 1% Performance) for outstanding research on cybersecurity's role in fostering a culture of peace in the ASEAN region.",
  },
  {
    title: "National Champion & Best Speaker (Preliminary Rounds)",
    org: "Intellectual Property Office (IPO) Intellectual Property Law Debate",
    year: "2023",
    type: "award",
    url: "https://wvsu.edu.ph/college-of-law-declared-champion-in-intellectual-property-debate/",
    description: "Awarded the national championship and individual honors for speaking proficiency in a high-level legal debate competition focused on intellectual property rights.",
  },
  {
    title: "Philippine Delegate, Young Leaders Forum (AAYLF)",
    org: "ASEAN-Australia Strategic Youth Partnership (AAYSP)",
    year: "2025",
    type: "scholarship/delegate",
    Url: "https://www.facebook.com/share/p/1AjA8Q5Et3/",
    description: "Selected as a Philippine representative to engage in high-level strategic dialogue on the Blue Economy, Maritime Security, and Ocean Sustainability in Cebu, Philippines.",
  },
  {
    title: "Autumn Japan Culture Camp",
    org: "ASEAN Youth Friendship Network (AYFN) Academy",
    year: "2025",
    type: "scholar/delegate",
    url: "https://ayfnhq.org/scholarship-awardees-ayfn-scholarship-2025-for-asean-youth-timor-leste/",
    description: "Chosen to represent the Philippines in Osaka, Japan; participated in intensive workshops on cross-cultural leadership and diplomatic simulations.",
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
