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
  // Try exact match first
  if (battleImages[battleId]) return battleImages[battleId];
  
  // Try partial match
  const key = Object.keys(battleImages).find(k => 
    battleId.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(battleId.toLowerCase())
  );
  
  return key ? battleImages[key] : battleImages['constantinople'] || '';
};

export default battleImages;
