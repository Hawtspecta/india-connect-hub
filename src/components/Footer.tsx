import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion() === true;

  const col = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduceMotion ? 0.2 : 0.55, delay: reduceMotion ? 0 : delay, ease: easeOut },
  });

  return (
    <footer ref={ref} className="border-t border-border py-12 md:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <motion.div {...col(0)}>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">
              <span className="text-primary">INDIAN</span> CULTURAL HUB
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              A globally relevant creative brand rooted in Indian culture,
              delivering premium experiences across performing arts, events, and
              digital content.
            </p>
          </motion.div>

          <motion.div {...col(0.08)}>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">
              Quick Links
            </p>
            <div className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Work", href: "#work" },
                { label: "Voices", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : 0.12 + i * 0.05,
                    ease: easeOut,
                  }}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div {...col(0.16)}>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">
              Follow Us
            </p>
            <div className="space-y-2">
              {["Instagram", "YouTube", "LinkedIn", "Twitter"].map((social, i) => (
                <motion.a
                  key={social}
                  href="#"
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : 0.2 + i * 0.05,
                    ease: easeOut,
                  }}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.35 }}
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-body text-xs text-muted-foreground">
            © 2025 Indian Cultural Hub. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Designed with passion for culture
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
