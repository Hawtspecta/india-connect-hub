const Footer = () => {
  return (
    <footer className="border-t border-border py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">
              <span className="text-primary">INDIAN</span> CULTURAL HUB
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              A globally relevant creative brand rooted in Indian culture,
              delivering premium experiences across performing arts, events, and
              digital content.
            </p>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">
              Quick Links
            </p>
            <div className="space-y-2">
              {["About", "Services", "Work", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">
              Follow Us
            </p>
            <div className="space-y-2">
              {["Instagram", "YouTube", "LinkedIn", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2025 Indian Cultural Hub. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Designed with passion for culture
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
