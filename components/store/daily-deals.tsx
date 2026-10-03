'use client'

import Image from 'next/image'
import { Timer, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
// DİKKAT: Sahte veri çeken getProduct ve deals silindi, sadece formatPrice kaldı
import { formatPrice } from '@/lib/catalog'
import { AddToCartButton } from './product-card'
import { SectionHeading } from './quick-categories'

function useCountdownToMidnight() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(24, 0, 0, 0)
      setRemaining(Math.max(0, end.getTime() - now.getTime()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (remaining === null) return ['--', '--', '--']
  const total = Math.floor(remaining / 1000)
  return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map((n) =>
    String(n).padStart(2, '0'),
  )
}

function Countdown() {
  const [h, m, s] = useCountdownToMidnight()
  const units = [
    { value: h, label: 'Saat' },
    { value: m, label: 'Dk' },
    { value: s, label: 'Sn' },
  ]

  return (
    <div className="flex items-center gap-3" role="timer" aria-label={`Kalan süre ${h} saat ${m} dakika ${s} saniye`}>
      <Timer className="size-5 text-primary" aria-hidden="true" />
      <span className="hidden text-sm font-semibold text-secondary-foreground/70 sm:inline">Bitimine</span>
      <div className="flex items-center gap-1" aria-hidden="true">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1">
            <div className="flex min-w-12 flex-col items-center bg-black/40 px-2 py-1 ring-1 ring-white/10">
              <span className="font-mono text-xl font-bold tabular-nums text-primary">{u.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-secondary-foreground/50">{u.label}</span>
            </div>
            {i < units.length - 1 && <span className="font-mono text-lg font-bold text-primary">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Bileşen artık dışarıdan (Supabase'den) gelen 'products' verisini alıyor
export function DailyDeals({ products = [] }: { products?: any[] }) {
  // Supabase'den gelen ürünlerden rastgele (veya ilk) 3 tanesini fırsat ürünü olarak seçelim
  const deals = products.slice(0, 3)

  if (deals.length === 0) return null // Ürün yoksa bu bölümü gizle

  return (
    <section id="firsatlar" aria-labelledby="firsat-baslik" className="flex scroll-mt-40 flex-col gap-4">
      <SectionHeading id="firsat-baslik" code="02" title="Günün Fırsatları" />

      <div className="flex flex-col gap-4 bg-secondary p-4 text-secondary-foreground sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-heading text-lg font-bold uppercase">
            <Zap className="size-5 fill-primary text-primary" aria-hidden="true" />
            Sınırlı stok, gece yarısı biter
          </p>
          <Countdown />
        </div>

        <ul className="grid gap-3 md:grid-cols-3">
          {deals.map((product) => {
            // Veritabanından gelen verilere göre indirim oranlarını hesapla
            // (Eğer veritabanında oldPrice, stock gibi sütunlar yoksa varsayılan değerler kullanıyoruz)
            const initialStock = product.initialStock || 50
            const left = Math.min(product.stock || 5, initialStock)
            const soldPct = Math.round(((initialStock - left) / initialStock) * 100)
            
            const dealPrice = product.price || 0
            const oldPrice = product.oldPrice || (dealPrice * 1.3) // Eğer eski fiyat yoksa %30 uydurma indirim göster
            const discount = Math.round((1 - dealPrice / oldPrice) * 100)
            
            const critical = left <= 5

            return (
              <li
                key={product.id}
                className="group flex gap-3 border-2 border-white/10 bg-card p-3 text-card-foreground transition-[border-color,box-shadow] duration-150 hover:border-primary hover:shadow-[0_0_0_1px_var(--primary),0_8px_24px_-10px_var(--primary)]"
              >
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden bg-muted sm:w-32">
                  <Image
                    src={product.image || '/placeholder.png'} // Eğer resim url'si yoksa patlamaması için
                    alt={product.title || 'Ürün'}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-0 top-0 bg-primary px-1.5 py-0.5 font-mono text-xs font-bold text-primary-foreground">
                    -%{discount}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="truncate font-mono text-[10px] text-muted-foreground">{product.sku || 'TZ-000'}</span>
                  <h3 className="font-heading text-sm font-bold leading-snug text-pretty">{product.title}</h3>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-heading text-xl font-bold tabular-nums">{formatPrice(dealPrice)}</span>
                    <span className="text-xs tabular-nums text-muted-foreground line-through">
                      {formatPrice(oldPrice)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className={critical ? 'text-destructive' : 'text-muted-foreground'}>
                        Stokta son {left} ürün
                      </span>
                      <span className="font-mono text-muted-foreground">%{soldPct} satıldı</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={soldPct}
                      aria-label={`${product.title} satış oranı`}
                      className="h-2.5 w-full bg-muted [background-image:repeating-linear-gradient(90deg,transparent_0_9px,var(--card)_9px_10px)]"
                    >
                      <div
                        className={`h-full ${critical ? 'bg-destructive' : 'bg-primary'} [background-image:repeating-linear-gradient(-45deg,transparent_0_4px,rgb(0_0_0/0.15)_4px_8px)]`}
                        style={{ width: `${soldPct}%` }}
                      />
                    </div>
                  </div>

                  <AddToCartButton product={product} className="mt-1 h-9 text-xs" />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}