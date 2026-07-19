import React from 'react';
import { Sparkles, ArrowRight, Percent, ShoppingBag } from 'lucide-react';
import { resolveImagePath } from '../utils/imageUtils';

export default function ComboBanner({ combos, allProducts, onAddCombo }) {
  if (!combos || combos.length === 0) return null;

  return (
    <div style={{ padding: '16px 0 8px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Sparkles size={18} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>Özel Fırsat Menüleri</h2>
          <span style={{
            background: 'var(--accent-primary)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '800',
            padding: '2px 6px',
            borderRadius: '10px',
            marginLeft: 'auto'
          }}>
            AVANTAJLI PAKETLER
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px'
        }}>
          {combos.map((combo) => (
            <div
              key={combo.id}
              onClick={() => onAddCombo(combo)}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 122, 0, 0.15), rgba(24, 24, 28, 0.98))',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <img
                src={resolveImagePath(combo.image)}
                alt={combo.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = './images/img_9_1784471055913.webp';
                }}
                style={{ width: '74px', height: '74px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255,122,0,0.25)',
                  color: '#ff9d26',
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  marginBottom: '2px'
                }}>
                  <Percent size={10} /> {combo.discountBadge}
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#fff' }}>{combo.title}</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.25' }}>
                  {combo.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: 'var(--accent-primary)' }}>
                      {combo.comboPrice} TL
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                      {combo.originalPrice} TL
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddCombo(combo);
                    }}
                    className="add-button cta-glowing-btn"
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                  >
                    <ShoppingBag size={13} />
                    <span>Fırsatı Ekle</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
