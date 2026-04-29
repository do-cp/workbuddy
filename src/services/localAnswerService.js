import {
  people,
  tools,
  projects,
  meetings,
  policies,
  holidays,
  abbreviations,
  contacts,
  company,
} from '../data/knowledgeBase.js';
import { detectLanguage } from '../utils/language.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function bold(str) {
  return `**${str}**`;
}

function personCard(p) {
  return (
    `${bold(p.name)} — ${p.role}, ${p.office}\n` +
    `Languages: ${p.languages.join(', ')}\n` +
    `Focus: ${p.focus}`
  );
}

function q(text) {
  return text.toLowerCase();
}

function contains(query, ...words) {
  return words.some((w) => q(query).includes(w));
}

// Whole-word match — use for short/ambiguous keywords to avoid substring false-positives
function containsWord(query, ...words) {
  const lq = q(query);
  return words.some((w) => {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(lq);
  });
}

// ─── Domain matchers ─────────────────────────────────────────────────────────

function tryPeople(query, lang) {
  const lq = q(query);

  // "Who speaks Albanian / German / English?"
  const langMatch = lq.match(/\b(albanian|shqip|german|deutsch|english|englisch)\b/);
  if (langMatch && (contains(lq, 'speak', 'sprich', 'sprecht', 'flet', 'language', 'sprach'))) {
    const target = langMatch[1].toLowerCase();
    const map = { albanian: 'Albanian', shqip: 'Albanian', german: 'German', deutsch: 'German', english: 'English', englisch: 'English' };
    const targetLang = map[target];
    const matched = people.filter((p) =>
      p.languages.some((l) => l.toLowerCase() === targetLang.toLowerCase())
    );
    if (!matched.length) return null;
    const names = matched.map((p) => `${bold(p.name)} (${p.office})`).join(', ');
    const followUps = followUpsFor('people', lang);
    return { answer: `Team members who speak **${targetLang}**: ${names}.`, followUps };
  }

  // "Who is in Prishtina / Hamburg?"
  const officeMatch = lq.match(/\b(prishtina|priština|pristina|hamburg|kosovo)\b/);
  if (officeMatch) {
    const officeKey = officeMatch[1].toLowerCase();
    const officeLabel = officeKey.includes('prishtina') || officeKey.includes('pristina') || officeKey.includes('priština') || officeKey === 'kosovo'
      ? 'Prishtina'
      : 'Hamburg';
    const matched = people.filter((p) => p.office === officeLabel);
    if (!matched.length) return null;
    const names = matched.map((p) => `${bold(p.name)} (${p.role})`).join(', ');
    return {
      answer: `Team members in **${officeLabel}**: ${names}.`,
      followUps: followUpsFor('people', lang),
    };
  }

  // "Who works on / who is the X?" — match by focus/role keywords
  const roleMap = [
    { keys: ['qa', 'quality', 'testing', 'cypress', 'qa lead'], filter: (p) => p.role.toLowerCase().includes('qa') || p.focus.toLowerCase().includes('test') || p.focus.toLowerCase().includes('cypress') },
    { keys: ['sign', 'cpit.sign', 'signature', 'signatures'], filter: (p) => p.focus.toLowerCase().includes('sign') },
    { keys: ['usercenter', 'user center', 'admin portal'], filter: (p) => p.focus.toLowerCase().includes('usercenter') || p.focus.toLowerCase().includes('user center') },
    { keys: ['advisory', 'advisory docs', 'beratung'], filter: (p) => p.focus.toLowerCase().includes('advisory') },
    { keys: ['api layer', 'tariff', 'tarif'], filter: (p) => p.focus.toLowerCase().includes('api') || p.focus.toLowerCase().includes('tariff') },
    { keys: ['frontend', 'front-end', 'design'], filter: (p) => p.focus.toLowerCase().includes('frontend') },
    { keys: ['product manager', 'product management'], filter: (p) => p.role.toLowerCase().includes('product') },
    { keys: ['operations', 'ops', 'events'], filter: (p) => p.role.toLowerCase().includes('operations') },
    // Use whole-word match for short ambiguous keys
    { keys: [], wordKeys: ['ai', 'pm', 'qa'], filter: (p) => p.focus.toLowerCase().includes('ai'), wordFilter: ['ai'] },
    { keys: ['pilot', 'cpit.pilot'], filter: (p) => p.focus.toLowerCase().includes('ai') },
    { keys: ['developer', 'entwickler'], filter: (p) => p.role.toLowerCase().includes('developer') },
  ];

  for (const { keys, wordKeys, filter } of roleMap) {
    const matched_keys = keys && keys.some((k) => lq.includes(k));
    const matched_words = wordKeys && containsWord(lq, ...wordKeys);
    if (matched_keys || matched_words) {
      const matched = people.filter(filter);
      if (!matched.length) continue;
      if (matched.length === 1) {
        return { answer: personCard(matched[0]), followUps: followUpsFor('people', lang) };
      }
      const lines = matched.map((p) => `• ${bold(p.name)} — ${p.role}, ${p.office} (${p.focus})`).join('\n');
      return { answer: lines, followUps: followUpsFor('people', lang) };
    }
  }

  // "Who is Nina / Drilon / ..." — specific person lookup
  for (const p of people) {
    if (lq.includes(p.name.toLowerCase())) {
      return { answer: personCard(p), followUps: followUpsFor('people', lang) };
    }
  }

  // Generic "who" or "team" query
  if (contains(lq, 'who', 'wer', 'kush', 'team', 'colleague', 'kollege', 'everyone', 'alle')) {
    const lines = people.map((p) => `• ${bold(p.name)} — ${p.role}, ${p.office}`).join('\n');
    return { answer: `Here's the team at **comparit**:\n\n${lines}`, followUps: followUpsFor('people', lang) };
  }

  return null;
}

