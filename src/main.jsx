import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Auto-cleanup legacy or corrupt storage keys on application launch
try {
  const prodKey = localStorage.getItem('gediz_tantuni_products');
  if (prodKey) {
    const parsed = JSON.parse(prodKey);
    if (!Array.isArray(parsed) || (parsed.length > 0 && !parsed[0].id)) {
      localStorage.removeItem('gediz_tantuni_products');
    }
  }
} catch (e) {
  localStorage.clear();
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React Error:", error, errorInfo);
    // Auto purge local storage to self-heal
    try {
      localStorage.clear();
    } catch (e) {}
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#0a0a0c',
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: '#ff7a00' }}>
            Gediz Tantuni Menü
          </h2>
          <p style={{ color: '#9e9ea7', fontSize: '13px', maxWidth: '340px', marginBottom: '20px' }}>
            {this.state.error?.message || 'Sayfa yüklendi.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(135deg, #ff7a00, #e66000)',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Menüyü Başlat ve Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
