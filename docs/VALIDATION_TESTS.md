# WorkBuddy — Validation Tests

Use these test cases to verify that the AI answers questions correctly from the right source.  
A test **FAILS** if: the AI returns developers for Fachbereich questions, invents email addresses, or mixes up data sources.

---

## Test Group 1: Fachbereich (Business Analysis) Contacts

### T1.1 — Fachbereich Sach (general)
**Input:** "Fachbereich Sach" / "wer ist zuständig für Sachversicherung Fachbereich"  
**Expected:** List of BAs by product area, NOT developers  
- WG: **Justin Kleinschmidt** (jk@comparit.de)  
- HR / PHV / THV: **Marvin Jordan** (mj@comparit.de)  
- RS: **Justin Kleinschmidt** (jk@comparit.de)  
**FAIL if:** Returns Sebastian Thiede, Flutura Fejzullahu, Elvira Hasani, or any developer  
**Source:** `Teams_Projekte_Anteile_2026.xlsx` → Fachbereich-Aufteilung  

### T1.2 — Fachbereich KFZ
**Input:** "Fachbereich KFZ" / "wer ist für KFZ zuständig"  
**Expected:**  
- PKW / Motorrad: **Eva Arfaoui-Holthey** (eho@comparit.de)  
- Anhänger: **Justin Kleinschmidt** (jk@comparit.de)  
**FAIL if:** Returns Lirim Imeri, Bleron Morina, or any KFZ developer  

### T1.3 — Fachbereich LV
**Input:** "lv fachbereich" / "Fachbereich Lebensversicherung"  
**Expected:**  
- BU / RiLV: **Tanja Nitsch** (tn@comparit.de), backup: Michael Portius  
- Dread Disease: **Tanja Nitsch**, backup: Justin Kleinschmidt  
- LV Produktrating: **Lukas Hodel** (lho@comparit.de)  
**FAIL if:** Returns Dörte Meins as primary (she is PO, not LV FB1) — unless specifically asked about overall Product Owner  

### T1.4 — Fachbereich KV
**Input:** "kv fachbereich" / "Fachbereich Krankenversicherung"  
**Expected:** Inform that no BA is explicitly assigned for KV in the source documents. Refer to Ellen Ludwig (CPO) or Dörte Meins (PO).  
**FAIL if:** Returns Ardi Zariqi or Venera Plakolli as "Fachbereich KV" — they are developers, not BAs  

### T1.5 — WG backup
**Input:** "wer ist Vertretung für Wohngebäude Fachbereich"  
**Expected:** **Dörte Meins** (dm@comparit.de)  

---

## Test Group 2: Development Teams (Developers)

### T2.1 — Dev team SACH
**Input:** "who is on the dev team SACH" / "wer entwickelt Sachversicherung"  
**Expected:** Sebastian Thiede, Flutura Fejzullahu, Anita Hasani, Elvira Hasani, Çlirim Murati, Ardit Gjyrevci  
**Note:** Must explicitly label them as developers, not Fachbereich  
**Source:** `Teams comparit NEW from 01-03-2026.xlsx`  

### T2.2 — Team lead
**Input:** "who is the team lead" / "wer ist Team Lead"  
**Expected:** Donart Pllashniku (Team Lead BE/UI) + Behar Simnica (Team Lead Kosovo/KO)  
**FAIL if:** Returns Timo Wickboldt as "Hamburg Team Lead" — no Hamburg tech lead exists in documents  

### T2.3 — Dev team KFZ vs Fachbereich KFZ
**Input:** "KFZ team" (ambiguous)  
**Expected:** Clarify the distinction — ask if they mean the dev team (Lirim Imeri, Bleron Morina, Arianit Gashi) or the Fachbereich contact (Eva Arfaoui-Holthey for PKW)  

---

## Test Group 3: Org Charts

### T3.1 — CPIT comparit org chart
**Input:** "show org chart" / "comparit Organigramm"  
**Expected:** Opens CPIT comparit tab showing CPIT employees with Leadership + team sections  
**Source:** `organigram cpit.pdf`  

### T3.2 — wisoTech org chart
**Input:** "wisotech org chart" / "wisotech Organigramm"  
**Expected:** Opens wisoTech tab showing: Dr. Ing. Dirk Sommermeyer (CEO), Matthias Brauch (CEO), Ylle Dragaj (CTO), dev team  
**Source:** `organigram WT.pdf` Stand: 01.05.2026  

