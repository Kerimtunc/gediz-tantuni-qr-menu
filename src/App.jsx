import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import ComboBanner from './components/ComboBanner';
import CustomizeModal from './components/CustomizeModal';
import CartDrawer from './components/CartDrawer';
import AdminModal from './components/AdminModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import FloatingCartButton from './components/FloatingCartButton';
import LegalComplianceModal from './components/LegalComplianceModal';

import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COMBOS,
  INITIAL_CROSS_SELL_CONFIG
} from './data/initialMenu';

import { INITIAL_USERS } from './utils/cryptoAuth';
import { playNotificationSound } from './utils/audioAlert';
import { INITIAL_LEGAL_CONFIG } from './utils/legalCompliance';

export default function App() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Strict Schema Validation for Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage products parse error:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Strict Schema Validation for Combos State
  const [combos, setCombos] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_combos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage combos parse error:', e);
    }
    return INITIAL_COMBOS;
  });

  // Strict Schema Validation for Users State
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage users parse error:', e);
    }
    return INITIAL_USERS;
  });

  // Persistent Admin Session (Stays logged in until explicit Logout)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Legal Compliance Config State
  const [legalConfig, setLegalConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_legal_config');
      return saved ? JSON.parse(saved) : INITIAL_LEGAL_CONFIG;
    } catch (e) {
      return INITIAL_LEGAL_CONFIG;
    }
  });

  // Sound Engine Volume & Mute State
  const [soundVolume, setSoundVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_sound_vol');
      return saved !== null ? Number(saved) : 80;
    } catch (e) {
      return 80;
    }
  });

  const [soundMuted, setSoundMuted] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_sound_muted');
      return saved !== null ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  // 3. Strict Schema Validation for Live Notifications
  const [liveNotifications, setLiveNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_notifs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage notifs parse error:', e);
    }
    return [];
  });

  // 4. Strict Schema Validation for Cross-Sell Config
  const [crossSellConfig, setCrossSellConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_cross_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage cross config parse error:', e);
    }
    return INITIAL_CROSS_SELL_CONFIG;
  });

  // 5. Strict Schema Validation for Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('gediz_tantuni_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage cart parse error:', e);
    }
    return [];
  });

  // Modals
  const [selectedProductForCust, setSelectedProductForCust] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // LocalStorage Persistence
  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_combos', JSON.stringify(combos));
    } catch (e) {}
  }, [combos]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_notifs', JSON.stringify(liveNotifications));
    } catch (e) {}
  }, [liveNotifications]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_cross_config', JSON.stringify(crossSellConfig));
    } catch (e) {}
  }, [crossSellConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_legal_config', JSON.stringify(legalConfig));
    } catch (e) {}
  }, [legalConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_sound_vol', soundVolume.toString());
    } catch (e) {}
  }, [soundVolume]);

  useEffect(() => {
    try {
      localStorage.setItem('gediz_tantuni_sound_muted', JSON.stringify(soundMuted));
    } catch (e) {}
  }, [soundMuted]);

  // REALTIME 2-SECOND POLLING & CROSS-TAB STORAGE SYNC
  useEffect(() => {
    const syncData = () => {
      try {
        const savedNotifs = localStorage.getItem('gediz_tantuni_notifs');
        if (savedNotifs) {
          const parsed = JSON.parse(savedNotifs);
          if (Array.isArray(parsed)) {
            setLiveNotifications(prev => {
              if (JSON.stringify(prev) !== JSON.stringify(parsed)) {
                if (parsed.length > prev.length) {
                  playNotificationSound(soundVolume, soundMuted);
                }
                return parsed;
              }
              return prev;
            });
          }
        }
        const savedProducts = localStorage.getItem('gediz_tantuni_products');
        if (savedProducts) {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
            setProducts(prev => {
              if (JSON.stringify(prev) !== JSON.stringify(parsed)) {
                return parsed;
              }
              return prev;
            });
          }
        }
      } catch (e) {}
    };

    const interval = setInterval(syncData, 2000);
    window.addEventListener('storage', syncData);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', syncData);
    };
  }, [soundVolume, soundMuted]);

  const categoryRefs = useRef({});

  const handleSelectCategoryTab = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryRefs.current[catId]) {
      categoryRefs.current[catId].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (itemsToAdd) => {
    setCart((prev) => [...prev, ...itemsToAdd]);
  };

  const handleAddCombo = (combo) => {
    const comboCartItem = {
      cartItemId: `combo-${combo.id}-${Date.now()}`,
      product: {
        id: combo.id,
        name: combo.title,
        price: combo.comboPrice,
        image: combo.image,
        description: combo.description
      },
      quantity: 1,
      selectedUpsells: [],
      unitPrice: combo.comboPrice,
      totalPrice: combo.comboPrice
    };
    setCart((prev) => [...prev, comboCartItem]);
    setIsCartOpen(true);
  };

  const handleSendNotification = (newNotif) => {
    setLiveNotifications(prev => {
      const updated = [newNotif, ...prev];
      try {
        localStorage.setItem('gediz_tantuni_notifs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    playNotificationSound(soundVolume, soundMuted);
  };

  const handleResetDefault = () => {
    localStorage.removeItem('gediz_tantuni_products');
    localStorage.removeItem('gediz_tantuni_combos');
    localStorage.removeItem('gediz_tantuni_users');
    localStorage.removeItem('gediz_tantuni_notifs');
    localStorage.removeItem('gediz_tantuni_cross_config');
    localStorage.removeItem('gediz_tantuni_legal_config');
    localStorage.removeItem('gediz_tantuni_cart');
    localStorage.removeItem('gediz_tantuni_current_user');
    
    setProducts(INITIAL_PRODUCTS);
    setCombos(INITIAL_COMBOS);
    setUsers(INITIAL_USERS);
    setLiveNotifications([]);
    setCrossSellConfig(INITIAL_CROSS_SELL_CONFIG);
    setLegalConfig(INITIAL_LEGAL_CONFIG);
    setCart([]);
    setCurrentUser(null);
    alert('Tüm menü ve mevzuat ayarları sıfırlandı!');
  };

  const isSearchActive = (searchQuery || '').trim().length > 0;

  return (
    <div className="app-layout">
      {/* Hero Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLegal={() => setIsLegalOpen(true)}
        legalConfig={legalConfig}
      />

      {/* Category Nav Sliders */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategoryTab}
      />

      {/* Main Content Area */}
      <main className="main-content container">
        
        {/* Special Combo Deals Banner (Correctly passing combos array to ComboBanner) */}
        {!isSearchActive && combos && combos.length > 0 && (
          <ComboBanner
            combos={combos}
            allProducts={products}
            onAddCombo={handleAddCombo}
          />
        )}

        {/* Product Carousels & Grids */}
        {categories.map((cat) => {
          if (cat.id === 'all') return null;

          const catProducts = (products || []).filter((p) => {
            if (!p || !p.categoryId) return false;
            const matchesCat = p.categoryId === cat.id;
            const matchesSearch = !isSearchActive || (
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            return matchesCat && matchesSearch;
          });

          if (isSearchActive && catProducts.length === 0) return null;

          return (
            <section
              key={cat.id}
              ref={(el) => (categoryRefs.current[cat.id] = el)}
              className="category-section"
            >
              <div className="category-header">
                <h2 className="category-title">{cat.name}</h2>
                <span className="category-count">{catProducts.length} Lezzet</span>
              </div>

              {catProducts.length === 0 ? (
                <p className="no-products-text">Bu kategoride henüz ürün bulunmuyor.</p>
              ) : (
                <div className="horizontal-slider">
                  {catProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      legalConfig={legalConfig}
                      onSelect={(prod) => setSelectedProductForCust(prod)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Mandatory Legal & Ministry QR Banner at VERY END OF PAGE (Only displayed if legalConfig.enabled is true) */}
        {legalConfig?.enabled && (
          <section style={{
            marginTop: '40px',
            marginBottom: '40px',
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: '800', marginBottom: '4px' }}>
              🏛️ T.C. TARIM VE ORMAN BAKANLIĞI & TİCARET BAKANLIĞI YASAL MEVZUAT BEYANI
            </div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.4', maxWidth: '640px', margin: '0 auto 10px auto' }}>
              "{legalConfig.legalNoticeText}"
            </p>
            <button 
              onClick={() => setIsLegalOpen(true)}
              style={{
                background: 'rgba(255, 122, 0, 0.15)',
                color: '#ff9d26',
                border: '1px solid var(--border-accent)',
                padding: '6px 14px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Bakanlık İşletme Karekodu & Resmi Fiyat Şeffaflığı Detayları
            </button>
          </section>
        )}

      </main>

      {/* Customize & Upsell Modal */}
      {selectedProductForCust && (
        <CustomizeModal
          product={selectedProductForCust}
          allProducts={products}
          crossSellConfig={crossSellConfig}
          legalConfig={legalConfig}
          onClose={() => setSelectedProductForCust(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        allProducts={products}
        onSendNotification={handleSendNotification}
        onOrderSuccess={(order) => {
          setLastCompletedOrder(order);
          setCart([]);
        }}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        setProducts={setProducts}
        categories={categories}
        setCategories={setCategories}
        combos={combos}
        setCombos={setCombos}
        users={users}
        setUsers={setUsers}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        liveNotifications={liveNotifications}
        setLiveNotifications={setLiveNotifications}
        crossSellConfig={crossSellConfig}
        setCrossSellConfig={setCrossSellConfig}
        legalConfig={legalConfig}
        setLegalConfig={setLegalConfig}
        soundVolume={soundVolume}
        setSoundVolume={setSoundVolume}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        onResetDefault={handleResetDefault}
      />

      {/* Legal Compliance Modal */}
      <LegalComplianceModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        legalConfig={legalConfig}
      />

      {/* Order Confirmation Modal */}
      {lastCompletedOrder && (
        <OrderSuccessModal
          order={lastCompletedOrder}
          onClose={() => setLastCompletedOrder(null)}
        />
      )}

      {/* Floating Cart Button */}
      <FloatingCartButton
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
