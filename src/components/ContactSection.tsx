import { useState } from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! This form will be connected to a backend soon.");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="section-container">
        <div className="green-line mb-16" />
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="section-label mb-4">Contact</p>
            <h2 className="section-heading mb-8">
              GET IN <span className="green-gradient-text">TOUCH</span>
            </h2>
            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-10">
              Interested in my services, collaborations, speaking invitations, or just want to discuss AI policy? I'd love to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 mt-6">
                <a
                  href="mailto:rainard99@gmail.com"
                  className="p-3 glass-card !transform-none !rounded-xl hover:!border-primary/40 text-muted-foreground hover:text-primary transition-all"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rainard-distor-bbb5b2a4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-card !transform-none !rounded-xl hover:!border-primary/40 text-muted-foreground hover:text-primary transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://x.com/rainarddistor_?t=Wd0pCN7LUl5F2UGQu5WZng"
                  className="p-3 glass-card !transform-none !rounded-xl hover:!border-primary/40 text-muted-foreground hover:text-primary transition-all"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { key: "name", label: "Name", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "subject", label: "Subject", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block section-label mb-2">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-transparent glass-card !rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:!border-primary/50 transition-colors !transform-none"
                  placeholder={`Your ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
            <div>
              <label className="block section-label mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent glass-card !rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:!border-primary/50 transition-colors resize-none !transform-none"
                placeholder="Your message"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
