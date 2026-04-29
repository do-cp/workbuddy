import { useState } from 'react';
import { ShieldLogo } from '../icons.jsx';

const PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'workbuddy2026';
const SESSION_KEY = 'workbuddy_auth';

export function isUnlocked() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      window.location.reload();
    } else {
      setError('Wrong password — try again.');
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div style={s.overlay}>
      <div style={{ ...s.card, animation: shake ? 'shake 0.5s ease' : 'none' }}>
        {/* Logo */}
        <div style={s.logoRow}>
          <ShieldLogo size={44} />
          <div>
            <div style={s.brand}>WorkBuddy</div>
            <div style={s.sub}>comparit internal assistant</div>
          </div>
        </div>

        <p style={s.prompt}>Enter the demo password to continue</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(''); }}
            placeholder="Password"
            autoFocus
            style={{ ...s.input, borderColor: error ? '#E5534B' : 'var(--color-border)' }}
          />
          {error && <p style={s.errorMsg}>{error}</p>}
          <button type="submit" style={s.btn} disabled={!value}>
            Unlock →
          </button>
        </form>

        <p style={s.hint}>
          Ask the presenter for the password.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-10px); }
          40%      { transform: translateX(10px); }
          60%      { transform: translateX(-8px); }
          80%      { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'var(--color-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 999,
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    borderRadius: 20,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 380,
    boxShadow: '0 4px 24px rgba(12,14,22,0.08)',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 28,
  },
  brand: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: 22,
    color: 'var(--color-dark-blue)',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  },
  sub: {
    fontSize: 12,
    color: 'var(--color-muted)',
    marginTop: 4,
    fontWeight: 500,
  },
  prompt: {
    fontSize: 15,
    color: 'var(--color-dark-blue)',
    fontWeight: 600,
    margin: '0 0 16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: 15,
    border: '1px solid var(--color-border)',
    borderRadius: 10,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    boxSizing: 'border-box',
    color: 'var(--color-dark-blue)',
    background: '#FAFAFA',
    transition: 'border-color 0.15s',
  },
  errorMsg: {
    margin: 0,
    fontSize: 13,
    color: '#E5534B',
    fontWeight: 500,
  },
  btn: {
    background: 'var(--color-primary)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 10,
    padding: '12px 0',
    fontSize: 15,
    fontWeight: 700,
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    marginTop: 4,
    opacity: 1,
    transition: 'opacity 0.15s',
  },
  hint: {
    marginTop: 20,
    fontSize: 12,
    color: 'var(--color-muted)',
    textAlign: 'center',
  },
};
