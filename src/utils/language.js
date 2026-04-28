const germanHints =
  /\b(ich|wer|wie|wo|wann|warum|nicht|und|der|die|das|ist|sind|hat|haben|für|über|unser|euer|bitte|danke|hallo|guten|tag|morgen|abend|welche|wieviel|können|arbeitet|spricht|macht|gibt|wofür)\b/i;

const albanianHints =
  /\b(unë|kush|si|ku|kur|pse|nuk|dhe|është|janë|ka|kanë|për|mbi|jonë|juaj|ju lutem|faleminderit|përshëndetje|çfarë|cilët|punon|flet)\b/i;

export function detectLanguage(text) {
  const lower = text.toLowerCase();
  if (albanianHints.test(lower)) return 'Albanian';
  if (germanHints.test(lower)) return 'German';
  return 'English';
}
