import { useEffect, useState } from "react";

const SECTION_IDS = ["about", "services", "work", "testimonials", "contact"] as const;

export type ActiveSectionId = (typeof SECTION_IDS)[number] | null;

const NAV_OFFSET_PX = 96;

export function useActiveSection(): ActiveSectionId {
  const [active, setActive] = useState<ActiveSectionId>(null);

  useEffect(() => {
    const update = () => {
      let current: ActiveSectionId = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= NAV_OFFSET_PX) {
          current = id;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}
