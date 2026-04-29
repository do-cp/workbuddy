import { useState } from 'react';
import { people, wisotechPeople } from '../data/knowledgeBase.js';

// ── i18n ──────────────────────────────────────────────────────────────────────
function getLang() {
  const l = navigator.language?.toLowerCase() || '';
  if (l.startsWith('sq')) return 'sq';
  if (l.startsWith('de')) return 'de';
  return 'en';
}
const SEARCH_PH = { en: 'Search by name, role, team or location…', de: 'Suche nach Name, Rolle, Team oder Standort…', sq: 'Kërko sipas emrit, rolit, ekipit ose vendndodhjes…' };
const COPIED_LABEL = { en: 'Copied!', de: 'Kopiert!', sq: 'Kopjuar!' };

// ── Colour palette per team ───────────────────────────────────────────────────
const TEAM_META = {
  Management:         { label: 'Management',         color: '#1B1C50', bg: '#E8F0FF', border: '#C5D4F8' },
  Development:        { label: 'Development',         color: '#6B21A8', bg: '#F3E8FF', border: '#D8B4FE' },
  Integrations:       { label: 'Integrations',        color: '#92400E', bg: '#FEF3C7', border: '#FCD34D' },
  'Business Analysis':{ label: 'Business Analysis',   color: '#065F46', bg: '#D1FAE5', border: '#6EE7B7' },
  'Sales & Marketing':{ label: 'Sales & Marketing',   color: '#9F1239', bg: '#FFE4E6', border: '#FDA4AF' },
};

const LEADERSHIP_ROLES = ['CEO', 'COO', 'CTO', 'CPO', 'CMO', 'CSO', 'CPMO'];

function locationFlag(office) {
  if (!office) return '';
  if (office.includes('Prishtina') || office.includes('Kosovo')) return '🇽🇰';
  return '🇩🇪';
}

function locationLabel(office) {
  if (!office) return '';
  if (office.startsWith('Remote')) return `Remote · ${office.replace('Remote (', '').replace(')', '').replace('Remote ', '')}`;
  return office;
}

