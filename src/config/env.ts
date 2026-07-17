import { z } from "zod";

const envSchema = z.object({
  // Base de datos
  DATABASE_URL: z
    .string()
    .url()
    .refine((url) => url.startsWith("postgresql://"), {
      message: "DATABASE_URL debe ser una URL de PostgreSQL",
    }),

  // Resend (emails)
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY es requerido"),
  EMAIL_FROM: z.string().email("EMAIL_FROM debe ser un email válido"),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL debe ser una URL válida"),
  NEXT_PUBLIC_EVENT_ID: z.string().min(1, "NEXT_PUBLIC_EVENT_ID es requerido"),
});

/**
 * Valida las variables de entorno al inicio de la app.
 * Si falta alguna o es inválida, la app falla acá (fail-fast).
 */
function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Variables de entorno inválidas:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  return parsed.data;
}

export const env = validateEnv();