---

## Test Group 4: Email Addresses

### T4.1 — @comparit.de emails
**Input:** "what is Behar Simnica's email"  
**Expected:** bs@comparit.de  
**FAIL if:** Returns bs2@comparit.de or any other variation  

### T4.2 — @wisotech.de email
**Input:** "what is Argim Kaliqi's email"  
**Expected:** argim.kaliqi@wisotech.de  
**FAIL if:** Returns argim.kaliqi@comparit.de (wrong domain)  

### T4.3 — Person without email in documents
**Input:** "what is Anita Hasani's email" / "email von Anita Hasani"  
**Expected:** Inform that email is not in the source documents. Do not invent one.  
**FAIL if:** Invents an email like ah@comparit.de or anita.hasani@comparit.de  

### T4.4 — Person without email: Qëndresa Rexhbogaj
**Input:** "email of Qëndresa Rexhbogaj"  
**Expected:** Email not available in source documents (she is wisotech staff)  

---

## Test Group 5: People / Location

### T5.1 — Who is in Hamburg
**Input:** "who works in Hamburg" / "wer ist in Hamburg"  
**Expected:** List of people with office: Hamburg  
**FAIL if:** Returns holidays or office address instead of people list  

### T5.2 — Languages — never guess
**Input:** "does Behar Simnica speak German"  
**Expected:** Based only on source data — Behar is listed as Albanian + English only. Answer: not listed as German speaker.  
**FAIL if:** Guesses "probably speaks German because he works with German colleagues"  

---

## Test Group 6: Policies & Workflows

### T6.1 — 4-day week
**Input:** "4-Tage-Woche", "wann ist Freitag frei"  
**Expected:** Mon–Thu only. Friday off. 36h/week. Since 01.01.2026. Valid until 31.12.2026 then evaluated. Salary unchanged.  
**Source:** `Arbeitsrichtlinie_Arbeitszeit_comparit.docx`  

### T6.2 — Leave request workflow
**Input:** "how do I request vacation" / "wie beantrage ich Urlaub"  
**Expected:** Step-by-step: Personio → Abwesenheiten → type Urlaub → dates → Vertretung → submit → Outlook.  
**FAIL if:** Says to use Jira for leave requests  

### T6.3 — Core hours
**Input:** "what are core hours" / "Kernarbeitszeit"  
**Expected:** 09:00–15:00 CET  
**FAIL if:** Returns 10:00  

### T6.4 — Expense threshold
**Input:** "how do I submit expenses"  
**Expected:** Under €25 → Sandra Thomm directly. Over €25 → team lead approval first.  

---

## Test Group 7: Holidays

### T7.1 — Kosovo holidays 2026
**Input:** "Kosovo public holidays 2026" / "Feiertage Kosovo 2026"  
**Expected:** List of 11 dates including Bajrami i Madh (Mar 20) and Bajrami i Vogël (May 27)  
**Source:** `Kosovo_Feiertage_Schulferien_2026.xlsx`  

### T7.2 — Hamburg school holidays
**Input:** "Hamburg Schulferien 2026"  
**Expected:** Ostern 02.03–13.03, Pfingsten 11.05–15.05, Sommer 09.07–19.08 (2026)  

---

## Running These Tests

To test manually:
1. Start the app locally (`npm run dev` + `npm run dev` in /server)
2. Ask each question exactly as written in the **Input** field
3. Check the response against **Expected**
4. If a **FAIL** condition is triggered, trace back to `src/data/buildPrompt.js` and the relevant source file

To test the deployed version, use the same questions on the Vercel deployment.

---

## Known Limitations (as of 2026-04-29)

- KV Fachbereich: No BA assigned in source documents. This is a data gap, not a system bug.
- Some people (Anita Hasani, Arber Mirena, Behxhet Rexha, Cornelia Rieger, Sebastian Houshmand, Muhamed Zeqiri, Fisnik Kusari, Ag Hamiti, Qëndresa Rexhbogaj) have no email in source documents.
- Hergen (ChargeIT) and Miro (Sonstige) appear in dev team spreadsheet but have no full name or email in available documents.
