/**
 * FACHBEREICH ZUSTÄNDIGKEITEN — Business Analysis contacts per insurance area.
 *
 * SOURCE OF TRUTH: Teams_Projekte_Anteile_2026.xlsx → sheet "Fachbereich-Aufteilung"
 * Last verified: 2026-01-01
 *
 * ⚠️  THESE ARE BUSINESS ANALYSTS (Fachbereich) — NOT SOFTWARE DEVELOPERS.
 *     When someone asks "Fachbereich Sach", "wer ist zuständig für KFZ Fachbereich",
 *     or similar → answer from this file ONLY, never from devTeams.js.
 *
 * Conflict resolution: this sheet wins over any other document for BA assignments.
 * FB1 = Hauptverantwortung (primary), FB2 = Stellvertretung (backup).
 */

export const fachbereiche = {
  _meta: {
    source: 'Teams_Projekte_Anteile_2026.xlsx',
    sheet: 'Fachbereich-Aufteilung',
    lastVerified: '2026-01-01',
    note: 'FB1 = primary (Hauptverantwortung), FB2 = backup (Stellvertretung)',
  },

  // ── SACH (Sachversicherung) ──────────────────────────────────────────────────
  sachversicherung: [
    {
      code: 'WG',
      label: 'Wohngebäude',
      primary: { name: 'Justin Kleinschmidt', email: 'jk@comparit.de', role: 'Business Analyst Products' },
      backup:  { name: 'Dörte Meins',         email: 'dm@comparit.de', role: 'Product Owner' },
    },
    {
      code: 'HR',
      label: 'Hausrat',
      primary: { name: 'Marvin Jordan',       email: 'mj@comparit.de',  role: 'Senior Business Analyst SUHK' },
      backup:  { name: 'Eva Arfaoui-Holthey', email: 'eho@comparit.de', role: 'Business Analystin SUHK' },
    },
    {
      code: 'PHV',
      label: 'Private Haftpflicht',
      primary: { name: 'Marvin Jordan',       email: 'mj@comparit.de',  role: 'Senior Business Analyst SUHK' },
      backup:  { name: 'Eva Arfaoui-Holthey', email: 'eho@comparit.de', role: 'Business Analystin SUHK' },
    },
    {
      code: 'THV',
      label: 'Tierhalterhaftpflicht',
      primary: { name: 'Marvin Jordan',       email: 'mj@comparit.de',  role: 'Senior Business Analyst SUHK' },
      backup:  { name: 'Eva Arfaoui-Holthey', email: 'eho@comparit.de', role: 'Business Analystin SUHK' },
    },
    {
      code: 'RS',
      label: 'Rechtsschutz',
      primary: { name: 'Justin Kleinschmidt', email: 'jk@comparit.de', role: 'Business Analyst Products' },
      backup:  { name: 'Dörte Meins',         email: 'dm@comparit.de', role: 'Product Owner' },
    },
  ],

  // ── KFZ (Kraftfahrzeug) ──────────────────────────────────────────────────────
  kfz: [
    {
      code: 'KFZ-PKW',
      label: 'KFZ PKW',
      primary: { name: 'Eva Arfaoui-Holthey', email: 'eho@comparit.de', role: 'Business Analystin SUHK' },
      backup:  { name: 'Marvin Jordan',       email: 'mj@comparit.de',  role: 'Senior Business Analyst SUHK' },
    },
    {
      code: 'KFZ-Motorrad',
      label: 'KFZ Motorrad',
      primary: { name: 'Eva Arfaoui-Holthey', email: 'eho@comparit.de', role: 'Business Analystin SUHK' },
      backup:  { name: 'Justin Kleinschmidt', email: 'jk@comparit.de',  role: 'Business Analyst Products' },
    },
    {
      code: 'KFZ-Anhänger',
      label: 'KFZ Anhänger',
      primary: { name: 'Justin Kleinschmidt', email: 'jk@comparit.de',  role: 'Business Analyst Products' },
      backup:  { name: 'Eva Arfaoui-Holthey', email: 'eho@comparit.de', role: 'Business Analystin SUHK' },
    },
  ],

  // ── LV (Lebensversicherung) ──────────────────────────────────────────────────
  lebensversicherung: [
    {
      code: 'BU-RiLV',
      label: 'BU / Risikoleben',
      primary: { name: 'Tanja Nitsch',        email: 'tn@comparit.de',  role: 'Senior Business Analystin' },
      backup:  { name: 'Michael Portius',     email: 'mpo@comparit.de', role: 'Senior Business Analyst' },
    },
    {
      code: 'DD',
      label: 'Dread Disease',
      primary: { name: 'Tanja Nitsch',        email: 'tn@comparit.de',  role: 'Senior Business Analystin' },
      backup:  { name: 'Justin Kleinschmidt', email: 'jk@comparit.de',  role: 'Business Analyst Products' },
    },
    {
      code: 'LV-Produkt',
      label: 'LV Produktrating',
      primary: { name: 'Lukas Hodel',         email: 'lho@comparit.de', role: 'Business Analyst' },
      backup:  null,
    },
  ],

  // ── KV (Krankenversicherung) ─────────────────────────────────────────────────
  krankenversicherung: {
    note: 'No BA explicitly assigned in Fachbereich-Aufteilung source document.',
    guidance: 'Refer to Ellen Ludwig (el@comparit.de, CPO) or Dörte Meins (dm@comparit.de, PO) for KV Fachbereich questions.',
    devTeam: ['Ardi Zariqi (az@comparit.de)', 'Venera Plakolli (vp@comparit.de)'],
  },
};
