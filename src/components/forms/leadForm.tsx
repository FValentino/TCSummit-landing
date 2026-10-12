"use client"

/**
 * Shared primitives for the three lead-form modals M7–M9 (spec lead-forms; brief §51–§53).
 * `LeadFormModal` reuses the site `Modal` primitive (focus trap, Escape, scroll-lock), so each
 * form owns only its fields, schema and server action. `LeadField`/`LeadSelect` wire the label,
 * `aria-invalid` and `aria-describedby` to the error text so validation is announced, and the
 * panel styling stays consistent across the three forms.
 */

import { useId, useRef, type ReactNode } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

import Modal from "@/components/common/modals/Modal"

export type LeadStatus = "idle" | "success" | "error"

const PANEL_CLASS =
  "relative my-8 w-full max-w-xl rounded-2xl border border-[#F107CA]/30 bg-[#001b3d] p-6 text-white shadow-2xl sm:p-8"

export const LEAD_INPUT_CLASS =
  "w-full rounded-lg border border-[#F107CA]/30 bg-black/40 px-4 py-2 text-white placeholder-gray-400 transition-colors focus:border-[#F107CA] focus:outline-none"

interface LeadFormModalProps {
  open: boolean
  onClose: () => void
  kicker: string
  title: string
  intro: string
  children: ReactNode
}

/** Modal shell for a single public's form. Owns the heading (the dialog's accessible name). */
export function LeadFormModal({ open, onClose, kicker, title, intro, children }: LeadFormModalProps) {
  const titleId = useId()
  const titleRef = useRef<HTMLHeadingElement>(null)

  return (
    <Modal
      open={open}
      onRequestClose={onClose}
      labelledBy={titleId}
      initialFocusRef={titleRef}
      panelClassName={PANEL_CLASS}
    >
      <p className="text-sm font-semibold tracking-[0.2em] text-[#F71ABF]">{kicker}</p>
      <h2
        id={titleId}
        ref={titleRef}
        tabIndex={-1}
        className="mt-1 text-2xl font-bold text-white focus:outline-none sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-300">{intro}</p>
      <div className="mt-5">{children}</div>
    </Modal>
  )
}

interface LeadFieldProps {
  id: string
  label: string
  error?: string
  registration: UseFormRegisterReturn
  type?: string
  placeholder?: string
  textarea?: boolean
  rows?: number
}

export function LeadField({
  id,
  label,
  error,
  registration,
  type = "text",
  placeholder,
  textarea = false,
  rows = 3,
}: LeadFieldProps) {
  const describedBy = error ? `${id}-error` : undefined
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: LEAD_INPUT_CLASS,
    ...registration,
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
      </label>
      {textarea ? (
        <textarea rows={rows} placeholder={placeholder} {...shared} />
      ) : (
        <input type={type} placeholder={placeholder} {...shared} />
      )}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

interface LeadSelectProps {
  id: string
  label: string
  error?: string
  registration: UseFormRegisterReturn
  options: readonly string[]
  placeholder: string
}

export function LeadSelect({ id, label, error, registration, options, placeholder }: LeadSelectProps) {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={LEAD_INPUT_CLASS}
        {...registration}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function LeadSubmit({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#F107CA] to-[#C5128E] px-8 py-3 text-lg font-bold text-[#2D0448] shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? "Enviando..." : label}
    </button>
  )
}

export function LeadError({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
      {message}
    </p>
  )
}

export function LeadSuccess({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="py-4 text-center">
      <p role="status" className="text-base text-gray-200">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center rounded-xl border-2 border-[#F107CA] px-6 py-3 font-bold text-[#F71ABF] transition-colors hover:bg-[#F107CA]/10"
      >
        Cerrar
      </button>
    </div>
  )
}
