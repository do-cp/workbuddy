/**
 * IT SUPPORT — External IT support provider information.
 *
 * SOURCE: staff information_IT-Support_comparit.docx
 * Stand: 2025 (document date) | Zuständig: Dennis Krimilowski (IT-TEC)
 *
 * IMPORTANT:
 *   Dennis Krimilowski (IT-TEC) = external IT support for ALL hardware/software problems.
 *   Patrick von der Hagen (pvdh@comparit.de) = internal IT Spezialist (SharePoint, IT admin, internal systems).
 *   For general IT problems, employees contact Dennis first.
 *   For SharePoint access/permissions, contact Patrick or IT Teams channel.
 */

export const itSupportData = {
  _meta: {
    source: 'staff information_IT-Support_comparit.docx',
    documentDate: '2025',
    lastUpdated: '2026-04-29',
  },

  primaryContact: {
    name: 'Dennis Krimilowski',
    company: 'IT-TEC',
    email: 'support@it-tec.de',
    phone: '+49 4533 791010',
    hamburgVisit: 'Every 2 weeks in-person at Hamburg office — ideal for hardware issues.',
    note: 'If Dennis is unreachable, the IT-TEC team is also available at support@it-tec.de and +49 4533 791010.',
  },

  selfHelp: [
    'Restart the device — solves most problems.',
    'Check internet connection: is WiFi connected? VPN active if required?',
    'Close and reopen the application.',
    'Note error message or take a screenshot — helps Dennis with diagnosis.',
    'If problem persists, contact Dennis (see channels below).',
  ],

  channels: [
    {
      channel: 'Email',
      address: 'support@it-tec.de',
      use: 'Non-urgent problems. Write a clear subject, e.g. "IT-Problem: Outlook keeps crashing".',
    },
    {
      channel: 'Phone',
      number: '+49 4533 791010',
      use: 'Urgent problems that require immediate help.',
    },
  ],

  urgencyLevels: [
    {
      level: 'CRITICAL',
      description: 'Cannot work at all — complete outage, no access to systems, security incident (e.g. phishing, data loss).',
      action: 'Report immediately — even outside core hours!',
    },
    {
      level: 'HIGH',
      description: 'Can barely work — important tool or access not functioning, customer project affected.',
      action: 'Report the same day.',
    },
    {
      level: 'NORMAL',
      description: 'Limited function, workaround possible — printer, non-critical software, general questions.',
      action: 'Report by email. Resolution within 1–2 working days.',
    },
    {
      level: 'LOW',
      description: 'Request or improvement suggestion — new tool, setup, adjustments.',
      action: 'No time pressure. Collect and send by email.',
    },
  ],

  commonProblems: [
    { problem: 'Forgot/locked password (Microsoft 365 or company account)', action: 'Contact Dennis — password reset is only done by IT.' },
    { problem: 'Laptop/PC very slow', action: 'Restart first. If it keeps happening, inform Dennis.' },
    { problem: 'No internet connection', action: 'Check WiFi, restart device, then contact Dennis.' },
    { problem: 'Microsoft 365 / Teams error', action: 'Restart the app. For license issues: Dennis.' },
    { problem: 'Email not arriving', action: 'Check spam folder. If needed: Dennis.' },
    { problem: 'Printer not working', action: 'Restart device and printer. Then Dennis.' },
    { problem: 'Received phishing email', action: 'Do NOT click. Report to Dennis immediately (CRITICAL).' },
    { problem: 'Need new device or software', action: 'Use the procurement process (see procurement policy).' },
  ],

  securityReminders: [
    'Phishing: do not open suspicious emails (unknown sender, odd links, attachments). Report to Dennis immediately.',
    'Passwords: never share. Do not write on paper. Inform Dennis immediately if compromise is suspected.',
    'Company devices: do not install private software. Exceptions must be agreed with Dennis.',
    'Data loss: contact Dennis immediately — recovery is often possible.',
    'Unknown USB drives: do not connect any unknown USB devices.',
  ],
};
