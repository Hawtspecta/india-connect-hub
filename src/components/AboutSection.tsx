import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const stats = [
    { number: "200+", label: "Performances" },
    { number: "50+", label: "Workshops" },
    { number: "10K+", label: "Attendees" },
    { number: "15+", label: "Years" },
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-32 md:py-48 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent mb-4">
            About Us
          </p>
          <motion.div
            style={{ width: lineWidth }}
            className="h-px bg-gradient-to-r from-primary/60 to-transparent"
          />
        </motion.div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground"
            >
              Rooted in{" "}
              <span className="italic text-primary">Tradition</span>,
              <br />
              Crafted for the{" "}
              <span className="text-gradient-gold">World</span>
            </motion.h2>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
            >
              We are a multidisciplinary creative organization working across
              performing arts, cultural experiences, event production, and digital
              content. From concept to execution, we deliver end-to-end creative
              solutions that celebrate India's rich heritage while pushing the
              boundaries of contemporary expression.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Our vision is to position Indian culture as a globally relevant
              creative force — connecting audiences, artists, and institutions
              through powerful storytelling and immersive experiences.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-border pt-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </p>
              <p className="font-body text-sm tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
