/* =========================================================
   GEDİZ TANTUNİ — MEVZUAT UYUMLULUK VE ALERJEN YÖNETİMİ
   T.C. Tarım ve Orman Bakanlığı (28 Temmuz 2025 Yönetmeliği)
   T.C. Ticaret Bakanlığı Fiyat Etiketi Yönetmeliği (11 Ekim 2025)
   ========================================================= */

export const ALLERGEN_LIST = [
  { id: 'gluten', name: 'Gluten (Buğday / Lavaş / Ekmek)', icon: '🌾' },
  { id: 'laktoz', name: 'Süt ve Laktoz (Peynir, Yoğurt, Tereyağı)', icon: '🥛' },
  { id: 'yumurta', name: 'Yumurta ve Ürünleri', icon: '🥚' },
  { id: 'fistik', name: 'Yer Fıstığı ve Ürünleri', icon: '🥜' },
  { id: 'soya', name: 'Soya ve Soya Ürünleri', icon: '🫘' },
  { id: 'kabuklu', name: 'Sert Kabuklu Meyveler (Ceviz, Fındık, Antep Fıstığı)', icon: '🌰' },
  { id: 'kereviz', name: 'Kereviz ve Ürünleri', icon: '🥬' },
  { id: 'hardal', name: 'Hardal ve Ürünleri', icon: '🟡' },
  { id: 'susam', name: 'Susam Tohumu ve Ürünleri', icon: '⚪' },
  { id: 'sulfit', name: 'Kükürt Dioksit ve Sülfitler (Şalgam / Sirke)', icon: '🍷' },
  { id: 'balik', name: 'Balık ve Balık Ürünleri', icon: '🐟' }
];

export const INITIAL_LEGAL_CONFIG = {
  enabled: false, // Default: OFF until business decides to activate compliance mode
  officialQrUrl: 'https://guvenilirgida.tarimorman.gov.tr/isletme/QRKodOlustur',
  officialQrImage: '',
  businessRegistrationNo: 'TR-35-K-019482',
  legalNoticeText: 'Bu bilgilere karekod ile ulaşabilirsiniz. Karekod kullanamayan tüketiciler talep ederse fiyat listesi, kalori ve gıda içerik/alerjen bilgileri fiziki olarak kendilerine ayrıca sunulur.',
  displayCalorieAllergenNotice: true,
  tradeMinistryRegistered: true,
  tarimBakanligiRegistered: true,
  halalCertNo: 'GIMDES-HELAL-2026-894',
  daraNoticeText: 'Açıkta ve tüketici huzurunda tartılarak satılan ürünlerde ambalaj ağırlığı (dara) zorunlu olarak düşülmektedir.'
};

export function getAllergenIcon(allergenName) {
  if (!allergenName) return '⚠️';
  const clean = allergenName.toLowerCase();
  if (clean.includes('gluten') || clean.includes('buğday') || clean.includes('lavaş') || clean.includes('ekmek')) return '🌾';
  if (clean.includes('süt') || clean.includes('laktoz') || clean.includes('peynir') || clean.includes('yoğurt') || clean.includes('tereyağı')) return '🥛';
  if (clean.includes('yumurta')) return '🥚';
  if (clean.includes('fıstık') || clean.includes('ceviz') || clean.includes('fındık')) return '🥜';
  if (clean.includes('soya')) return '🫘';
  if (clean.includes('susam')) return '⚪';
  if (clean.includes('sülfit') || clean.includes('şalgam')) return '🍷';
  return '⚠️';
}
