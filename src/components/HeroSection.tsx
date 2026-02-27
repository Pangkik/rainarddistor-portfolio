import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image - very subtle */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Top glass bar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="glass-bar mx-4 mt-20 md:mt-24 px-6 py-3 flex items-center justify-between rounded-xl">
          
          <span className="section-label">
            {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(new Date())}
          </span>
        </div>
      </div>

      {/* Center composition: text behind image */}
      <div className="relative z-10 w-full section-container py-32">
        <div className="relative flex flex-col items-center justify-center min-h-[60vh]">
          {/* Giant text BEHIND - z-index 1 */}
          <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none">
            <h1 className="font-display font-black uppercase text-foreground leading-[0.9] tracking-[-0.03em] text-center"
            style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}>
              <span className="block">RAINARD</span>
              <span className="block">DISTOR</span>
            </h1>
          </div>

        </div>

        {/* Subtitle + CTA below */}
        <div className="relative z-[3] mt-12 text-center">
          <p className="animate-fade-up section-label mb-6">
            Writer · Researcher · AI Analyst · Technology Policy Specialist
          </p>

          <p className="animate-fade-up-delay-1 max-w-md mx-auto text-sm font-body text-muted-foreground leading-relaxed mb-10">
            Mapping the governance challenges of frontier technologies through rigorous research, public discourse, and sustained inquiry into AI's societal impact.
          </p>

          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo("#works")} className="btn-primary">
              Explore My Work
            </button>
            <button onClick={() => scrollTo("#blog")} className="btn-outline">
              Read My Blog
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-8 py-3 border border-border text-muted-foreground font-display text-sm tracking-widest uppercase hover:text-primary hover:border-primary transition-all duration-300"
              style={{ borderRadius: "100px" }}>

              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Bottom glass bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="glass-bar mx-4 mb-4 px-6 py-3 flex items-center justify-between rounded-xl">
          <span className="section-label">rainarddistor.lovable.app</span>
          <span className="section-label">@raingoesaway</span>
          <span className="section-label hidden sm:inline">Philippines</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>);

};

export default HeroSection;