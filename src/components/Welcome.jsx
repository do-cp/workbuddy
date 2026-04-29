import { useState } from 'react';
import { WorkBuddyAvatar } from '../icons.jsx';
import { categories } from '../data/knowledgeBase.js';

// ── i18n translations ─────────────────────────────────────────────────────────
const UI = {
  en: {
    title: "Hi, I'm your WorkBuddy.",
    subtitle: 'Your shortcut to everything inside comparit — people, tools, policies, holidays, and who to ask.',
    subtitleLangs: 'Ask me anything in English, Deutsch, or Shqip.',
    browse: 'Browse by topic',
    resume: '← Resume your conversation',
    categories: {
      people:    { label: 'People & Teams',       sublabel: 'Find who works on what' },
      it:        { label: 'IT & Tools',            sublabel: 'Tools, access, setup' },
      leave:     { label: 'Leave & Absence',       sublabel: 'Vacation, sick days, policy' },
      schedule:  { label: 'Schedules & Rhythm',    sublabel: 'Standups, sprints, all-hands' },
      office:    { label: 'Office & Operations',   sublabel: 'Hamburg, Prishtina, remote' },
      glossary:  { label: 'Glossary',              sublabel: 'Abbreviations & insurance terms' },
      news:      { label: 'News & Updates',        sublabel: "Announcements, what's new" },
      workflows: { label: 'Workflows',             sublabel: 'Processes & step-by-step guides' },
    },
  },
  de: {
    title: 'Hallo, ich bin dein WorkBuddy.',
    subtitle: 'Dein Shortcut zu allem bei comparit — Personen, Tools, Richtlinien, Feiertage und wer zuständig ist.',
    subtitleLangs: 'Stell mir Fragen auf Englisch, Deutsch oder Albanisch.',
    browse: 'Nach Thema suchen',
    resume: '← Gespräch fortsetzen',
    categories: {
      people:    { label: 'Personen & Teams',      sublabel: 'Wer arbeitet woran' },
      it:        { label: 'IT & Tools',            sublabel: 'Tools, Zugang, Einrichtung' },
      leave:     { label: 'Urlaub & Abwesenheit',  sublabel: 'Urlaub, Kranktage, Richtlinien' },
      schedule:  { label: 'Meetings & Rhythmus',   sublabel: 'Standups, Sprints, All-Hands' },
      office:    { label: 'Büro & Betrieb',        sublabel: 'Hamburg, Prishtina, Remote' },
      glossary:  { label: 'Glossar',               sublabel: 'Abkürzungen & Versicherungsbegriffe' },
      news:      { label: 'News & Updates',        sublabel: 'Ankündigungen, Neuigkeiten' },
      workflows: { label: 'Arbeitsabläufe',        sublabel: 'Prozesse & Schritt-für-Schritt' },
    },
  },
};

const s = {
  wrap: { padding: '48px 24px 24px', maxWidth: 760, margin: '0 auto' },
  topRow: { display: 'flex', justifyContent: 'flex-end', marginBottom: 16 },
  langToggle: {
    display: 'flex',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#FFFFFF',
  },
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
  const [lang, setLang] = useState(() => {
    const l = navigator.language?.toLowerCase() || '';
    return l.startsWith('de') ? 'de' : 'en';
  });

  const t = UI[lang];
  const active = categories.find((c) => c.id === activeId);

  function LangBtn({ code, label }) {
    const isActive = lang === code;
    return (
      <button
        onClick={() => setLang(code)}
        style={{
          padding: '5px 12px',
          border: 'none',
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color: isActive ? '#FFFFFF' : 'var(--color-muted)',
          fontWeight: isActive ? 700 : 500,
          fontSize: 12,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'all 0.15s',
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <div style={s.wrap}>
      {/* Language toggle */}
      <div style={s.topRow}>
        <div style={s.langToggle}>
          <LangBtn code="en" label="EN" />
          <LangBtn code="de" label="DE" />
        </div>
      </div>

      {hasHistory && (
        <button className="cat-chip" style={s.resumeBtn} onClick={onResume}>
          {t.resume}
        </button>
      )}

      <div style={s.greetingRow}>
        <WorkBuddyAvatar size={48} />
        <div>
          <h1 className="welcome-title" style={s.title}>{t.title}</h1>
        </div>
      </div>

      <p style={s.subtitle}>
        {t.subtitle}{' '}
        <span style={{ color: 'var(--color-dark-blue)', fontWeight: 600 }}>{t.subtitleLangs}</span>
      </p>

      <div style={s.sectionLabel}>{t.browse}</div>
      <div style={s.grid}>
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          const catT = t.categories[cat.id] || { label: cat.label, sublabel: cat.sublabel };
          return (
            <button
              key={cat.id}
              className="cat-chip"
              style={{ ...s.card, ...(isActive ? s.cardActive : {}) }}
              onClick={() => setActiveId(isActive ? null : cat.id)}
            >
              <div style={{ ...s.cardIcon, background: cat.iconBg }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{cat.emoji}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={s.cardLabel}>{catT.label}</div>
                <div style={s.cardSub}>{catT.sublabel}</div>
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
