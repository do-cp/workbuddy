#!/usr/bin/env node
/**
 * validateAnswers.js — Automated validation for WorkBuddy chatbot answers.
 *
 * Usage:
 *   node scripts/validateAnswers.js               # live prod API (https://workbuddy-nu.vercel.app)
 *   node scripts/validateAnswers.js --local        # local dev server (http://localhost:3001)
 *   node scripts/validateAnswers.js --url <URL>    # custom API URL
 *   node scripts/validateAnswers.js --static-only  # skip live tests, run static checks only
 *
 * Exit code 0 = all tests passed.
 * Exit code 1 = one or more tests failed (CI-compatible).
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ── CLI flags ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flagIndex = (flag) => args.indexOf(flag);
const isLocal      = args.includes('--local');
const staticOnly   = args.includes('--static-only');
const customUrlIdx = flagIndex('--url');
const customUrl    = customUrlIdx !== -1 ? args[customUrlIdx + 1] : null;

const BASE_URL = customUrl
  ? customUrl
  : isLocal
    ? 'http://localhost:3001'
    : 'https://workbuddy-nu.vercel.app';

const API_URL = `${BASE_URL}/api/chat`;

// ── Result tracking ───────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures = [];

function pass(id, label) {
  console.log(`  ✅ ${id}: ${label}`);
  passed++;
}

function fail(id, label, detail) {
  console.log(`  ❌ ${id}: ${label}`);
  if (detail) console.log(`     → ${detail}`);
  failed++;
  failures.push({ id, label, detail });
}

// ── Static data-integrity checks ──────────────────────────────────────────────
async function runDataIntegrityChecks() {
  console.log('\n🔍 DATA INTEGRITY CHECKS\n');

  // Dynamically import the data (ES module)
  let people, wisotechPeople;
  try {
    const kb = await import('../src/data/knowledgeBase.js');
    people = kb.people;
    wisotechPeople = kb.wisotechPeople;
  } catch (err) {
    fail('D0', 'knowledgeBase.js loads without error', err.message);
    return;
  }

  // D1 — No [object Object] in languages: every entry must be a string or { lang, src }
  let objectObjCount = 0;
  for (const p of [...people, ...wisotechPeople]) {
    for (const l of (p.languages || [])) {
      if (typeof l !== 'string' && (typeof l.lang !== 'string')) {
        objectObjCount++;
        fail('D1', `Language entry for ${p.name} has no .lang string`, JSON.stringify(l));
      }
    }
  }
  if (objectObjCount === 0) pass('D1', 'All language entries are strings or { lang, src } objects — no [object Object]');

  // D2 — People with empty email must have null language sources (cannot confirm doc)
  for (const p of people) {
    if (!p.email) {
      const hasSourcedLang = (p.languages || []).some(l => typeof l === 'object' && l.src !== null);
      if (hasSourcedLang) {
        fail('D2', `${p.name} has no email but has a sourced (non-null) language`, 'Cannot verify language source without email confirmation');
      }
    }
  }
  const noEmailUnsourcedOk = people.filter(p => !p.email).every(p =>
    (p.languages || []).every(l => typeof l === 'string' || l.src === null)
  );
  if (noEmailUnsourcedOk) pass('D2', 'All no-email people have null-source languages ✓');

  // D3 — No Hamburg person has documented Albanian (sourced)
  const hamburgAlbanian = people.filter(p =>
    p.office === 'Hamburg' &&
    (p.languages || []).some(l => {
      const name = typeof l === 'string' ? l : l.lang;
      const src  = typeof l === 'string' ? 'str' : l.src;
      return name === 'Albanian' && src !== null;
    })
  );
  if (hamburgAlbanian.length === 0) {
    pass('D3', 'No Hamburg person has documented Albanian — language hallucination prevented ✓');
  } else {
    fail('D3', 'Hamburg person(s) with documented Albanian detected', hamburgAlbanian.map(p => p.name).join(', '));
  }

  // D4 — Justin Kleinschmidt has NO Albanian at all
  const justin = people.find(p => p.name === 'Justin Kleinschmidt');
  if (!justin) {
    fail('D4', 'Justin Kleinschmidt found in people[]', 'Person missing from data');
  } else {
    const hasAlbanian = (justin.languages || []).some(l => (typeof l === 'string' ? l : l.lang) === 'Albanian');
    if (hasAlbanian) fail('D4', 'Justin Kleinschmidt must NOT have Albanian', 'Albanian found in his language list');
    else pass('D4', 'Justin Kleinschmidt has no Albanian ✓');
  }

  // D5 — Ylle Dragaj has documented Albanian
  const ylle = people.find(p => p.name === 'Ylle Dragaj');
  if (!ylle) {
    fail('D5', 'Ylle Dragaj found in people[]', 'Person missing from data');
  } else {
    const hasAlbanian = (ylle.languages || []).some(l => {
      const name = typeof l === 'string' ? l : l.lang;
      const src  = typeof l === 'string' ? 'str' : l.src;
      return name === 'Albanian' && src !== null;
    });
    if (hasAlbanian) pass('D5', 'Ylle Dragaj has documented Albanian ✓');
    else fail('D5', 'Ylle Dragaj missing documented Albanian', 'Albanian either missing or has null source');
  }

  // D6 — Every person has _src metadata
  const missingSrc = [...people, ...wisotechPeople].filter(p => !p._src);
  if (missingSrc.length === 0) pass('D6', 'All people have _src per-field metadata ✓');
  else fail('D6', `${missingSrc.length} people missing _src metadata`, missingSrc.map(p => p.name).join(', '));

  // D7 — KFZ project does NOT contain Timo Wickboldt (he is TI & Infra)
  let projects;
  try {
    const kb = await import('../src/data/knowledgeBase.js');
    projects = kb.projects;
  } catch { projects = []; }
  const kfzProject = projects.find(p => p.name === 'KFZ');
  if (kfzProject && kfzProject.contacts.includes('Timo Wickboldt')) {
    fail('D7', 'KFZ project must not list Timo Wickboldt (he is TI & Infra)', 'Remove from KFZ contacts');
  } else {
    pass('D7', 'KFZ project contacts do not include Timo Wickboldt ✓');
  }
}

// ── Static checks ─────────────────────────────────────────────────────────────
function readFile(rel) {
  return readFileSync(resolve(root, rel), 'utf8');
}

function runStaticChecks() {
  console.log('\n📋 STATIC CHECKS\n');

  // S1 — buildPrompt.js imports from all required source files
  const buildPrompt = readFile('src/data/buildPrompt.js');

  const requiredImports = [
    { id: 'S1a', label: 'buildPrompt imports fachbereiche.js',  pattern: /from\s+['"].*fachbereiche\.js['"]/ },
    { id: 'S1b', label: 'buildPrompt imports devTeams.js',      pattern: /from\s+['"].*devTeams\.js['"]/ },
    { id: 'S1c', label: 'buildPrompt imports workflows.js',     pattern: /from\s+['"].*workflows\.js['"]/ },
    { id: 'S1d', label: 'buildPrompt imports itSupport.js',     pattern: /from\s+['"].*itSupport\.js['"]/ },
    { id: 'S1e', label: 'buildPrompt imports knowledgeBase.js', pattern: /from\s+['"].*knowledgeBase\.js['"]/ },
  ];
  for (const { id, label, pattern } of requiredImports) {
    if (pattern.test(buildPrompt)) pass(id, label);
    else fail(id, label, 'Import not found in buildPrompt.js');
  }

  // S2 — dynamic builder functions exist in buildPrompt.js
  const requiredBuilders = [
    { id: 'S2a', label: 'buildPeopleSection() exists',       pattern: /function\s+buildPeopleSection/ },
    { id: 'S2b', label: 'buildWisotechSection() exists',     pattern: /function\s+buildWisotechSection/ },
    { id: 'S2c', label: 'buildFachbereicheSection() exists', pattern: /function\s+buildFachbereicheSection/ },
    { id: 'S2d', label: 'buildDevTeamsSection() exists',     pattern: /function\s+buildDevTeamsSection/ },
    { id: 'S2e', label: 'buildWorkflowsSection() exists',    pattern: /function\s+buildWorkflowsSection/ },
    { id: 'S2f', label: 'buildITSupportSection() exists',    pattern: /function\s+buildITSupportSection/ },
  ];
  for (const { id, label, pattern } of requiredBuilders) {
    if (pattern.test(buildPrompt)) pass(id, label);
    else fail(id, label, 'Builder function not found in buildPrompt.js');
  }

  // S3 — server/index.js and api/chat.js use shared buildPrompt import
  const serverFiles = [
    { id: 'S3a', file: 'server/index.js',  label: 'server/index.js imports SYSTEM_PROMPT from buildPrompt' },
    { id: 'S3b', file: 'api/chat.js',      label: 'api/chat.js imports SYSTEM_PROMPT from buildPrompt' },
  ];
  for (const { id, file, label } of serverFiles) {
    let content;
    try { content = readFile(file); } catch { fail(id, label, `File not found: ${file}`); continue; }
    if (/SYSTEM_PROMPT.*buildPrompt|buildPrompt.*SYSTEM_PROMPT/s.test(content)) pass(id, label);
    else fail(id, label, `${file} does not import SYSTEM_PROMPT from buildPrompt.js`);
  }

  // S4 — knowledgeBase.js must NOT export baAssignments or devTeams (dead exports)
  const kb = readFile('src/data/knowledgeBase.js');
  const deadExports = [
    { id: 'S4a', label: 'knowledgeBase.js does NOT export baAssignments', pattern: /export\s+const\s+baAssignments/ },
    { id: 'S4b', label: 'knowledgeBase.js does NOT export devTeams',      pattern: /export\s+const\s+devTeams/ },
  ];
  for (const { id, label, pattern } of deadExports) {
    if (!pattern.test(kb)) pass(id, label);
    else fail(id, label, 'Dead export still present — remove it to avoid duplicate data');
  }

  // S5 — SYSTEM_PROMPT must NOT leak internal file names to users
  //      (guard: the file names should NOT appear as bare strings outside import lines)
  const promptStart = buildPrompt.indexOf('export const SYSTEM_PROMPT');
  const promptSection = promptStart !== -1 ? buildPrompt.slice(promptStart) : buildPrompt;
  const fileNameLeaks = [
    { id: 'S5a', label: 'SYSTEM_PROMPT does not leak "fachbereiche.js"', pattern: /fachbereiche\.js/ },
    { id: 'S5b', label: 'SYSTEM_PROMPT does not leak "devTeams.js"',     pattern: /devTeams\.js/ },
    { id: 'S5c', label: 'SYSTEM_PROMPT does not leak "knowledgeBase.js"', pattern: /knowledgeBase\.js/ },
    { id: 'S5d', label: 'SYSTEM_PROMPT does not leak "workflows.js"',    pattern: /workflows\.js/ },
    { id: 'S5e', label: 'SYSTEM_PROMPT does not leak "itSupport.js"',    pattern: /itSupport\.js/ },
  ];
  for (const { id, label, pattern } of fileNameLeaks) {
    // Only flag if it appears in the template string itself (after the export line)
    if (!pattern.test(promptSection)) pass(id, label);
    else fail(id, label, 'Internal source file name appears in the SYSTEM_PROMPT template — users would see it');
  }

  // S6 — Key content is present in SYSTEM_PROMPT (smoke check)
  const keyTerms = [
    { id: 'S6a', label: 'SYSTEM_PROMPT contains FACHBEREICH ZUSTÄNDIGKEITEN section', pattern: /FACHBEREICH ZUSTäNDIGKEITEN|FACHBEREICH ZUS/i },
    { id: 'S6b', label: 'SYSTEM_PROMPT contains DEVELOPMENT TEAMS section',           pattern: /DEVELOPMENT TEAMS/i },
    { id: 'S6c', label: 'SYSTEM_PROMPT contains IT support section',                  pattern: /IT.SUPPORT|IT Support/i },
    { id: 'S6d', label: 'SYSTEM_PROMPT contains WORKFLOWS section',                   pattern: /WORKFLOWS|workflows/i },
    { id: 'S6e', label: 'SYSTEM_PROMPT contains FOLLOWUPS instruction',               pattern: /FOLLOWUPS:/i },
    { id: 'S6f', label: 'SYSTEM_PROMPT contains DISAMBIGUATION RULES',                pattern: /DISAMBIGUATION RULES/i },
    { id: 'S6g', label: 'SYSTEM_PROMPT contains FACHBEREICH vs DEV TEAM rule',        pattern: /FACHBEREICH vs DEV TEAM|CRITICAL.*Fachbereich/i },
  ];
  for (const { id, label, pattern } of keyTerms) {
    if (pattern.test(buildPrompt)) pass(id, label);
    else fail(id, label, 'Key content missing from buildPrompt.js — may indicate broken import or deleted section');
  }
}

// ── Live API tests ─────────────────────────────────────────────────────────────
async function ask(question) {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  // The API returns { content, followUps } — content is the text answer
  return (data.content || data.text || JSON.stringify(data)).toLowerCase();
}

/**
 * Test cases — each has:
 *   id       unique test ID
 *   q        the question to ask
 *   required terms that MUST appear in the answer (case-insensitive)
 *   forbidden terms that must NOT appear in the answer
 *   customCheck(answer) → { ok, detail } — optional extra assertion
 */
