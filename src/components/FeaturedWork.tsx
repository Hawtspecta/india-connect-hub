import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import featuredDance from "@/assets/featured-dance.jpg";
import featuredMusic from "@/assets/featured-music.jpg";
import eventImg from "@/assets/event-production.jpg";

const projects = [
  {
    title: "Nritya — A Dance Odyssey",
    category: "Performing Arts",
    image: featuredDance,
    year: "2025",
    summary:
      "A full-length Bharatanatyam production touring three cities, blending classical repertoire with contemporary staging and live ensemble music.",
  },
  {
    title: "Strings of the Soul",
    category: "Musical Experience",
    image: featuredMusic,
    year: "2024",
    summary:
      "An intimate evening of Hindustani and Carnatic fusion with guest artists, spatial sound design, and a seated audience of 400.",
  },
  {
    title: "The Grand Cultural Gala",
    category: "Event Production",
    image: eventImg,
    year: "2024",
    summary:
      "End-to-end creative direction for a two-night gala: stage design, artist lineup, run of show, and broadcast capture for sponsors and OTT.",
  },
];

const FeaturedWork = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion() === true;
  const loopItems = [...projects, ...projects];
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isDragging && marqueeRef.current) {
        marqueeRef.current.scrollLeft += 1;
        // Reset scroll when reaching the end to create infinite loop
        if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
          marqueeRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (marqueeRef.current?.offsetLeft || 0));
    setScrollLeft(marqueeRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (marqueeRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (marqueeRef.current) {
      marqueeRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section id="work" className="relative py-16 md:py-24 overflow-hidden bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={titleRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent mb-3">
            Featured Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Selected{" "}
            <motion.span
              className="italic text-primary inline-block origin-bottom-left"
              initial={{ opacity: 0, y: 22, rotate: -5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={
                reduceMotion
                  ? { duration: 0.4 }
                  : { type: "spring", stiffness: 90, damping: 14, delay: 0.08 }
              }
            >
              Projects
            </motion.span>
          </h2>
        </motion.div>
      </div>

      {/* Continuous marquee with manual scroll support */}
      <div 
        ref={marqueeRef}
        className="group/marquee relative w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsPaused(true)}
        onMouseOut={() => setIsPaused(false)}
      >
        <div className="flex gap-6 md:gap-8 pl-6 md:pr-6">
          {loopItems.map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[0];
}) => {
  const [visited, setVisited] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouchHardware = 
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024;
      return isTouchHardware && isSmallScreen;
    };
    
    const handleResize = () => setIsTouch(checkTouch());
    handleResize(); // Initial check
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldReveal = isTouch && (visited || isInView);

  return (
    <div 
      ref={cardRef}
      onClick={() => isTouch && setVisited(true)}
      className={cn(
        "group/card flex-shrink-0 w-[78vw] sm:w-[70vw] md:w-[40vw] lg:w-[32vw] max-w-xl cursor-pointer relative",
        isTouch && "cursor-pointer"
      )}
    >
      <div className="relative overflow-hidden mb-6">
        {/* Mobile Click Indicator */}
        {isTouch && !visited && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/20 shadow-lg pointer-events-none"
          >
            <p className="font-body text-[8px] tracking-[0.2em] uppercase text-primary font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Tap to Explore
            </p>
          </motion.div>
        )}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={cn(
            "w-full h-[40vh] md:h-[50vh] object-cover transition-all duration-700 group-hover/card:scale-105",
            shouldReveal ? "grayscale-0" : "grayscale group-hover/card:grayscale-0"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover/card:opacity-100 translate-y-3 group-hover/card:translate-y-0 transition-all duration-500">
          <p className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-accent mb-2">
            {project.category} · {project.year}
          </p>
          <h4 className="font-display text-xl md:text-2xl font-bold text-cream leading-tight mb-3">
            {project.title}
          </h4>
          <p className="font-body text-sm text-cream/90 leading-relaxed line-clamp-4 md:line-clamp-none">
            {project.summary}
          </p>
          <p className="font-body text-xs tracking-widest uppercase text-cream/70 mt-4">
            View project →
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover/card:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {project.category}
          </p>
        </div>
        <span className="font-body text-sm text-muted-foreground">
          {project.year}
        </span>
      </div>
    </div>
  );
};

export default FeaturedWork;