function tryTools(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'tool', 'jira', 'confluence', 'slack', 'figma', 'cypress', 'github', 'postman', 'vscode', 'vs code', 'documentation', 'it issue', 'it problem', 'it support', 'werkzeug', 'zugang') &&
      !containsWord(lq, 'git', 'docs', 'wiki', 'access')) return null;

  // Specific tool lookup
  for (const t of tools) {
    if (lq.includes(t.name.toLowerCase().replace('/', ' ').trim()) || lq.includes(t.name.toLowerCase().split('/')[0].trim())) {
      let answer = `${bold(t.name)} — ${t.purpose}.`;
      if (t.url) answer += ` Access it at **${t.url}**.`;
      return { answer, followUps: followUpsFor('it', lang) };
    }
  }

  // IT issue / support
  if (contains(lq, 'it issue', 'it problem', 'it support', 'report', 'it-support', 'help desk')) {
    return {
      answer: contacts.IT,
      followUps: followUpsFor('it', lang),
    };
  }

  // Documentation
  if (contains(lq, 'documentation', 'docs', 'wiki', 'confluence')) {
    const conf = tools.find((t) => t.name === 'Confluence');
    return {
      answer: `Documentation lives in **Confluence** — ${conf?.url || 'comparit.atlassian.net/wiki'}. Ask your team lead for access if you don't have it yet.`,
      followUps: followUpsFor('it', lang),
    };
  }

  // All tools
  const lines = tools.map((t) => `• ${bold(t.name)}${t.url ? ` (${t.url})` : ''} — ${t.purpose}`).join('\n');
  return {
    answer: `Here are the tools we use at **comparit**:\n\n${lines}`,
    followUps: followUpsFor('it', lang),
  };
}

function tryMeetings(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'meeting', 'standup', 'stand-up', 'sprint', 'planning', 'retro', 'all hands', 'all-hands', 'mandatory', 'pflicht', 'core hours', 'kernzeit', 'schedule', 'rhythm', 'rhythmus', 'when', 'wann', 'time', 'uhrzeit')) return null;

  // Specific meeting lookup
  const meetingMap = [
    { keys: ['standup', 'stand-up', 'daily'], idx: 0 },
    { keys: ['planning', 'sprint planning'], idx: 1 },
    { keys: ['retro', 'retrospective', 'retrospektive'], idx: 2 },
    { keys: ['all hands', 'all-hands', 'allhands'], idx: 3 },
  ];

  for (const { keys, idx } of meetingMap) {
    if (keys.some((k) => lq.includes(k))) {
      const m = meetings[idx];
      return {
        answer: `**${m.name}** — ${m.when}. ${m.mandatory ? 'Attendance is **mandatory**.' : 'Optional but recommended.'}`,
        followUps: followUpsFor('schedule', lang),
      };
    }
  }

  // Core hours
  if (contains(lq, 'core hours', 'kernzeit', 'core time', 'reachable', 'erreichbar')) {
    return {
      answer: `Core hours at comparit are **09:00–15:00 CET** (Mon–Thu). Be reachable on **Teams** during this window — outside that you have flexibility.`,
      followUps: followUpsFor('schedule', lang),
    };
  }

  // Mandatory meetings
  if (contains(lq, 'mandatory', 'pflicht', 'required', 'must')) {
    const mandatory = meetings.filter((m) => m.mandatory);
    const lines = mandatory.map((m) => `• **${m.name}** — ${m.when}`).join('\n');
    return { answer: `Mandatory meetings:\n\n${lines}`, followUps: followUpsFor('schedule', lang) };
  }

  // All meetings
  const lines = meetings.map((m) => `• **${m.name}** — ${m.when}${m.mandatory ? ' *(mandatory)*' : ''}`).join('\n');
  return { answer: `Meeting rhythm at **comparit**:\n\n${lines}`, followUps: followUpsFor('schedule', lang) };
}

