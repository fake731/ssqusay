// Warrior images mapping
const warriorImageImports = import.meta.glob('../assets/warriors/*.jpg', { eager: true, as: 'url' });

const warriorImages: Record<string, string> = {};

Object.entries(warriorImageImports).forEach(([path, url]) => {
  const match = path.match(/warrior-([^.]+)\.jpg/);
  if (match) {
    warriorImages[match[1]] = url as string;
  }
});

export const getWarriorImage = (warriorType: string): string => {
  const typeMap: Record<string, string> = {
    'janissary': 'janissary',
    'إنكشارية': 'janissary',
    'sipahi': 'sipahi',
    'سيباهي': 'sipahi',
    'akinci': 'akinci',
    'أكينجي': 'akinci',
    'deli': 'deli',
    'دالي': 'deli',
    'topcu': 'topcu',
    'طوبجي': 'topcu',
    'levend': 'levend',
    'ليوند': 'levend',
    'azab': 'azab',
    'عزب': 'azab',
    'bostanci': 'bostanci',
    'بستانجي': 'bostanci',
  };

  const lowerType = warriorType.toLowerCase();
  
  // Try exact match first
  if (typeMap[lowerType]) {
    return warriorImages[typeMap[lowerType]] || '';
  }
  
  // Try partial match
  const key = Object.keys(typeMap).find(k => 
    lowerType.includes(k) || k.includes(lowerType)
  );
  
  if (key && typeMap[key]) {
    return warriorImages[typeMap[key]] || '';
  }
  
  // Default to janissary
  return warriorImages['janissary'] || Object.values(warriorImages)[0] || '';
};

export default warriorImages;
