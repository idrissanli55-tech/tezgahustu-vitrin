import Image from 'next/image'
import { ArrowRight, Headset, PackageCheck, ShieldCheck } from 'lucide-react'

const stats = [
  { icon: PackageCheck, value: '12.000+', label: 'Stoklu ürün' },
  { icon: ShieldCheck, value: '2 Yıl', label: 'Garanti' },
  { icon: Headset, value: 'Usta', label: 'Teknik destek' },
]

export function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border border-secondary bg-secondary text-secondary-foreground"
    >
      <Image
        src="/images/hero-workshop.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="-z-20 object-cover object-right opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/20" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="flex flex-col gap-6 px-6 py-10 sm:px-10 md:py-16 lg:max-w-2xl">
        <p className="flex w-fit items-center gap-2 border border-primary/60 bg-primary/10 px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="size-1.5 bg-primary" aria-hidden="true" />
          Atölye Kurulum Kampanyası
        </p>
        <h2
          id="hero-title"
          className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Atölyeni Kur, <span className="text-primary">Üretmeye</span> Başla
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-secondary-foreground/75 text-pretty">
          Havyadan osiloskoba, geliştirme kartından hassas el aletlerine kadar tezgahın ihtiyacı olan her şey. Başlangıç
          setlerinde <strong className="text-secondary-foreground">%30&apos;a varan indirim</strong>.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#urunler"
            className="group flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Setleri İncele
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#firsatlar"
            className="border-2 border-secondary-foreground/30 px-5 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:border-primary hover:text-primary"
          >
            Günün Fırsatları
          </a>
        </div>

        <dl className="mt-2 grid grid-cols-3 gap-px border border-white/10 bg-white/10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col gap-1 bg-secondary/90 p-3 sm:p-4">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <dt className="sr-only">{label}</dt>
              <dd className="font-heading text-lg font-bold sm:text-xl">{value}</dd>
              <dd className="text-xs text-secondary-foreground/60">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