const TEST_CASES = [
  // ── T1: Fachbereich vs Dev team disambiguation ────────────────────────────
  {
    id: 'T1a',
    q: 'Wer ist für Fachbereich Sach zuständig?',
    required: ['justin', 'marvin'],
    forbidden: ['sebastian thiede', 'flutura', 'anita hasani', 'elvira'],
    note: 'Fachbereich Sach → BA contacts (Justin, Marvin), NOT developers',
  },
  {
    id: 'T1b',
    q: 'Wer ist im Development Team SACH?',
    required: ['sebastian', 'flutura'],
    forbidden: ['justin kleinschmidt', 'marvin jordan'],
    note: 'Dev team SACH → developers (Sebastian, Flutura), NOT BAs',
  },
  {
    id: 'T1c',
    q: 'Fachbereich KFZ',
    required: ['eva'],
    forbidden: ['lirim imeri', 'bleron morina', 'arianit gashi'],
    note: 'Fachbereich KFZ → BA (Eva Arfaoui-Holthey), NOT KFZ developers',
  },
  {
    id: 'T1d',
    q: 'KFZ development team',
    required: ['lirim', 'bleron'],
    forbidden: ['chantal voß', 'chantal voss'],
    note: 'KFZ dev team → developers (Lirim, Bleron), NOT BA',
  },

  // ── T2: Email accuracy ────────────────────────────────────────────────────
  {
    id: 'T2a',
    q: 'What is Behar Simnica email?',
    required: ['bs@comparit.de'],
    forbidden: [],
    note: 'Behar Simnica email must be exact',
  },
  {
    id: 'T2b',
    q: 'What is Argim Kaliqi email?',
    // Argim has a wisotech.de email (unique — only non-comparit.de in people[])
    required: ['argim.kaliqi@wisotech.de'],
    forbidden: ['ak@comparit.de'],
    note: 'Argim Kaliqi email is argim.kaliqi@wisotech.de (wisotech domain, not comparit)',
  },
  {
    id: 'T2c',
    q: 'What is Bibiana Massimo email?',
    // Bibiana has no email in source documents
    required: [],
    forbidden: ['@comparit.de', '@'],
    customCheck: (a) => {
      const invented = /@[a-z]+\.[a-z]+/.test(a) && !a.includes('not in source') && !a.includes("couldn't find") && !a.includes('no email') && !a.includes('not available') && !a.includes('nicht');
      return invented
        ? { ok: false, detail: 'Bot invented an email for Bibiana Massimo who has none in source docs' }
        : { ok: true };
    },
    note: 'Bibiana Massimo has no email — bot must NOT invent one',
  },
  {
    id: 'T2d',
    q: 'What is Niya Martines email?',
    // Niya Martines has no email in source documents
    required: [],
    forbidden: [],
    customCheck: (a) => {
      const invented = /@[a-z]+\.[a-z]+/.test(a) && !a.includes('not in source') && !a.includes("couldn't find") && !a.includes('no email') && !a.includes('not available') && !a.includes('nicht');
      return invented
        ? { ok: false, detail: 'Bot invented an email for Niya Martines who has none in source docs' }
        : { ok: true };
    },
    note: 'Niya Martines has no email — bot must NOT invent one',
  },
  {
    id: 'T2e',
    q: 'What is Anita Hasani email?',
    // Anita Hasani has no email in source documents
    required: [],
    forbidden: [],
    customCheck: (a) => {
      const invented = /@[a-z]+\.[a-z]+/.test(a) && !a.includes('not in source') && !a.includes("couldn't find") && !a.includes('no email') && !a.includes('not available') && !a.includes('nicht') && !a.includes('dokument');
      return invented
        ? { ok: false, detail: 'Bot invented an email for Anita Hasani who has none in source docs' }
        : { ok: true };
    },
    note: 'Anita Hasani has no email — bot must NOT invent one',
  },

  // ── T3: People lookup — new people from org chart ────────────────────────
  {
    id: 'T3a',
    q: 'Who is Bibiana Massimo?',
    required: ['bibiana', 'business analy'],
    forbidden: [],
    note: 'Bibiana Massimo is a Business Analyst — must appear in people data',
  },
  {
    id: 'T3b',
    q: 'What is Chantal Voss role?',
    required: ['chantal'],
    forbidden: [],
    customCheck: (a) => {
      const hasRole = a.includes('business') || a.includes('analystin') || a.includes('analyst') || a.includes('lv') || a.includes('ko');
      return hasRole
        ? { ok: true }
        : { ok: false, detail: 'Chantal Voß role (Business Analystin KO/LV) not mentioned' };
    },
    note: 'Chantal Voß role is Business Analystin KO/LV',
  },

  // ── T4: Workflows ─────────────────────────────────────────────────────────
  {
    id: 'T4a',
    q: 'How do I add an Antragsfrage in TI Live?',
    required: ['ti', 'tanja'],
    forbidden: [],
    note: 'TI workflow — should reference TI Live steps and Tanja Nitsch as contact',
  },
  {
    id: 'T4b',
    q: 'How do I create a new Fondsliste for LV?',
    required: ['fondsliste', 'jira'],
    forbidden: [],
    note: 'LV Fondsliste workflow — must mention Jira ticket and steps',
  },
  {
    id: 'T4c',
    q: 'How do I request leave?',
    required: ['personio'],
    forbidden: [],
    note: 'Leave request goes through Personio',
  },
  {
    id: 'T4d',
    q: 'How do I report sick?',
    required: ['personio'],
    forbidden: [],
    note: 'Sick report goes through Personio',
  },
  {
    id: 'T4e',
    q: 'How do I log my working hours?',
    required: ['tempo'],
    forbidden: [],
    note: 'Time tracking uses Tempo (integrated with Jira)',
  },
  {
    id: 'T4f',
    q: 'How do I submit expenses?',
    required: ['personio'],
    forbidden: [],
    note: 'Expense submission through Personio',
  },

  // ── T5: IT support ────────────────────────────────────────────────────────
  {
    id: 'T5a',
    q: 'Who should I contact for IT support?',
    required: ['dennis', 'it-tec'],
    forbidden: ['patrick von der hagen'],
    note: 'Primary IT support is Dennis Krimilowski (IT-TEC), not Patrick',
  },
  {
    id: 'T5b',
    q: 'My laptop completely stopped working, what do I do?',
    required: ['dennis', 'it-tec'],
    forbidden: [],
    note: 'Critical IT issue → IT-TEC (Dennis)',
  },
  {
    id: 'T5c',
    q: 'I need access to SharePoint',
    required: ['patrick', 'sharepoint'],
    forbidden: [],
    note: 'SharePoint access → Patrick von der Hagen (internal admin)',
  },

  // ── T6: Work-time policies ────────────────────────────────────────────────
  {
    id: 'T6a',
    q: 'Do employees work on Fridays for emergencies?',
    required: [],
    forbidden: [],
    customCheck: (a) => {
      const mentions4day = a.includes('friday') || a.includes('freitag') || a.includes('4-day') || a.includes('vier') || a.includes('4 day') || a.includes('4 tage');
      return mentions4day
        ? { ok: true }
        : { ok: false, detail: 'Answer should mention the 4-day week / Friday arrangements' };
    },
    note: 'Should explain the 4-day week model and Friday policy',
  },
  {
    id: 'T6b',
    q: 'What are the core hours?',
    required: ['09:00', '10:00', '09', '10'],
    forbidden: [],
    customCheck: (a) => {
      const hasHours = /\d{1,2}[:\.]\d{2}/.test(a) || a.includes('core') || a.includes('kernzeit') || a.includes('stunden');
      return hasHours ? { ok: true } : { ok: false, detail: 'Answer should mention specific core hours' };
    },
    note: 'Core hours should be mentioned with times',
  },
  {
    id: 'T6c',
    q: 'What is the 4-day week rule?',
    required: [],
    forbidden: [],
    customCheck: (a) => {
      const mentions4day = a.includes('monday') || a.includes('thursday') || a.includes('montag') || a.includes('donnerstag') || a.includes('4-day') || a.includes('vier') || a.includes('38') || a.includes('40');
      return mentions4day
        ? { ok: true }
        : { ok: false, detail: 'Answer should describe the 4-day week (Mon–Thu) working model' };
    },
    note: 'Should explain Mon–Thu working week model',
  },

  // ── T7: No document filenames in answers ──────────────────────────────────
  {
    id: 'T7a',
    q: 'How do I add an Antragsfrage in TI Live?',
    required: [],
    forbidden: ['.docx', '.pdf', '.xlsx', 'arbeitsablauf_', 'refer to the document', 'refer to document', 'see the document', 'workflow fondslisten', 'antragserfassung_im_ti'],
    customCheck: (a) => {
      const hasFilename = /\.[a-z]{3,4}\b/.test(a) && !/comparit\.de|it-tec\.de|atlassian\.net|sharepoint\.com/.test(a);
      return hasFilename
        ? { ok: false, detail: 'Answer contains a file extension — filenames must not be shown to users' }
        : { ok: true };
    },
    note: 'TI workflow answer must not contain any filename or "refer to document X"',
  },
  {
    id: 'T7b',
    q: 'How do I create a new Fondsliste for LV?',
    required: [],
    forbidden: ['.docx', '.pdf', '.xlsx', 'workflow fondslisten', 'refer to the document', 'refer to document'],
    note: 'Fondsliste workflow answer must not contain filenames',
  },
  {
    id: 'T7c',
    q: 'How do I request leave?',
    required: [],
    forbidden: ['.docx', '.pdf', '.xlsx', 'arbeitsrichtlinie_', 'refer to the document'],
    note: 'Leave request answer must not show source document filenames',
  },

  // ── T8: Workflow numbering — no restart after notes ───────────────────────
  {
    id: 'T8a',
    q: 'How do I assign an Antragsfrage to a specific insurer in TI Live?',
    required: [],
    forbidden: [],
    customCheck: (a) => {
      // Look for the pattern: a step number followed by "save in the inner" or "inner window",
      // then a warning/IMPORTANT note, then "1." appearing again (restart = bad)
      // Simplified check: the word "inner" or "inner window" followed by "1." within 300 chars
      const innerIdx = a.indexOf('inner');
      if (innerIdx === -1) return { ok: true }; // workflow not shown, skip
      const afterInner = a.slice(innerIdx, innerIdx + 400);
      // Bad pattern: "1." appearing after the inner save note (indicates restart)
      // We look for the pattern where a digit like "1." or "1 " appears right after the IMPORTANT note
      const restartPattern = /important.*\n\s*1\.\s/i;
      if (restartPattern.test(afterInner)) {
        return { ok: false, detail: 'Workflow numbering restarts at "1." after the IMPORTANT note — should continue sequentially' };
      }
      return { ok: true };
    },
    note: 'Step numbering must not restart at 1 after the double-save IMPORTANT note',
  },

  // ── T9: Out-of-domain refusal ─────────────────────────────────────────────
  {
    id: 'T9a',
    q: 'What is 1+1?',
    required: [],
    forbidden: ['= 2', '=2', 'equals 2', 'the answer is 2'],
    customCheck: (a) => {
      const refused = a.includes('only') || a.includes('comparit') || a.includes('cpit') || a.includes('wisotech') || a.includes('can only') || a.includes('nur') || a.includes('vetëm') || a.includes('sorry') || a.includes('entschuldigung');
      return refused
        ? { ok: true }
        : { ok: false, detail: 'Bot answered a math question instead of refusing — should redirect to internal topics' };
    },
    note: 'Math questions must be refused — bot is not a general assistant',
  },
  {
    id: 'T9b',
    q: 'How far is the moon from Earth?',
    required: [],
    forbidden: ['384', '385', 'kilometer', 'kilometre', 'miles', 'distance', '384,400'],
    customCheck: (a) => {
      const refused = a.includes('only') || a.includes('comparit') || a.includes('cpit') || a.includes('can only') || a.includes('nur') || a.includes('vetëm');
      return refused
        ? { ok: true }
        : { ok: false, detail: 'Bot answered a general knowledge question about the moon — should refuse and redirect' };
    },
    note: 'General knowledge (moon distance) must be refused',
  },
  {
    id: 'T9c',
    q: 'Who is the president of the USA?',
    required: [],
    forbidden: ['president', 'biden', 'trump', 'obama', 'harris'],
    customCheck: (a) => {
      const refused = a.includes('only') || a.includes('comparit') || a.includes('cpit') || a.includes('can only') || a.includes('nur') || a.includes('vetëm');
      return refused
        ? { ok: true }
        : { ok: false, detail: 'Bot answered a political question — should refuse and redirect to internal topics' };
    },
    note: 'Political/current events questions must be refused',
  },
  {
    id: 'T9d',
    q: 'Write me a poem',
    required: [],
    forbidden: [],
    customCheck: (a) => {
      // A poem would be multi-line creative content. Check that it's a refusal instead.
      const refused = a.includes('only') || a.includes('comparit') || a.includes('cpit') || a.includes('can only') || a.includes('nur') || a.includes('vetëm') || a.includes('sorry') || a.includes('nicht');
      const looksLikePoem = (a.match(/\n/g) || []).length > 3 && a.length > 100 && !a.includes('comparit') && !a.includes('step');
      if (looksLikePoem && !refused) {
        return { ok: false, detail: 'Bot wrote a poem instead of refusing — should redirect to internal topics' };
      }
      return { ok: true };
    },
    note: 'Creative writing requests must be refused',
  },

  // ── T10: Abbreviations — only from documents ──────────────────────────────
  {
    id: 'T10a',
    q: 'What does SUHK mean?',
    // SUHK IS in our documents — bot must answer correctly
    required: ['selbstständige', 'selbststä', 'unternehmer', 'heilberufe', 'kammerberufe'],
    forbidden: [],
    note: 'SUHK is documented — bot must answer correctly from data, not general knowledge',
  },
  {
    id: 'T10b',
    q: 'What does ZXQW mean?',
    // Made-up abbreviation — must NOT be answered from general knowledge
    required: [],
    forbidden: [],
    customCheck: (a) => {
      const refused = a.includes("couldn't find") || a.includes('not found') || a.includes('not in') || a.includes('available documents') || a.includes('nicht') || a.includes('nicht gefunden') || a.includes('nuk') || a.includes('unknown') || a.includes('no information');
      return refused
        ? { ok: true }
        : { ok: false, detail: 'Bot did not refuse a made-up abbreviation — should say it is not in available documents' };
    },
    note: 'Unknown abbreviation ZXQW must be refused — not answered from general knowledge',
  },

  // ── T11: Language attribution accuracy ───────────────────────────────────
  {
    id: 'T11a',
    q: 'Who speaks Albanian in Hamburg?',
    required: [],
    // Justin Kleinschmidt and Ylle Dragaj must NOT appear:
    //   • Justin has no Albanian in the data at all
    //   • Ylle is Remote (Baden-Württemberg), not Hamburg
    forbidden: ['justin', 'ylle dragaj', 'ylle'],
    customCheck: (a) => {
      // The correct answer is: nobody in Hamburg is listed as speaking Albanian
      const correctlyRefuses = a.includes('no one') || a.includes('nobody') || a.includes('not listed') || a.includes('not documented') || a.includes('keine') || a.includes('niemand') || a.includes('nuk') || a.includes('asnjë');
      const inventedSomeone = a.includes('justin') || a.includes('ylle') || (a.includes('albanian') && a.includes('hamburg') && !a.includes('no ') && !a.includes('not ') && !a.includes('keine') && !a.includes('niemand'));
      if (inventedSomeone) {
        return { ok: false, detail: 'Bot attributed Albanian to a Hamburg person who does not have it in their data (hallucination)' };
      }
      return { ok: true };
    },
    note: 'No Hamburg employee has Albanian documented — bot must not invent one',
  },
  {
    id: 'T11b',
    q: 'Who speaks Albanian?',
    required: [],
    forbidden: ['justin kleinschmidt'],
    customCheck: (a) => {
      // Justin speaks German+English only — must not appear in an Albanian speakers list
      if (a.includes('justin')) {
        return { ok: false, detail: 'Justin Kleinschmidt appears in Albanian speakers list — his data has only German/English' };
      }
      // Ylle Dragaj (CTO) SHOULD appear — he has documented Albanian
      const hasYlle = a.includes('ylle') || a.includes('dragaj');
      if (!hasYlle) {
        return { ok: false, detail: 'Ylle Dragaj (CTO, documented Albanian speaker) missing from Albanian speakers list' };
      }
      return { ok: true };
    },
    note: 'Albanian speakers list: Ylle must appear, Justin must NOT appear',
  },
  {
    id: 'T11c',
    q: 'Who is Ylle Dragaj and what languages does he speak?',
    required: ['ylle', 'cto', 'albanian', 'sq'],
    forbidden: ['hamburg'],
    customCheck: (a) => {
      // Ylle is Remote (Baden-Württemberg), not Hamburg
      const wrongOffice = a.includes('hamburg') && !a.includes('remote') && !a.includes('baden');
      if (wrongOffice) {
        return { ok: false, detail: 'Ylle Dragaj shown as Hamburg-based — he is Remote (Baden-Württemberg)' };
      }
      return { ok: true };
    },
    note: 'Ylle Dragaj: CTO, speaks Albanian, Remote (Baden-Württemberg) — not Hamburg',
  },
];

