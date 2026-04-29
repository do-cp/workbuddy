# WorkBuddy — Source of Truth & Document Mapping

This file defines which source document answers which type of question.  
When two documents conflict, the **priority column** decides which one wins.

---

## Document Index

| Document | Location | Contains | Priority | Status |
|---|---|---|---|---|
| `Teams_Projekte_Anteile_2026.xlsx` → sheet `Fachbereich-Aufteilung` | ALLData/ | **Fachbereich BA assignments** per insurance product | ★★★ Highest for Fachbereich | Active |
| `Teams comparit NEW from 01-03-2026.xlsx` | ALLData/ | Development team memberships + FTE + project assignments | ★★★ Highest for dev teams | Active |
| `Standort-Informationen_erweitert.xlsx` | ALLData/ | All employees: name, role, team, location, language, email, phone | ★★★ Highest for contact data | Active |
| `organigram cpit.pdf` *(Stand: 01.03.2026)* | Uploads/ | CPIT comparit org chart — hierarchy, reporting lines | ★★★ Highest for CPIT org | **Updated 2026-04-29** — replaces older version |
| `organigram WT.pdf` *(Stand: 01.05.2026)* | Uploads/ | wisoTech org chart — hierarchy, reporting lines | ★★★ Highest for wisotech org | Active |
| `Holidays in Kosovo.png` | Uploads/ | Kosovo 2026 public holidays visual reference | ★★ Supplementary | New 2026-04-29 |
| `staff information_IT-Support_comparit.docx` | Uploads/ | IT support contact (Dennis Krimilowski/IT-TEC), urgency levels, common issues | ★★★ Highest for IT support contact | **New 2026-04-29** |
| `Arbeitsablauf_Antragserfassung_im_TI.docx` *(v1.0, 29.04.2026)* | Uploads/ | Workflow: how to maintain Antragsfragen in TI Live | ★★★ Highest for TI workflow | **New 2026-04-29** |
| `Workflow Fondslisten (1).docx` | Uploads/ | Workflow: creating new fund lists (LV) in TI Live | ★★★ Highest for Fondslisten workflow | **New 2026-04-29** |
| `Arbeitsrichtlinie_Arbeitszeit_comparit.docx` *(cpit-AZ-001 v1.0)* | Uploads/ | Working hours, 4-day week, core hours, home office, Notfallbereitschaft, time tracking | ★★★ Highest for work time | **Updated 2026-04-29** — official document version |
| `Points of Contact.docx` | ALLData/ | Company address, phone, email, office hours | ★★ | Active |
| `Interne Abkürzungen.docx` | ALLData/ | Internal abbreviations table (Fachbereich + technical terms) | ★★★ Highest for abbreviations | Active |
| `Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx` | ALLData/ | Leave policy, sick days policy, special leave, carry-over rules | ★★★ Highest for leave/sick | Active |
| `Arbeitsrichtlinie_Dienstreisen_comparit.docx` | ALLData/ | Business travel policy, expense rules, booking process | ★★★ Highest for expenses/travel | Active |
| `Arbeitsrichtlinie_SharePoint_Ablagestruktur_cpit.docx` | ALLData/ | SharePoint library structure, access rules | ★★ | Active |
| `Kosovo_Feiertage_Schulferien_2026.xlsx` | ALLData/ | Kosovo 2026 public holidays (exact dates) + school holidays | ★★★ Highest for Kosovo holidays | Active |
| `FER2025_26.pdf`, `FER2026_27.pdf`, `FER2027_28.pdf` | ALLData/ | Hamburg school holidays (Schulferien) 2025–2028 | ★★★ Highest for Hamburg school holidays | Active |
| `Erklärungen zu Meetings.png` | ALLData/ | Meeting types, schedules, mandatory vs optional | ★★ | Active |
| `Teams_Projekte_Anteile_2026.xlsx` → other sheets | ALLData/ | Project milestone planning, team-project matrix | ★★ | Active |
| `Standort-Informationen_wisotech.xlsx` | ALLData/ | wisoTech staff details (supplementary to organigram WT.pdf) | ★★ | Active |

