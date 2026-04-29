/**
 * WORKFLOWS — Step-by-step process guides for internal tasks.
 *
 * Sources:
 *   - Arbeitsablauf_Antragserfassung_im_TI.docx  (v1.0, 29.04.2026, Author: Tanja Nitsch)
 *   - Workflow Fondslisten (1).docx
 *   - Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx
 *   - Arbeitsrichtlinie_Dienstreisen_comparit.docx
 *   - Arbeitsrichtlinie_Arbeitszeit_comparit.docx
 *
 * Each workflow has: id, title, source, owner (if known), audience, steps[]
 * Steps: { step, action, note? }
 * Checklist items (if any): checklist[]
 */

export const workflowsData = {
  _meta: {
    lastUpdated: '2026-04-29',
    note: 'Workflows are step-by-step process guides. Do not confuse with policies.',
  },

  workflows: [
    // ── TI: Antragserfassung ─────────────────────────────────────────────────────
    {
      id: 'ti-antragserfassung',
      title: 'Antragserfassung im TI (Tarif-Interface)',
      titleEN: 'Application Question Management in TI Live',
      source: 'Arbeitsablauf_Antragserfassung_im_TI.docx',
      version: '1.0',
      date: '2026-04-29',
      owner: 'Tanja Nitsch (tn@comparit.de)',
      audience: 'Employees with editing access to TI Live',
      system: 'TI Live (Tarif-Ingress)',
      description: 'How to maintain (add, assign, update) application questions (Antragsfragen) in TI Live.',
      useCases: [
        'Assign an existing question to a new Sparte or insurer',
        'Assign a question only to specific insurers or tariffs',
        'Add a completely new application question',
      ],
      prerequisites: [
        'Active login to TI Live with editing rights',
        'Clarity about the affected Sparte (e.g. BU, GF, RisikoLV) and insurers/tariffs',
        'Exact wording of the question and its technical name',
        'Knowledge of whether the question should always appear or only under conditions',
      ],
      steps: [
        // Use case A: Assign existing question to a new Sparte / insurer
        {
          useCase: 'A – Assign existing question to new Sparte/Gesellschaft',
          subSteps: [
            { step: 'A1', action: 'Log in to TI Live.' },
            { step: 'A2', action: 'Select the desired product and Sparte.' },
            { step: 'A3', action: 'Click "Antragsfragen" in the menu.' },
            { step: 'A4', action: 'Find the question in the list. Click the pencil icon to edit.' },
            { step: 'A5', action: 'Check the additional Sparte(n) and save with "Speichern".' },
          ],
        },
        {
          useCase: 'A-variant – Assign question to specific insurers/tariffs only (not whole Sparte)',
          subSteps: [
            { step: 'B1', action: 'Follow steps A1–A4 to open edit mode.' },
            { step: 'B2', action: 'Switch to the insurer/tariff assignment section. Deselect all Sparten.' },
            { step: 'B3', action: 'Select the specific insurer, tariff range, and individual tariffs.' },
            {
              step: 'B4',
              action: 'Save in the inner selection window first.',
              note: 'IMPORTANT: Must save TWICE — once in the inner window and once in the outer form. Missing the second save loses the changes.',
            },
            { step: 'B5', action: 'Save in the outer/parent window.' },
          ],
        },
        {
          useCase: 'B – Add question to a grouping (Gruppierung)',
          subSteps: [
            { step: 'C1', action: 'Make sure you are in the correct Sparte.' },
            { step: 'C2', action: 'Open "Gruppierungen" and select the appropriate group.' },
            { step: 'C3', action: 'Add the question at the desired position and save.', note: 'If this is a completely new Sparte, a new grouping must be created first. Without a grouping, the question will not appear in the application process.' },
          ],
        },
        {
          useCase: 'C – Create a completely new application question',
          subSteps: [
            { step: 'D1', action: 'Go to "Antragsfragen" for the desired Sparte.' },
            { step: 'D2', action: 'Click the button to create a new question.' },
            {
              step: 'D3',
              action: 'Fill in required fields: Name (visible to end user), Technischer Name (unique internal identifier — no special characters or spaces), Sparte (or specific tariffs).',
            },
            { step: 'D4', action: 'Define Relevanzen — controls when the question is shown.' },
            { step: 'D5', action: 'Define Bedingungen (conditions) if the question should only appear under specific circumstances. Skip if the question always appears.' },
            { step: 'D6', action: 'Assign the question to a grouping (see Use Case B above). Required — without this the question does not appear.' },
          ],
        },
      ],
      checklist: [
        'Question is assigned to the correct Sparte.',
        'If insurer/tariff specific: correct insurers and tariffs are selected.',
        'Saved in BOTH dialogs (inner + outer) where required.',
        'Question is added to a grouping.',
        'For a new Sparte: a new grouping was created first.',
        'Name, technical name, and Relevanzen are all filled in.',
      ],
    },

    // ── LV: Neue Fondsliste anlegen ──────────────────────────────────────────────
    {
      id: 'lv-fondsliste',
      title: 'Anlage neuer Fondslisten (LV)',
      titleEN: 'Creating New Fund Lists (Life Insurance)',
      source: 'Workflow Fondslisten (1).docx',
      owner: null,
      audience: 'LV Fachbereich / Business Analysts',
      system: 'TI Live + Jira LV-Board + SharePoint',
      description: 'Full workflow for setting up new fund lists for life insurance products.',
      steps: [
        {
          step: 1,
          action: 'Create a new ticket in the LV-Board (Jira).',
          note: 'Use an existing ticket as template, e.g. FBLV-298.',
        },
        {
          step: 2,
          action: 'Prepare the fund list from the insurer\'s sent list.',
          note: 'Identify which funds are needed. One list often contains individual funds, baskets, and portfolios for multiple tariffs — separate them as needed. Then pass the list to Claude using the "Berufs- und Fondslisten" skill to process it. Ensure the file matches the required format.',
        },
        {
          step: 3,
          action: 'Upload the CSV file to SharePoint under "Fonds_ESG & Fondslisten VU".',
          note: 'Directory structure: 2_Fonds_ESG_Daten → 3_VU_Listen_einlesen',
        },
        {
          step: 4,
          action: 'Create the fund list in TI Live.',
          note: 'Navigate to: TI Live → Sparte → VU → Neue Fondslisten → upload the new list.',
        },
        {
          step: 5,
          action: 'Check settings: verify start date, set status to Live (start date is pulled automatically), and set min/max percentages.',
          note: 'For reference values, check the previous fund list.',
        },
        {
          step: 6,
          action: 'Set default funds (Standardfonds) in TI.',
          note: 'Select one fund for each category: renditeorientiert (performance-focused), kostengünstig (cost-efficient), nachhaltig (sustainable). Use the ISIN from the previous fund list if the fund still exists. If not, ask the insurer for a replacement — but verify comparability before using it.',
        },
        {
          step: 7,
          action: 'Assign the fund list to the relevant tariffs.',
          note: 'Open the tariff in TI Live and set the new fund list. The new list must be explicitly assigned to all relevant tariffs.',
        },
        {
          step: 8,
          action: 'Final check: review all settings. Wait for the fund list to go live and verify on that date.',
          note: 'Set a reminder in Outlook for the go-live date. Then the process is complete.',
        },
      ],
    },

    // ── HR: Leave request ─────────────────────────────────────────────────────────
    {
      id: 'leave-request',
      title: 'Urlaub beantragen (Leave Request)',
      source: 'Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx',
      system: 'Personio',
      steps: [
        { step: 1, action: 'Open Personio → "Abwesenheiten" → "Abwesenheit beantragen".' },
        { step: 2, action: 'Select type: Urlaub. Choose dates. Enter substitute (Vertretung) — REQUIRED.' },
        { step: 3, action: 'Submit. Team lead is notified and approves or declines.' },
        { step: 4, action: 'Once approved: mark dates as "Abwesend" in your Outlook calendar.' },
      ],
      rules: 'Submit at least 2 weeks in advance. Contact Laimi (lp@comparit.de) for help.',
    },

    // ── HR: Sick day reporting ─────────────────────────────────────────────────────
    {
      id: 'sick-report',
      title: 'Krankmeldung (Report Sick)',
      source: 'Arbeitsrichtlinie_Abwesenheiten_comparit_V1.docx',
      system: 'Personio',
      steps: [
        { step: 1, action: 'Report sick in Personio OR message your team lead via Teams — before 09:00 AM on day 1.' },
        { step: 2, action: 'Continue reporting each working day if absence extends.' },
        { step: 3, action: 'From day 4: send sick note (Attest/Arbeitsunfähigkeitsbescheinigung) to hr@comparit.de and inform Laimi.' },
      ],
      rules: 'Child illness Germany: report via Personio — up to 15 days/year per child (§45 SGB V).',
    },

    // ── Finance: Expense submission ──────────────────────────────────────────────
    {
      id: 'expense-submission',
      title: 'Spesenabrechnung einreichen (Submit Expenses)',
      source: 'Arbeitsrichtlinie_Dienstreisen_comparit.docx',
      steps: [
        { step: 1, action: 'Under €25: send receipt directly to Sandra Thomm (sth@comparit.de). Process ends here.' },
        { step: 2, action: 'Over €25: get written team lead approval first.' },
        { step: 3, action: 'Download the Reisekostenabrechnung expense template from SharePoint.' },
        { step: 4, action: 'Fill in the form and attach all receipts.' },
        { step: 5, action: 'Send to Sandra Thomm (sth@comparit.de).' },
      ],
    },

    // ── Finance: Business travel booking ─────────────────────────────────────────
    {
      id: 'business-travel',
      title: 'Dienstreise buchen (Book Business Travel)',
      source: 'Arbeitsrichtlinie_Dienstreisen_comparit.docx',
      steps: [
        { step: 1, action: 'Contact Laimi Pester (lp@comparit.de) — she books flights, trains, and hotels.' },
        { step: 2, action: 'Suggest your preferred route and times in advance.' },
        { step: 3, action: 'Register the trip in Personio as a business trip.' },
        { step: 4, action: 'After return: fill the expense form (SharePoint), attach receipts, send to Sandra Thomm.' },
      ],
    },

    // ── Time tracking ────────────────────────────────────────────────────────────
    {
      id: 'time-tracking',
      title: 'Arbeitszeiten buchen (Log Working Hours in Tempo)',
      source: 'Arbeitsrichtlinie_Arbeitszeit_comparit.docx',
      system: 'Tempo (via Jira)',
      steps: [
        { step: 1, action: 'Open Jira → click "Tempo" in the left sidebar.' },
        { step: 2, action: 'Select the relevant Jira ticket or project.' },
        { step: 3, action: 'Enter date, hours, and a description.' },
        { step: 4, action: 'Save. The entry appears in your Tempo timesheet.' },
      ],
      rules: 'Log daily or weekly. Overtime requires prior team lead approval. Overtime compensation (Freizeitausgleich): request as absence in Personio. Contact: Laimi (lp@comparit.de) for Personio questions.',
    },
  ],
};