async function runLiveTests() {
  console.log(`\n🌐 LIVE API TESTS — ${API_URL}\n`);

  for (const tc of TEST_CASES) {
    let answer;
    try {
      answer = await ask(tc.q);
    } catch (err) {
      fail(tc.id, tc.q, `Request failed: ${err.message}`);
      continue;
    }

    let testPassed = true;
    const details = [];

    // Check required terms
    for (const term of (tc.required || [])) {
      if (!answer.includes(term.toLowerCase())) {
        testPassed = false;
        details.push(`Missing required term: "${term}"`);
      }
    }

    // Check forbidden terms
    for (const term of (tc.forbidden || [])) {
      if (answer.includes(term.toLowerCase())) {
        testPassed = false;
        details.push(`Contains forbidden term: "${term}"`);
      }
    }

    // Run custom check
    if (tc.customCheck) {
      const result = tc.customCheck(answer);
      if (!result.ok) {
        testPassed = false;
        if (result.detail) details.push(result.detail);
      }
    }

    if (testPassed) {
      pass(tc.id, tc.q);
    } else {
      fail(tc.id, tc.q, details.join(' | '));
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  WorkBuddy Answer Validator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (!staticOnly) console.log(`  Target: ${API_URL}`);
  console.log(`  Mode:   ${staticOnly ? 'static checks only' : isLocal ? 'local' : 'production'}`);

  runStaticChecks();
  await runDataIntegrityChecks();

  if (!staticOnly) {
    await runLiveTests();
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  const total = passed + failed;
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Results: ${passed}/${total} passed   ${failed > 0 ? `(${failed} FAILED)` : '✅ ALL PASSED'}`);

  if (failures.length > 0) {
    console.log('\n  FAILED TESTS:');
    for (const f of failures) {
      console.log(`    • [${f.id}] ${f.label || f.id}`);
      if (f.detail) console.log(`      ${f.detail}`);
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Validator crashed:', err);
  process.exit(1);
});
