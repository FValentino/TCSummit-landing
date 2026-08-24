"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, ArrowRight, ChevronDown, Lock, User } from "lucide-react"

const COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Canadá",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Portugal",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
  "Alemania",
  "Francia",
  "Italia",
  "Reino Unido",
  "Otro",
]

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Ingresa tu nombre"),
  lastName: z.string().min(2, "Ingresa tu apellido"),
  email: z.email("Ingresa un correo electrónico válido"),
  phone: z.string().regex(/^\+?[0-9\s().-]{7,20}$/, "Ingresa un teléfono válido"),
  country: z.string().min(1, "Selecciona tu país"),
  document: z.string().min(5, "Ingresa un número de documento válido"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

const inputClasses = (hasError?: boolean) =>
  `w-full rounded-lg border bg-[#0D1428] px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-[#5B6B8C] focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/25 ${
    hasError ? "border-red-400/60" : "border-[#243154]"
  }`

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold tracking-wide text-[#22D3EE]">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default function CheckOutPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      document: "",
    },
  })

  // Local mirror of the country value, used only to style the placeholder
  // state of the select without subscribing to the whole form via watch().
  const [selectedCountry, setSelectedCountry] = useState("")

  const onSubmit = handleSubmit(() => {
    // Payment step not implemented yet; reuse the post-purchase route as the
    // current end of the flow (same destination as the buy modal).
    router.push("/tickets/post-compra")
  })

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,#0A1128_0%,#080C1D_45%,#050A18_100%)] pb-16 pt-24">
      <div className="mx-auto w-full max-w-xl px-6 md:px-8">
        {/* Back link */}
        <Link
          href="/tickets"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#22D3EE] transition-opacity hover:opacity-75"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a Selección de Tickets
        </Link>

        {/* Title */}
        <header className="mt-6">
          <h1
            className="text-3xl font-extrabold tracking-wide text-white md:text-4xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[#94A3B8] md:text-base">
            Completa tus datos para finalizar la compra de tu ticket para TC SUMMIT.
          </p>
        </header>

        {/* Assistant data card */}
        <section
          aria-labelledby="assistant-data-title"
          className="mt-8 rounded-2xl border border-[#1E2A4A] bg-[#111A33]/70 p-6 shadow-[0_0_50px_rgba(34,211,238,0.07)] backdrop-blur-sm md:p-8"
        >
          <div className="flex items-center gap-3 border-b border-[#1E2A4A] pb-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10">
              <User className="h-5 w-5 text-[#22D3EE]" aria-hidden="true" />
            </span>
            <h2
              id="assistant-data-title"
              className="text-lg font-bold text-white md:text-xl"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Datos del Asistente
            </h2>
          </div>

          <form
            noValidate
            onSubmit={onSubmit}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <Field label="Nombre" htmlFor="firstName" error={errors.firstName?.message}>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Ej. Jane"
                {...register("firstName")}
                className={inputClasses(Boolean(errors.firstName))}
              />
            </Field>

            <Field label="Apellido" htmlFor="lastName" error={errors.lastName?.message}>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Ej. Doe"
                {...register("lastName")}
                className={inputClasses(Boolean(errors.lastName))}
              />
            </Field>

            <Field label="Correo Electrónico" htmlFor="email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="jane.doe@example.com"
                {...register("email")}
                className={inputClasses(Boolean(errors.email))}
              />
            </Field>

            <Field label="Teléfono" htmlFor="phone" error={errors.phone?.message}>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                {...register("phone")}
                className={inputClasses(Boolean(errors.phone))}
              />
            </Field>

            <Field label="País" htmlFor="country" error={errors.country?.message}>
              <div className="relative">
                <select
                  id="country"
                  autoComplete="country-name"
                  aria-invalid={Boolean(errors.country)}
                  {...register("country", {
                    onChange: (event) => setSelectedCountry(event.target.value),
                  })}
                  className={`${inputClasses(Boolean(errors.country))} appearance-none pr-10 ${
                    selectedCountry ? "text-white" : "text-[#5B6B8C]"
                  }`}
                >
                  <option value="" disabled>
                    Selecciona tu país
                  </option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country} className="bg-[#0D1428] text-white">
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B8C]"
                  aria-hidden="true"
                />
              </div>
            </Field>

            <Field label="DNI / Pasaporte" htmlFor="document" error={errors.document?.message}>
              <input
                id="document"
                type="text"
                autoComplete="off"
                placeholder="Número de documento"
                {...register("document")}
                className={inputClasses(Boolean(errors.document))}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="col-span-full mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#0EA5C9] text-base font-bold tracking-wide text-[#05203A] transition-all hover:brightness-110 hover:shadow-[0_10px_35px_rgba(34,211,238,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Proceder al Pago
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#94A3B8] md:text-xs">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Pago 100% seguro y encriptado
          </p>
        </section>
      </div>
    </main>
  )
}
