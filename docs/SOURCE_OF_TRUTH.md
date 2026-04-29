# WorkBuddy — Source of Truth & Document Mapping

This file defines which source document answers which type of question.  
When two documents conflict, the **priority column** decides which one wins.

---

## Document Index

| Document | Location | Contains | Priority |
|---|---|---|---|
| `Teams_Projekte_Anteile_2026.xlsx` → sheet `Fachbereich-Aufteilung` | ALLData/ | **Fachbereich BA assignments** per insurance product | ★★★ Highest for Fachbereich |
| `Teams comparit NEW from 01-03-2026.xlsx` | ALLData/ | Development team memberships + FTE + project assignments | ★★★ Highest for dev teams |
| `Standort-Informationen_erweitert.xlsx` | ALLData/ | All employees: name, role, team, location, language, email, phone | ★★★ Highest for contact data |
| `organigram cpit.pdf` | ALLData/ | CPIT comparit org chart — hierarchy, reporting lines | ★★★ Highest for CPIT org |
| `organigram WT.pdf` | ALLData/ | wisoTech org chart — hierarchy, reporting lines (Stand: 01.05.2026) | ★★★ Highest for wisotech org |
| `Points of Contact.docx` | ALLData/ | Company address, phone, email, office hours | ★★ |
| `Interne Abkürzungen.docx` | ALLData/ | Internal abbreviations table (Fachbereich + technical terms) | ★★★ Highest for abbreviations |
| `Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx` | ALLData/ | Leave policy, sick days policy, special leave, carry-over rules | ★★★ Highest for leave/sick |
| `Arbeitsrichtlinie_Arbeitszeit_comparit.docx` | ALLData/ | Working hours, 4-day week, core hours, home office rules | ★★★ Highest for work time |
| `Arbeitsrichtlinie_Dienstreisen_comparit.docx` | ALLData/ | Business travel policy, expense rules, booking process | ★★★ Highest for expenses/travel |
| `Arbeitsrichtlinie_SharePoint_Ablagestruktur_cpit.docx` | ALLData/ | SharePoint library structure, access rules | ★★ |
| `Kosovo_Feiertage_Schulferien_2026.xlsx` | ALLData/ | Kosovo 2026 public holidays (exact dates) + school holidays | ★★★ Highest for Kosovo holidays |
| `FER2025_26.pdf`, `FER2026_27.pdf`, `FER2027_28.pdf` | ALLData/ | Hamburg school holidays (Schulferien) 2025–2028 | ★★★ Highest for Hamburg school holidays |
| `Erklärungen zu Meetings.png` | ALLData/ | Meeting types, schedules, mandatory vs optional | ★★ |
| `Teams_Projekte_Anteile_2026.xlsx` → other sheets | ALLData/ | Project milestone planning, team-project matrix | ★★ |
| `Standort-Informationen_wisotech.xlsx` | ALLData/ | wisoTech staff details (supplementary to organigram WT.pdf) | ★★ |

---

## Topic → Source Mapping

### 1. Fachbereich / BA Contacts
> "Fachbereich Sach", "wer ist zuständig für KFZ", "FB LV", etc.

**Source:** `Teams_Projekte_Anteile_2026.xlsx` → sheet `Fachbereich-Aufteilung`  
**App file:** `src/data/sources/fachbereiche.js`  
**Never use:** development team data for Fachbereich questions  

Assignments:
| Product | Primary | Backup |
|---|---|---|
| WG (Wohngebäude) | Justin Kleinschmidt | Dörte Meins |
| HR (Hausrat) | Marvin Jordan | Eva Arfaoui-Holthey |
| PHV | Marvin Jordan | Eva Arfaoui-Holthey |
| THV | Marvin Jordan | Eva Arfaoui-Holthey |
| RS (Rechtsschutz) | Justin Kleinschmidt | Dörte Meins |
| KFZ PKW | Eva Arfaoui-Holthey | Marvin Jordan |
| KFZ Motorrad | Eva Arfaoui-Holthey | Justin Kleinschmidt |
| KFZ Anhänger | Justin Kleinschmidt | Eva Arfaoui-Holthey |
| BU / RiLV | Tanja Nitsch | Michael Portius |
| Dread Disease | Tanja Nitsch | Justin Kleinschmidt |
| LV Produktrating | Lukas Hodel | — |
| KV | **Not assigned in document** | → refer to Ellen Ludwig / Dörte Meins |

