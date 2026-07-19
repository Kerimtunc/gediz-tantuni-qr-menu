import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartButton({ cart = [], onOpenCart }) {
  if (!cart || !Array.isArray(cart) || cart.length === 0) return null;

  const validCart = cart.filter(Boolean);
  if (validCart.length === 0) return null;

  const totalItems = validCart.reduce((acc, item) => acc + (item && typeof item.quantity === 'number' ? item.quantity : 1), 0);
  const totalPrice = validCart.reduce((acc, item) => acc + (item && typeof item.totalPrice === 'number' ? item.totalPrice : 0), 0);

  return (
    <div className="floating-cart-bar" onClick={() => onOpenCart && onOpenCart()}>
      <div className="cart-bar-info">
        <div className="cart-icon-badge">
          <ShoppingBag size={20} />
          <div className="cart-count-bubble">{totalItems}</div>
        </div>

        <div>
          <div className="cart-price-text">{totalPrice} TL</div>
          <div className="cart-items-text">{totalItems} Lezzet Seçildi</div>
        </div>
      </div>

      <button className="cart-open-btn" onClick={() => onOpenCart && onOpenCart()}>
        <span>Siparişi Tamamla</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
