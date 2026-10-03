import { Headset, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { Logo } from './site-header'

const assurances = [
  { icon: Truck, title: 'Aynı Gün Kargo', text: "15:00'e kadar verilen siparişler" },
  { icon: RotateCcw, title: '14 Gün İade', text: 'Koşulsuz ve ücretsiz iade' },
  { icon: ShieldCheck, title: 'Orijinal Ürün', text: '2 yıl distribütör garantisi' },
  { icon: Headset, title: 'Teknik Destek', text: 'Ustalardan proje danışmanlığı' },
]

const columns = [
  { title: 'Kurumsal', links: ['Hakkımızda', 'Kariyer', 'Toplu Alım / Kurumsal', 'Bayilik'] },
  { title: 'Yardım', links: ['Sipariş Takibi', 'İade & Değişim', 'Kargo Bilgileri', 'Sıkça Sorulanlar'] },
  { title: 'Maker Köşesi', links: ['Proje Rehberleri', 'Datasheet Arşivi', 'Atölye Etkinlikleri', 'Blog'] },
]

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-secondary text-secondary-foreground">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px border-b border-white/10 bg-white/10 lg:grid-cols-4">
        {assurances.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 bg-secondary px-4 py-5">
            <span className="flex size-10 shrink-0 items-center justify-center border-2 border-primary text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs text-secondary-foreground/60">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-secondary-foreground/60">
            Ustalar, mühendisler ve maker&apos;lar için hırdavat, elektronik ve atölye malzemeleri platformu.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">{col.title}</h2>
            <ul className="flex flex-col gap-2 text-sm text-secondary-foreground/75">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 font-mono text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} TezgahÜstü — Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}
