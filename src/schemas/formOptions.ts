/**
 * Select options shared by the lead-form schemas and their `<select>` controls. Kept beside the
 * schemas (not the components) so validation and rendering read the same source without a
 * component → schema dependency. Strings are user-facing Spanish (§51–§53).
 */

export const TIPOS_ASISTENTE = [
  "Estudiante secundario",
  "Estudiante universitario",
  "Docente",
  "Investigador",
  "Profesional",
  "Empresa",
  "Emprendedor",
  "Público general",
  "Institución",
] as const

export const INTERESES_EMPRESA = [
  "Sponsor",
  "Stand",
  "Speaker",
  "Networking",
  "Innovación",
  "Recruiting",
  "Alianza institucional",
] as const

export const TIPOS_INSTITUCION = [
  "Universidad",
  "Instituto científico",
  "Organismo público",
  "Escuela",
  "Empresa",
  "ONG",
  "Otra",
] as const

export const INTERESES_INSTITUCION = [
  "Participación científica",
  "Educación",
  "Investigación",
  "Innovación",
  "Exposición",
  "Networking",
  "Alianza institucional",
] as const
