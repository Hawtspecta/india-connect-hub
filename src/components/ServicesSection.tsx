import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const musicImg = "/assets/music-performance.jpg";
const workshopImg = "/assets/workshop.jpg";
const eventImg = "/assets/event-production.jpg";
const heroImg = "/assets/hero-dancer.jpg";
const digitalContentImg = "/assets/digital-content.jpg";

const services = [
  {
    title: "Performing Arts",
    description:
      "Classical and contemporary dance, music, and theatre productions that captivate audiences worldwide.",
    image: heroImg,
    tags: ["Bharatanatyam", "Kathak", "Theatre", "Fusion"],
  },
  {
    title: "Cultural Experiences",
    description:
      "Curated immersive experiences that bring communities together through the power of art and culture.",
    image: musicImg,
    tags: ["Festivals", "Exhibitions", "Installations"],
  },
  {
    title: "Workshops & Education",
    description:
      "Hands-on learning programs teaching traditional art forms to new generations of artists and enthusiasts.",
    image: workshopImg,
    tags: ["Dance", "Music", "Craft", "Digital"],
  },
  {
    title: "Event Production",
    description:
      "End-to-end creative solutions for large-scale cultural events, corporate productions, and brand activations.",
    image: eventImg,
    tags: ["Corporate", "Cultural", "Brand", "Live"],
  },
  {
    title: "Digital Content",
    description:
      "A dedicated studio producing high-impact cultural podcasts, performance films, and immersive digital documentaries.",
    image: digitalContentImg,
    tags: ["Podcasts", "Video", "Documentary", "VR"],
  },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion() === true;

  return (
    <section id="services" className="relative py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Our{" "}
            <motion.span
              className="italic text-primary inline-block origin-left"
              initial={{ opacity: 0, rotate: reduceMotion ? 0 : -6, y: reduceMotion ? 0 : 18 }}
              animate={isInView ? { opacity: 1, rotate: 0, y: 0 } : {}}
              transition={
                reduceMotion
                  ? { duration: 0.4, delay: 0.08 }
                  : { type: "spring", stiffness: 100, damping: 15, delay: 0.12 }
              }
            >
              Services
            </motion.span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion() === true;
  const [visited, setVisited] = useState(false);
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => isTouch && setVisited(true)}
      className={cn(
        "group grid md:grid-cols-2 gap-8 md:gap-16 items-center py-10 md:py-12 border-t border-border first:border-t-0 hover:bg-card/30 transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8",
        isTouch && "cursor-pointer"
      )}
    >
      <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
        <motion.div
          className="overflow-hidden"
          initial={{ scale: reduceMotion ? 1 : 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            width={1280}
            height={960}
            className={cn(
              "w-full h-64 md:h-80 object-cover transition-all duration-700 group-hover:scale-105",
              shouldReveal ? "grayscale-0" : "grayscale group-hover:grayscale-0"
            )}
          />
        </motion.div>
      </div>

      <motion.div
        className={`${index % 2 === 1 ? "md:order-1" : ""}`}
        initial={{ opacity: 0, x: reduceMotion ? 0 : index % 2 === 0 ? -28 : 28 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.08 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
          0{index + 1}
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={reduceMotion ? {} : { y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="font-body text-xs tracking-wider uppercase px-3 py-1 border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServicesSection;
