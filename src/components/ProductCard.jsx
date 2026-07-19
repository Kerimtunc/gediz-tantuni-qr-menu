import React from 'react';
import { Plus, Flame } from 'lucide-react';
import { getAllergenIcon } from '../utils/legalCompliance';
import { resolveImagePath } from '../utils/imageUtils';

export default function ProductCard({ product, onSelect, legalConfig }) {
  if (!product) return null;

  const { 
    name = 'Lezzet', 
    price = 0, 
    image = './images/img_1_1784471051133.webp', 
    badge = '', 
    inStock = true,
    calories = '',
    allergens = []
  } = product;

  const showLegalDetails = Boolean(legalConfig?.enabled);
  const resolvedImg = resolveImagePath(image);

  return (
    <article className="compact-card" onClick={() => inStock && onSelect && onSelect(product)}>
      <div className="compact-card-img-wrapper">
        <img 
          src={resolvedImg} 
          alt={name} 
          className="compact-card-img" 
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = './images/img_1_1784471051133.webp';
          }}
        />
        {badge && <div className="compact-card-badge">{badge}</div>}

        {/* Legal Calorie Tag Overlay */}
        {showLegalDetails && calories && (
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            color: '#ff9d26',
            fontSize: '9px',
            fontWeight: '800',
            padding: '2px 6px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <Flame size={10} /> {calories}
          </div>
        )}
      </div>

      <div className="compact-card-body">
        <h3 className="compact-card-title" title={name}>{name}</h3>

        {/* Allergen Icons Row */}
        {showLegalDetails && Array.isArray(allergens) && allergens.length > 0 && (
          <div style={{ fontSize: '10px', display: 'flex', gap: '3px', marginTop: '2px', color: 'var(--text-muted)' }}>
            {allergens.slice(0, 3).map((a, i) => (
              <span key={i} title={a}>{getAllergenIcon(a)}</span>
            ))}
          </div>
        )}
        
        <div className="compact-card-footer" style={{ marginTop: '4px' }}>
          <div className="compact-card-price">{price} TL</div>

          {inStock ? (
            <button 
              className="compact-add-btn" 
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect(product);
              }}
              title="Sepete Ekle"
            >
              <Plus size={16} />
            </button>
          ) : (
            <span className="out-of-stock-tag">Tükendi</span>
          )}
        </div>
      </div>
    </article>
  );
}
