import React from 'react';
import { Search, Shield, X, Phone, ShieldCheck } from 'lucide-react';

export default function Header({ searchQuery = '', setSearchQuery, onOpenAdmin, onOpenLegal, legalConfig }) {
  return (
    <header className="hero-header">
      <div className="container">
        {/* Top Navbar */}
        <div className="hero-top-nav">
          <div className="brand-badge">
            <div className="brand-logo-icon">G</div>
            <div className="brand-name">
              GEDİZ <span>TANTUNİ</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {/* Legal Compliance & Ministry QR Button (Only rendered if legalConfig.enabled is true) */}
            {legalConfig?.enabled && (
              <button 
                className="header-action-btn" 
                onClick={() => onOpenLegal && onOpenLegal()}
                title="T.C. Resmi Mevzuat & Bakanlık Karekodu"
                style={{ border: '1px solid var(--border-accent)', background: 'rgba(255, 122, 0, 0.15)', color: '#ff9d26' }}
              >
                <ShieldCheck size={13} />
                <span>Mevzuat QR</span>
              </button>
            )}

            <a 
              href="tel:05388630050" 
              className="header-action-btn"
              title="Sipariş Telefonu"
              style={{ textDecoration: 'none' }}
            >
              <Phone size={13} color="var(--accent-primary)" />
              <span>Ara</span>
            </a>

            <button className="header-action-btn" onClick={() => onOpenAdmin && onOpenAdmin()} title="Yönetim Paneli">
              <Shield size={13} />
              <span>Yönetim</span>
            </button>
          </div>
        </div>

        {/* Realtime Search Bar */}
        <div className="search-wrapper">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Lezzet ara... (Tavuk, Et, Sushi, Şalgam)" 
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery && setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
