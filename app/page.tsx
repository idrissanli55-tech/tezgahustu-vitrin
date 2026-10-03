import { supabase } from '@/lib/supabase'
import { CartDrawer } from '@/components/store/cart-drawer'
import { DailyDeals } from '@/components/store/daily-deals'
import { HeroBanner } from '@/components/store/hero-banner'
import { ProductGrid } from '@/components/store/product-grid'
import { QuickCategories } from '@/components/store/quick-categories'
import { SiteFooter } from '@/components/store/site-footer'
import { SiteHeader } from '@/components/store/site-header'
import { StoreProvider } from '@/components/store/store-provider'

export default async function HomePage() {
  // 1. Supabase'den gerçek ürünlerimizi çekiyoruz
  const { data: products, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.error("Veri çekilirken hata oluştu:", error)
  }

  return (
    <StoreProvider>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6">
        <h1 className="sr-only">TezgahÜstü - Hırdavat, DIY ve Atölye Malzemeleri</h1>
        <HeroBanner />
        <QuickCategories />
        
        {/* Çekilen veriler DailyDeals ve ProductGrid bileşenlerine aktarılıyor */}
        <DailyDeals products={products || []} />
        <ProductGrid products={products || []} />
        
      </main>
      <SiteFooter />
      <CartDrawer />
    </StoreProvider>
  )
}