'use client'

import { Menu, Search, ShoppingCart, Truck, UserRound, Wrench } from 'lucide-react'
import { categories } from '@/lib/catalog'
import { useStore } from './store-provider'

export function Logo() {
  return (
    <a href="#" className="flex shrink-0 items-center gap-2" aria-label="TezgahÜstü ana sayfa">
      <span className="flex size-9 items-center justify-center bg-primary text-primary-foreground">
        <Wrench className="size-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="font-heading text-xl font-bold uppercase tracking-tight text-secondary-foreground sm:text-2xl">
        Tezgah<span className="text-primary">Üstü</span>
      </span>
    </a>
  )
}

function SearchForm({ className }: { className?: string }) {
  const { query, setQuery } = useStore()

  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        document.getElementById('urunler')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Ürün adı veya parça kodu ara
      </label>
      <div className="flex h-11 w-full border-2 border-primary bg-card focus-within:ring-2 focus-within:ring-primary/40">
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka veya parça kodu ara (örn. ESP32-C3, TZ-SLD-858D)"
          className="min-w-0 flex-1 bg-transparent px-3 font-mono text-sm text-card-foreground placeholder:font-sans placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-primary px-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Search className="size-4" strokeWidth={2.5} aria-hidden="true" />
          <span className="hidden sm:inline">Ara</span>
        </button>
      </div>
    </form>
  )
}

export function SiteHeader() {
  const { itemCount, setCartOpen, activeCategory, setActiveCategory } = useStore()

  return (
    <header className="sticky top-0 z-40 bg-secondary text-secondary-foreground">
      <div className="border-b border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs text-secondary-foreground/70">
          <p className="flex items-center gap-1.5">
            <Truck className="size-3.5 text-primary" aria-hidden="true" />
            <span>
              <strong className="text-secondary-foreground">15:00</strong>{"'a kadar verilen siparişler aynı gün kargoda"}
            </span>
          </p>
          <p className="hidden font-mono md:block">Teknik Destek: 0850 000 00 00</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Logo />
        <SearchForm className="order-last w-full md:order-none md:flex-1" />
        <nav aria-label="Hesap" className="ml-auto flex items-center gap-1 md:ml-0">
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-white/10"
          >
            <UserRound className="size-5" aria-hidden="true" />
            <span className="hidden flex-col leading-tight lg:flex">
              <span className="text-[11px] text-secondary-foreground/60">Giriş yap</span>
              <span className="font-semibold">Atölyem</span>
            </span>
            <span className="sr-only lg:hidden">Atölyem (Hesabım)</span>
          </a>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 border-2 border-primary px-3 py-1.5 text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline">Sepetim</span>
            <span
              className="flex h-5 min-w-5 items-center justify-center bg-primary px-1 font-mono text-xs text-primary-foreground"
              aria-label={`${itemCount} ürün`}
            >
              {itemCount}
            </span>
          </button>
        </nav>
      </div>

      <nav aria-label="Kategoriler" className="border-t border-white/10">
        <ul className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 text-sm [scrollbar-width:none]">
          <li className="shrink-0">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="flex items-center gap-2 py-2.5 pr-3 font-semibold text-primary"
            >
              <Menu className="size-4" aria-hidden="true" />
              Tüm Kategoriler
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory(c.slug)
                  document.getElementById('urunler')?.scrollIntoView({ behavior: 'smooth' })
                }}
                aria-pressed={activeCategory === c.slug}
                className="border-b-2 border-transparent px-3 py-2.5 text-secondary-foreground/80 transition-colors hover:text-secondary-foreground aria-pressed:border-primary aria-pressed:text-secondary-foreground"
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
