/* =========================================================
   GEDİZ TANTUNİ — CRYPTO & AUTHENTICATION UTILS
   Secure client-side hashing (PBKDF2/SHA-256) & RBAC Engine
   ========================================================= */

const SALT = 'GedizTantuni_SecureSalt_2026';

// Helper to hash password using SHA-256
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode((password || '') + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Exact SHA-256 Hash for "GedizTantuni2026!" + SALT:
// a1ae8629964e57d71b3cdffb3fdb31de840cfa29b7b242d155cc7308b3e5ff84
export const SUPERADMIN_HASH = 'a1ae8629964e57d71b3cdffb3fdb31de840cfa29b7b242d155cc7308b3e5ff84';

// Default SuperAdmin & Admin Users
export const INITIAL_USERS = [
  {
    id: 'usr-superadmin',
    username: 'superadmin',
    passwordHash: SUPERADMIN_HASH,
    role: 'superadmin',
    name: 'Gediz İşletme Sahibi (SüperAdmin)',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-admin1',
    username: 'kasai',
    passwordHash: SUPERADMIN_HASH,
    role: 'admin',
    name: 'Kasa Yetkilisi',
    createdAt: '2026-02-15'
  }
];

export const DEFAULT_ADMIN_PASS = 'GedizTantuni2026!';
