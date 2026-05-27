import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const heroVideo = "/assets/hero-video.mp4";
const heroPoster = "/assets/hero-dancer.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = true;
    videoRef.current
      .play()
      .then(() => {
        setVideoPlaying(true);
      })
      .catch(() => {
        // Some browsers still block autoplay; keep poster visible until ready
      });
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const zoomEnd = reduceMotion ? 1 : 1.2;
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, zoomEnd]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    reduceMotion ? [0.45, 0.72] : [0.4, 0.85],
  );
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -52]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image with parallax scale */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${videoPlaying ? "opacity-0" : "opacity-100"}`}
            style={{ backgroundImage: `url(${heroPoster})` }}
          />
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroPoster}
            onPlaying={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoPlaying ? "opacity-100" : "opacity-0"}`}
          />
        </motion.div>

        {/* Scrim for readability; fades into page cream at bottom */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-background"
        />

        {/* Slow orbital frames + soft light pool (disabled when reduced motion) */}
        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <motion.div
              className="absolute -top-[18%] -right-[12%] h-[min(42vmin,380px)] w-[min(42vmin,380px)] rounded-full border border-cream/[0.09]"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-[-12%] left-[-10%] h-[min(36vmin,300px)] w-[min(36vmin,300px)] rounded-full border border-primary/[0.14]"
              animate={{ rotate: -360 }}
              transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_38%,hsl(var(--primary)/0.14),transparent_65%)] motion-safe:animate-accent-glow" />
          </div>
        )}

        {/* Decorative line — draws in from centre */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px origin-center bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            style={{ y: subtitleY }}
            initial={{ opacity: 0, letterSpacing: "0.55em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-xs md:text-sm uppercase text-accent mb-6 drop-shadow-sm"
          >
            Performing Arts · Culture · Experiences
          </motion.p>

          <motion.div style={{ y: textY }} className="font-display text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tight drop-shadow-md">
            <motion.span
              className="block text-cream"
              initial={
                reduceMotion
                  ? { opacity: 0, y: 16 }
                  : { opacity: 0, y: 40, filter: "blur(14px)" }
              }
              animate={{ opacity: 1, y: 0, filter: reduceMotion ? "blur(0px)" : "blur(0px)" }}
              transition={{ delay: 0.42, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Where Culture
            </motion.span>
            <motion.span
              className="block italic text-primary mt-1 md:mt-2"
              initial={{ opacity: 0, y: 52, rotate: -2.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={
                reduceMotion
                  ? { delay: 0.55, duration: 0.5 }
                  : { delay: 0.62, type: "spring", stiffness: 78, damping: 17, mass: 0.9 }
              }
            >
              Comes Alive
            </motion.span>
          </motion.div>

          <motion.div
            style={{ y: subtitleY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.75 }}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <p className="font-body text-sm md:text-base text-cream/85 max-w-md leading-relaxed drop-shadow-sm">
              A multidisciplinary creative organization bridging traditional art forms
              with contemporary global experiences.
            </p>
            <a
              href="#about"
              className="font-body text-xs tracking-[0.3em] uppercase text-cream/70 hover:text-cream transition-colors flex flex-col items-center gap-3 group"
            >
              <span>Scroll to Explore</span>
              {reduceMotion ? (
                <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
              ) : (
                <motion.div
                  animate={{ y: [0, 9, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
                />
              )}
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
