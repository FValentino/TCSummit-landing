"use client";
import React from 'react'
import Card from '@/components/activities/card/card'
import { activities as activitiesData } from './activitiesData'

// If this module shadows the data name, alias accordingly.
// Render a grid of activity cards for student section.
export default function Activities(){
  // In case there is a circular import, fallback to an empty array
  const items = activitiesData ?? []
  return (
    <section className="py-8 px-6" aria-label="Actividades para estudiantes">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((a: any) => (
          <Card key={a.id} title={a.name} description={a.description} />
        ))}
      </div>
    </section>
  )
}
