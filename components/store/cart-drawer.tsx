'use client'

import Image from 'next/image'
import { Minus, Plus, ShoppingCart, Trash2, Truck, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { formatPrice } from '@/lib/catalog'
import { useStore } from './store-provider'

const FREE_SHIPPING_LIMIT = 750

export function CartDrawer() {
  const { lines, itemCount, subtotal, setQuantity, isCartOpen, setCartOpen } = useStore()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isCartOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isCartOpen, setCartOpen])

  if (!isCartOpen) return null

  const remainingForFree = Math.max(0, FREE_SHIPPING_LIMIT - subtotal)
  const shippingPct = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100)

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Sepeti kapat"
        tabIndex={-1}
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/60 animate-in fade-in"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="sepet-baslik"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-200"
      >
        <header className="flex items-center justify-between bg-secondary px-4 py-3 text-secondary-foreground">
          <h2 id="sepet-baslik" className="flex items-center gap-2 font-heading text-lg font-bold uppercase">
            <ShoppingCart className="size-5 text-primary" aria-hidden="true" />
            Sepetim
            <span className="font-mono text-sm text-secondary-foreground/60">({itemCount})</span>
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setCartOpen(false)}
            className="p-1.5 hover:bg-white/10"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Kapat</span>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" aria-hidden="true" />
            <p className="font-heading text-lg font-bold">Tezgahın henüz boş</p>
            <p className="text-sm text-muted-foreground">Projen için gereken parçaları sepete ekleyerek başla.</p>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-2 bg-primary px-5 py-2.5 text-sm font-bold uppercase text-primary-foreground"
            >
              Alışverişe Dön
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-border bg-card px-4 py-3">
              <p className="flex items-center gap-2 text-xs font-semibold">
                <Truck className="size-4 text-primary" aria-hidden="true" />
                {remainingForFree > 0
                  ? `Ücretsiz kargo için ${formatPrice(remainingForFree)} daha ekle`
                  : 'Kargo bedava!'}
              </p>
              <div className="mt-2 h-1.5 bg-muted">
                <div className="h-full bg-success transition-all" style={{ width: `${shippingPct}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {lines.map(({ product, quantity, unitPrice }) => (
                <li key={product.id} className="flex gap-3 p-4">
                  <div className="relative size-20 shrink-0 overflow-hidden border border-border bg-muted">
                    <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-mono text-[10px] text-muted-foreground">{product.sku}</span>
                    <p className="text-sm font-bold leading-snug">{product.title}</p>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="flex items-center border-2 border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="p-1.5 hover:bg-muted"
                          aria-label={quantity === 1 ? 'Ürünü kaldır' : 'Adedi azalt'}
                        >
                          {quantity === 1 ? (
                            <Trash2 className="size-3.5" aria-hidden="true" />
                          ) : (
                            <Minus className="size-3.5" aria-hidden="true" />
                          )}
                        </button>
                        <span className="w-8 text-center font-mono text-sm font-bold tabular-nums">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="p-1.5 hover:bg-muted disabled:opacity-40"
                          aria-label="Adedi artır"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-heading font-bold tabular-nums">{formatPrice(unitPrice * quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="flex flex-col gap-3 border-t-2 border-secondary bg-card p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Ara Toplam</span>
                <span className="font-heading text-2xl font-bold tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="button"
                className="h-12 bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)] hover:brightness-105"
              >
                Siparişi Tamamla
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
