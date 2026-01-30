// Commander images mapping
const commanderImageImports = import.meta.glob('../assets/commanders/*.jpg', { eager: true, as: 'url' });

const commanderImages: Record<string, string> = {};

Object.entries(commanderImageImports).forEach(([path, url]) => {
  const match = path.match(/commander-([^.]+)\.jpg/);
  if (match) {
    commanderImages[match[1]] = url as string;
  }
});

export const getCommanderImage = (commanderName: string): string => {
  const nameMap: Record<string, string> = {
    'hayreddin-barbarossa': 'barbarossa',
    'barbarossa': 'barbarossa',
    'khayreddin': 'barbarossa',
    'koprulu-mehmed': 'koprulu',
    'koprulu': 'koprulu',
    'köprülü': 'koprulu',
    'gazi-osman': 'osman-pasha',
    'osman-pasha': 'osman-pasha',
    'ibrahim-pasha': 'ibrahim',
    'ibrahim': 'ibrahim',
    'turgut-reis': 'turgut',
    'turgut': 'turgut',
    'dragut': 'turgut'
  };

  const normalizedName = commanderName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o');

  const mappedKey = nameMap[normalizedName] || normalizedName;
  
  return commanderImages[mappedKey] || commanderImages['barbarossa'] || '';
};

export const getCommanderImageById = (commanderId: number): string => {
  const idMap: Record<number, string> = {
    1: 'barbarossa',
    2: 'koprulu',
    3: 'koprulu', // Köprülü Fazıl
    4: 'koprulu', // Kara Mustafa
    5: 'osman-pasha',
    6: 'osman-pasha', // Atatürk - using similar style
    7: 'osman-pasha', // Enver Pasha
    8: 'ibrahim',
    9: 'koprulu', // Sokollu
    10: 'turgut'
  };

  return commanderImages[idMap[commanderId]] || commanderImages['barbarossa'] || '';
};

export default commanderImages;
