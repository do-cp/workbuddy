// ── Source document constants (internal metadata — not exported) ────────────
const SRC = {
  STANDORT:  'Standort-Informationen_erweitert.xlsx',
  ORGCHART:  'organigram cpit.pdf (Stand: 01.03.2026)',
  TEAMS_DEV: 'Teams comparit NEW from 01-03-2026.xlsx',
  TEAMS_BA:  'Teams_Projekte_Anteile_2026.xlsx',
  WISOTECH:  'wisotech org chart (Stand: 01.05.2026)',
};
// Helper: language entry with source
const L = (name, src) => ({ lang: name, src });

export const company = {
  name: "comparit",
  brand: "cpit",
  description: "Insurance comparison software company",
  offices: ["Hamburg, Germany", "Prishtina, Kosovo"],
  phone: "040 80 81 41 50",
  email: "info@comparit.de",
  officeHours: "Mon–Thu 09:00–18:00",
  addresses: {
    hamburg: "Hopfensack 19, 20457 Hamburg",
    prishtina: "Ruga Tirana C4/2 -L14/2, 100 Prishtina, Kosovo",
  },
};

export const people = [
  // ── Leadership ─────────────────────────────────────────────────────────────
  {
    name: "Matthias Brauch",
    role: "CEO",
    team: "Management",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "mb@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Axel Karkowski",
    role: "COO",
    team: "Management",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "ak@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Ylle Dragaj",
    role: "CTO",
    team: "Development",
    office: "Remote (Baden-Württemberg)",
    languages: [
      L("German",   SRC.STANDORT),
      L("English",  SRC.STANDORT),
      L("Albanian", SRC.STANDORT),
    ],
    email: "yd@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Ellen Ludwig",
    role: "CPO",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "el@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Oliver Fink",
    role: "CMO",
    team: "Sales & Marketing",
    office: "Remote (NRW)",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "of@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Alexander Lipp",
    role: "CSO",
    team: "Sales & Marketing",
    office: "Remote (NRW)",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "al@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Martina Pirrung",
    role: "CPMO",
    team: "Sales & Marketing",
    office: "Remote (Bavaria)",
    languages: [
      L("German", SRC.STANDORT),
    ],
    email: "mp@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Laimi Pester",
    role: "Assistentin der Geschäftsführung",
    team: "Management",
    office: "Remote (Brandenburg)",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "lp@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },

  // ── Development team ───────────────────────────────────────────────────────
  {
    name: "Donart Pllashniku",
    role: "Team Lead BE / UI",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
      L("German",   SRC.STANDORT),
    ],
    email: "dp@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Drilon Osmanaj",
    role: "QA Engineer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "do@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Behar Simnica",
    role: "Senior Developer / Team Lead KO",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "bs@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Çlirim Murati",
    role: "Senior Software Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "cm@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Zgjim Kabashi",
    role: "Senior Software Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "zk@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Korab Qarri",
    role: "Senior Software Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "kq@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Lorik Haxhidauti",
    role: "Senior Software Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "lh@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Shpend Bajgora",
    role: "Senior Angular Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "shpend@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Tobias Schrank",
    role: "Senior Software Developer",
    team: "Development",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "ts@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Sebastian Thiede",
    role: "Senior Developer",
    team: "Development",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "st@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Timo Wickboldt",
    role: "Senior Developer",
    team: "Development",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "tw@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Philip Szalla",
    role: "Senior Fullstack Developer",
    team: "Development",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "ps@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    // NOTE: Argim Kaliqi has a wisotech.de email (the only person in people[] with a non-comparit domain).
    // He does not appear in devTeams.js. Email source unclear — keep as documented, flag for verification.
    name: "Argim Kaliqi",
    role: "Mid Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "argim.kaliqi@wisotech.de",
    _src: { role: SRC.STANDORT, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Lirim Imeri",
    role: "Mid Software Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "li@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Ylli Kllokoqi",
    role: "Mid Software Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
      L("German",   SRC.STANDORT),
    ],
    email: "yk@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Ardi Zariqi",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "az@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Ardit Gjyrevci",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "ag@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Arianit Gashi",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "aga@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Bleron Morina",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "bm@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Elvira Hasani",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "eh@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Venera Plakolli",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "vp@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Xheneta Hasani",
    role: "Junior Developer",
    team: "Development",
    office: "Remote (Hessen)",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
      L("German",   SRC.STANDORT),
    ],
    email: "xh@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Ora Osmani",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "oo@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Anita Hasani",
    role: "Frontend Developer",
    team: "Development",
    office: "Prishtina",
    // email missing → cannot confirm Standort doc contains this person → languages unverified
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.TEAMS_DEV, email: null, office: SRC.STANDORT },
  },
  {
    name: "Arber Mirena",
    role: "Senior Developer",
    team: "Development",
    office: "Prishtina",
    // email missing → cannot confirm Standort doc contains this person → languages unverified
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.TEAMS_DEV, email: null, office: SRC.STANDORT },
  },
  {
    name: "Behxhet Rexha",
    role: "Intern",
    team: "Development",
    office: "Prishtina",
    // email missing → cannot confirm Standort doc contains this person → languages unverified
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.TEAMS_DEV, email: null, office: SRC.STANDORT },
  },
  // New people from organigram cpit.pdf (Stand: 01.03.2026) — emails not in org chart
  {
    name: "Fabio Schmied",
    role: "Senior Developer",
    team: "Development",
    office: "Hamburg",
    languages: [
      L("German",  null),
      L("English", null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Donika Krasniqi Gjoka",
    role: "Mid Senior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Ardian Hashu",
    role: "Senior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Nils Dent",
    role: "Junior Developer",
    team: "Development",
    office: "Hamburg",
    languages: [
      L("German",  null),
      L("English", null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Erza Gashi",
    role: "Intern",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Kamel Almaj",
    role: "Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Miroslava Placecki",
    role: "Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", null),
      L("English",  null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },

  // ── Integrations team ──────────────────────────────────────────────────────
  {
    name: "Besnik Ejupi",
    role: "Expert Software Developer",
    team: "Integrations",
    office: "Prishtina",
    languages: [
      L("German",   SRC.STANDORT),
      L("English",  SRC.STANDORT),
      L("Albanian", SRC.STANDORT),
    ],
    email: "be@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Levent Öztürk",
    role: "Developer",
    team: "Integrations",
    office: "Remote (NRW)",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "loe@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Adil Jusufi",
    role: "Junior Developer",
    team: "Integrations",
    office: "Prishtina",
    languages: [
      L("German",   SRC.STANDORT),
      L("Albanian", SRC.STANDORT),
    ],
    email: "aj@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },
  {
    name: "Flutura Fejzullahu",
    role: "Junior Developer",
    team: "Integrations",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("English",  SRC.STANDORT),
    ],
    email: "ff@comparit.de",
    _src: { role: SRC.TEAMS_DEV, email: SRC.TEAMS_DEV, office: SRC.STANDORT },
  },

  // ── Business Analysis team ─────────────────────────────────────────────────
  {
    name: "Dörte Meins",
    role: "Product Owner",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "dm@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Corinna Sevin",
    role: "Expert Business Analyst",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "cs@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Tanja Nitsch",
    role: "Senior Business Analystin",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "tn@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Marvin Jordan",
    role: "Senior Business Analyst SUHK",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "mj@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Michael Portius",
    role: "Senior Business Analyst",
    team: "Business Analysis",
    office: "Remote (Thüringen)",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "mpo@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Eva Arfaoui-Holthey",
    role: "Business Analystin SUHK",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "eho@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Chantal Voß",
    role: "Business Analystin KO/LV",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "cv@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Bibiana Massimo",
    role: "Business Analyst",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  null),
      L("English", null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },
  {
    name: "Justin Kleinschmidt",
    role: "Business Analyst Products",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "jk@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },
  {
    name: "Lukas Hodel",
    role: "Business Analyst",
    team: "Business Analysis",
    office: "Hamburg",
    languages: [
      L("German",  SRC.STANDORT),
      L("English", SRC.STANDORT),
    ],
    email: "lho@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.TEAMS_BA, office: SRC.STANDORT },
  },

  // ── Sales & Marketing / Design ─────────────────────────────────────────────
  {
    name: "Ribana Harkensee",
    role: "Referentin Products",
    team: "Sales & Marketing",
    office: "Hamburg",
    languages: [
      L("German", SRC.STANDORT),
    ],
    email: "rh@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Markus Stüwer-Sklarek",
    role: "Support 1st Level / Datenanalyst",
    team: "Sales & Marketing",
    office: "Remote (NRW)",
    languages: [
      L("German", SRC.STANDORT),
    ],
    email: "mss@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  // Design (under CMO Oliver Fink) — source: organigram cpit.pdf Stand: 01.03.2026
  {
    name: "Nina Martens",
    role: "Design UI/LV",
    team: "Sales & Marketing",
    office: "Hamburg",
    languages: [
      L("German", null),
    ],
    email: "",
    _src: { role: SRC.ORGCHART, email: null, office: SRC.ORGCHART },
  },

  // ── Management & Support ───────────────────────────────────────────────────
  {
    name: "Christine Simon",
    role: "Office Assistenz",
    team: "Management",
    office: "Hamburg",
    languages: [
      L("German", SRC.STANDORT),
    ],
    email: "csi@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Sandra Thomm",
    role: "Buchhaltung",
    team: "Management",
    office: "Remote (NRW)",
    languages: [
      L("German", SRC.STANDORT),
    ],
    email: "sth@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Philipp Karkowski",
    role: "Werkstudent",
    team: "Management",
    office: "Hamburg",
    languages: [
      L("German", SRC.STANDORT),
    ],
    email: "pk@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
  {
    name: "Shkronja Babatinca",
    role: "Assistentin Abrechnung Kosovo",
    team: "Management",
    office: "Remote (Baden-Württemberg)",
    languages: [
      L("Albanian", SRC.STANDORT),
      L("German",   SRC.STANDORT),
    ],
    email: "sb@comparit.de",
    _src: { role: SRC.ORGCHART, email: SRC.STANDORT, office: SRC.STANDORT },
  },
];

// ── wisoTech org chart people (Stand: 01.05.2026) ────────────────────────────
export const wisotechPeople = [
  // Leadership
  {
    name: "Dr. Ing. Dirk Sommermeyer",
    role: "CEO",
    team: "Management",
    office: "Germany",
    languages: [
      L("German", SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
  {
    name: "Matthias Brauch",
    role: "CEO",
    team: "Management",
    office: "Hamburg",
    languages: [
      L("German",  SRC.WISOTECH),
      L("English", SRC.WISOTECH),
    ],
    email: "mb@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Ylle Dragaj",
    role: "CTO",
    team: "Development",
    office: "Remote (Baden-Württemberg)",
    languages: [
      L("German",   SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
      L("Albanian", SRC.WISOTECH),
    ],
    email: "yd@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  // Administration
  {
    name: "Laimi Pester",
    role: "Assistance / Administration",
    team: "Management",
    office: "Remote (Brandenburg)",
    languages: [
      L("German",  SRC.WISOTECH),
      L("English", SRC.WISOTECH),
    ],
    email: "lp@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Shkronja Babatinca",
    role: "Assistance / Administration KO",
    team: "Management",
    office: "Remote (Baden-Württemberg)",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("German",   SRC.WISOTECH),
    ],
    email: "sb@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Cornelia Rieger",
    role: "Project Management, PO",
    team: "Management",
    office: "Germany",
    languages: [
      L("German", SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
  // Design & Development
  {
    name: "Sebastian Houshmand",
    role: "Design UI / UX",
    team: "Development",
    office: "Germany",
    languages: [
      L("German",  SRC.WISOTECH),
      L("English", SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
  {
    name: "Behar Simnica",
    role: "Expert Developer / Team Lead KO",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "bs@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Qëndresa Rexhbogaj",
    role: "Expert Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
  {
    name: "Shpend Bajgora",
    role: "Senior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "shpend@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Lorik Haxhidauti",
    role: "Senior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "lh@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Korab Qarri",
    role: "Senior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "kq@comparit.de",
    _src: { role: SRC.WISOTECH, email: SRC.WISOTECH, office: SRC.WISOTECH },
  },
  {
    name: "Muhamed Zeqiri",
    role: "Senior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
  {
    name: "Fisnik Kusari",
    role: "Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
  {
    name: "Ag Hamiti",
    role: "Junior Developer",
    team: "Development",
    office: "Prishtina",
    languages: [
      L("Albanian", SRC.WISOTECH),
      L("English",  SRC.WISOTECH),
    ],
    email: "",
    _src: { role: SRC.WISOTECH, email: null, office: SRC.WISOTECH },
  },
];

export const tools = [
  {
    name: "Jira",
    url: "comparit.atlassian.net",
    purpose: "Ticketing & sprint tracking",
  },
  {
    name: "Confluence",
    url: "comparit.atlassian.net/wiki",
    purpose: "Documentation & wiki",
  },
  {
    name: "Personio",
    purpose:
      "HR system — leave requests, sick day notifications, time off, personal data",
  },
  {
    name: "Tempo",
    purpose:
      "Time tracking — integrated with Jira, where you log working hours",
  },
  {
    name: "SharePoint",
    url: "comparitgmbh448.sharepoint.com/sites/Comparit",
    purpose:
      "Central document storage and file management (active from Jan 2026)",
  },
  {
    name: "Microsoft Teams",
    purpose: "Internal communication — chat, calls, channels",
  },
  { name: "Cypress", purpose: "End-to-end testing" },
  { name: "Git / GitHub", purpose: "Version control" },
  { name: "Figma", purpose: "Design" },
  { name: "VS Code", purpose: "Development" },
  { name: "Postman", purpose: "API testing" },
];

export const projects = [
  {
    name: "cpit.APP",
    description: "Main insurance comparison platform",
    teams: ["Development", "Business Analysis"],
  },
  {
    name: "cpit.PILOT",
    description: "AI advisor tool",
    teams: ["Sonderprojekte"],
    contacts: [
      "Ylle Dragaj",
      "Ellen Ludwig",
      "Tobias Schrank",
      "Behar Simnica",
      "Donart Pllashniku",
    ],
  },
  {
    name: "cpit.SIGN",
    description: "Digital signatures",
    teams: ["Sonderprojekte"],
    contacts: ["Tobias Schrank", "Behar Simnica", "Donart Pllashniku"],
  },
  {
    name: "Charge-IT",
    description: "Charge-IT MVP and payment integrations",
    teams: ["ChargeIT"],
    contacts: ["Zgjim Kabashi", "Ora Osmani"],
  },
  {
    name: "Userverwaltung",
    description: "Admin configuration / UserCenter portal",
    teams: ["Sonderprojekte"],
    contacts: ["Donart Pllashniku", "Tobias Schrank"],
  },
  {
    name: "IC Webservices",
    description: "Insurance connector webservices (KV+KFZ+LV)",
    teams: ["IC Webservices"],
    contacts: [
      "Ylli Kllokoqi",
      "Adil Jusufi",
      "Besnik Ejupi",
      "Levent Öztürk",
      "Xheneta Hasani",
    ],
  },
  {
    name: "KFZ",
    description: "Motor vehicle insurance comparison",
    teams: ["KFZ"],
    // Timo Wickboldt removed — he is TI & Infra, not KFZ (confirmed via devTeams.js)
    contacts: [
      "Lirim Imeri",
      "Bleron Morina",
      "Arianit Gashi",
    ],
  },
  {
    name: "SACH",
    description:
      "Property & casualty insurance (WG, Hausrat, PHV, THV, Rechtsschutz)",
    teams: ["SACH"],
    contacts: [
      "Sebastian Thiede",
      "Flutura Fejzullahu",
      "Elvira Hasani",
      "Çlirim Murati",
      "Ardit Gjyrevci",
      "Anita Hasani",
    ],
  },
  {
    name: "Kranken / KV",
    description: "Health insurance comparison",
    teams: ["Kranken"],
    contacts: ["Ardi Zariqi", "Venera Plakolli"],
  },
  {
    name: "TI & Infra",
    description: "Tariff ingress, infrastructure, monitoring",
    teams: ["TI & Infra"],
    contacts: ["Timo Wickboldt", "Philip Szalla"],
  },
  {
    name: "OVB / Telis Anbindung",
    description: "Insurance broker integrations",
    teams: ["Sonderprojekte", "IC Webservices"],
    contacts: ["Tobias Schrank", "Donart Pllashniku", "Besnik Ejupi"],
  },
];

// ── REMOVED: devTeams and baAssignments ──────────────────────────────────────
// These were dead exports (never imported anywhere in the frontend).
// They duplicated data from src/data/sources/devTeams.js and fachbereiche.js.
// Single sources of truth:
//   Dev team assignments → src/data/sources/devTeams.js
//   BA/Fachbereich assignments → src/data/sources/fachbereiche.js
// Both are consumed by buildPrompt.js and the AI system prompt.

export const meetings = [
  {
    name: "Daily Standup",
    when: "9:30 AM CET, Mon–Thu",
    mandatory: true,
    description:
      "Per Sparte — Fachbereich & Entwicklung together. Short sync on who is working on what.",
  },
  {
    name: "Sprint Planning",
    when: "Every 2 weeks, Monday 10:00 AM CET",
    mandatory: true,
    description: "Plan the next sprint. All development and relevant BA.",
  },
  {
    name: "Sprint Retro",
    when: "Every 2 weeks, Friday 2:00 PM CET",
    mandatory: true,
    description: "Retrospective at end of sprint.",
  },
  {
    name: "All Hands (C-Time)",
    when: "Monthly, first Thursday 11:00 AM CET",
    mandatory: false,
    description:
      "C-Level meeting for all employees with a leadership function.",
  },
  {
    name: "TI Refinement",
    when: "Recurring (see team calendar)",
    mandatory: false,
    description:
      "Review of new TI (TarifIngress) tickets. Developers + Business Analysts.",
  },
  {
    name: "TI QA Deploy",
    when: "Recurring (see team calendar)",
    mandatory: false,
    description: "All TI tickets deployed from DEV to QA environment.",
  },
  {
    name: "Live Update",
    when: "Recurring (see team calendar)",
    mandatory: false,
    description:
      "QA-tested tickets go to live. Fachbereich tests immediately afterwards.",
  },
  {
    name: "Stand Produktrating LV",
    when: "Recurring",
    mandatory: false,
    description: "Lukas Hodel presents the current LV product rating status.",
  },
  {
    name: "Hotfix",
    when: "Ad-hoc when needed",
    mandatory: false,
    description:
      "Short-notice meeting to fix a live environment issue. LV contact: Dirk; KV/Sach: see team.",
  },
  {
    name: "PO Runde",
    when: "Recurring",
    mandatory: false,
    description: "Product Owner round.",
  },
  {
    name: "Refinement Design Board",
    when: "Recurring",
    mandatory: false,
    description: "Design refinement board session.",
  },
];

export const policies = {
  workWeek:
    "4-Tage-Woche since 01.01.2026: Mon–Thu only, 36 h/week (9 h/day full-time). Friday is a free day. Salary unchanged.",
  homeOffice:
    "Minimum 2 days per week in the office (Mon–Thu), maximum 2 days home office. Core hours 09:00–15:00 CET — be reachable on Teams. Exact HO days agreed with team lead.",
  leave:
    "Request leave via Personio as early as possible. Always name a substitute. Germany: 24 days/year. Kosovo: 20 days/year. Submit at least 2 weeks in advance. Leave must generally be taken in the same calendar year.",
  sickDays:
    "Report sick in Personio or by phone before 09:00 AM on the first day. Sick note (AU) required from day 4. Germany: 6 weeks full pay. Kosovo: up to 20 days full pay.",
  expenses:
    "Up to €25 submit directly. Larger amounts need prior team lead approval. Business travel via Personio + expense form (Vorlage_Reisekostenabrechnung cpit.xlsx on SharePoint). Laimi helps book travel.",
  overtime:
    "Overtime must be approved by team lead. Log in Tempo. Compensated as time off (Freizeitausgleich) via Personio.",
  sickChild:
    "Germany: up to 15 days/year per child (30 for single parents) via §45 SGB V Kinderkrankengeld. Notify via Personio.",
  personio:
    "All absences (vacation, sick, overtime compensation) are managed in Personio. Contact Laimi for help.",
};

export const holidays = {
  germany_hamburg_public: [
    "New Year — Jan 1",
    "Good Friday / Karfreitag",
    "Easter Monday / Ostermontag",
    "Labour Day — May 1",
    "Ascension Day / Christi Himmelfahrt",
    "Whit Monday / Pfingstmontag",
    "German Unity Day — Oct 3",
    "Reformation Day — Oct 31",
    "Christmas — Dec 25–26",
  ],
  kosovo: [
    "New Year — Jan 1–2",
    "Orthodox Christmas — Jan 7",
    "Independence Day — Feb 17",
    "Eid al-Fitr / Bajrami i Madh — Mar 20, 2026 (moon-calendar, ±1–2 days)",
    "Catholic Easter — Apr 6, 2026",
    "Constitution Day — Apr 9",
    "Orthodox Easter — Apr 13, 2026",
    "Labour Day — May 1",
    "Europe Day substitute — May 11, 2026 (May 9 falls on Saturday → Monday off)",
    "Eid al-Adha / Bajrami i Vogël — May 27, 2026 (moon-calendar, ±1–2 days)",
    "Catholic Christmas — Dec 25",
  ],
  kosovo_school_vacations: {
    "2025/26": {
      Winterferien: "26 Dec 2025 – 7 Jan 2026 (1st semester ends 24 Dec 2025)",
      "Semester 2 start": "8 Jan 2026",
      "Catholic Easter": "6 Apr 2026",
      Frühlingsferien: "7–10 Apr 2026",
      "Orthodox Easter": "13 Apr 2026",
      Schuljahresende: "19 Jun 2026",
    },
  },
  hamburg_school_vacations: {
    "2025/26": {
      Herbst: "20 Oct – 31 Oct 2025",
      Weihnachten: "17 Dec 2025 – 2 Jan 2026",
      Winter: "30 Jan 2026",
      Ostern: "2 Mar – 13 Mar 2026",
      Pfingsten: "11 May – 15 May 2026",
      Sommer: "9 Jul – 19 Aug 2026",
    },
    "2026/27": {
      Herbst: "19 Oct – 30 Oct 2026",
      Weihnachten: "21 Dec 2026 – 1 Jan 2027",
      Winter: "29 Jan 2027",
      Ostern: "1 Mar – 12 Mar 2027",
      Pfingsten: "7 May – 14 May 2027",
      Sommer: "1 Jul – 11 Aug 2027",
    },
    "2027/28": {
      Herbst: "11 Oct – 22 Oct 2027",
      Weihnachten: "20 Dec 2027 – 31 Dec 2027",
      Winter: "28 Jan 2028",
      Ostern: "6 Mar – 17 Mar 2028",
      Pfingsten: "22 May – 26 May 2028",
      Sommer: "3 Jul – 11 Aug 2028",
    },
  },
};

export const abbreviations = {
  // Insurance products
  BU: "Berufsunfähigkeitsversicherung — Disability (occupational) insurance",
  LV: "Lebensversicherung — Life insurance",
  "LV AV": "Lebensversicherung Altersvorsorge — Life insurance pension plan",
  "LV BU": "Lebensversicherung Berufsunfähigkeit — Life + disability combined",
  "LV GF":
    "Lebensversicherung Grundfähigkeit — Dread disease / functional impairment",
  "LV DD": "Lebensversicherung Dread Disease",
  "LV BR": "Lebensversicherung Basis Rente — Rürup pension",
  "LV PR": "Lebensversicherung Private Rentenversicherung — Private pension",
  KV: "Krankenversicherung — Health insurance",
  "KV Voll":
    "Krankenversicherung Vollversicherung — Full private health insurance",
  "KV Zusatz": "Krankenversicherung Zusatz — Supplementary health insurance",
  KFZ: "Kraftfahrzeug — Motor vehicle insurance",
  "Sach WG": "Sachversicherung Wohngebäudeversicherung — Building insurance",
  "Sach HR":
    "Sachversicherung Hausratversicherung — Contents/household insurance",
  "Sach PHV":
    "Sachversicherung Private Haftpflichtversicherung — Personal liability",
  "Sach THV":
    "Sachversicherung Tierhalterhaftpflichtversicherung — Pet liability",
  "Sach RS":
    "Sachversicherung Rechtsschutzversicherung — Legal protection insurance",
  // Technical
  TI: "TarifIngress — Tariff data pipeline/ingestion system",
  IC: "Insurance Connector — system that connects to insurer APIs",
  DEV: "Development / Developer",
  BE: "Backend",
  FE: "Frontend",
  UI: "User Interface",
  GFI: "General Features and Improvements — catch-all dev work stream",
  WKZ: "Wagnis- und Konditionszeichen — risk classification codes in motor insurance",
  OIT: "Legacy system being decommissioned (Abschaltung OIT)",
  DWH: "Data Warehouse",
  "TAA-API": "Tarifrechner-API — tariff calculation API",
  "MCP Server": "Model Context Protocol Server — AI tooling",
  // Business
  AC: "Acceptance Criteria",
  cpit: "compare it — product brand name for comparit software",
  QA: "Quality Assurance",
  PM: "Product Manager",
  API: "Application Programming Interface",
  CI: "Continuous Integration",
  CD: "Continuous Deployment",
  SUHK: "Selbstständige, Unternehmer, Heilberufe, Kammerberufe — self-employed & professional segments",
  GF: "Geschäftsführung — Management / Executives",
  B2C: "Business to Consumer",
  SLA: "Service Level Agreement",
  // C-Suite
  CEO: "Chief Executive Officer — Matthias Brauch",
  COO: "Chief Operating Officer — Axel Karkowski",
  CTO: "Chief Technology Officer — Ylle Dragaj",
  CPO: "Chief Product Officer — Ellen Ludwig",
  CMO: "Chief Marketing Officer — Oliver Fink",
  CSO: "Chief Sales Officer — Alexander Lipp",
  CPMO: "Chief Product Marketing Officer — Martina Pirrung",
};

export const contacts = {
  IT: "**Dennis Krimilowski** (IT-TEC) — Primary IT support for hardware/software issues. Email: support@it-tec.de | Phone: +49 4533 791010. For SharePoint/admin: **Patrick von der Hagen** (pvdh@comparit.de) or IT Teams channel.",
  HR: "**Laimi Pester** (lp@comparit.de) for day-to-day questions, Personio, and vacation. Formal HR: **hr@comparit.de**.",
  Operations:
    "**Laimi Pester** handles office management, travel booking, and executive support.",
  QA: "**Drilon Osmanaj** (do@comparit.de) is the QA Engineer in Prishtina.",
  Product:
    "**Ellen Ludwig** (CPO, el@comparit.de) and **Dörte Meins** (Product Owner, dm@comparit.de) in Hamburg.",
  Management:
    "**Matthias Brauch** (CEO) · **Axel Karkowski** (COO) · **Ylle Dragaj** (CTO).",
  Accounting:
    "**Sandra Thomm** (sth@comparit.de, Remote NRW) · **Shkronja Babatinca** (sb@comparit.de, Kosovo billing).",
  WorkTime:
    "**Axel Karkowski** (ak@comparit.de) for working-time model, overtime and policy questions.",
  SharePoint: "**Laimi** or **Dennis (IT-TEC)** for SharePoint access rights.",
  BusinessTravel:
    "**Laimi** books travel. **Axel Karkowski** for policy questions. Expense form on SharePoint.",
};

export const categories = [
  {
    id: "people",
    emoji: "👥",
    iconBg: "#EDE9FF",
    label: "People & Teams",
    sublabel: "Find who works on what",
    suggestions: [
      "Who is the CEO of comparit?",
      "Who speaks Albanian in Hamburg?",
      "Who is on the Development team?",
      "Who handles IT issues?",
    ],
  },
  {
    id: "it",
    emoji: "🧰",
    iconBg: "#FFE9E9",
    label: "IT & Tools",
    sublabel: "Tools, access, setup",
    suggestions: [
      "How do I access Jira?",
      "Which tools does the team use?",
      "Where do I find documentation?",
      "How do I report an IT issue?",
    ],
  },
  {
    id: "leave",
    emoji: "🌴",
    iconBg: "#E6F9EE",
    label: "Leave & Absence",
    sublabel: "Vacation, sick days, policy",
    suggestions: [
      "How do I request vacation?",
      "What if I am sick?",
      "What are the public holidays in Hamburg?",
      "When are Kosovo public holidays?",
    ],
  },
  {
    id: "schedule",
    emoji: "🗓️",
    iconBg: "#E8F0FF",
    label: "Schedules & Rhythm",
    sublabel: "Standups, sprints, all-hands",
    suggestions: [
      "What's the daily standup time?",
      "Which meetings are mandatory?",
      "When is the next All Hands?",
      "What are the core hours?",
    ],
  },
  {
    id: "office",
    emoji: "🏢",
    iconBg: "#F0F0F0",
    label: "Office & Operations",
    sublabel: "Hamburg, Prishtina, remote",
    suggestions: [
      "Who works in Hamburg?",
      "Who is fully remote?",
      "What's the home-office policy?",
      "Who do I ask about expenses?",
    ],
  },
  {
    id: "glossary",
    emoji: "📖",
    iconBg: "#E6F7F5",
    label: "Glossary",
    sublabel: "Abbreviations & insurance terms",
    suggestions: [
      "What does BU mean?",
      "What's a TI?",
      "What does IC stand for?",
      "What does SUHK mean?",
    ],
  },
  {
    id: "news",
    emoji: "📣",
    iconBg: "#FFF3E0",
    label: "News & Updates",
    sublabel: "Announcements, what's new",
    suggestions: [
      "What's new at comparit?",
      "What changed with the 4-day week?",
      "What's the new SharePoint URL?",
      "Latest team updates",
    ],
  },
  {
    id: "workflows",
    emoji: "⚙️",
    iconBg: "#E8F4FF",
    label: "Workflows",
    sublabel: "Processes & step-by-step guides",
    suggestions: [
      "How do I request leave in Personio?",
      "How do I create a new Fondsliste in TI?",
      "How do I add an Antragsfrage in TI Live?",
      "How do I submit expenses?",
    ],
  },
];