### Documents from 2026-04-29 Upload Batch

| File | Type | Action taken |
|---|---|---|
| `organigram cpit.pdf` | Updated CPIT org chart (Stand: 01.03.2026) | Replaced older version. New people added: Niya Martines, Katarzyna Hausbrandt (Design UI/LV), Bibiana Massimo (BA), Nils Dent, Fabio Schmied, Donika Krasniqi Gjoka, Ardian Hashu, Erza Gashi, Kamel Almaj, Miroslava Placecki. Chantal Voß role updated to "Business Analystin KO/LV". |
| `organigram WT.pdf` | wisoTech org chart (Stand: 01.05.2026) | Same as previously integrated — no changes. |
| `Holidays in Kosovo.png` | Kosovo 2026 holidays visual | Confirms data already in system. No data change needed. |
| `Arbeitsrichtlinie_Arbeitszeit_comparit.docx` | Updated work-time policy (v1.0, Doc cpit-AZ-001) | Confirms 4-day week rules. Adds: Notfallbereitschaft exists for 24/7 SLA coverage; does NOT mean working Fridays. Owner: Axel Karkowski (ak@comparit.de). |
| `staff information_IT-Support_comparit.docx` | New IT support info | New source. Primary IT contact = Dennis Krimilowski (IT-TEC, support@it-tec.de). Patrick von der Hagen = internal IT admin only. Added to `src/data/sources/itSupport.js`. |
| `Arbeitsablauf_Antragserfassung_im_TI.docx` | New TI workflow (v1.0) | New source. Author: Tanja Nitsch. Workflow for managing Antragsfragen in TI Live. Added to `src/data/sources/workflows.js`. |
| `Workflow Fondslisten (1).docx` | New LV Fondslisten workflow | New source. 7-step workflow for creating fund lists in TI Live for LV. Added to `src/data/sources/workflows.js`. |

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
> "how do I log time", "how do I submit expenses", "steps to request leave", "how to add Antragsfrage", "Fondsliste anlegen"

**Sources:**
- Leave/sick/expenses/travel: Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx + Arbeitsrichtlinie_Dienstreisen_comparit.docx
- TI Antragsfragen: Arbeitsablauf_Antragserfassung_im_TI.docx (v1.0, 29.04.2026, Author: Tanja Nitsch)
- LV Fondslisten: Workflow Fondslisten (1).docx
- Time tracking: Arbeitsrichtlinie_Arbeitszeit_comparit.docx

**App file:** `src/data/sources/workflows.js` → dynamically included in `buildPrompt.js`

### 9. IT Support
> "how do I report an IT problem", "IT contact", "password reset", "printer not working"

**Source:** `staff information_IT-Support_comparit.docx`  
**App file:** `src/data/sources/itSupport.js` → dynamically included in `buildPrompt.js`  
**Rule:** Dennis Krimilowski (IT-TEC) = primary IT support. Patrick von der Hagen = internal IT admin/SharePoint only.  

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
Source Documents (ALLData/ + Uploads/)
       ↓
src/data/sources/fachbereiche.js    ← Fachbereich BA assignments
src/data/sources/devTeams.js        ← Dev team assignments
src/data/sources/workflows.js       ← Step-by-step workflows (TI, Fondslisten, HR, Finance)
src/data/sources/itSupport.js       ← IT support contact + urgency/self-help guide
src/data/knowledgeBase.js           ← People, org, tools, holidays (drives frontend components)
       ↓
src/data/buildPrompt.js             ← Imports all sources, assembles single SYSTEM_PROMPT
       ↓
server/index.js  ←── both import SYSTEM_PROMPT from buildPrompt.js
api/chat.js      ←──
       ↓
AWS Bedrock (Amazon Nova Pro) → AI answer
```

**Rule: Never edit SYSTEM_PROMPT in server/index.js or api/chat.js directly.**  
**Always update the source file, then it flows through automatically.**
