import React from 'react';
import { CheckCircle2, Clock, X } from 'lucide-react';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center', padding: '24px 18px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-header-close" onClick={onClose}>
          <X size={16} />
        </button>

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(46, 204, 113, 0.15)',
          border: '2px solid var(--success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px auto',
          color: 'var(--success)'
        }}>
          <CheckCircle2 size={32} />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#fff' }}>
          {order.type === 'order' && 'Siparişiniz İletildi!'}
          {order.type === 'waiter' && 'Garson Bildirimi Gönderildi!'}
          {order.type === 'bill' && 'Hesap İsteğiniz Alındı!'}
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
          {order.timestamp}
        </p>

        {order.type === 'order' && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginTop: '16px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontWeight: '700', fontSize: '12px', marginBottom: '8px' }}>
              <Clock size={14} /> Tahmini Hazırlanma Süresi: 8-12 Dakika
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>{item.quantity}x {item.product.name}</span>
                  <span style={{ fontWeight: '700', color: '#fff' }}>{item.totalPrice} TL</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', marginTop: '8px', paddingTop: '8px', fontWeight: '900', fontSize: '15px', color: 'var(--accent-primary)' }}>
              <span>Toplam:</span>
              <span>{order.total} TL</span>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="add-button" 
          style={{ width: '100%', justifyContent: 'center', marginTop: '18px', padding: '10px', fontSize: '13px' }}
        >
          Tamamdır
        </button>
      </div>
    </div>
  );
}
