import React from 'react';
import { X, ShieldCheck, Scale, QrCode, FileText, CheckCircle2, Award } from 'lucide-react';
import { generateQRCodeSVG } from '../utils/qrGenerator';

export default function LegalComplianceModal({ isOpen, onClose, legalConfig }) {
  if (!isOpen) return null;

  const {
    officialQrUrl = 'https://guvenilirgida.tarimorman.gov.tr/isletme/QRKodOlustur',
    businessRegistrationNo = 'TR-35-K-019482',
    legalNoticeText = 'Bu bilgilere karekod ile ulaşabilirsiniz. Karekod kullanamayan tüketiciler talep ederse fiyat listesi, kalori ve gıda içerik/alerjen bilgileri fiziki olarak kendilerine ayrıca sunulur.',
    halalCertNo = 'GIMDES-HELAL-2026-894',
    daraNoticeText = 'Açıkta ve tüketici huzurunda tartılarak satılan ürünlerde ambalaj ağırlığı (dara) zorunlu olarak düşülmektedir.'
  } = legalConfig || {};

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '580px', padding: '0', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff7a00, #ff9d26)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>T.C. Resmi Mevzuat & Gıda Güvenliği Beyanı</h3>
              <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: '700' }}>
                Tarım ve Orman Bakanlığı & Ticaret Bakanlığı Uyumlu
              </div>
            </div>
          </div>
          <button className="modal-header-close" style={{ position: 'static' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', maxHeight: '78vh', overflowY: 'auto' }}>
          
          {/* Section 1: Official Ministry QR */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <QrCode size={16} /> T.C. Tarım ve Orman Bakanlığı Güvenilir Gıda İşletmesi Karekodu
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              28 Temmuz 2025 Tarihli Resmi Kontrol Yönetmeliği Uyarınca İşletmemizin Resmi Denetim Durumu:
            </p>

            <div style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '12px',
              display: 'inline-block',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              border: '2px solid #ff7a00'
            }}>
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: generateQRCodeSVG(officialQrUrl, 160) 
                }} 
              />
              <div style={{ color: '#000', fontWeight: '900', fontSize: '12px', marginTop: '6px' }}>
                GIDA İŞLETMESİ KAREKODU
              </div>
            </div>

            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>
              İşletme Kayıt / Sicil No: <strong>{businessRegistrationNo}</strong>
            </div>
          </div>

          {/* Section 2: Mandatory Legal Notice (Tarım ve Ticaret Bakanlığı) */}
          <div style={{
            background: 'rgba(255, 122, 0, 0.1)',
            border: '1px solid rgba(255, 122, 0, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: '14px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#ff9d26', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={15} /> Zorunlu Yasal Uyarı Metni (Fiyat Etiketi Yönetmeliği)
            </div>
            <p style={{ fontSize: '11px', color: '#fff', lineHeight: '1.4', fontWeight: '600' }}>
              "{legalNoticeText}"
            </p>
          </div>

          {/* Section 3: Open Product Net Weight (Dara) Regulation */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: '14px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={15} style={{ color: 'var(--accent-primary)' }} /> Açıkta Satılan Ürünlerde Dara Düşme Bildirimi
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              {daraNoticeText}
            </p>
          </div>

          {/* Section 4: Certifications & Food Safety Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} style={{ color: 'var(--success)' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#fff' }}>%100 Helal Kesim</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Sertifika: {halalCertNo}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#fff' }}>Gıda Güvenliği</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Düzenli Bakanlık Kontrolü</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
          <button onClick={onClose} className="add-button cta-glowing-btn" style={{ padding: '6px 18px', fontSize: '12px' }}>
            Anladım / Kapat
          </button>
        </div>

      </div>
    </div>
  );
}
