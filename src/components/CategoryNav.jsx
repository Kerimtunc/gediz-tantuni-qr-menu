import React from 'react';
import { Utensils, Flame, Drumstick, Sparkles, Sandwich, CupSoda, PieChart } from 'lucide-react';

const ICON_MAP = {
  Utensils,
  Flame,
  Drumstick,
  Sparkles,
  Sandwich,
  CupSoda,
  PieChart
};

export default function CategoryNav({ categories = [], activeCategory = 'all', setActiveCategory }) {
  if (!Array.isArray(categories) || categories.length === 0) return null;

  return (
    <div className="category-nav-bar">
      <div className="container">
        <div className="category-scroll-container">
          {categories.filter(Boolean).map((cat) => {
            if (!cat || !cat.id) return null;
            const IconComponent = (cat.icon && ICON_MAP[cat.icon]) ? ICON_MAP[cat.icon] : Utensils;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`category-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory && setActiveCategory(cat.id)}
              >
                <IconComponent size={15} />
                <span>{cat.name || 'Kategori'}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
