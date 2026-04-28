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

export const WorkBuddyAvatar = ({ size = 30 }) => (
  <img
    src="/assets/mascot.png"
    alt="WorkBuddy"
    width={size}
    height={size}
    style={{ display: 'block', borderRadius: '50%', objectFit: 'cover' }}
  />
);

export const BuildingIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <rect x="3" y="8" width="14" height="13" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <path d="M17 11 L21 11 L21 21 L17 21" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <path d="M3 8 L10 3 L17 8" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <rect x="7" y="14" width="3" height="3" fill="#0AB7A7"/>
    <rect x="12" y="14" width="3" height="3" stroke="#1B1C50" strokeWidth="1.3"/>
    <rect x="9" y="17" width="4" height="4" fill="#1B1C50"/>
  </Icon>
);

export const MegaphoneIcon = ({ size = 22 }) => (
  <Icon size={size}>
    <path d="M3 9 L3 15 L7 15 L7 9 Z" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <path d="M7 10 L18 5 L18 19 L7 14 Z" stroke="#1B1C50" strokeWidth="1.8" strokeLinejoin="miter"/>
    <path d="M7 15 L9 21" stroke="#0AB7A7" strokeWidth="1.8" strokeLinecap="square"/>
    <circle cx="20" cy="12" r="2" fill="#0AB7A7"/>
  </Icon>
);

export const ICON_MAP = {
  people: PeopleIcon,
  tools: ToolsIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  phone: PhoneIcon,
  doc: DocIcon,
  building: BuildingIcon,
  megaphone: MegaphoneIcon,
};
