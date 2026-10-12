/**
 * Placeholder-first asset manifest — single source for media keys used by the
 * immersive `/` (§60/§61). Placeholders ship behind the homepage flag;
 * TODO_ASSETS tracks what still needs real production. Non-blocking.
 */

import { StaticImageData } from "next/image"

import HERO_IMAGE from "@/assets/images/hero/robot.webp"


export type AssetKey =
  | "heroPoster"
  | "heroVideo"
  | "summit"
  | "ciencia"
  | "tecnologia"
  | "innovacion"
  | "educacion"
  | "experiencia"
  | "empresas"
  | "territorio"
  | "conicetLogo"

export type AssetEntry =
  | {
      type: "image";
      src: string | StaticImageData;
      width?: number;
      height?: number;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt: string;
    };

const PLACEHOLDER = "" // real asset pending — see TODO_ASSETS

const HERO_VIDEO = "/videos/header/backgroundWEBM.webm"

export const assets: Record<AssetKey, AssetEntry> = {
  heroPoster: {
    type: "image",
    src: HERO_IMAGE,
    width: 1600,
    height: 900,
    alt: "TCSummit 2027 — próxima edición",
  },

  heroVideo: {
    type: "video",
    src: HERO_VIDEO,
    poster: PLACEHOLDER,
    alt: "Video de apertura TCSummit 2027",
  },

  summit: {
    type: "image",
    src: PLACEHOLDER,
    alt: "TCSummit 2027 — el evento",
  },

  ciencia: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Ciencia — sistema científico-tecnológico",
  },

  tecnologia: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Tecnología — inteligencia artificial y blockchain",
  },

  innovacion: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Innovación — laboratorio de futuro",
  },

  educacion: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Educación — formación y estudiantes",
  },

  experiencia: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Experiencia — vivencia TCSummit",
  },

  empresas: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Empresas — sponsorship",
  },

  territorio: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Territorio — articulación público-privada",
  },

  conicetLogo: {
    type: "image",
    src: PLACEHOLDER,
    alt: "Sistema científico-tecnológico",
  },
};

/**
 * TODO(assets): keys awaiting real media production — the §60/§61 launch gate.
 * Non-blocking: placeholders ship behind the homepage flag; this list blocks
 * launch polish, never the build.
 */
export const TODO_ASSETS: AssetKey[] = [
  "heroPoster",
  "heroVideo",
  "summit",
  "ciencia",
  "tecnologia",
  "innovacion",
  "educacion",
  "experiencia",
  "empresas",
  "territorio",
  "conicetLogo",
]