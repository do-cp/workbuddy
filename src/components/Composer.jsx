import { useState, useRef, useCallback, useEffect } from 'react';
import { SendIcon } from '../icons.jsx';

const s = {
  wrap: {
    borderTop: '1px solid var(--color-border)',
    background: '#FFFFFF',
    padding: '16px 24px 12px',
  },
  inner: { maxWidth: 920, margin: '0 auto' },
  inputRow: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-end',
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 14,
    padding: '10px 10px 10px 16px',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  inputRowFocus: {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 3px rgba(10,183,167,0.12)',
  },
  textarea: {
    flex: 1,
    border: 'none',
    outline: 'none',
    resize: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--color-dark-blue)',
    background: 'transparent',
    lineHeight: 1.45,
    minHeight: 24,
    maxHeight: 160,
    padding: '4px 0',
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: 'var(--color-primary)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontFamily: 'var(--font-body)',
  },
  backBtn: {
    alignSelf: 'stretch',
    minHeight: 48,
    width: 48,
    borderRadius: 14,
    background: '#FFFFFF',
    border: '1.5px solid var(--color-primary)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  },
};

export default function Composer({ onSend, disabled, showBack, onBack }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const taRef = useRef(null);

  const autoSize = useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, []);

  useEffect(() => { autoSize(); }, [value, autoSize]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div style={s.wrap}>
      <div style={s.inner}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to topics"
              title="Back to topics"
              style={s.backBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary-light)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <path d="M14 6 L8 12 L14 18" stroke="#0AB7A7" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter"/>
                <path d="M8 12 L20 12" stroke="#0AB7A7" strokeWidth="2.2" strokeLinecap="square"/>
              </svg>
            </button>
          )}
          <div style={{ ...s.inputRow, ...(focused ? s.inputRowFocus : {}), flex: 1 }}>
            <textarea
              ref={taRef}
              style={s.textarea}
              placeholder="Ask WorkBuddy anything… e.g. 'Who works on cpit.SIGN?'"
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
            />
            <button
              className="send-btn"
              style={s.sendBtn}
              onClick={submit}
              disabled={disabled || !value.trim()}
              aria-label="Send message"
            >
              <SendIcon size={18} />
            </button>
          </div>
        </div>
        <div style={s.disclaimer}>
          <span style={{ color: 'var(--color-dark-blue)', fontWeight: 600 }}>WorkBuddy</span> uses
          AI. Always verify important details with HR. · Made with{' '}
          <span style={{ color: '#E25555' }}>♥</span>
        </div>
      </div>
    </div>
  );
}
