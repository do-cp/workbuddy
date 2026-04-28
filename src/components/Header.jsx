import { ShieldLogo, NewChatIcon } from '../icons.jsx';

const s = {
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: '#FFFFFF',
    borderBottom: '1px solid var(--color-border)',
    boxShadow: '0 1px 0 rgba(12,14,22,0.02)',
  },
  inner: {
    maxWidth: 920,
    margin: '0 auto',
    height: 64,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { display: 'flex', alignItems: 'center', gap: 14 },
  brandStack: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 14,
    borderLeft: '1px solid var(--color-border)',
  },
  productName: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: 17,
    color: 'var(--color-dark-blue)',
    letterSpacing: '-0.01em',
    lineHeight: 1,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: 'var(--color-muted)',
    marginTop: 4,
    fontWeight: 500,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--color-primary)',
    flexShrink: 0,
  },
  newBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'transparent',
    border: '1px solid var(--color-border)',
    color: 'var(--color-dark-blue)',
    padding: '8px 14px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default function Header({ onNewChat, hasMessages }) {
  return (
    <header style={s.bar}>
      <div className="header-inner" style={s.inner}>
        <div style={s.left}>
          <ShieldLogo size={36} />
          <div style={s.brandStack}>
            <div>
              <div style={s.productName}>WorkBuddy</div>
              <div style={s.status}>
                <span className="online-dot" style={s.dot} />
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
        {hasMessages && (
          <button className="cat-chip" style={s.newBtn} onClick={onNewChat} title="Start a new chat">
            <NewChatIcon size={16} />
            <span>New chat</span>
          </button>
        )}
      </div>
    </header>
  );
}