// ── Person card ───────────────────────────────────────────────────────────────
function PersonCard({ person, isLeader = false, compact = false }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const lang = getLang();

  function copyEmail(e) {
    e.stopPropagation();
    if (!person.email) return;
    navigator.clipboard.writeText(person.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  const teamMeta = TEAM_META[person.team] || TEAM_META.Management;

  const card = {
    background: '#FFFFFF',
    border: `1px solid ${expanded ? teamMeta.border : 'var(--color-border)'}`,
    borderRadius: isLeader ? 14 : 10,
    padding: isLeader ? '16px 20px' : compact ? '10px 12px' : '12px 14px',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    boxShadow: expanded ? `0 0 0 3px ${teamMeta.border}40` : 'var(--shadow-sm)',
    textAlign: 'left',
    width: '100%',
    fontFamily: 'var(--font-body)',
  };

  return (
    <button style={card} onClick={() => setExpanded((v) => !v)}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        {/* Avatar initials */}
        <div style={{
          width: isLeader ? 42 : 32,
          height: isLeader ? 42 : 32,
          borderRadius: '50%',
          background: teamMeta.bg,
          border: `2px solid ${teamMeta.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isLeader ? 14 : 11,
          fontWeight: 700,
          color: teamMeta.color,
          flexShrink: 0,
          letterSpacing: '-0.01em',
        }}>
          {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontWeight: 700,
            fontSize: isLeader ? 14 : compact ? 12 : 13,
            color: 'var(--color-dark-blue)',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {person.name}
          </div>
          <div style={{
            fontSize: isLeader ? 12 : compact ? 11 : 11,
            color: 'var(--color-muted)',
            marginTop: 2,
            lineHeight: 1.3,
          }}>
            {person.role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 12 }}>{locationFlag(person.office)}</span>
            <span style={{ fontSize: 11, color: 'var(--color-muted)' }}>{locationLabel(person.office)}</span>
          </div>
        </div>

        <span style={{
          fontSize: 12,
          color: 'var(--color-primary)',
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 2,
        }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: `1px solid ${teamMeta.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {person.email && (
            <div style={{ fontSize: 12, color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              ✉️ <span style={{ color: 'var(--color-dark-blue)', fontWeight: 500 }}>{person.email}</span>
              <button
                onClick={copyEmail}
                title="Copy email"
                style={{
                  background: copied ? '#D1FAE5' : 'var(--color-light-gray)',
                  border: 'none', borderRadius: 4, padding: '2px 6px',
                  fontSize: 10, cursor: 'pointer', fontWeight: 600,
                  color: copied ? '#065F46' : 'var(--color-muted)',
                  flexShrink: 0,
                }}
              >
                {copied ? COPIED_LABEL[lang] : '⎘ Copy'}
              </button>
            </div>
          )}
          {!person.email && (
            <div style={{ fontSize: 12, color: 'var(--color-muted)', fontStyle: 'italic' }}>
              No email listed
            </div>
          )}
          {person.languages?.length > 0 && (
            <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>
              🗣️ {person.languages.join(', ')}
            </div>
          )}
          {person.team && (
            <div style={{ marginTop: 4 }}>
              <span style={{
                display: 'inline-block',
                background: teamMeta.bg,
                color: teamMeta.color,
                border: `1px solid ${teamMeta.border}`,
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 600,
              }}>
                {TEAM_META[person.team]?.label || person.team}
              </span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

// ── Team section ──────────────────────────────────────────────────────────────
function TeamSection({ teamName, members }) {
  const [collapsed, setCollapsed] = useState(false);
  const meta = TEAM_META[teamName] || TEAM_META.Management;

  return (
    <div style={{ marginBottom: 24 }}>
      <button
        onClick={() => setCollapsed(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: meta.bg,
          border: `1px solid ${meta.border}`,
          borderRadius: 10,
          padding: '8px 14px',
          marginBottom: collapsed ? 0 : 12,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: meta.color, flexShrink: 0,
        }} />
        <span style={{
          fontWeight: 700, fontSize: 13,
          color: meta.color, flex: 1,
          fontFamily: 'var(--font-heading)',
        }}>
          {meta.label}
        </span>
        <span style={{ fontSize: 12, color: meta.color, opacity: 0.7, fontWeight: 600 }}>
          {members.length} people
        </span>
        <span style={{ fontSize: 11, color: meta.color, fontWeight: 700 }}>
          {collapsed ? '▶' : '▼'}
        </span>
      </button>

      {!collapsed && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 8,
        }}>
          {members.map((p) => (
            <PersonCard key={p.email || p.name} person={p} compact />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Company selector tab ──────────────────────────────────────────────────────
function CompanyTab({ label, logo, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 16px',
        background: active ? '#FFFFFF' : 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
        cursor: 'pointer',
        fontFamily: 'var(--font-heading)',
        fontWeight: active ? 700 : 500,
        fontSize: 14,
        color: active ? 'var(--color-dark-blue)' : 'var(--color-muted)',
        transition: 'all 0.15s',
      }}
    >
      {logo && (
        <img src={logo} alt="" height={20} style={{ objectFit: 'contain', display: 'block' }} />
      )}
      {label}
    </button>
  );
}

// ── Main OrgChart component ───────────────────────────────────────────────────
export default function OrgChart({ onClose }) {
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('cpit'); // 'cpit' | 'wisotech'
  const lang = getLang();

  const activepeople = company === 'cpit' ? people : wisotechPeople;

  const leaders = activepeople.filter(p => LEADERSHIP_ROLES.includes(p.role));
  const nonLeaders = activepeople.filter(p => !LEADERSHIP_ROLES.includes(p.role));

  const teamOrder = company === 'cpit'
    ? ['Development', 'Business Analysis', 'Integrations', 'Sales & Marketing', 'Management']
    : ['Development', 'Management'];

  // Filter by search
  const filtered = search.trim()
    ? activepeople.filter(p =>
        `${p.name} ${p.role} ${p.team} ${p.office} ${p.languages?.join(' ')}`.toLowerCase()
          .includes(search.toLowerCase())
      )
    : null;

  // Group non-leaders by team
  const byTeam = teamOrder.reduce((acc, t) => {
    const members = nonLeaders.filter(p => p.team === t);
    if (members.length) acc[t] = members;
    return acc;
  }, {});

  const titles = {
    cpit: { en: 'comparit Org Chart', de: 'comparit Organigramm', sq: 'Organigrami i comparit' },
    wisotech: { en: 'wisoTech Org Chart', de: 'wisoTech Organigramm', sq: 'Organigrami i wisoTech' },
  };
  const subtitles = {
    en: 'people · Click any card to see contact details',
    de: 'Personen · Auf eine Karte klicken für Details',
    sq: 'persona · Kliko çdo kartë për detaje',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(12,14,22,0.55)',
      display: 'flex', alignItems: 'stretch',
    }}>
      {/* Panel */}
      <div style={{
        background: 'var(--color-bg)',
        width: '100%',
        maxWidth: 960,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>🏢</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700, fontSize: 17,
                color: 'var(--color-dark-blue)',
              }}>
                {titles[company][lang]}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                {activepeople.length} {subtitles[lang]}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-light-gray)',
              border: 'none',
              borderRadius: 8,
              width: 36, height: 36,
              fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-dark-blue)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Company selector tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-light-gray)',
          flexShrink: 0,
        }}>
          <CompanyTab
            label="CPIT comparit"
            logo="/assets/cpit-logo-dark.png"
            active={company === 'cpit'}
            onClick={() => { setCompany('cpit'); setSearch(''); }}
          />
          <CompanyTab
            label="wisoTech"
            active={company === 'wisotech'}
            onClick={() => { setCompany('wisotech'); setSearch(''); }}
          />
        </div>

        {/* Search bar */}
        <div style={{ padding: '14px 24px 0', flexShrink: 0 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={SEARCH_PH[lang]}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              background: '#FFFFFF',
              color: 'var(--color-dark-blue)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Scrollable content */}
        <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 40px' }}>

          {/* Search results */}
          {filtered ? (
            <div>
              <div style={{
                fontSize: 12, fontWeight: 600, color: 'var(--color-muted)',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12,
              }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 8,
              }}>
                {filtered.map(p => <PersonCard key={p.email || p.name} person={p} />)}
              </div>
            </div>
          ) : (
            <>
              {/* Leadership row */}
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--color-muted)',
                textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
                fontFamily: 'var(--font-heading)',
              }}>
                Leadership
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 10,
                marginBottom: 32,
                paddingBottom: 28,
                borderBottom: '1px solid var(--color-border)',
              }}>
                {leaders.map(p => <PersonCard key={p.email || p.name} person={p} isLeader />)}
              </div>

              {/* Teams */}
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--color-muted)',
                textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16,
                fontFamily: 'var(--font-heading)',
              }}>
                Teams
              </div>
              {Object.entries(byTeam).map(([team, members]) => (
                <TeamSection key={team} teamName={team} members={members} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
