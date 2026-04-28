import { useState } from 'react';
import { WorkBuddyAvatar, ICON_MAP } from '../icons.jsx';
import { categories } from '../data/knowledgeBase.js';

const s = {
  wrap: { padding: '48px 24px 24px', maxWidth: 760, margin: '0 auto' },
  greetingRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 34,
    fontWeight: 700,
    color: 'var(--color-dark-blue)',
    margin: 0,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: 15,
    color: 'var(--color-muted)',
    margin: '10px 0 0',
    maxWidth: 560,
    lineHeight: 1.55,
  },
  sectionLabel: {
    fontFamily: 'var(--font-heading)',
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--color-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    margin: '40px 0 14px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
  },
  card: {
    textAlign: 'left',
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    borderRadius: 12,
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },
  cardActive: {
    borderColor: 'var(--color-primary)',
    background: 'var(--color-primary-light)',
    boxShadow: '0 0 0 3px rgba(10,183,167,0.08)',
  },
  cardIcon: {
    width: 38,
    height: 38,
    background: 'var(--color-light-gray)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardIconActive: { background: '#FFFFFF' },
  cardLabel: { fontSize: 14, fontWeight: 600, color: 'var(--color-dark-blue)', lineHeight: 1.2 },
  cardSub: { fontSize: 12, color: 'var(--color-muted)', marginTop: 3, lineHeight: 1.3 },
  suggestList: { marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 },
  suggestChip: {
    textAlign: 'left',
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 14,
    color: 'var(--color-dark-blue)',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    cursor: 'pointer',
  },
  suggestArrow: { color: 'var(--color-primary)', fontWeight: 700, fontSize: 16 },
  resumeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'var(--color-primary-light)',
    border: '1px solid var(--color-primary)',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--color-dark-blue)',
    marginBottom: 24,
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
  },
};

export default function Welcome({ onPick, hasHistory, onResume }) {
  const [activeId, setActiveId] = useState(null);
  const active = categories.find((c) => c.id === activeId);

  return (
    <div style={s.wrap}>
      {hasHistory && (
        <button className="cat-chip" style={s.resumeBtn} onClick={onResume}>
          <span style={{ color: 'var(--color-primary)' }}>←</span>
          <span>Resume your conversation</span>
        </button>
      )}

      <div style={s.greetingRow}>
        <WorkBuddyAvatar size={48} />
        <div>
          <h1 className="welcome-title" style={s.title}>Hi, I'm WorkBuddy.</h1>
        </div>
      </div>

      <p style={s.subtitle}>
        Your shortcut to everything inside{' '}
        <strong style={{ color: 'var(--color-dark-blue)' }}>comparit</strong> — people, tools,
        policies, holidays, and who to ask. Ask me anything in{' '}
        <strong style={{ color: 'var(--color-dark-blue)' }}>English</strong>,{' '}
        <strong style={{ color: 'var(--color-dark-blue)' }}>Deutsch</strong>, or{' '}
        <strong style={{ color: 'var(--color-dark-blue)' }}>Shqip</strong>.
      </p>

      <div style={s.sectionLabel}>Browse by topic</div>
      <div style={s.grid}>
        {categories.map((cat) => {
          const IconCmp = ICON_MAP[cat.icon];
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              className="cat-chip"
              style={{ ...s.card, ...(isActive ? s.cardActive : {}) }}
              onClick={() => setActiveId(isActive ? null : cat.id)}
            >
              <div style={{ ...s.cardIcon, ...(isActive ? s.cardIconActive : {}) }}>
                <IconCmp size={20} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={s.cardLabel}>{cat.label}</div>
                <div style={s.cardSub}>{cat.sublabel}</div>
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div style={s.suggestList}>
          {active.suggestions.map((suggestion, i) => (
            <button
              key={i}
              className="suggest-chip"
              style={s.suggestChip}
              onClick={() => onPick(suggestion)}
            >
              <span>{suggestion}</span>
              <span style={s.suggestArrow}>→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