---

### 2. Development Teams (Developers)
> "Dev team SACH", "wer programmiert KFZ", "who codes X"

**Source:** `Teams comparit NEW from 01-03-2026.xlsx`  
**App file:** `src/data/sources/devTeams.js`  
**Never use:** for Fachbereich/BA questions

Teams: SACH, Sonderprojekte, IC Webservices, ChargeIT, TI & Infra, KFZ, Kranken, QA/Sonstige

---

### 3. People / Contact Directory
> "email of X", "who is X", "where does X work"

**Source:** `Standort-Informationen_erweitert.xlsx`  
**App file:** `src/data/knowledgeBase.js` → `people` array  
**Rule:** Only list email if it appears in the source document. Mark missing emails as `(not in source documents)`.

---

### 4. CPIT Org Chart
> "show org chart", "who reports to CTO", "org structure"

**Source:** `organigram cpit.pdf`  
**App file:** `src/data/knowledgeBase.js` → `people` array + `OrgChart.jsx` component  

---

### 5. wisoTech Org Chart
> "wisotech team", "who works at wisotech"

**Source:** `organigram WT.pdf` (Stand: 01.05.2026)  
**App file:** `src/data/knowledgeBase.js` → `wisotechPeople` array  

---

### 6. Holidays
> "public holidays", "Feiertage", "when is X holiday"

**Kosovo 2026:** `Kosovo_Feiertage_Schulferien_2026.xlsx`  
**Hamburg public holidays:** German federal law (Hamburg-specific) — documented in buildPrompt.js  
**Hamburg school holidays:** `FER2025_26.pdf`, `FER2026_27.pdf`, `FER2027_28.pdf`  
**Kosovo school holidays:** `Kosovo_Feiertage_Schulferien_2026.xlsx`

---

### 7. Policies (Leave, Sick, Travel, Expenses, Work Hours)
> "how do I request vacation", "sick day rules", "home office policy"

**Source:**  
- Leave/Sick: `Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx`  
- Work hours / 4-day week: `Arbeitsrichtlinie_Arbeitszeit_comparit.docx`  
- Travel/Expenses: `Arbeitsrichtlinie_Dienstreisen_comparit.docx`  
**App file:** `src/data/buildPrompt.js` → POLICIES section  

---

### 8. Workflows
> "how do I log time", "how do I submit expenses", "steps to request leave"

**Source:** Above policy documents  
**App file:** `src/data/buildPrompt.js` → WORKFLOWS section  

---

### 9. Abbreviations / Glossary
> "what does BU mean", "what is TI", "what does SUHK stand for"

**Source:** `Interne Abkürzungen.docx`  
**App file:** `src/data/buildPrompt.js` + `src/data/knowledgeBase.js` → `abbreviations`  

---

### 10. Meetings / Schedule
> "when is standup", "which meetings are mandatory"

**Source:** `Erklärungen zu Meetings.png`  
**App file:** `src/data/buildPrompt.js` → MEETINGS section  

---

## Conflict Resolution Rules

1. **Fachbereich-Aufteilung sheet** always wins for BA responsibility assignments.
2. **Standort-Informationen_erweitert.xlsx** always wins for emails, roles, locations.
3. If an email is not in `Standort-Informationen_erweitert.xlsx` → mark as `(not in source documents)`.
4. **organigram WT.pdf** (Stand: 01.05.2026) always wins for wisotech org structure.
5. Policy documents always win over informal descriptions for leave/sick/expense rules.
6. **Never invent data** not present in any source document.

---

## Data Flow

```
Source Documents (ALLData/)
       ↓
src/data/sources/fachbereiche.js    ← Fachbereich assignments
src/data/sources/devTeams.js        ← Dev team assignments
src/data/knowledgeBase.js           ← People, org, tools, holidays
       ↓
src/data/buildPrompt.js             ← Assembles single SYSTEM_PROMPT
       ↓
server/index.js  ←── both import SYSTEM_PROMPT from buildPrompt.js
api/chat.js      ←──
       ↓
AWS Bedrock (Amazon Nova Pro) → AI answer
```

**Rule: Never edit SYSTEM_PROMPT in server/index.js or api/chat.js directly.**  
**Always update the source file, then it flows through automatically.**
