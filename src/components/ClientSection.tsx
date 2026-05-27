import { motion } from "framer-motion";

const clients = [
  { name: "Cultural Heritage Trust", category: "Institutional" },
  { name: "Global Arts Foundation", category: "Non-Profit" },
  { name: "Metropolitan Museum", category: "Museum" },
  { name: "TechCorp Global", category: "Corporate" },
  { name: "Heritage Bank", category: "Banking" },
  { name: "Artisanal Hub", category: "Collective" },
  { name: "City Festivals", category: "Government" },
  { name: "Innovation Media", category: "Creative" },
];

const ClientSection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border/50 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
          Trusted by Global Partners
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground opacity-90">
          Corporate & <span className="italic text-primary">Cultural</span> Collaborators
        </h2>
      </div>

      <div className="relative group/marquee-clients">
        <div className="flex w-max items-center motion-safe:animate-marquee-clients motion-reduce:animate-none group-hover/marquee-clients:motion-safe:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex flex-col items-center justify-center px-10 md:px-16"
            >
              <span className="font-display text-xl md:text-2xl font-bold text-foreground/40 hover:text-primary transition-colors duration-500 whitespace-nowrap">
                {client.name}
              </span>
              <span className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground/50 mt-1">
                {client.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
