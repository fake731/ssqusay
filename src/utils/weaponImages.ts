// Weapon images mapping
const weaponImageImports = import.meta.glob('../assets/weapons/*.jpg', { eager: true, as: 'url' });

const weaponImages: Record<string, string> = {};

Object.entries(weaponImageImports).forEach(([path, url]) => {
  const match = path.match(/weapon-([^.]+)\.jpg/);
  if (match) {
    weaponImages[match[1]] = url as string;
  }
});

export const getWeaponImage = (weaponType: string): string => {
  const typeMap: Record<string, string> = {
    'سيف': 'kilij',
    'sword': 'kilij',
    'مدفع': 'cannon',
    'cannon': 'cannon',
    'بندقية': 'musket',
    'musket': 'musket',
    'قوس': 'bow',
    'bow': 'bow',
    'رمح': 'lance',
    'lance': 'lance',
    'سفينة': 'galley',
    'galley': 'galley',
    'فأس': 'axe',
    'axe': 'axe',
    'درع': 'armor',
    'armor': 'armor'
  };

  const key = typeMap[weaponType.toLowerCase()] || 
    Object.keys(weaponImages).find(k => weaponType.toLowerCase().includes(k)) ||
    'kilij';
  
  return weaponImages[key] || Object.values(weaponImages)[0] || '';
};

export default weaponImages;