function tryPolicies(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'policy', 'policies', 'home office', 'homeoffice', 'vacation', 'urlaub', 'leave', 'sick', 'krank', 'expense', 'kosten', 'rule', 'regel', 'antrag', 'request')) return null;

  if (contains(lq, 'home office', 'homeoffice', 'remote', 'wfh', 'work from home')) {
    return { answer: policies.homeOffice, followUps: followUpsFor('rules', lang) };
  }
  if (contains(lq, 'vacation', 'urlaub', 'leave', 'annual leave', 'holiday request', 'urlaubsantrag')) {
    return { answer: policies.leave, followUps: followUpsFor('leave', lang) };
  }
  if (contains(lq, 'sick', 'krank', 'illness', 'ill', 'sick day', 'sick leave')) {
    return { answer: policies.sickDays, followUps: followUpsFor('leave', lang) };
  }
  if (contains(lq, 'expense', 'kosten', 'reimbursement', 'abrechnung', 'receipt')) {
    return { answer: policies.expenses, followUps: followUpsFor('rules', lang) };
  }

  // All policies
  return {
    answer:
      `Key policies at **comparit**:\n\n` +
      `• **Home Office**: ${policies.homeOffice}\n` +
      `• **Leave**: ${policies.leave}\n` +
      `• **Sick Days**: ${policies.sickDays}\n` +
      `• **Expenses**: ${policies.expenses}`,
    followUps: followUpsFor('rules', lang),
  };
}

function tryHolidays(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'holiday', 'feiertag', 'public holiday', 'bank holiday', 'festtag', 'ferien', 'kosova', 'kosovo', 'germany', 'deutschland', 'hamburg')) return null;

  const isKosovo = contains(lq, 'kosovo', 'kosova', 'prishtina', 'kosovo');
  const isGermany = contains(lq, 'germany', 'deutschland', 'hamburg', 'german');

  if (isKosovo && !isGermany) {
    const lines = holidays.kosovo.map((h) => `• ${h}`).join('\n');
    return { answer: `**Public holidays in Kosovo**:\n\n${lines}`, followUps: followUpsFor('leave', lang) };
  }
  if (isGermany && !isKosovo) {
    const lines = holidays.germany_hamburg_public.map((h) => `• ${h}`).join('\n');
    return { answer: `**Public holidays in Hamburg, Germany**:\n\n${lines}`, followUps: followUpsFor('leave', lang) };
  }

  // Both or generic
  const deLines = holidays.germany_hamburg_public.map((h) => `• ${h}`).join('\n');
  const ksLines = holidays.kosovo.map((h) => `• ${h}`).join('\n');
  return {
    answer: `**Hamburg, Germany**:\n${deLines}\n\n**Kosovo**:\n${ksLines}`,
    followUps: followUpsFor('leave', lang),
  };
}

function tryAbbreviations(query, lang) {
  const lq = q(query);

  // Always try a direct abbreviation lookup first — catches "what does BU stand for?" etc.
  for (const [abbr, meaning] of Object.entries(abbreviations)) {
    const a = abbr.toLowerCase();
    if (
      lq.includes(' ' + a + ' ') ||
      lq.includes(' ' + a + '?') ||
      lq.startsWith(a + ' ') ||
      lq.endsWith(' ' + a) ||
      lq === a
    ) {
      return {
        answer: `**${abbr}** stands for **${meaning}**.`,
        followUps: followUpsFor('rules', lang),
      };
    }
  }

  if (!contains(lq, 'abbreviation', 'abkürzung', 'stand for', 'short for', 'steht für', 'kürzel', 'glossary') &&
      !containsWord(lq, 'mean', 'bedeutet', 'what is', 'was ist', 'was bedeutet')) return null;

  // All abbreviations
  const lines = Object.entries(abbreviations).map(([abbr, meaning]) => `• **${abbr}** — ${meaning}`).join('\n');
  return { answer: `Internal abbreviations at **comparit**:\n\n${lines}`, followUps: followUpsFor('rules', lang) };
}

