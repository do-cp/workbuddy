// ─────────────────────────────────────────────────────────────────────────────
// WorkBuddy Knowledge Base — edit this file to update what WorkBuddy knows.
// Non-technical teammates: just edit the data below and save. No code needed.
// ─────────────────────────────────────────────────────────────────────────────

export const company = {
  name: 'comparit',
  brand: 'cpit',
  description: 'Insurance comparison software company',
  offices: ['Hamburg, Germany', 'Prishtina, Kosovo'],
};

export const people = [
  {
    name: 'Nina',
    role: 'QA Lead',
    office: 'Hamburg',
    languages: ['German', 'English'],
    focus: 'Automated Testing',
    slack: '@nina',
  },
  {
    name: 'Drilon',
    role: 'QA Engineer',
    office: 'Prishtina',
    languages: ['Albanian', 'English', 'German'],
    focus: 'Cypress expert',
    slack: '@drilon',
  },
  {
    name: 'Matthias',
    role: 'Developer',
    office: 'Hamburg',
    languages: ['German', 'English'],
    focus: 'cpit.SIGN',
    slack: '@matthias',
  },
  {
    name: 'Philipp',
    role: 'Developer',
    office: 'Hamburg',
    languages: ['German', 'English'],
    focus: 'Advisory Docs + AI',
    slack: '@philipp',
  },
  {
    name: 'Besnik',
    role: 'Developer',
    office: 'Prishtina',
    languages: ['Albanian', 'English', 'German'],
    focus: 'Advisory Docs + API',
    slack: '@besnik',
  },
  {
    name: 'Ylle',
    role: 'Product Manager',
    office: 'Prishtina',
    languages: ['Albanian', 'English'],
    focus: 'UserCenter',
    slack: '@ylle',
  },
  {
    name: 'Behar',
    role: 'Developer',
    office: 'Prishtina',
    languages: ['Albanian', 'English', 'German'],
    focus: 'UserCenter + Frontend',
    slack: '@behar',
  },
  {
    name: 'Laimi',
    role: 'Operations',
    office: 'Hamburg',
    languages: ['German', 'English'],
    focus: 'Events + Office Management',
    slack: '@laimi',
  },
  {
    name: 'Sarah',
    role: 'Developer',
    office: 'Hamburg',
    languages: ['German', 'English'],
    focus: 'API Layer + Tariff Display',
    slack: '@sarah',
  },
];

export const tools = [
  { name: 'Jira', url: 'comparit.atlassian.net', purpose: 'Ticketing & sprint tracking' },
  { name: 'Confluence', url: 'comparit.atlassian.net/wiki', purpose: 'Documentation' },
  { name: 'Cypress', purpose: 'End-to-end testing' },
  { name: 'Git / GitHub', purpose: 'Version control' },
  { name: 'Slack', purpose: 'Internal communication' },
  { name: 'Figma', purpose: 'Design' },
  { name: 'VS Code', purpose: 'Development' },
  { name: 'Postman', purpose: 'API testing' },
];

export const projects = [
  { name: 'cpit.APP', description: 'Main comparison platform' },
  { name: 'cpit.PILOT', description: 'AI advisor tool' },
  { name: 'cpit.SIGN', description: 'Digital signatures', team: ['Matthias'] },
  {
    name: 'UserCenter',
    description: 'Admin configuration portal',
    team: ['Ylle', 'Behar'],
  },
  { name: 'Comparison Engine', description: 'Core calculation logic' },
  {
    name: 'Advisory Docs',
    description: 'Documentation generation',
    team: ['Philipp', 'Besnik'],
  },
];

export const meetings = [
  {
    name: 'Daily Standup',
    when: '9:30 AM CET, weekdays',
    mandatory: true,
  },
  {
    name: 'Sprint Planning',
    when: 'Every 2 weeks, Monday 10:00 AM CET',
    mandatory: true,
  },
  {
    name: 'Sprint Retro',
    when: 'Every 2 weeks, Friday 2:00 PM CET',
    mandatory: true,
  },
  {
    name: 'All Hands',
    when: 'Monthly, first Thursday 11:00 AM CET',
    mandatory: false,
  },
];

export const policies = {
  homeOffice:
    'Home office is flexible. Core hours are 10:00–15:00 CET — be reachable on Slack during this window.',
  leave: 'Submit leave requests at least 2 weeks in advance via Jira or ask Laimi.',
  sickDays: 'Notify your team lead and post in #sick-days on Slack by 9:00 AM.',
  expenses:
    'Submit expenses up to €25 directly in the expense tool. Larger amounts need prior approval from your team lead.',
};

