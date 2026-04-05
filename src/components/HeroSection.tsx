import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-dancer.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image with parallax scale */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Indian classical dancer performing on stage"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"
        />

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            style={{ y: subtitleY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-accent mb-6"
          >
            Performing Arts · Culture · Experiences
          </motion.p>

          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tight text-foreground"
          >
            Where Culture
            <br />
            <span className="italic text-primary">Comes Alive</span>
          </motion.h1>

          <motion.div
            style={{ y: subtitleY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
              A multidisciplinary creative organization bridging traditional art forms
              with contemporary global experiences.
            </p>
            <a
              href="#about"
              className="font-body text-xs tracking-[0.3em] uppercase text-foreground/60 hover:text-foreground transition-colors flex flex-col items-center gap-3 group"
            >
              <span>Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
              />
            </a>
          </motion.div>
        </div>

        {/* Video placeholder notice */}
        <div className="absolute top-24 right-6 md:right-12">
          <div className="px-3 py-1.5 border border-border/50 bg-card/50 backdrop-blur-sm">
            <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">
              Video placeholder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
