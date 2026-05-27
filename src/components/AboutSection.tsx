import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

const aboutRevealImg = "/assets/hero-dancer.jpg";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const { scrollYProgress: revealProgress } = useScroll({
    target: revealRef,
    offset: ["start 88%", "center 52%"],
  });
  const revealClip = useTransform(revealProgress, [0, 1], [
    "inset(18% 8% 18% 8%)",
    "inset(0% 0% 0% 0%)",
  ]);
  const revealScale = useTransform(revealProgress, [0, 1], [1.08, 1]);

  const stats = [
    { number: "200+", label: "Performances" },
    { number: "50+", label: "Workshops" },
    { number: "10K+", label: "Attendees" },
    { number: "15+", label: "Years" },
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
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
              <span className="text-shimmer-gold">World</span>
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

        {/* Scroll-reveal frame + gentle zoom (heritage moment, similar to masked product reveals) */}
        <div
          ref={revealRef}
          className="my-14 md:my-16 w-full h-[240px] sm:h-[280px] md:h-[380px] overflow-hidden rounded-sm border border-border/40 bg-muted/30"
        >
          {reduceMotion ? (
            <img
              src={aboutRevealImg}
              alt="Classical Indian dance performance"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1280}
              height={960}
            />
          ) : (
            <motion.div
              style={{ scale: revealScale, clipPath: revealClip }}
              className="w-full h-full origin-center will-change-transform"
            >
              <img
                src={aboutRevealImg}
                alt="Classical Indian dance performance"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={960}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Stats — continuous ticker (same pattern as Work section) */}
      <div className="mt-16 md:mt-20 w-full border-t border-border pt-10 md:pt-12 overflow-hidden">
        {reduceMotion ? (
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2 tabular-nums">
                  {stat.number}
                </p>
                <p className="font-body text-sm tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="group/marquee-stats relative w-full overflow-hidden">
            <div className="flex w-max items-center motion-safe:animate-marquee-stats motion-reduce:animate-none group-hover/marquee-stats:motion-safe:[animation-play-state:paused] pl-6 md:pl-12">
              {[...stats, ...stats].map((stat, i) => (
                <div key={`${stat.label}-${i}`} className="flex items-baseline shrink-0 gap-4 md:gap-5 pr-10 md:pr-16">
                  <span className="font-display text-4xl md:text-5xl font-bold text-primary tabular-nums leading-none">
                    {stat.number}
                  </span>
                  <span className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
                    {stat.label}
                  </span>
                  <span className="text-primary/25 text-lg md:text-xl font-light px-2 md:px-4" aria-hidden>
                    ·
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
