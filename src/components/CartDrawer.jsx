import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, BellRing, Receipt, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  setCart, 
  allProducts,
  onOrderSuccess,
  onSendNotification 
}) {
  const [orderType, setOrderType] = useState('order'); // 'order' | 'waiter' | 'bill'
  const [paymentMethod, setPaymentMethod] = useState('Nakit / Kart');
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const totalCartPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => 
      prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty
          };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeItem = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Cross-sell dessert suggestion
  const hasDessert = cart.some(item => item.product && ['prod-18', 'prod-19'].includes(item.product.id));
  const dessertUpsell = (allProducts || []).find(p => p && p.id === 'prod-18');

  const handleAddQuickDessert = () => {
    if (!dessertUpsell) return;
    setCart(prev => [
      ...prev,
      {
        cartItemId: `${dessertUpsell.id}-${Date.now()}`,
        product: dessertUpsell,
        quantity: 1,
        selectedUpsells: [],
        unitPrice: dessertUpsell.price,
        totalPrice: dessertUpsell.price
      }
    ]);
  };

  const handleConfirmAction = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti');
    }

    const timestampStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    // Send Live Notification to Admin Dashboard Panel
    if (onSendNotification) {
      onSendNotification({
        id: `notif-${Date.now()}`,
        type: orderType,
        payment: paymentMethod,
        items: cart,
        total: totalCartPrice,
        note: customerNote,
        timestamp: timestampStr
      });
    }

    const orderDetails = {
      type: orderType,
      items: cart,
      total: totalCartPrice,
      note: customerNote,
      payment: paymentMethod,
      timestamp: timestampStr
    };

    onOrderSuccess(orderDetails);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px', height: '100%', borderRadius: '0', marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-secondary)'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800' }}>Sipariş Özetiniz</h2>
          <button className="modal-header-close" style={{ position: 'static' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Action Type Selector */}
        <div style={{ padding: '10px 16px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            <button
              onClick={() => setOrderType('order')}
              style={{
                padding: '8px 6px',
                borderRadius: 'var(--radius-md)',
                background: orderType === 'order' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: orderType === 'order' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Send size={14} />
              <span>Sipariş Ver</span>
            </button>

            <button
              onClick={() => setOrderType('waiter')}
              style={{
                padding: '8px 6px',
                borderRadius: 'var(--radius-md)',
                background: orderType === 'waiter' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: orderType === 'waiter' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <BellRing size={14} />
              <span>Garson Çağır</span>
            </button>

            <button
              onClick={() => setOrderType('bill')}
              style={{
                padding: '8px 6px',
                borderRadius: 'var(--radius-md)',
                background: orderType === 'bill' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: orderType === 'bill' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Receipt size={14} />
              <span>Hesap İste</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '16px', overflowY: 'auto', flex: 1, maxHeight: 'calc(100vh - 200px)' }}>
          {orderType === 'order' && (
            <>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
                  <Sparkles size={36} style={{ color: 'var(--accent-primary)', marginBottom: '10px' }} />
                  <p style={{ fontWeight: '700', fontSize: '15px' }}>Sepetiniz Henüz Boş</p>
                  <p style={{ fontSize: '12px', marginTop: '4px' }}>Lezzetlerimizi keşfedip ekleyebilirsiniz.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cart.map((item) => (
                    <div 
                      key={item.cartItemId}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        background: 'var(--bg-card)',
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        alignItems: 'center'
                      }}
                    >
                      <img src={item.product.image} alt={item.product.name} style={{ width: '46px', height: '46px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '800', fontSize: '13px', color: '#fff' }}>{item.product.name}</div>
                        {item.selectedUpsells.length > 0 && (
                          <div style={{ fontSize: '10px', color: 'var(--accent-primary)', marginTop: '2px' }}>
                            + {item.selectedUpsells.map(u => u.name).join(', ')}
                          </div>
                        )}
                        <div style={{ fontWeight: '800', fontSize: '13px', color: 'var(--accent-primary)', marginTop: '2px' }}>
                          {item.totalPrice} TL
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: '800', fontSize: '12px' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeItem(item.cartItemId)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', marginLeft: '4px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Cross-Sell Dessert Suggestion Banner */}
                  {!hasDessert && dessertUpsell && (
                    <div className="cross-sell-box" style={{ marginTop: '6px' }}>
                      <div className="cross-sell-title">
                        <Sparkles size={14} /> Yemeğinizi Tatlı İle Taçlandırın!
                      </div>
                      <div className="cross-sell-item-card">
                        <img src={dessertUpsell.image} alt={dessertUpsell.name} className="cross-sell-img" />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '12px' }}>{dessertUpsell.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: '700' }}>
                            {dessertUpsell.price} TL
                          </div>
                        </div>
                        <button
                          onClick={handleAddQuickDessert}
                          style={{
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          + Ekle
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Customer Note */}
                  <div style={{ marginTop: '6px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Sipariş Notu:
                    </label>
                    <textarea
                      rows={2}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="Örn: Soğansız, az acılı..."
                      style={{
                        width: '100%',
                        marginTop: '4px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        color: '#fff',
                        padding: '6px 10px',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {orderType === 'waiter' && (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <BellRing size={40} style={{ color: 'var(--accent-primary)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Garson Çağır</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                Ekip arkadaşımıza bildirim gönderilecektir.
              </p>
            </div>
          )}

          {orderType === 'bill' && (
            <div style={{ padding: '4px' }}>
              <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <Receipt size={38} style={{ color: 'var(--accent-primary)', marginBottom: '8px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Hesap İsteyin</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Ödeme yönteminizi seçin, bildirimi kasaya düşsün.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Kredi Kartı / Temassız', 'Nakit Ödeme', 'Yemek Kartı (Sodexo/Ticket)'].map((method) => (
                  <div
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: paymentMethod === method ? 'var(--accent-light)' : 'var(--bg-card)',
                      border: paymentMethod === method ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{method}</span>
                    {paymentMethod === method && <CheckCircle2 size={16} color="var(--accent-primary)" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Submit Bar */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)'
        }}>
          {orderType === 'order' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Toplam Tutar:</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--accent-primary)' }}>
                {totalCartPrice} TL
              </span>
            </div>
          )}

          <button
            disabled={orderType === 'order' && cart.length === 0}
            onClick={handleConfirmAction}
            className="add-button"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '14px',
              borderRadius: 'var(--radius-full)',
              opacity: (orderType === 'order' && cart.length === 0) ? 0.5 : 1
            }}
          >
            {orderType === 'order' && <span>Siparişi Gönder ({totalCartPrice} TL)</span>}
            {orderType === 'waiter' && <span>Garson Bildirimi Gönder</span>}
            {orderType === 'bill' && <span>Hesap İsteğini Kasaya Gönder</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
