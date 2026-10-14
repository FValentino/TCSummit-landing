"use client"

import { useEffect, useMemo, useReducer } from "react"
import type { Stand, StandCategory, StandStatus } from "./floorplanData"
import { STANDS, getStandById } from "./floorplanData"

export interface FloorplanState {
  selectedId: string | null
  hoveredId: string | null
  categoryFilter: StandCategory | null
  availabilityFilter: StandStatus | null
}

export type FloorplanAction =
  | { type: "select"; id: string }
  | { type: "clear" }
  | { type: "hover"; id: string | null }
  | { type: "setCategoryFilter"; value: StandCategory | null }
  | { type: "setAvailabilityFilter"; value: StandStatus | null }
  | { type: "resetFilters" }

const EMPTY_STATE: FloorplanState = {
  selectedId: null,
  hoveredId: null,
  categoryFilter: null,
  availabilityFilter: null,
}

/** Same value in, identical object out: a no-op action must not re-render the 130
 *  hotspots it would otherwise remount through the canvas. */
const assign = <K extends keyof FloorplanState>(
  state: FloorplanState,
  key: K,
  value: FloorplanState[K],
): FloorplanState => (state[key] === value ? state : { ...state, [key]: value })

const floorplanReducer = (state: FloorplanState, action: FloorplanAction): FloorplanState => {
  switch (action.type) {
    case "select": {
      const next = state.selectedId === action.id ? null : action.id
      return assign(state, "selectedId", next)
    }
    case "clear":
      return assign(state, "selectedId", null)
    case "hover":
      return assign(state, "hoveredId", action.id)
    case "setCategoryFilter":
      return assign(state, "categoryFilter", action.value)
    case "setAvailabilityFilter":
      return assign(state, "availabilityFilter", action.value)
    case "resetFilters":
      if (state.categoryFilter === null && state.availabilityFilter === null) return state
      return { ...state, categoryFilter: null, availabilityFilter: null }
  }
}

/** Owns the section's interactive state. `selectedId` is an id, not a Stand, so the deep
 *  link can set it before the stand is resolved and an unknown id degrades to the initial
 *  panel. Filters are `null` rather than an "all" sentinel so the enums stay the only
 *  vocabulary: the label for the null case is a copy key, the value never appears in a
 *  comparison (C12). */
/** Whether the keystroke belongs to something the user is typing into or dismissing, rather
 *  than to the plan. `isContentEditable` is the live check and covers a descendant of an
 *  editable host and the bare `contenteditable` / `contenteditable=""` forms, which an
 *  attribute test cannot; the attribute is read as well because `isContentEditable` is an
 *  `HTMLElement` property and the target is only known to be an `Element`. */
const isEditingContext = (target: EventTarget | null): boolean => {
  if (!(target instanceof Element)) return false
  if (target instanceof HTMLElement && target.isContentEditable) return true
  const editable = target.getAttribute("contenteditable")
  if (editable !== null && editable !== "false") return true
  if (target.closest("[role=dialog]") !== null) return true
  const tag = target.tagName.toLowerCase()
  return tag === "input" || tag === "textarea" || tag === "select" || tag === "option"
}

export function useFloorplan() {
  const [state, dispatch] = useReducer(floorplanReducer, EMPTY_STATE)

  useEffect(() => {
    // The listener stays on `window` on purpose: scoping it to the section would also kill
    // the documented "Esc clears the selection when nothing in the plan is focused", which
    // the deep-link flow relies on. But this is one section of a page that also hosts the
    // contact form, and Escape has no native meaning in a text field — the browser does not
    // consume it, so nothing upstream suppresses it. Unscoped, one habitual dismiss key in
    // "Empresa" would clear the selection and rewrite `?stand=` six sections away, with no
    // visual connection between the cause and the effect. The guard is the narrowest fix
    // that leaves the plan-level behaviour intact.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      if (isEditingContext(event.target) || isEditingContext(document.activeElement)) return
      dispatch({ type: "clear" })
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const { categoryFilter, availabilityFilter } = state

  const visibleIds = useMemo(() => {
    if (categoryFilter === null && availabilityFilter === null) return null
    const matched = new Set<string>()
    for (const stand of STANDS) {
      if (categoryFilter !== null && stand.category !== categoryFilter) continue
      if (availabilityFilter !== null && stand.status !== availabilityFilter) continue
      matched.add(stand.id)
    }
    return matched
  }, [categoryFilter, availabilityFilter])

  const hoveredStand: Stand | undefined =
    state.hoveredId === null ? undefined : getStandById(state.hoveredId)

  return {
    selectedId: state.selectedId,
    selectedStand: state.selectedId === null ? undefined : getStandById(state.selectedId),
    hoveredId: state.hoveredId,
    hoveredStand,
    categoryFilter,
    availabilityFilter,
    visibleIds,
    visibleCount: visibleIds === null ? STANDS.length : visibleIds.size,
    isFilteredOut: (stand: Stand) => visibleIds !== null && !visibleIds.has(stand.id),
    hasActiveFilters: categoryFilter !== null || availabilityFilter !== null,
    select: (id: string) => dispatch({ type: "select", id }),
    clear: () => dispatch({ type: "clear" }),
    hover: (id: string | null) => dispatch({ type: "hover", id }),
    setCategoryFilter: (value: StandCategory | null) =>
      dispatch({ type: "setCategoryFilter", value }),
    setAvailabilityFilter: (value: StandStatus | null) =>
      dispatch({ type: "setAvailabilityFilter", value }),
    resetFilters: () => dispatch({ type: "resetFilters" }),
  }
}
