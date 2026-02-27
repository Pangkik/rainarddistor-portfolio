const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="section-label">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="section-label opacity-50">
          Writer · Researcher · AI Analyst · Technology Policy Specialist
        </p>
      </div>
    </footer>
  );
};

export default Footer;
