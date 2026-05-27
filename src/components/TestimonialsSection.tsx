import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  {
    quote:
      "They translated our brief into a spellbinding evening of dance and live music. Guests still ask when we are bringing the company back.",
    name: "Priya Menon",
    role: "Director of Culture & Events",
    org: "Tata Consultancy Services",
  },
  {
    quote:
      "Rare rigour in rehearsal, flawless execution on stage, and a team that genuinely respects both tradition and a modern international audience.",
    name: "James O’Connell",
    role: "Lead Curator",
    org: "Dublin International Arts Festival",
  },
  {
    quote:
      "The workshop balanced technique, history, and joy — I left with skills I still use and a deeper love for the form. World-class facilitation.",
    name: "Ananya Krishnan",
    role: "Independent Choreographer",
    org: "Chennai",
  },
  {
    quote:
      "From creative direction to run-of-show and broadcast capture, they delivered a two-night gala that felt cinematic and deeply rooted in heritage.",
    name: "Vikram Sethi",
    role: "VP Brand & Experiences",
    org: "The Oberoi Group",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-24 overflow-hidden bg-transparent border-y border-border/60"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: easeOut }}
          className="mb-10 md:mb-14 max-w-2xl"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent mb-3">
            Voices & Trust
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
            What our <span className="italic text-primary">partners</span> say
          </h2>
          <p className="font-body text-muted-foreground mt-4 leading-relaxed">
            A few words from institutions and artists we have had the privilege to work with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduceMotion ? 0.2 : 0.7,
                delay: reduceMotion ? 0 : 0.08 + i * 0.1,
                ease: easeOut,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                      transition: { type: "spring", stiffness: 320, damping: 22 },
                    }
              }
              className="relative border border-border/80 bg-card/50 backdrop-blur-sm p-8 md:p-10 flex flex-col shadow-sm hover:shadow-md hover:border-primary/25 hover:bg-card/70 transition-shadow duration-300"
            >
              <Quote
                className="w-9 h-9 text-primary/35 mb-5 shrink-0"
                strokeWidth={1.25}
                aria-hidden
              />
              <blockquote className="font-body text-foreground/95 leading-relaxed text-base md:text-[1.05rem] flex-1 mb-8">
                “{review.quote}”
              </blockquote>
              <footer className="pt-6 border-t border-border/70">
                <p className="font-display text-lg font-semibold text-foreground">{review.name}</p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {review.role}
                  <span className="text-border mx-2">·</span>
                  {review.org}
                </p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