export const holidays = {
  germany_hamburg: [
    'New Year — Jan 1',
    'Good Friday',
    'Easter Monday',
    'Labour Day / 1. Mai — May 1',
    'Ascension Day / Christi Himmelfahrt',
    'Whit Monday / Pfingstmontag',
    'German Unity Day — Oct 3',
    'Reformation Day — Oct 31',
    'Christmas — Dec 25–26',
  ],
  kosovo: [
    'New Year — Jan 1–2',
    'Independence Day — Feb 17',
    'Constitution Day — Apr 9',
    'Labour Day — May 1',
    'Europe Day — May 9',
    'Eid al-Fitr (date varies)',
    'Eid al-Adha (date varies)',
  ],
};

export const abbreviations = {
  BU: 'Berufsunfähigkeitsversicherung — Disability Insurance',
  LV: 'Lebensversicherung — Life Insurance',
  KV: 'Krankenversicherung — Health Insurance',
  AC: 'Acceptance Criteria',
  cpit: 'compare it (product brand)',
  TI: 'Tarifinformationen — Tariff Information',
  QA: 'Quality Assurance',
  PM: 'Product Manager',
  BE: 'Backend',
  FE: 'Frontend',
  API: 'Application Programming Interface',
  CI: 'Continuous Integration',
  CD: 'Continuous Deployment',
};

export const contacts = {
  IT: 'Post in **#it-support** on Slack — the team monitors it throughout the day.',
  HR: '**Laimi** (Hamburg) for office/ops questions. For formal HR matters: **hr@comparit.de**.',
  Operations: '**Laimi** handles office management, events, and day-to-day ops.',
  QA: '**Nina** is the QA Lead in Hamburg. **Drilon** is the Cypress expert in Prishtina.',
  Product: '**Ylle** is the Product Manager for UserCenter, based in Prishtina.',
  Design: 'Design questions? Check **Figma** first, or ask in the relevant project channel on Slack.',
};

// ─────────────────────────────────────────────────────────────────────────────
// Category cards shown on the Welcome screen
// ─────────────────────────────────────────────────────────────────────────────
export const categories = [
  {
    id: 'people',
    icon: 'people',
    label: 'People & Teams',
    sublabel: 'Find who works on what',
    suggestions: [
      'Who works on cpit.SIGN?',
      'Who in Prishtina speaks German?',
      "Who's the QA lead?",
      'Who handles the API layer?',
    ],
  },
  {
    id: 'it',
    icon: 'tools',
    label: 'IT & Tools',
    sublabel: 'Tools, access, setup',
    suggestions: [
      'How do I access Jira?',
      'Which tools does the team use?',
      'Where do I find documentation?',
      'How do I report an IT issue?',
    ],
  },
  {
    id: 'leave',
    icon: 'calendar',
    label: 'Leave & Absence',
    sublabel: 'Vacation, sick days, policy',
    suggestions: [
      'How do I request vacation?',
      'What if I am sick?',
      'What are the public holidays in Hamburg?',
      'When are Kosovo public holidays?',
    ],
  },
  {
    id: 'schedule',
    icon: 'clock',
    label: 'Schedules & Rhythm',
    sublabel: 'Meetings, core hours',
    suggestions: [
      "What's the daily standup time?",
      'Which meetings are mandatory?',
      'When is the next All Hands?',
      'What are the core hours?',
    ],
  },
  {
    id: 'office',
    icon: 'building',
    label: 'Office & Operations',
    sublabel: 'Hamburg, Prishtina, events',
    suggestions: [
      'Who handles office events?',
      'How do expense submissions work?',
      "What's the home-office policy?",
      'Who do I ask about HR?',
    ],
  },
  {
    id: 'glossary',
    icon: 'doc',
    label: 'Glossary',
    sublabel: 'Abbreviations & insurance terms',
    suggestions: [
      'What does BU mean?',
      "What's a TI?",
      'What does cpit stand for?',
      "What's the difference between LV and KV?",
    ],
  },
  {
    id: 'news',
    icon: 'megaphone',
    label: 'News & Updates',
    sublabel: "Announcements, what's new",
    suggestions: [
      "What's new at comparit?",
      'Any recent announcements?',
      "What's happening this month?",
      'Latest team updates',
    ],
  },
];
