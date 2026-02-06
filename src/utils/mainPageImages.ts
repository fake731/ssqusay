// Dynamic import for main page images

const mainModules = import.meta.glob('../assets/main/*.jpg', { eager: true }) as Record<string, { default: string }>;

const mainImageMapping: Record<string, string> = {
  'strength-military': 'strength-military',
  'strength-tolerance': 'strength-tolerance',
  'strength-technology': 'strength-technology',
  'strength-trade': 'strength-trade',
  'strength-position': 'strength-position',
  'weakness-succession': 'weakness-succession',
  'weakness-corruption': 'weakness-corruption',
  'weakness-stagnation': 'weakness-stagnation',
  'weakness-harem': 'weakness-harem',
  'weakness-expansion': 'weakness-expansion',
};

export const getMainImage = (key: string): string => {
  const imageName = mainImageMapping[key];
  if (!imageName) {
    return '/placeholder.svg';
  }
  
  const imagePath = `../assets/main/${imageName}.jpg`;
  const module = mainModules[imagePath];
  
  if (module) {
    return module.default;
  }
  
  return '/placeholder.svg';
};
