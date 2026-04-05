import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import featuredDance from "@/assets/featured-dance.jpg";
import featuredMusic from "@/assets/featured-music.jpg";
import eventImg from "@/assets/event-production.jpg";

const projects = [
  {
    title: "Nritya — A Dance Odyssey",
    category: "Performing Arts",
    image: featuredDance,
    year: "2025",
  },
  {
    title: "Strings of the Soul",
    category: "Musical Experience",
    image: featuredMusic,
    year: "2024",
  },
  {
    title: "The Grand Cultural Gala",
    category: "Event Production",
    image: eventImg,
    year: "2024",
  },
];

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section id="work" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={titleRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent mb-4">
            Featured Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Selected <span className="italic text-primary">Projects</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scrolling gallery */}
      <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] cursor-pointer"
    >
      <div className="relative overflow-hidden mb-6">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-[50vh] md:h-[65vh] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <p className="font-body text-xs tracking-widest uppercase text-accent">
            View Project →
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
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
    </motion.div>
  );
};

export default FeaturedWork;