function tryContacts(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'contact', 'ask', 'reach', 'talk', 'who handle', 'wenden', 'ansprechpartner', 'responsible', 'zuständig', 'hr', 'it support', 'it-support', 'office', 'operations', 'ops')) return null;

  if (contains(lq, 'it', 'technical', 'computer', 'laptop', 'access', 'account', 'password')) {
    return { answer: contacts.IT, followUps: followUpsFor('contacts', lang) };
  }
  if (contains(lq, 'hr', 'human resources', 'personalwesen', 'contract', 'vertrag')) {
    return { answer: contacts.HR, followUps: followUpsFor('contacts', lang) };
  }
  if (contains(lq, 'office', 'operations', 'ops', 'event', 'logistics', 'laimi')) {
    return { answer: contacts.Operations, followUps: followUpsFor('contacts', lang) };
  }
  if (contains(lq, 'qa', 'quality', 'test', 'testing')) {
    return { answer: contacts.QA, followUps: followUpsFor('contacts', lang) };
  }
  if (contains(lq, 'product', 'pm', 'product manager', 'usercenter')) {
    return { answer: contacts.Product, followUps: followUpsFor('contacts', lang) };
  }

  // Overview
  const lines = Object.entries(contacts).map(([area, info]) => `• **${area}**: ${info}`).join('\n\n');
  return { answer: `Points of contact at **comparit**:\n\n${lines}`, followUps: followUpsFor('contacts', lang) };
}

function tryProjects(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'project', 'projekte', 'cpit.', 'app', 'pilot', 'sign', 'usercenter', 'comparison engine', 'advisory')) return null;

  for (const proj of projects) {
    if (lq.includes(proj.name.toLowerCase())) {
      let answer = `**${proj.name}** — ${proj.description}.`;
      if (proj.team?.length) {
        const teamNames = proj.team.map((n) => bold(n)).join(', ');
        answer += ` Main team: ${teamNames}.`;
      }
      return { answer, followUps: followUpsFor('people', lang) };
    }
  }

  const lines = projects.map((p) => `• **${p.name}** — ${p.description}${p.team ? ` (${p.team.join(', ')})` : ''}`).join('\n');
  return { answer: `Projects at **comparit**:\n\n${lines}`, followUps: followUpsFor('people', lang) };
}

function tryCompany(query, lang) {
  const lq = q(query);
  if (!contains(lq, 'comparit', 'cpit', 'company', 'unternehmen', 'firma', 'about', 'what is', 'office', 'location', 'standort')) return null;

  return {
    answer:
      `**comparit** (brand: **cpit**) is an insurance comparison software company with offices in **Hamburg, Germany** and **Prishtina, Kosovo**. ` +
      `The team builds products like cpit.APP, cpit.SIGN, UserCenter, and more.`,
    followUps: followUpsFor('people', lang),
  };
}

// ─── Follow-up suggestions ────────────────────────────────────────────────────

function followUpsFor(category, lang) {
  const map = {
    people: {
      English: ['Who else is in Hamburg?', 'Show team in Prishtina', 'Who speaks Albanian?'],
      German: ['Wer ist noch in Hamburg?', 'Team in Prishtina zeigen', 'Wer spricht Albanisch?'],
      Albanian: ['Kush tjetër është në Hamburg?', 'Ekipi në Prishtinë', 'Kush flet gjermanisht?'],
    },
    it: {
      English: ['How do I access Confluence?', 'What tools do we use?', 'Report an IT issue'],
      German: ['Wie komme ich zu Confluence?', 'Welche Tools nutzen wir?', 'IT-Problem melden'],
      Albanian: ['Si hyjë në Confluence?', 'Çfarë mjetesh përdorim?', 'Raporto problem IT'],
    },
    leave: {
      English: ['How do I request vacation?', 'Holidays in Kosovo', 'What if I am sick?'],
      German: ['Wie beantrage ich Urlaub?', 'Feiertage Kosovo', 'Was, wenn ich krank bin?'],
      Albanian: ['Si kërkoj pushim?', 'Festat në Kosovë', 'Çfarë nëse jam i sëmurë?'],
    },
    schedule: {
      English: ['When is the Daily Standup?', 'Which meetings are mandatory?', 'What are core hours?'],
      German: ['Wann ist das Daily Standup?', 'Welche Meetings sind Pflicht?', 'Was sind Kernzeiten?'],
      Albanian: ['Kur është Daily Standup?', 'Cilat takime janë të detyrueshme?', 'Çfarë janë orët bërthame?'],
    },
    contacts: {
      English: ['Who handles IT issues?', 'Who do I ask for HR?', 'Who manages operations?'],
      German: ['Wer hilft bei IT-Problemen?', 'An wen für HR?', 'Wer leitet Operations?'],
      Albanian: ['Kush merret me IT?', 'Kë pyes për HR?', 'Kush menaxhon operacionet?'],
    },
    rules: {
      English: ['What does BU mean?', 'Home office policy', 'How to submit expenses?'],
      German: ['Was bedeutet BU?', 'Home-Office-Regelung', 'Wie reiche ich Kosten ein?'],
      Albanian: ['Çfarë do të thotë BU?', 'Politika e shtëpisë', 'Si paraqes shpenzimet?'],
    },
  };

  return map[category]?.[lang] || map[category]?.English || [];
}

