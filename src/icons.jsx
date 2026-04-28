const Icon = ({ children, size = 24, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', ...style }}
  >
    {children}
  </svg>
);

export const ShieldLogo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path d="M52 8 L92 16 L92 50 L52 50 Z" fill="#0AB7A7" />
    <path d="M48 36 L48 92 A44 44 0 0 1 4 48 L8 48 L8 36 Z" fill="#1B1C50" />
  </svg>
);

export const PeopleIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <rect x="3" y="9" width="6" height="6" stroke="#1B1C50" strokeWidth="1.8"/>
    <rect x="15" y="9" width="6" height="6" stroke="#0AB7A7" strokeWidth="1.8"/>
    <path d="M2 21 L2 18 L10 18 L10 21" stroke="#1B1C50" strokeWidth="1.8" strokeLinecap="square"/>
    <path d="M14 21 L14 18 L22 18 L22 21" stroke="#0AB7A7" strokeWidth="1.8" strokeLinecap="square"/>
  </Icon>
);

export const ToolsIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <rect x="3" y="4" width="18" height="13" stroke="#1B1C50" strokeWidth="1.8"/>
    <path d="M3 8 L21 8" stroke="#1B1C50" strokeWidth="1.8"/>
    <rect x="6" y="5" width="2" height="2" fill="#0AB7A7"/>
    <path d="M8 21 L16 21 M12 17 L12 21" stroke="#1B1C50" strokeWidth="1.8" strokeLinecap="square"/>
  </Icon>
);

export const CalendarIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="16" stroke="#1B1C50" strokeWidth="1.8"/>
    <path d="M3 10 L21 10" stroke="#1B1C50" strokeWidth="1.8"/>
    <path d="M8 3 L8 7 M16 3 L16 7" stroke="#1B1C50" strokeWidth="1.8" strokeLinecap="square"/>
    <rect x="14" y="13" width="4" height="4" fill="#0AB7A7"/>
  </Icon>
);

export const ClockIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <rect x="3" y="3" width="18" height="18" stroke="#1B1C50" strokeWidth="1.8"/>
    <path d="M12 7 L12 12 L16 12" stroke="#0AB7A7" strokeWidth="2" strokeLinecap="square"/>
  </Icon>
);

export const PhoneIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <path d="M4 4 L9 4 L11 9 L8 11 C9.5 14 10 14.5 13 16 L15 13 L20 15 L20 20 C20 20 12 21 7 16 C2 11 4 4 4 4 Z" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <rect x="16" y="4" width="4" height="4" fill="#0AB7A7"/>
  </Icon>
);

export const DocIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <path d="M5 3 L15 3 L20 8 L20 21 L5 21 Z" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <path d="M15 3 L15 8 L20 8" stroke="#1B1C50" strokeWidth="1.8"/>
    <path d="M8 13 L16 13 M8 17 L13 17" stroke="#0AB7A7" strokeWidth="1.8" strokeLinecap="square"/>
  </Icon>
);

export const SendIcon = ({ size = 18 }) => (
  <Icon size={size}>
    <path d="M3 12 L21 4 L17 21 L11 13 L3 12 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="miter"/>
  </Icon>
);

export const NewChatIcon = ({ size = 18 }) => (
  <Icon size={size}>
    <rect x="4" y="4" width="16" height="16" stroke="#1B1C50" strokeWidth="1.8"/>
    <path d="M12 8 L12 16 M8 12 L16 12" stroke="#0AB7A7" strokeWidth="1.8" strokeLinecap="square"/>
  </Icon>
);

export const WorkBuddyAvatar = ({ size = 30 }) => {
  const TAN = '#D4A574';
  const TAN_DARK = '#A8763E';
  const BLACK = '#1A1A1A';
  const CREAM = '#F2DEB8';
  const GREEN = '#0AB7A7';
  const GREEN_DARK = '#089487';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <circle cx="50" cy="50" r="50" fill="#E6F7F5" />
      <path d="M24 30 L28 12 L40 26 Z" fill={TAN} stroke={BLACK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M27 19 L28 12 L33 18 Z" fill={BLACK} />
      <path d="M76 30 L72 12 L60 26 Z" fill={TAN} stroke={BLACK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M73 19 L72 12 L67 18 Z" fill={BLACK} />
      <path d="M30 27 L32 19 L36 26 Z" fill={TAN_DARK} opacity="0.7" />
      <path d="M70 27 L68 19 L64 26 Z" fill={TAN_DARK} opacity="0.7" />
      <path d="M28 38 Q28 24 50 24 Q72 24 72 38 L72 58 Q72 66 64 70 L36 70 Q28 66 28 58 Z" fill={TAN} stroke={BLACK} strokeWidth="1.8" />
      <path d="M30 42 Q30 30 38 28 L42 36 L40 46 Q34 46 30 44 Z" fill={BLACK} opacity="0.85" />
      <path d="M70 42 Q70 30 62 28 L58 36 L60 46 Q66 46 70 44 Z" fill={BLACK} opacity="0.85" />
      <path d="M46 28 Q50 36 54 28 L52 42 L48 42 Z" fill={BLACK} opacity="0.7" />
      <path d="M40 56 Q40 76 50 80 Q60 76 60 56 Z" fill={CREAM} stroke={BLACK} strokeWidth="1.5" />
      <path d="M46 62 Q50 60 54 62 Q54 67 50 68 Q46 67 46 62 Z" fill={BLACK} />
      <ellipse cx="48" cy="63.5" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.7" />
      <line x1="50" y1="68" x2="50" y2="73" stroke={BLACK} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M44 73 Q50 78 56 73" fill="none" stroke={BLACK} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="50" cy="76" rx="2" ry="1.2" fill="#E89AA8" />
      <rect x="48" y="44" width="4" height="2" fill={BLACK} />
      <rect x="32" y="40" width="17" height="11" rx="2.5" fill={BLACK} stroke={GREEN} strokeWidth="1.3" />
      <rect x="51" y="40" width="17" height="11" rx="2.5" fill={BLACK} stroke={GREEN} strokeWidth="1.3" />
      <rect x="34" y="42" width="5" height="1.5" fill={GREEN} opacity="0.95" />
      <rect x="53" y="42" width="5" height="1.5" fill={GREEN} opacity="0.95" />
      <rect x="42" y="47" width="2.5" height="1.2" fill="#FFFFFF" opacity="0.7" />
      <rect x="61" y="47" width="2.5" height="1.2" fill="#FFFFFF" opacity="0.7" />
      <rect x="28" y="44" width="4" height="1.8" fill={BLACK} />
      <rect x="68" y="44" width="4" height="1.8" fill={BLACK} />
      <rect x="46" y="82" width="8" height="8" rx="1.5" fill={GREEN_DARK} />
      <path d="M46 83 L34 79 Q32 86 34 93 L46 89 Z" fill={GREEN} stroke={GREEN_DARK} strokeWidth="1" />
      <path d="M54 83 L66 79 Q68 86 66 93 L54 89 Z" fill={GREEN} stroke={GREEN_DARK} strokeWidth="1" />
      <rect x="47" y="83.5" width="2" height="5" fill={GREEN} opacity="0.5" />
    </svg>
  );
};

export const ICON_MAP = {
  people: PeopleIcon,
  tools: ToolsIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  phone: PhoneIcon,
  doc: DocIcon,
};
