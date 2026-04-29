/**
 * DEVELOPMENT TEAMS — Software engineers and their project assignments.
 *
 * SOURCE OF TRUTH: "Teams comparit NEW from 01-03-2026.xlsx"
 * Last verified: 2026-03-01
 *
 * ⚠️  THESE ARE SOFTWARE DEVELOPERS — NOT Fachbereich / Business Analysis contacts.
 *     When someone asks "Fachbereich Sach", do NOT use this file.
 *     Use fachbereiche.js instead.
 *     Only use this file when someone asks: "who codes X", "dev team for X",
 *     "wer entwickelt X", or "who is on the SACH team" (meaning developers).
 */

export const devTeamsData = {
  _meta: {
    source: 'Teams comparit NEW from 01-03-2026.xlsx',
    lastVerified: '2026-03-01',
    warning: 'DEVELOPERS ONLY — do not use for Fachbereich/BA questions',
  },

  teams: [
    {
      id: 'SACH',
      description: 'Developers coding Sachversicherung products (WG, HR, PHV, THV, RS)',
      note: 'These are DEVELOPERS. For Fachbereich Sach BA contacts → see the FACHBEREICH ZUSTÄNDIGKEITEN section.',
      members: [
        { name: 'Sebastian Thiede',  role: 'Backend',   fte: 0.5, email: 'st@comparit.de' },
        { name: 'Flutura Fejzullahu',role: 'Backend',   fte: 0.5, email: 'ff@comparit.de' },
        { name: 'Anita Hasani',      role: 'Frontend',  fte: 1.0, email: null },
        { name: 'Elvira Hasani',     role: 'Frontend',  fte: 1.0, email: 'eh@comparit.de' },
        { name: 'Çlirim Murati',     role: 'Frontend',  fte: 0.5, email: 'cm@comparit.de' },
        { name: 'Ardit Gjyrevci',    role: 'Backend',   fte: 0.5, email: 'ag@comparit.de' },
      ],
      projects: ['Wohngebäude & Hausrat', 'PHV', 'THV', 'Rechtsschutz', 'B2C SACH'],
    },
    {
      id: 'Sonderprojekte',
      description: 'Developers on special cross-cutting projects',
      members: [
        { name: 'Tobias Schrank',    role: 'Frontend',  fte: 1.0, email: 'ts@comparit.de' },
        { name: 'Behar Simnica',     role: 'Backend',   fte: 0.5, email: 'bs@comparit.de', note: '50% leadership/management KO' },
        { name: 'Donart Pllashniku', role: 'Fullstack', fte: 0.5, email: 'dp@comparit.de', note: 'Team Lead BE/UI' },
      ],
      projects: [
        'OVB Anbindung', 'Telis Anbindung', 'Userverwaltung Teil 1+2',
        'MLP KFZ Anbindung', 'Asynchrone Beratung', 'cpit.PILOT',
        'Digitale Signatur (cpit.SIGN)', 'Umsatzsteuer Umsetzung',
      ],
    },
    {
      id: 'IC Webservices',
      description: 'Insurance connector developers',
      members: [
        { name: 'Ylli Kllokoqi',  role: 'Webservices',        fte: 1.0, email: 'yk@comparit.de' },
        { name: 'Adil Jusufi',    role: 'Webservices',        fte: 1.0, email: 'aj@comparit.de' },
        { name: 'Besnik Ejupi',   role: 'Webservices',        fte: 1.0, email: 'be@comparit.de' },
        { name: 'Levent Öztürk',  role: 'Webservices KV+KFZ', fte: 1.0, email: 'loe@comparit.de' },
        { name: 'Xheneta Hasani', role: 'Webservices',        fte: 1.0, email: 'xh@comparit.de' },
      ],
      projects: [
        'Grundfähigkeit', 'Antragsstrecke Risikoleben & BU',
        'PHV & THV IC', 'Dread Disease', 'Unfall', 'Sterbegeld',
      ],
    },
    {
      id: 'ChargeIT',
      description: 'ChargeIT project',
      members: [
        { name: 'Zgjim Kabashi', role: 'Developer', fte: 1.0, email: 'zk@comparit.de' },
        { name: 'Ora Osmani',    role: 'Developer', fte: 1.0, email: 'oo@comparit.de' },
      ],
      projects: ['Charge-IT MVP', 'Integration Pools', 'Charge-IT V2'],
    },
    {
      id: 'TI & Infra',
      description: 'Tariff ingress and infrastructure',
      members: [
        { name: 'Timo Wickboldt', role: 'Fullstack + Infrastruktur', fte: 1.0, email: 'tw@comparit.de' },
        { name: 'Philip Szalla',  role: 'Infrastructure',            fte: 1.0, email: 'ps@comparit.de' },
      ],
      projects: ['Infrastruktur', 'Hochverfügbarkeit/Monitoring', 'Konzeption API', 'MCP Server'],
    },
    {
      id: 'KFZ',
      description: 'Developers coding motor vehicle insurance (NOT Fachbereich KFZ contact)',
      note: 'For KFZ Fachbereich BA contacts → see the FACHBEREICH ZUSTÄNDIGKEITEN section.',
      members: [
        { name: 'Lirim Imeri',    role: 'Backend + WS', fte: 1.0, email: 'li@comparit.de' },
        { name: 'Bleron Morina',  role: 'Backend + WS', fte: 1.0, email: 'bm@comparit.de' },
        { name: 'Arianit Gashi',  role: 'Developer',    fte: 1.0, email: 'aga@comparit.de' },
      ],
      projects: ['KFZ Refactoring', 'WKZ Kraftrad/Nutzfahrzeug/Anhänger/Camping', 'TAA-API Ausbau'],
    },
    {
      id: 'Kranken',
      description: 'Developers coding health insurance (NOT Fachbereich KV contact)',
      note: 'For KV Fachbereich → no BA assigned in source documents; refer to Ellen Ludwig (CPO) or Dörte Meins (PO).',
      members: [
        { name: 'Ardi Zariqi',    role: 'Developer', fte: 1.0, email: 'az@comparit.de' },
        { name: 'Venera Plakolli', role: 'Developer', fte: 1.0, email: 'vp@comparit.de' },
      ],
      projects: ['KV Voll + Zusatz', 'cpit+ / L9 Features', 'Glocke', 'B2C KV'],
    },
    {
      id: 'QA/Sonstige',
      description: 'QA and miscellaneous',
      members: [
        { name: 'Drilon Osmanaj', role: 'QA Engineer', fte: 1.0, email: 'do@comparit.de' },
      ],
      projects: ['PrintEngine + L9'],
    },
  ],

  teamLeads: [
    {
      name: 'Donart Pllashniku',
      title: 'Team Lead BE/UI',
      email: 'dp@comparit.de',
      source: 'Standort-Informationen_erweitert.xlsx + organigram cpit.pdf',
    },
    {
      name: 'Behar Simnica',
      title: 'Team Lead Kosovo (KO)',
      email: 'bs@comparit.de',
      source: 'organigram cpit.pdf + Teams comparit NEW from 01-03-2026.xlsx',
    },
  ],

  noHamburgTechLead: 'No named Hamburg Tech Team Lead exists in the source documents. For Hamburg dev questions → Ylle Dragaj (CTO, yd@comparit.de) or Donart Pllashniku.',
};
