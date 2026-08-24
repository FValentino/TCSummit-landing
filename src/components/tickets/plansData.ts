// Ticket plans data and shared types for the tickets landing page.
// UI copy lives in Spanish; code comments in English.

export interface PlanBenefit {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: PlanBenefit[];
  accent: string;
  badgeClass: string;
  buttonLabel: string;
  buttonClass: string;
  countdownTarget?: string;
}

// Early-bird sale closes the day before the event starts.
// Change this constant to extend or shorten the offer.
export const EARLY_BIRD_END = "2026-08-14T23:59:59";

export const plans: Plan[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: 10,
    description: "Acceso total a conferencias y workshops. Cupos limitados.",
    benefits: [
      { text: "Todas las conferencias", included: true },
      { text: "Acceso a Workshops", included: true },
    ],
    accent: "#a3e635",
    badgeClass:
      "bg-[#a3e635] text-[#002c6b] shadow-[0_0_14px_rgba(163,230,53,0.8)]",
    buttonLabel: "Comprar",
    buttonClass:
      "bg-[#a3e635] text-[#002c6b] shadow-[0_0_24px_rgba(163,230,53,0.5)] hover:bg-[#b9f355] hover:shadow-[0_0_40px_rgba(163,230,53,0.8)]",
    countdownTarget: EARLY_BIRD_END,
  },
  {
    id: "general",
    name: "General",
    price: 15,
    description: "Acceso estándar a todas las áreas del evento.",
    benefits: [
      { text: "Todas las conferencias", included: true },
      { text: "Workshops excluidos", included: false },
    ],
    accent: "#03f5ff",
    badgeClass: "bg-white/5 border border-[#03f5ff]/40 text-[#03f5ff]",
    buttonLabel: "Comprar",
    buttonClass:
      "bg-transparent border-2 border-[#03f5ff] text-[#03f5ff] hover:bg-[#03f5ff]/10 hover:shadow-[0_0_24px_rgba(3,245,255,0.3)]",
  },
  {
    id: "vip",
    name: "VIP",
    price: 25,
    description: "Acceso prioritario, zona lounge exclusiva, cena con speakers y kit VIP.",
    benefits: [
      { text: "Acceso Prioritario (Fast-track)", included: true },
      { text: "Zona Lounge Exclusiva", included: true },
      { text: "Cena con Speakers", included: true },
      { text: "Kit VIP Exclusivo", included: true },
    ],
    accent: "#f5b942",
    badgeClass:
      "bg-linear-to-r from-[#f5b942] to-[#d4a017] text-[#002c6b] shadow-[0_0_14px_rgba(245,185,66,0.7)]",
    buttonLabel: "Comprar VIP",
    buttonClass:
      "bg-linear-to-r from-[#f5b942] to-[#d4a017] text-[#002c6b] shadow-[0_0_24px_rgba(245,185,66,0.45)] hover:shadow-[0_0_44px_rgba(245,185,66,0.8)]",
  },
];
