import { z } from "zod";

const envSchema = z.object({
  // Resend (emails)
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY es requerido"),
  FROM_EMAIL: z.string().email("FROM_EMAIL debe ser un email válido"),
  TO_EMAIL: z.string().email("TO_EMAIL debe ser un email válido"),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL debe ser una URL válida"),
});

/**
 * Valida las variables de entorno en runtime (lazy).
 * Se valida la primera vez que se accede a cualquier propiedad de `env`.
 * Si falta alguna o es inválida, la app falla con process.exit(1).
 */
let _env: z.infer<typeof envSchema> | null = null;

function getEnv(): z.infer<typeof envSchema> {
  if (_env) return _env;

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Variables de entorno inválidas:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  _env = parsed.data;
  return _env;
}

/**
 * Proxy que valida lazy al primer acceso.
 * Uso: import { env } from "@/config/env"; console.log(env.FROM_EMAIL);
 */
export const env = new Proxy({} as z.infer<typeof envSchema>, {
  get(_target, prop) {
    return getEnv()[prop as keyof z.infer<typeof envSchema>];
  },
});
