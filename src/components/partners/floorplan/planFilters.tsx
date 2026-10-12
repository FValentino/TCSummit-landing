"use client"

import type { StandCategory, StandStatus } from "./floorplanData"
import { STAND_CATEGORIES, STAND_STATUSES, TOTAL_STANDS } from "./floorplanData"
import { CATEGORY_LABEL, FILTER_COPY, STATUS_PLURAL, resultCount } from "./floorplanCopy"

interface PlanFiltersProps {
  categoryFilter: StandCategory | null
  availabilityFilter: StandStatus | null
  visibleCount: number
  hasActiveFilters: boolean
  onCategoryFilter: (value: StandCategory | null) => void
  onAvailabilityFilter: (value: StandStatus | null) => void
  onReset: () => void
}

const CHIP_CLASS =
  "rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b]"

const chipClass = (active: boolean) =>
  `${CHIP_CLASS} ${active ? "border-[#03f5ff] bg-[#03f5ff]/20 text-white" : "border-white/20 bg-black/30 text-gray-300 hover:border-[#03f5ff]/50 hover:text-white"}`

interface FilterGroupProps<T extends string> {
  label: string
  allLabel: string
  options: ReadonlyArray<{ value: T; label: string }>
  selected: T | null
  onSelect: (value: T | null) => void
}

function FilterGroup<T extends string>({
  label,
  allLabel,
  options,
  selected,
  onSelect,
}: FilterGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold tracking-widest text-[#03f5ff] uppercase">
        {label}
      </span>
      <button
        type="button"
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
        className={chipClass(selected === null)}
      >
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected === option.value}
          onClick={() => onSelect(selected === option.value ? null : option.value)}
          className={chipClass(selected === option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function PlanFilters({
  categoryFilter,
  availabilityFilter,
  visibleCount,
  hasActiveFilters,
  onCategoryFilter,
  onAvailabilityFilter,
  onReset,
}: PlanFiltersProps) {
  return (
    <div className="mb-6 rounded-xl border border-[#03f5ff]/20 bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold tracking-[0.2em] text-white uppercase">
          {FILTER_COPY.group}
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-[#03f5ff]/40 px-3 py-1.5 text-xs font-medium text-[#03f5ff] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b]"
          >
            {FILTER_COPY.reset}
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-6">
        <FilterGroup
          label={FILTER_COPY.category}
          allLabel={FILTER_COPY.all}
          options={STAND_CATEGORIES.map((category) => ({
            value: category,
            label: CATEGORY_LABEL[category],
          }))}
          selected={categoryFilter}
          onSelect={onCategoryFilter}
        />
        <FilterGroup
          label={FILTER_COPY.availability}
          allLabel={FILTER_COPY.all}
          options={STAND_STATUSES.map((status) => ({ value: status, label: STATUS_PLURAL[status] }))}
          selected={availabilityFilter}
          onSelect={onAvailabilityFilter}
        />
      </div>

      {/* Every option renders even at zero instances, so an empty result is data speaking,
          not a broken control. */}
      <p aria-live="polite" className="mt-4 text-xs text-gray-400">
        {resultCount(visibleCount, TOTAL_STANDS)}
        {visibleCount === 0 && <span className="mt-1 block text-gray-300">{FILTER_COPY.empty}</span>}
      </p>
    </div>
  )
}