// ─── Fallback ─────────────────────────────────────────────────────────────────

const fallbacks = {
  English: [
    "Hmm, I'm drawing a blank on that one 🤷 — try asking **Laimi** for office/ops questions, the **IT channel on Teams** for technical stuff, or **hr@comparit.de** for formal HR matters.",
    "I don't have that info yet 🕵️ — best bet is to check with your team lead or drop a message in the relevant **Teams** channel.",
    "Not in my knowledge base yet 🧐 — **Laimi** in Hamburg is usually the first port of call for anything operational.",
  ],
  German: [
    "Da tappe ich im Dunkeln 🤷 — frag mal **Laimi** für Office-Sachen, den **IT-Kanal auf Teams** für Tech-Fragen oder **hr@comparit.de** für HR-Anliegen.",
    "Das weiß ich leider nicht 🕵️ — dein Teamlead oder eine kurze Teams-Nachricht hilft da am schnellsten weiter.",
    "Das steht noch nicht in meiner Wissensdatenbank 🧐 — **Laimi** hat meistens den besten Überblick.",
  ],
  Albanian: [
    "Nuk e di atë 🤷 — provoje të pyesësh **Laimi** për çështje zyre, kanalin **IT në Teams** për teknikë, ose **hr@comparit.de** për HR.",
    "Nuk kam atë informacion ende 🕵️ — team leadi yt ose një mesazh në **Teams** do të ndihmojë.",
    "Kjo nuk është në bazën time të njohurive 🧐 — **Laimi** zakonisht di gjithçka për operacionet.",
  ],
};

let fallbackIdx = 0;

function fallbackAnswer(lang) {
  const list = fallbacks[lang] || fallbacks.English;
  const answer = list[fallbackIdx % list.length];
  fallbackIdx++;
  return {
    answer,
    followUps: [
      lang === 'German' ? 'Welche Tools nutzen wir?' : lang === 'Albanian' ? 'Çfarë mjetesh kemi?' : 'What tools do we use?',
      lang === 'German' ? 'Wer ist im Team?' : lang === 'Albanian' ? 'Kush është në ekip?' : 'Who is on the team?',
      lang === 'German' ? 'Nächstes Meeting?' : lang === 'Albanian' ? 'Takimi tjetër?' : 'Next meeting?',
    ],
  };
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export async function getLocalAnswer(query) {
  const lang = detectLanguage(query);

  // Greeting
  const lq = q(query);
  if (contains(lq, 'hello', 'hi ', 'hey', 'hallo', 'guten morgen', 'guten tag', 'moin', 'përshëndetje', 'mirëdita')) {
    return {
      answer: lang === 'German'
        ? 'Hallo! 👋 Ich bin **WorkBuddy** — dein Assistent für alles rund um **comparit**. Was kann ich für dich tun?'
        : lang === 'Albanian'
        ? 'Përshëndetje! 👋 Jam **WorkBuddy** — asistenti yt për gjithçka rreth **comparit**. Si mund të ndihmoj?'
        : 'Hey there! 👋 I\'m **WorkBuddy**, your internal assistant for everything **comparit**. What can I help you with?',
      followUps: followUpsFor('people', lang),
    };
  }

  return (
    tryMeetings(query, lang) ||
    tryHolidays(query, lang) ||
    tryPolicies(query, lang) ||
    tryAbbreviations(query, lang) ||
    tryContacts(query, lang) ||
    tryTools(query, lang) ||
    tryProjects(query, lang) ||
    tryPeople(query, lang) ||
    tryCompany(query, lang) ||
    fallbackAnswer(lang)
  );
}
