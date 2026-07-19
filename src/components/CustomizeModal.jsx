import React, { useState } from 'react';
import { X, Sparkles, Check, Plus, ShoppingBag, Flame, Tag, ShieldCheck, AlertTriangle, Scale } from 'lucide-react';
import { getAllergenIcon } from '../utils/legalCompliance';
import { resolveImagePath } from '../utils/imageUtils';

export default function CustomizeModal({ 
  product, 
  allProducts, 
  crossSellConfig,
  legalConfig,
  onClose, 
  onAddToCart 
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedUpsells, setSelectedUpsells] = useState([]);
  const [selectedCrossSells, setSelectedCrossSells] = useState([]);

  if (!product) return null;

  // Find cross sell products object list
  const crossSellProducts = (product.recommendedCrossSellIds || [])
    .map(id => allProducts.find(p => p && p.id === id && p.inStock))
    .filter(Boolean);

  const toggleUpsell = (upsell) => {
    setSelectedUpsells(prev => 
      prev.some(u => u.id === upsell.id)
        ? prev.filter(u => u.id !== upsell.id)
        : [...prev, upsell]
    );
  };

  const toggleCrossSell = (crossProd) => {
    setSelectedCrossSells(prev =>
      prev.some(c => c.id === crossProd.id)
        ? prev.filter(c => c.id !== crossProd.id)
        : [...prev, crossProd]
    );
  };

  // Flexible Discount Calculation Engine (Product-Specific + Global Flat + Stacking)
  const calculateCrossSellItemDiscount = (crossProdId) => {
    const prodDiscount = (product.crossSellDiscounts && typeof product.crossSellDiscounts[crossProdId] === 'number') 
      ? product.crossSellDiscounts[crossProdId] 
      : 0;

    const globalDiscount = (crossSellConfig && crossSellConfig.globalEnabled && typeof crossSellConfig.globalDiscountPercent === 'number')
      ? crossSellConfig.globalDiscountPercent
      : (crossSellConfig && crossSellConfig.enabled && typeof crossSellConfig.discountPercentage === 'number' ? crossSellConfig.discountPercentage : 0);

    const isStacking = Boolean(crossSellConfig && crossSellConfig.stackDiscounts);

    let totalDiscountPercent = 0;
    if (isStacking) {
      totalDiscountPercent = prodDiscount + globalDiscount;
    } else {
      totalDiscountPercent = prodDiscount > 0 ? prodDiscount : globalDiscount;
    }

    return Math.min(100, Math.max(0, totalDiscountPercent));
  };

  const basePrice = product.price;
  const upsellsTotal = selectedUpsells.reduce((acc, u) => acc + u.price, 0);

  const crossSellsTotal = selectedCrossSells.reduce((acc, c) => {
    const discountPercent = calculateCrossSellItemDiscount(c.id);
    const discountedPrice = discountPercent > 0 ? Math.round(c.price * (1 - discountPercent / 100)) : c.price;
    return acc + discountedPrice;
  }, 0);

  const totalPrice = (basePrice + upsellsTotal) * quantity + crossSellsTotal;

  const handleAdd = () => {
    const now = Date.now();
    const mainCartItem = {
      cartItemId: `${product.id}-${now}`,
      product,
      quantity,
      selectedUpsells,
      unitPrice: basePrice + upsellsTotal,
      totalPrice: (basePrice + upsellsTotal) * quantity
    };

    const itemsToAdd = [mainCartItem];

    selectedCrossSells.forEach((crossProd, idx) => {
      const discountPercent = calculateCrossSellItemDiscount(crossProd.id);
      const finalPrice = discountPercent > 0 ? Math.round(crossProd.price * (1 - discountPercent / 100)) : crossProd.price;
      itemsToAdd.push({
        cartItemId: `${crossProd.id}-${now}-${idx + 1}`,
        product: {
          ...crossProd,
          name: discountPercent > 0 ? `${crossProd.name} (%${discountPercent} İndirimli)` : crossProd.name
        },
        quantity: 1,
        selectedUpsells: [],
        unitPrice: finalPrice,
        totalPrice: finalPrice
      });
    });

    onAddToCart(itemsToAdd);
    onClose();
  };

  const showLegalDetails = Boolean(legalConfig?.enabled);

  const productAllergens = product.allergens && product.allergens.length > 0 
    ? product.allergens 
    : ['Gluten (Lavaş/Ekmek)', 'Laktoz (Yoğurt/Tereyağı)'];

  const productIngredients = product.ingredients || 'Mersin usulü dinlendirilmiş biftek/tavuk eti, pamuk somun/lavaş, domates, maydanoz, sumaklı soğan, pamuk yağı, özel baharat harcı.';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-header-close" onClick={onClose}>
          <X size={16} />
        </button>

        <img src={resolveImagePath(product.image)} alt={product.name} className="cust-img" />

        <div className="cust-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>{product.name}</h2>
            <div className="product-price-tag">{product.price} TL</div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px', lineHeight: '1.4' }}>
            {product.description}
          </p>

          {/* Legal Compliance Box (Only displayed when legalConfig.enabled is true) */}
          {showLegalDetails && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              marginTop: '10px',
              fontSize: '11px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontWeight: '800' }}>
                  <ShieldCheck size={14} /> T.C. Mevzuat Gıda İçerik & Alerjen Beyanı
                </div>
                <span style={{ background: 'rgba(46, 204, 113, 0.2)', color: 'var(--success)', padding: '1px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: '800' }}>
                  %100 Helal Kesim
                </span>
              </div>

              {/* Calories & Weight */}
              <div style={{ display: 'flex', gap: '12px', color: '#fff', fontWeight: '700', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Flame size={12} style={{ color: '#ff7a00' }} /> Enerji: {product.calories || '450 kcal'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Scale size={12} style={{ color: '#ff9d26' }} /> Net Porsiyon: {product.netWeight || '180g (Dara Düşülmüştür)'}
                </span>
              </div>

              {/* Allergens Row */}
              <div style={{ marginBottom: '6px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: '700', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={11} style={{ color: '#e74c3c' }} /> Alerjen İçeriği:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {productAllergens.map((alg, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(231, 76, 60, 0.15)',
                      color: '#e74c3c',
                      border: '1px solid rgba(231, 76, 60, 0.3)',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '700'
                    }}>
                      {getAllergenIcon(alg)} {alg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div style={{ color: 'var(--text-dim)', fontSize: '10px', lineHeight: '1.3' }}>
                <strong>İçindekiler:</strong> {productIngredients}
              </div>
            </div>
          )}

          {/* Upsell / Portion Upgrades Section */}
          {product.upsellOptions && product.upsellOptions.length > 0 && (
            <div style={{ marginTop: '14px' }}>
              <div className="option-group-title">
                <Flame size={14} /> Lezzet Yükseltmeleri & Ekstralar
              </div>
              {product.upsellOptions.map((opt) => {
                const isSelected = selectedUpsells.some(u => u.id === opt.id);
                return (
                  <div
                    key={opt.id}
                    className={`option-item-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleUpsell(opt)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {opt.image && (
                        <img src={resolveImagePath(opt.image)} alt={opt.name} style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />
                      )}
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isSelected ? 'none' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--accent-primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                      }}>
                        {isSelected && <Check size={12} />}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{opt.name}</span>
                    </div>
                    <span style={{ fontWeight: '800', color: 'var(--accent-primary)', fontSize: '12px' }}>
                      +{opt.price} TL
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Smart Cross-Sell Recommendations */}
          {crossSellProducts.length > 0 && (
            <div className="cross-sell-box">
              <div className="cross-sell-title">
                <Sparkles size={14} /> Yanına En Çok Yakışanlar
                {(crossSellConfig?.discountBadgeText || crossSellConfig?.globalEnabled) && (
                  <span style={{
                    background: 'var(--accent-primary)',
                    color: '#fff',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    marginLeft: 'auto'
                  }}>
                    <Tag size={10} style={{ display: 'inline', marginRight: '2px' }} />
                    {crossSellConfig.discountBadgeText || 'Birlikte Alımda İndirim Fırsatı!'}
                  </span>
                )}
              </div>

              {crossSellProducts.map((crossProd) => {
                const isChecked = selectedCrossSells.some(c => c.id === crossProd.id);
                const itemDiscountPercent = calculateCrossSellItemDiscount(crossProd.id);
                const discountedPrice = itemDiscountPercent > 0 ? Math.round(crossProd.price * (1 - itemDiscountPercent / 100)) : crossProd.price;

                return (
                  <div 
                    key={crossProd.id} 
                    className={`cross-sell-item-card ${isChecked ? 'active-selected' : ''}`}
                    onClick={() => toggleCrossSell(crossProd)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={resolveImagePath(crossProd.image)} alt={crossProd.name} className="cross-sell-img" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#fff' }}>{crossProd.name}</div>
                      <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {itemDiscountPercent > 0 ? (
                          <>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>+{discountedPrice} TL</span>
                            <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)' }}>{crossProd.price} TL</span>
                            <span style={{
                              background: 'rgba(255,122,0,0.2)',
                              color: '#ff9d26',
                              fontSize: '9px',
                              fontWeight: '800',
                              padding: '1px 4px',
                              borderRadius: '4px'
                            }}>
                              -%{itemDiscountPercent}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>+{crossProd.price} TL</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCrossSell(crossProd);
                      }}
                      className={`cross-add-badge-btn ${isChecked ? 'selected' : ''}`}
                    >
                      {isChecked ? <Check size={12} /> : <Plus size={12} />}
                      <span>{isChecked ? 'Eklendi' : 'Ekle'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quantity & CTA */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {/* Quantity Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg-card)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)'
            }}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', width: '20px' }}
              >
                -
              </button>
              <span style={{ fontWeight: '800', fontSize: '14px', minWidth: '16px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', width: '20px' }}
              >
                +
              </button>
            </div>

            {/* Premium CTA Button */}
            <button 
              onClick={handleAdd}
              className="add-button cta-glowing-btn"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              <ShoppingBag size={15} />
              <span>Sepete Ekle ({totalPrice} TL)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
