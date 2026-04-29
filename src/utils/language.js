// Note: avoid short words that are also common English words (die→to die, hat→hat, tag→tag, und→and, ist→is)
const germanHints =
  /\b(ich|wer|wie|wo|wann|warum|nicht|der|das|sind|haben|für|über|unser|euer|bitte|danke|hallo|guten|morgen|abend|welche|wieviel|können|arbeitet|spricht|macht|gibt|wofür|nein|ja|bitte|leider|natürlich)\b/i;

const albanianHints =
  /\b(unë|kush|si|ku|kur|pse|nuk|dhe|është|janë|ka|kanë|për|mbi|jonë|juaj|ju lutem|faleminderit|përshëndetje|çfarë|cilët|punon|flet)\b/i;

export function detectLanguage(text) {
  const lower = text.toLowerCase();
  if (albanianHints.test(lower)) return 'Albanian';
  if (germanHints.test(lower)) return 'German';
  return 'English';
}
