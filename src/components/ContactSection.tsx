import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ChevronDown, Check } from "lucide-react";

const INTEREST_OPTIONS = [
  { id: "performance", label: "Performing Arts" },
  { id: "workshop", label: "Workshop" },
  { id: "event", label: "Event Production" },
  { id: "collaboration", label: "Collaboration" },
  { id: "other", label: "Other" },
];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion() === true;

  const [selectedInterest, setSelectedInterest] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !selectedInterest) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Simulate API call
    toast.success("Enquiry sent successfully! We'll get back to you soon.", {
      description: `Targeting: ${INTEREST_OPTIONS.find(o => o.id === selectedInterest)?.label}`,
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setSelectedInterest("");
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.3 : 0.75, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduceMotion ? 0.3 : 0.75,
              delay: reduceMotion ? 0 : 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Your email"
                />
              </div>
              
              {/* Custom Popover-style Interest Selection */}
              <div className="relative">
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Interest
                </label>
                <button
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full flex items-center justify-between border-b border-border py-3 font-body text-left transition-colors focus:outline-none focus:border-primary"
                >
                  <span className={selectedInterest ? "text-foreground" : "text-muted-foreground/50"}>
                    {selectedInterest 
                      ? INTEREST_OPTIONS.find(o => o.id === selectedInterest)?.label 
                      : "Select your interest"}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSelectOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isSelectOpen && (
                    <>
                      {/* Click overlay to close */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsSelectOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden backdrop-blur-sm"
                      >
                        <div className="py-1">
                          {INTEREST_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                setSelectedInterest(option.id);
                                setIsSelectOpen(false);
                              }}
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors text-left font-body text-sm"
                            >
                              <span className={selectedInterest === option.id ? "text-primary font-medium" : "text-foreground"}>
                                {option.label}
                              </span>
                              {selectedInterest === option.id && (
                                <Check className="w-4 h-4 text-primary" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell us about your project"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={reduceMotion ? undefined : { scale: 1.015, y: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300 mt-4 shadow-lg shadow-primary/20"
              >
                Send Enquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

