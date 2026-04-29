import { useRef, useEffect } from 'react';
import { WorkBuddyAvatar } from '../icons.jsx';

const s = {
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 24px 8px',
    maxWidth: 920,
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  row: { display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-end' },
  rowUser: { justifyContent: 'flex-end' },
  bubbleAssistant: {
    background: 'var(--color-light-gray)',
    color: 'var(--color-dark-blue)',
    padding: '11px 15px',
    borderRadius: '4px 14px 14px 14px',
    maxWidth: '75%',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
  },
  bubbleUser: {
    background: 'var(--color-primary)',
    color: '#FFFFFF',
    padding: '11px 15px',
    borderRadius: '14px 4px 14px 14px',
    maxWidth: '75%',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
  },
  errorBanner: {
    background: '#FFF5E6',
    border: '1px solid #FFD89A',
    color: '#7A4A00',
    padding: '10px 14px',
    borderRadius: 10,
    fontSize: 13,
    margin: '0 0 14px',
    maxWidth: '85%',
  },
  typing: {
    background: 'var(--color-light-gray)',
    padding: '14px 18px',
    borderRadius: '4px 14px 14px 14px',
    display: 'inline-flex',
    gap: 4,
    alignItems: 'center',
  },
  followRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
    marginLeft: 40,
    marginBottom: 14,
  },
  followChip: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    color: 'var(--color-dark-blue)',
    borderRadius: 999,
    padding: '6px 12px',
    fontSize: 13,
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  followArrow: { color: 'var(--color-primary)', fontWeight: 700, fontSize: 13 },
  followIntro: {
    fontFamily: 'var(--font-heading)',
    fontSize: 10,
    fontWeight: 600,
    color: 'var(--color-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    width: '100%',
    marginBottom: 2,
  },
};

// Inline markdown: **bold**, *italic*, [text](url)
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>;
    const link = p.match(/^\[(.+)\]\((.+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{link[1]}</a>;
    return <span key={i}>{p}</span>;
  });
}

// Full markdown renderer: handles headers, bullets, numbered lists, blank lines
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip blank lines (create spacing via margin on elements instead)
    if (!trimmed) { i++; continue; }

    // ### Heading
    if (trimmed.startsWith('### ')) {
      elements.push(<div key={i} style={{ fontWeight: 700, fontSize: 14, marginTop: 10, marginBottom: 2 }}>{renderInline(trimmed.slice(4))}</div>);
      i++; continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(<div key={i} style={{ fontWeight: 700, fontSize: 15, marginTop: 10, marginBottom: 2 }}>{renderInline(trimmed.slice(3))}</div>);
      i++; continue;
    }
    if (trimmed.startsWith('# ')) {
      elements.push(<div key={i} style={{ fontWeight: 700, fontSize: 16, marginTop: 10, marginBottom: 2 }}>{renderInline(trimmed.slice(2))}</div>);
      i++; continue;
    }

    // Bullet list: -, *, •
    if (/^[-*•]\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ margin: '6px 0', paddingLeft: 18 }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: 3 }}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} style={{ margin: '6px 0', paddingLeft: 18 }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: 3 }}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Normal paragraph
    elements.push(<p key={i} style={{ margin: '4px 0' }}>{renderInline(trimmed)}</p>);
    i++;
  }

  return elements;
}

function UserAvatar() {
  return (
    <div style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--color-dark-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginBottom: 2,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill="#FFFFFF" opacity="0.9"/>
        <path d="M4 20 C4 16 7.6 13 12 13 C16.4 13 20 16 20 20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
      </svg>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  const isError = msg.error;
  return (
    <div className="msg-enter" style={{ ...s.row, ...(isUser ? s.rowUser : {}) }}>
      {!isUser && (
        <div style={{ flexShrink: 0, marginBottom: 2 }}>
          <WorkBuddyAvatar size={32} />
        </div>
      )}
      <div
        className="msg-content"
        style={isError ? s.errorBanner : isUser ? s.bubbleUser : s.bubbleAssistant}
      >
        {isUser ? renderInline(msg.content) : renderMarkdown(msg.content)}
      </div>
      {isUser && <UserAvatar />}
    </div>
  );
}

function FollowUps({ items, onPick }) {
  if (!items || !items.length) return null;
  return (
    <div className="msg-enter" style={s.followRow}>
      <div style={s.followIntro}>Suggested follow-ups</div>
      {items.map((q, i) => (
        <button key={i} className="suggest-chip" style={s.followChip} onClick={() => onPick(q)}>
          <span>{q}</span>
          <span style={s.followArrow}>→</span>
        </button>
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="msg-enter" style={s.row}>
      <div style={{ flexShrink: 0, marginBottom: 2 }}>
        <WorkBuddyAvatar size={32} />
      </div>
      <div style={s.typing}>
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export default function Messages({ messages, isTyping, onPickFollow }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.parentElement.scrollTop = endRef.current.parentElement.scrollHeight;
    }
  }, [messages.length, isTyping, messages[messages.length - 1]?.followUps]);

  let lastAssistantIdx = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'assistant' && !messages[i].error) {
      lastAssistantIdx = i;
      break;
    }
  }

  return (
    <div className="scroll" style={s.list}>
      {messages.map((m, i) => (
        <span key={i}>
          <MessageBubble msg={m} />
          {i === lastAssistantIdx && !isTyping && (
            <FollowUps items={m.followUps} onPick={onPickFollow} />
          )}
        </span>
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} style={{ height: 1 }} />
    </div>
  );
}
