// Battle images mapping
const battleImageImports = import.meta.glob('../assets/battles/*.jpg', { eager: true, as: 'url' });

const battleImages: Record<string, string> = {};

Object.entries(battleImageImports).forEach(([path, url]) => {
  const match = path.match(/battle-([^.]+)\.jpg/);
  if (match) {
    battleImages[match[1]] = url as string;
  }
});

export const getBattleImage = (battleId: string): string => {
  // Normalize battle id
  const normalizedId = battleId
    .toLowerCase()
    .replace(/battle-of-/g, '')
    .replace(/fall-of-/g, '')
    .replace(/siege-of-/g, '')
    .replace(/second-/g, '')
    .replace(/recapture-of-/g, '')
    .replace(/\s+/g, '-');
  
  // Try exact match first
  if (battleImages[normalizedId]) return battleImages[normalizedId];
  
  // Map common battle names to image files
  const battleMap: Record<string, string> = {
    'constantinople': 'constantinople',
    'istanbul': 'constantinople',
    'kosovo': 'kosovo',
    'nicopolis': 'nicopolis',
    'mohacs': 'mohacs',
    'preveza': 'preveza',
    'vienna': 'vienna',
    'marj-dabiq': 'marjdabiq',
    'marjdabiq': 'marjdabiq',
    'rhodes': 'rhodes',
    'varna': 'varna',
    'chaldiran': 'chaldiran',
    'lepanto': 'lepanto',
    'malta': 'malta',
    'ankara': 'ankara',
    'bursa': 'bursa',
    'maritsa': 'maritsa',
    'ridaniya': 'ridaniya',
    'zenta': 'zenta',
    'chesma': 'chesma',
    'bapheus': 'bapheus',
    'belgrade': 'belgrade',
    // New battles added
    'navarino': 'navarino',
    'plevna': 'plevna',
    'gallipoli': 'gallipoli',
    'çanakkale': 'gallipoli',
    'sarikamish': 'sarikamish',
    'kut': 'kut',
    'dumlupinar': 'dumlupinar',
    'beersheba': 'beersheba',
    'megiddo': 'megiddo',
    'greekwar': 'greekwar',
    'greco-turkish': 'greekwar',
    'kars': 'kars',
    // 10 new battles
    'konya': 'konya',
    'nizib': 'nizib',
    'oltenitza': 'oltenitza',
    'kumanovo': 'kumanovo',
    'lüleburgaz': 'luleburgaz',
    'luleburgaz': 'luleburgaz',
    'romani': 'romani',
    'inonu': 'inonu',
    'sakarya': 'sakarya',
    'afyonkarahisar': 'afyon',
    'afyon': 'afyon',
    'second-kut': 'kut',
    // Additional battles
    'djerba': 'djerba',
    'belgrade-1456': 'belgrade-1456',
    'petrovaradin': 'petrovaradin',
    'silistra': 'silistra',
    'tripoli': 'tripoli',
    'ww1': 'ww1-ottoman'
  };
    'petrovaradin': 'petrovaradin',
    'silistra': 'silistra',
    'tripoli': 'tripoli',
    'ww1': 'ww1-ottoman'
  };
  
  // Try battle map
  const mappedKey = Object.keys(battleMap).find(k => 
    normalizedId.includes(k) || k.includes(normalizedId)
  );
  
  if (mappedKey && battleImages[battleMap[mappedKey]]) {
    return battleImages[battleMap[mappedKey]];
  }
  
  // Try partial match in loaded images
  const key = Object.keys(battleImages).find(k => 
    normalizedId.includes(k.toLowerCase()) ||
    k.toLowerCase().includes(normalizedId)
  );
  
  return key ? battleImages[key] : battleImages['constantinople'] || '';
};

export default battleImages;
