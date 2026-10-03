export type CategorySlug =
  | 'gelistirme-kartlari'
  | 'lehimleme'
  | 'el-aletleri'
  | 'olcum-cihazlari'
  | 'guc-kaynaklari'
  | 'sensorler'
  | 'kablo-konnektor'
  | '3d-baski'

export type Category = {
  slug: CategorySlug
  name: string
  code: string
}

export type Product = {
  id: string
  sku: string
  brand: string
  title: string
  spec: string
  category: CategorySlug
  price: number
  oldPrice?: number
  image: string
  stock: number
}

export type Deal = {
  productId: string
  dealPrice: number
  initialStock: number
}

export const categories: Category[] = [
  { slug: 'gelistirme-kartlari', name: 'Geliştirme Kartları', code: 'MCU' },
  { slug: 'lehimleme', name: 'Lehimleme', code: 'SLD' },
  { slug: 'el-aletleri', name: 'El Aletleri', code: 'HND' },
  { slug: 'olcum-cihazlari', name: 'Ölçüm Cihazları', code: 'MSR' },
  { slug: 'guc-kaynaklari', name: 'Güç Kaynakları', code: 'PWR' },
  { slug: 'sensorler', name: 'Sensörler', code: 'SNS' },
  { slug: 'kablo-konnektor', name: 'Kablo & Konnektör', code: 'CBL' },
  { slug: '3d-baski', name: '3D Baskı', code: '3DP' },
]

export const products: Product[] = [
  {
    id: 'p-01',
    sku: 'TZ-MCU-ESP32C3SM',
    brand: 'Espressif',
    title: 'ESP32-C3 SuperMini Geliştirme Kartı',
    spec: 'RISC-V 160MHz · Wi-Fi + BLE 5.0 · USB-C',
    category: 'gelistirme-kartlari',
    price: 189.9,
    oldPrice: 229.9,
    image: '/images/esp32-c3.png',
    stock: 142,
  },
  {
    id: 'p-02',
    sku: 'TZ-SLD-HV60W',
    brand: 'TezgahPro',
    title: '60W Isı Ayarlı Havya',
    spec: '200–450°C · Seramik rezistans · 5 uç dahil',
    category: 'lehimleme',
    price: 449.9,
    oldPrice: 599.9,
    image: '/images/soldering-iron.png',
    stock: 38,
  },
  {
    id: 'p-03',
    sku: 'TZ-MSR-DMM6000',
    brand: 'Voltix',
    title: 'True RMS Dijital Multimetre',
    spec: '6000 sayım · CAT III 600V · NCV',
    category: 'olcum-cihazlari',
    price: 1249,
    oldPrice: 1590,
    image: '/images/multimeter.png',
    stock: 5,
  },
  {
    id: 'p-04',
    sku: 'TZ-HND-TRN64',
    brand: 'TezgahPro',
    title: 'Hassas Tornavida Seti 64 Parça',
    spec: 'S2 çelik uçlar · Manyetik sap · Alüminyum kutu',
    category: 'el-aletleri',
    price: 379.9,
    image: '/images/screwdriver-set.png',
    stock: 76,
  },
  {
    id: 'p-05',
    sku: 'TZ-MSR-KMP150',
    brand: 'Mesura',
    title: 'Dijital Kumpas 150 mm',
    spec: '0,01 mm çözünürlük · Paslanmaz çelik · mm/inç',
    category: 'olcum-cihazlari',
    price: 529.9,
    image: '/images/caliper.png',
    stock: 54,
  },
  {
    id: 'p-06',
    sku: 'TZ-MCU-UNOR3',
    brand: 'Maker',
    title: 'UNO R3 Uyumlu Geliştirme Kartı',
    spec: 'ATmega328P · 14 dijital I/O · USB kablo dahil',
    category: 'gelistirme-kartlari',
    price: 329.9,
    image: '/images/dev-board.png',
    stock: 210,
  },
  {
    id: 'p-07',
    sku: 'TZ-SLD-858D',
    brand: 'TezgahPro',
    title: '858D SMD Sıcak Hava İstasyonu',
    spec: '700W · 100–480°C · Dijital ekran · 3 nozul',
    category: 'lehimleme',
    price: 2899,
    oldPrice: 3499,
    image: '/images/hot-air-station.png',
    stock: 12,
  },
  {
    id: 'p-08',
    sku: 'TZ-HND-KSP08',
    brand: 'Voltix',
    title: 'Otomatik Kablo Sıyırma Pensesi',
    spec: '0,2–6 mm² · Kesme + sıyırma + pabuç sıkma',
    category: 'el-aletleri',
    price: 289.9,
    image: '/images/wire-stripper.png',
    stock: 3,
  },
]

export const deals: Deal[] = [
  { productId: 'p-03', dealPrice: 999, initialStock: 40 },
  { productId: 'p-07', dealPrice: 2449, initialStock: 30 },
  { productId: 'p-02', dealPrice: 379.9, initialStock: 60 },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

const priceFormatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
})

export function formatPrice(value: number) {
  return priceFormatter.format(value)
}

export const LOW_STOCK_THRESHOLD = 10
