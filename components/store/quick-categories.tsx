'use client'

import { BatteryCharging, Box, Cable, Cpu, Flame, Gauge, Radar, Wrench, type LucideIcon } from 'lucide-react'
import { categories, type CategorySlug } from '@/lib/catalog'
import { useStore } from './store-provider'

const icons: Record<CategorySlug, LucideIcon> = {
  'gelistirme-kartlari': Cpu,
  lehimleme: Flame,
  'el-aletleri': Wrench,
  'olcum-cihazlari': Gauge,
  'guc-kaynaklari': BatteryCharging,
  sensorler: Radar,
  'kablo-konnektor': Cable,
  '3d-baski': Box,
}

export function QuickCategories() {
  const { activeCategory, setActiveCategory } = useStore()

  return (
    <section aria-labelledby="kategori-baslik" className="flex flex-col gap-4">
      <SectionHeading id="kategori-baslik" code="01" title="Hızlı Kategoriler" />
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((c) => {
          const Icon = icons[c.slug]
          const active = activeCategory === c.slug
          return (
            <li key={c.slug}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveCategory(active ? 'all' : c.slug)
                  document.getElementById('urunler')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative flex h-full w-full flex-col items-start gap-3 border-2 border-border bg-card p-3 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary/5"
              >
                <span className="flex size-11 items-center justify-center border-2 border-secondary bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <Icon className="size-5" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-tight text-card-foreground">{c.name}</span>
                <span className="absolute right-2 top-2 font-mono text-[10px] text-muted-foreground">{c.code}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function SectionHeading({
  id,
  code,
  title,
  children,
}: {
  id: string
  code: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-secondary pb-2">
      <h2 id={id} className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight sm:text-2xl">
        <span className="bg-secondary px-1.5 py-0.5 font-mono text-xs text-primary">{code}</span>
        {title}
      </h2>
      {children}
    </div>
  )
}
