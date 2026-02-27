import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Philosophy", "Cybersecurity", "Governance", "Marketing & Creatives", "News Article"];

const works = [
  {
    title: "PSYBERSECURITY: Empowering Youth to Defend Data in a Digital World",
    description: "This analysis critiques the psychological impact of the digital panopticon in Southeast Asia and proposes a unified legal framework to balance regional security with individual privacy.",
    date: "2025",
    category: "Cybersecurity",
    link: "https://asean-aipr.org/resources/publications/asean-ipr-cybersecurity-youth-essay-competition",
  },
  {
    title: "Lumad-Laban: An Exposition Against Corporations on Environmental Destruction",
    description: "This piece critiques the systemic failure of the Indigenous Peoples Rights Act (IPRA) to protect Lumad communities from the socio-environmental impacts of corporate mining and militarization",
    date: "2024",
    category: "Governance",
    link: "https://drive.google.com/file/d/1jq4aliG4UHXgXJ4xB_1BGMBxvdN62-HS/view",
  },
  {
    title: "Indiana State Fairgrounds Explosion",
    description: "A narrative investigation into the systemic negligence and dereliction of duty that led to the deadliest disaster in Indiana history",
    date: "2026",
    category: "Marketing & Creative",
    link: "https://docs.google.com/document/d/11HOkHS0ipzt_dlStEKA5k_QoeU4nFd_GZvSiyfbtfxY/edit?usp=sharing",
  },
  {
    title: "The WNBA GOAT's Boyfriend Who Grew Up With Absolutely Nothing (Bam Adebayo)",
    description: "A biographical study tracing the trajectory of NBA star Bam Adebayo from extreme rural poverty to professional success, highlighting the lack of exposure in marginalized communities.",
    date: "2026",
    category: "Marketing & Creative",
    link: "https://docs.google.com/document/d/1eBISQpr1iGA2bNLot8pq3L62Wfn_qcZoXw8rMc197bY/edit?tab=t.0",
  },
  {
    title: "Church counts on you, archbishop tells youth",
    description: "An analysis of the role of digital natives in the modern Church, urging youth to leverage social communications for social hope and ethical engagement.",
    date: "2017",
    category: "News Article",
    link: "https://cbcpnews.net/cbcpnews/church-counts-on-you-archbishop-tells-youth/",
  },
  {
    title: "The Nietzschean Fallacy: Deconstructing Racism and the Filipino Übermensch",
    description: "This philosophical inquiry separates the Nazi misinterpretation of Nietzsche's Übermensch from its true meaning of self-conquest, analyzing its relevance—or lack thereof—to contemporary Filipino racial dynamics and colonial legacies.",
    date: "2022",
    category: "Philosophy",
    link: "https://contra.com/p/UNssg6RN-the-owl?r=rainard_distor_s65vyznm",
  },
];

const WorksSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <section id="works" className="py-24 md:py-32 bg-background">
      <div className="section-container">
        <div className="green-line mb-16" />
        <p className="section-label mb-4">Works & Publications</p>
        <h2 className="section-heading mb-12">
          SELECTED <span className="green-gradient-text">WRITING</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-[11px] font-display tracking-[0.15em] uppercase transition-all duration-300 ${active === cat
                ? "bg-primary text-primary-foreground"
                : "glass-card !transform-none text-muted-foreground hover:text-primary"
                }`}
              style={{ borderRadius: "100px" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((work, i) => (
            <a
              key={i}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 group cursor-pointer block"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-primary/60">
                  {work.category}
                </span>
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground">
                  {work.date}
                </span>
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold uppercase text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">
                {work.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                {work.description}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-display tracking-[0.15em] uppercase text-primary group-hover:gap-2 transition-all">
                Read More <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
