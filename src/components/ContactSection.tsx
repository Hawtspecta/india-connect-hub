import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-accent mb-4">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-8">
              Let's Create
              <br />
              <span className="italic text-primary">Together</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-12 max-w-md">
              Whether you're looking to produce a cultural event, host a workshop,
              or collaborate on a creative project — we'd love to hear from you.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1">Email</p>
                <p className="font-body text-foreground">hello@indianculturalhub.com</p>
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1">Phone</p>
                <p className="font-body text-foreground">+91 98765 43210</p>
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1">Location</p>
                <p className="font-body text-foreground">Mumbai, India</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Interest
                </label>
                <select className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  <option value="" className="bg-card">Select your interest</option>
                  <option value="performance" className="bg-card">Performing Arts</option>
                  <option value="workshop" className="bg-card">Workshop</option>
                  <option value="event" className="bg-card">Event Production</option>
                  <option value="collaboration" className="bg-card">Collaboration</option>
                  <option value="other" className="bg-card">Other</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell us about your project"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300 mt-4"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
