'use client'

import { SearchX, X } from 'lucide-react'
// DİKKAT: Sahte 'products' verisini import'tan çıkardık, sadece kategoriler kaldı
import { categories } from '@/lib/catalog' 
import { ProductCard } from './product-card'
import { SectionHeading } from './quick-categories'
import { useStore } from './store-provider'

function normalize(value: string) {
  if (!value) return '' // Veritabanında boş alan varsa hata vermemesi için koruma
  return value.toLocaleLowerCase('tr-TR').replace(/[\s-]/g, '')
}

// Bileşen artık dışarıdan (Supabase'den) gelen 'products' verisini alıyor
export function ProductGrid({ products = [] }: { products?: any[] }) {
  const { query, setQuery, activeCategory, setActiveCategory } = useStore()
  const q = normalize(query.trim())
  const activeName = categories.find((c) => c.slug === activeCategory)?.name

  const filtered = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (!q) return true
    // Veritabanı alanları için null kontrolü (|| '') eklendi
    return [p.title || '', p.sku || '', p.brand || '', p.spec || ''].some((field) => normalize(field).includes(q))
  })

  return (
    <section id="urunler" aria-labelledby="urun-baslik" className="flex scroll-mt-40 flex-col gap-4">
      <SectionHeading id="urun-baslik" code="03" title={activeName ?? 'Tezgahın Favorileri'}>
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {filtered.length} ürün listeleniyor
        </p>
      </SectionHeading>

      {(activeCategory !== 'all' || query) && (
        <div className="flex flex-wrap gap-2">
          {activeName && (
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="flex items-center gap-1.5 border border-secondary bg-card px-2.5 py-1 text-xs font-semibold hover:border-primary"
            >
              {activeName}
              <X className="size-3.5" aria-hidden="true" />
              <span className="sr-only">filtresini kaldır</span>
            </button>
          )}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="flex items-center gap-1.5 border border-secondary bg-card px-2.5 py-1 font-mono text-xs font-semibold hover:border-primary"
            >
              {`"${query}"`}
              <X className="size-3.5" aria-hidden="true" />
              <span className="sr-only">aramasını temizle</span>
            </button>
          )}
        </div>
      )}

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {filtered.map((product) => (
            <li key={product.id} className="flex">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 border-2 border-dashed border-border bg-card px-6 py-14 text-center">
          <SearchX className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="font-heading text-lg font-bold">Eşleşen parça bulunamadı</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Parça kodunu kontrol edin veya filtreleri temizleyerek tekrar deneyin.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActiveCategory('all')
            }}
            className="bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground hover:bg-secondary/90"
          >
            Filtreleri temizle
          </button>
        </div>
      )}
    </section>
  )
}