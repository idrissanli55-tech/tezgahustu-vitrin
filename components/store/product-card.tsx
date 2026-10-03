'use client'

import Image from 'next/image'
import { Check, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { formatPrice, LOW_STOCK_THRESHOLD } from '@/lib/catalog'
import { useStore } from './store-provider'

export function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
        Tükendi
      </span>
    )
  }
  const low = stock <= LOW_STOCK_THRESHOLD
  return (
    <span
      className={
        low
          ? 'inline-flex items-center gap-1.5 bg-primary/15 px-2 py-0.5 text-xs font-bold text-orange-800'
          : 'inline-flex items-center gap-1.5 bg-success/15 px-2 py-0.5 text-xs font-bold text-success'
      }
    >
      <span className={low ? 'size-1.5 bg-primary' : 'size-1.5 bg-success'} aria-hidden="true" />
      {low ? `Son ${stock} adet` : 'Stokta'}
    </span>
  )
}

export function AddToCartButton({ product, className = '' }: { product: any; className?: string }) {
  const { addToCart } = useStore()
  const [added, setAdded] = useState(false)
  const disabled = product.stock === 0

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        addToCart(product.id)
        setAdded(true)
        setTimeout(() => setAdded(false), 1200)
      }}
      className={`flex h-11 w-full items-center justify-center gap-2 bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)] transition-all duration-100 hover:brightness-105 active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {added ? (
        <>
          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
          Eklendi
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Sepete Ekle
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {added ? `${product.title} sepete eklendi` : ''}
      </span>
    </button>
  )
}

export function ProductCard({ product }: { product: any }) {
  // Eğer veritabanında fiyat bilgisi yoksa 0 olarak kabul edelim
  const safePrice = product.price || 0
  const discount = product.oldPrice ? Math.round((1 - safePrice / product.oldPrice) * 100) : 0
  
  // Resim URL'si boşsa veya yoksa, Next.js'in çökmesini engelleyen güvenli görsel
  const safeImage = product.image && product.image.trim() !== '' 
    ? product.image 
    : 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=600&auto=format&fit=crop'

  return (
    <article className="group relative flex w-full flex-col border-2 border-border bg-card transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_0_1px_var(--primary),0_12px_32px_-12px_var(--primary)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-0.5 -top-0.5 z-10 size-0 border-l-[18px] border-t-[18px] border-l-transparent border-t-transparent transition-all duration-150 group-hover:border-l-primary group-hover:border-t-primary"
      />

      <div className="relative aspect-square overflow-hidden border-b-2 border-border bg-muted transition-colors group-hover:border-primary">
        <Image
          src={safeImage}
          alt={product.title || 'Ürün'}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-0 top-3 bg-secondary px-2 py-1 font-mono text-xs font-bold text-primary">
            -%{discount}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <StockBadge stock={product.stock || 0} />
          <span className="truncate font-mono text-[10px] text-muted-foreground">{product.sku || 'TZ-000'}</span>
        </div>
        
        {/* Marka yoksa boşluk bırakıp tasarımı bozmamak için null check */}
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{product.brand}</p>
        )}
        
        <h3 className="font-heading text-sm font-bold leading-snug text-card-foreground text-pretty sm:text-base">
          <a href="#" className="after:absolute after:inset-0 focus:outline-none">
            {product.title || 'İsimsiz Ürün'}
          </a>
        </h3>
        
        {/* Ürün özelliği yoksa boşluk bırak */}
        {product.spec && (
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">{product.spec}</p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="font-heading text-xl font-bold tabular-nums text-card-foreground sm:text-2xl">
              {formatPrice(safePrice)}
            </p>
            {product.oldPrice && (
              <p className="text-xs tabular-nums text-muted-foreground line-through">
                <span className="sr-only">Eski fiyat: </span>
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <AddToCartButton product={product} className="relative z-10" />
        </div>
      </div>
    </article>
  )
}