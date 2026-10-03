'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { deals, getProduct, type CategorySlug, type Product } from '@/lib/catalog'

type CartLine = { product: Product; quantity: number; unitPrice: number }

type StoreContextValue = {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  addToCart: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  query: string
  setQuery: (query: string) => void
  activeCategory: CategorySlug | 'all'
  setActiveCategory: (category: CategorySlug | 'all') => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

const MAX_QUANTITY = 20

export function getUnitPrice(product: Product) {
  return deals.find((d) => d.productId === product.id)?.dealPrice ?? product.price
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [isCartOpen, setCartOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all')

  const setQuantity = useCallback((id: string, quantity: number) => {
    setQuantities((prev) => {
      const product = getProduct(id)
      if (!product || quantity <= 0) {
        const { [id]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: Math.min(quantity, MAX_QUANTITY, product.stock) }
    })
  }, [])

  const addToCart = useCallback(
    (id: string) => {
      setQuantities((prev) => {
        const product = getProduct(id)
        if (!product) return prev
        const next = Math.min((prev[id] ?? 0) + 1, MAX_QUANTITY, product.stock)
        return { ...prev, [id]: next }
      })
    },
    [],
  )

  const value = useMemo<StoreContextValue>(() => {
    const lines = Object.entries(quantities).flatMap(([id, quantity]) => {
      const product = getProduct(id)
      return product ? [{ product, quantity, unitPrice: getUnitPrice(product) }] : []
    })
    return {
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0),
      addToCart,
      setQuantity,
      isCartOpen,
      setCartOpen,
      query,
      setQuery,
      activeCategory,
      setActiveCategory,
    }
  }, [quantities, addToCart, setQuantity, isCartOpen, query, activeCategory])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
