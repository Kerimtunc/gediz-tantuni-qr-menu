export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'Tüm Lezzetler', icon: 'Utensils' },
  { id: 'et', name: 'Et Tantuni', icon: 'Flame' },
  { id: 'tavuk', name: 'Tavuk Tantuni', icon: 'Drumstick' },
  { id: 'sushi', name: 'Sushi Tantuni', icon: 'Sparkles' },
  { id: 'tost', name: 'Tost & Çıtır', icon: 'Sandwich' },
  { id: 'icecek', name: 'Buz Gibi İçecekler', icon: 'CupSoda' },
  { id: 'tatli', name: 'Tatlı & Yan Lezzetler', icon: 'PieChart' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    categoryId: 'tavuk',
    name: 'Tavuk Tantuni Ekmek',
    price: 130,
    description: 'Taze somun ekmek arasında özel baharatlar ve pamuk gibi pişirilmiş tavuk tantuni, maydanoz, domates ve isteğe bağlı soğan.',
    image: '/images/img_1_1784471051133.webp',
    badge: '🔥 Sık Tercih Edilen',
    rating: 4.8,
    reviewsCount: 340,
    prepTime: '8-10 dk',
    calories: '450 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [
      { id: 'u-1', name: 'Duble Tavuk Et Ekstrası', price: 45, image: '/images/img_2_1784471054260.webp' },
      { id: 'u-2', name: 'Eritilmiş Çıtır Kaşar Ekle', price: 25, image: '/images/img_3_1784471054581.webp' },
      { id: 'u-3', name: 'Çift Lavaş Tercihi', price: 10, image: '/images/img_4_1784471054668.webp' }
    ],
    recommendedCrossSellIds: ['prod-11', 'prod-13', 'prod-10']
  },
  {
    id: 'prod-2',
    categoryId: 'tavuk',
    name: 'Tavuk Tantuni Dürüm',
    price: 150,
    description: 'Özel Mersin usulü incecik pamuk lavaşta dinlendirilmiş tavuk tantuni dürüm, sumaklı soğan ve maydanoz ikilisi ile.',
    image: '/images/img_5_1784471054752.webp',
    badge: '⭐ En Çok Satan',
    rating: 4.9,
    reviewsCount: 520,
    prepTime: '7-9 dk',
    calories: '420 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [
      { id: 'u-4', name: 'Duble Tavuk Miktarı (+%50)', price: 50, image: '/images/img_2_1784471054260.webp' },
      { id: 'u-5', name: 'Eritilmiş Kaşar Peyniri', price: 25, image: '/images/img_3_1784471054581.webp' },
      { id: 'u-6', name: 'Süzme Yoğurt Sos', price: 20, image: '/images/img_6_1784471054949.webp' }
    ],
    recommendedCrossSellIds: ['prod-11', 'prod-13', 'prod-17']
  },
  {
    id: 'prod-3',
    categoryId: 'sushi',
    name: 'Yoğurtlu Tavuk Sushi Tantuni',
    price: 175,
    description: 'Dilimlenmiş rulo lavaş tantuni üzerine sarımsaklı süzme yoğurt, tereyağlı toz biber cızbız sos ve kızgın nane gezdirmesi.',
    image: '/images/img_7_1784471055038.webp',
    badge: '👨‍🍳 Şefin Spesiyali',
    rating: 4.95,
    reviewsCount: 410,
    prepTime: '10-12 dk',
    calories: '560 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [
      { id: 'u-7', name: 'Ekstra Bol Sarımsaklı Yoğurt', price: 20, image: '/images/img_6_1784471054949.webp' },
      { id: 'u-8', name: 'Tereyağlı Kırmızı Biber Sos', price: 25, image: '/images/img_8_1784471055803.webp' }
    ],
    recommendedCrossSellIds: ['prod-14', 'prod-11']
  },
  {
    id: 'prod-4',
    categoryId: 'et',
    name: 'Et Tantuni Ekmek',
    price: 250,
    description: 'Özenle seçilmiş dana etinden yaprak doğranmış, pamuk gibi pişirilmiş gurme et tantuni ekmek arası.',
    image: '/images/img_9_1784471055913.webp',
    badge: '👑 Gurme Seçim',
    rating: 4.9,
    reviewsCount: 680,
    prepTime: '8-10 dk',
    calories: '510 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [
      { id: 'u-9', name: '1.5 Porsiyon (Ekstra Et)', price: 75, image: '/images/img_10_1784471056405.webp' },
      { id: 'u-10', name: 'Eritilmiş Çıtır Kaşar', price: 30, image: '/images/img_3_1784471054581.webp' }
    ],
    recommendedCrossSellIds: ['prod-13', 'prod-12', 'prod-18']
  },
  {
    id: 'prod-5',
    categoryId: 'et',
    name: 'Et Tantuni Dürüm',
    price: 275,
    description: 'İncecik Mersin lavaşına sarılı lokum gibi pişmiş et tantuni, taze domates, maydanoz ve özel Mersin baharat harmanı.',
    image: '/images/img_11_1784471056560.webp',
    badge: '🔥 Efsane Lezzet',
    rating: 5.0,
    reviewsCount: 890,
    prepTime: '7-9 dk',
    calories: '490 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [
      { id: 'u-11', name: 'Duble Dana Eti (+%50)', price: 80, image: '/images/img_12_1784471056851.webp' },
      { id: 'u-12', name: 'Eritilmiş Kaşar Peyniri', price: 30, image: '/images/img_3_1784471054581.webp' },
      { id: 'u-13', name: 'Çift Lavaş Dürüm', price: 15, image: '/images/img_4_1784471054668.webp' }
    ],
    recommendedCrossSellIds: ['prod-13', 'prod-14', 'prod-17']
  },
  {
    id: 'prod-6',
    categoryId: 'sushi',
    name: 'Yoğurtlu Et Sushi Tantuni',
    price: 300,
    description: 'İnce kıyım rulo lavaş et tantuni, üzerine bol koyu süzme yoğurt, kızdırılmış tereyağı ve pul biber cızbızı.',
    image: '/images/img_13_1784471056941.webp',
    badge: '⭐ Müşteri Favorisi',
    rating: 4.96,
    reviewsCount: 610,
    prepTime: '10-12 dk',
    calories: '620 kcal',
    inStock: true,
    spicyLevel: 2,
    upsellOptions: [
      { id: 'u-14', name: 'Ekstra Dana Eti Porsiyonu', price: 70, image: '/images/img_12_1784471056851.webp' },
      { id: 'u-15', name: 'Ekstra Tereyağı ve Nane Sosu', price: 25, image: '/images/img_8_1784471055803.webp' }
    ],
    recommendedCrossSellIds: ['prod-13', 'prod-18']
  },
  {
    id: 'prod-7',
    categoryId: 'sushi',
    name: 'Gediz Special Sushi (Et & Tavuk Mix)',
    price: 350,
    description: 'Yarı dana et yarı tavuk tantuni harmanı! Özel rulo sunumu, sarımsaklı süzme yoğurt ve kızgın köpüklü tereyağı lezzeti.',
    image: '/images/img_14_1784471057365.webp',
    badge: '🌟 Gediz İmzası',
    rating: 5.0,
    reviewsCount: 940,
    prepTime: '12-14 dk',
    calories: '680 kcal',
    inStock: true,
    spicyLevel: 2,
    upsellOptions: [
      { id: 'u-16', name: 'Üzerine Eritilmiş Kaşar Graten', price: 35, image: '/images/img_3_1784471054581.webp' },
      { id: 'u-17', name: 'Gurme Büyük Porsiyon (+%40)', price: 90, image: '/images/img_15_1784471057612.webp' }
    ],
    recommendedCrossSellIds: ['prod-13', 'prod-14', 'prod-18']
  },
  {
    id: 'prod-8',
    categoryId: 'tost',
    name: 'Gediz Bazlama Tost',
    price: 200,
    description: 'Fırından taze çıkmış sıcak bazlama ekmeği, bol uzayan kaşar peyniri ve özel Gediz sosu.',
    image: '/images/img_16_1784471057701.webp',
    badge: '🥪 Çıtır & Doyurucu',
    rating: 4.7,
    reviewsCount: 230,
    prepTime: '8 dk',
    calories: '480 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [
      { id: 'u-18', name: 'Dana Sucuk Ekle', price: 35, image: '/images/img_17_1784471057919.webp' },
      { id: 'u-19', name: 'Çift Kaşar Peyniri', price: 25, image: '/images/img_3_1784471054581.webp' }
    ],
    recommendedCrossSellIds: ['prod-10', 'prod-11']
  },
  {
    id: 'prod-9',
    categoryId: 'tost',
    name: 'Dana Sucuklu Tost',
    price: 150,
    description: 'A kalite baharatlı dana sucuk, erimiş kaşar peyniri ve tereyağlı tost ekmeğinde cızbız tost lezzeti.',
    image: '/images/img_18_1784471058011.webp',
    badge: '⚡ Hızlı Hazırlanır',
    rating: 4.8,
    reviewsCount: 190,
    prepTime: '6 dk',
    calories: '440 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [
      { id: 'u-20', name: 'Ekstra Bol Sucuk', price: 30, image: '/images/img_17_1784471057919.webp' }
    ],
    recommendedCrossSellIds: ['prod-10', 'prod-14']
  },
  {
    id: 'prod-17',
    categoryId: 'tost',
    name: 'Çıtır Combo Tabağı',
    price: 200,
    description: 'Altın sarısı baharatlı patates kızartması, çıtır nugget parçaları, sosis dilimleri ve soğan halkaları (Sarımsaklı Mayonez & Ketçap ile).',
    image: '/images/img_19_1784471058278.webp',
    badge: '🍟 Paylaşımlık Tabak',
    rating: 4.9,
    reviewsCount: 380,
    prepTime: '10 dk',
    calories: '650 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [
      { id: 'u-21', name: 'Sıcak Cheddar Peynir Sosu', price: 30, image: '/images/img_20_1784471058471.webp' },
      { id: 'u-22', name: 'Ekstra Patates Porsiyonu', price: 40, image: '/images/img_20_1784471058471.webp' }
    ],
    recommendedCrossSellIds: ['prod-14', 'prod-11']
  },
  {
    id: 'prod-10',
    categoryId: 'icecek',
    name: 'Taze Demlenmiş Çay',
    price: 10,
    description: 'Rize tavşankanı taze demlenmiş bardak çay.',
    image: '/images/img_21_1784471058557.webp',
    badge: '🍵 Taze Dem',
    rating: 4.9,
    reviewsCount: 990,
    prepTime: '1 dk',
    calories: '2 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [],
    recommendedCrossSellIds: ['prod-8', 'prod-9']
  },
  {
    id: 'prod-11',
    categoryId: 'icecek',
    name: 'Köpüklü Açık Ayran (Bardak)',
    price: 25,
    description: 'Geleneksel yayık ayranı, bol köpüklü ve soğuk.',
    image: '/images/img_22_1784471058865.webp',
    badge: '🥛 Yayık Lezzeti',
    rating: 4.9,
    reviewsCount: 720,
    prepTime: '1 dk',
    calories: '90 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [],
    recommendedCrossSellIds: ['prod-2', 'prod-5']
  },
  {
    id: 'prod-12',
    categoryId: 'icecek',
    name: 'Büyük Cam Şişe Ayran',
    price: 50,
    description: '330ml özel cam şişe ayran.',
    image: 'https://images.unsplash.com/photo-1626078436894-39962e2d93e7?auto=format&fit=crop&w=800&q=80',
    badge: '❄️ Buz Gibi',
    rating: 4.8,
    reviewsCount: 310,
    prepTime: '1 dk',
    calories: '120 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [],
    recommendedCrossSellIds: ['prod-4', 'prod-5']
  },
  {
    id: 'prod-13',
    categoryId: 'icecek',
    name: 'Mersin Cam Şişe Şalgam (Acılı/Acısız)',
    price: 60,
    description: 'Adana & Mersin usulü fermente taneli havuçlu cam şişe şalgam suyu.',
    image: '/images/img_24_1784471059334.webp',
    badge: '🌶️ Mersin Orijinal',
    rating: 4.97,
    reviewsCount: 840,
    prepTime: '1 dk',
    calories: '45 kcal',
    inStock: true,
    spicyLevel: 1,
    upsellOptions: [],
    recommendedCrossSellIds: ['prod-5', 'prod-7', 'prod-4']
  },
  {
    id: 'prod-14',
    categoryId: 'icecek',
    name: 'Kutu Coca-Cola / Zero (330ml)',
    price: 70,
    description: 'Buz gibi kutu kola çeşidi.',
    image: '/images/img_25_1784471059816.webp',
    badge: '🥤 Klasik',
    rating: 4.8,
    reviewsCount: 550,
    prepTime: '1 dk',
    calories: '139 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [],
    recommendedCrossSellIds: ['prod-2', 'prod-5', 'prod-17']
  },
  {
    id: 'prod-18',
    categoryId: 'tatli',
    name: 'Çıtır Hatay Künefesi (Tereyağlı)',
    price: 130,
    description: 'Özel tuzsuz künefe peyniri, çıtır kadayıf, hakiki tereyağı ve üzerine fıstık serpimi ile sıcak servis.',
    image: '/images/img_26_1784471060034.webp',
    badge: '🍯 Sıcak & Çıtır',
    rating: 4.98,
    reviewsCount: 760,
    prepTime: '12-15 dk',
    calories: '480 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [
      { id: 'u-23', name: 'Hakiki Manda Kaymağı Topu', price: 30, image: '/images/img_27_1784471060228.webp' },
      { id: 'u-24', name: 'Bol Antep Fıstığı Tozu Ekstrası', price: 25, image: '/images/img_27_1784471060228.webp' }
    ],
    recommendedCrossSellIds: ['prod-10', 'prod-12']
  },
  {
    id: 'prod-19',
    categoryId: 'tatli',
    name: 'Fırın Sütlaç (Antep Fıstıklı)',
    price: 90,
    description: 'Kendi güvecinde üzeri nar gibi kızarmış fırın sütlaç.',
    image: '/images/img_28_1784471061132.webp',
    badge: '🥛 Hafif Lezzet',
    rating: 4.9,
    reviewsCount: 430,
    prepTime: '2 dk',
    calories: '290 kcal',
    inStock: true,
    spicyLevel: 0,
    upsellOptions: [
      { id: 'u-25', name: 'Kavrulmuş Fındık İçi Serpiştirme', price: 15, image: '/images/img_29_1784471061298.webp' }
    ],
    recommendedCrossSellIds: ['prod-10']
  }
];

export const INITIAL_COMBOS = [
  {
    id: 'combo-1',
    title: '🔥 Süper Et Tantuni Menü (Fırsat)',
    description: 'Et Tantuni Dürüm + Çıtır Patates + Cam Şişe Şalgam / Kola',
    originalPrice: 405,
    comboPrice: 349,
    discountBadge: '%15 İndirim',
    image: '/images/img_9_1784471055913.webp',
    itemIds: ['prod-5', 'prod-17', 'prod-13']
  },
  {
    id: 'combo-2',
    title: '⭐ Yoğurtlu Sushi & Tatlı İkilisi',
    description: 'Yoğurtlu Tavuk Sushi + Çıtır Hatay Künefesi + Köpüklü Ayran',
    originalPrice: 330,
    comboPrice: 285,
    discountBadge: 'En Çok Tercih Edilen',
    image: '/images/img_7_1784471055038.webp',
    itemIds: ['prod-3', 'prod-18', 'prod-11']
  }
];

// Initial Cross-Sell Global Discount Configuration
export const INITIAL_CROSS_SELL_CONFIG = {
  enabled: true,
  discountPercentage: 10, // 10% discount on cross-sell items when purchased together
  discountBadgeText: '💥 Birlikte Alımda %10 İndirim!'
};
