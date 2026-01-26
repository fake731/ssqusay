// Weapon images mapping
const weaponImageImports = import.meta.glob('../assets/weapons/*.jpg', { eager: true, as: 'url' });

const weaponImages: Record<string, string> = {};

Object.entries(weaponImageImports).forEach(([path, url]) => {
  const match = path.match(/weapon-([^.]+)\.jpg/);
  if (match) {
    weaponImages[match[1]] = url as string;
  }
});

export const getWeaponImage = (weaponName: string): string => {
  const typeMap: Record<string, string> = {
    // Swords
    'kilij': 'kilij',
    'قلج': 'kilij',
    'sword': 'kilij',
    'يطاغان': 'yatagan',
    'yatagan': 'yatagan',
    'شمشير': 'shamshir',
    'shashka': 'shamshir',
    'shamshir': 'shamshir',
    'pala': 'kilij',
    // Guns & Artillery
    'مدفع': 'cannon',
    'cannon': 'cannon',
    'great bombard': 'cannon',
    'bombard': 'cannon',
    'dardanelles': 'dardanelles',
    'dardanelles gun': 'dardanelles',
    'abus': 'cannon',
    'abus gun': 'cannon',
    'بندقية': 'musket',
    'musket': 'musket',
    'janissary musket': 'musket',
    'pistol': 'musket',
    'cannon-lock': 'musket',
    // Bows & Projectiles
    'قوس': 'bow',
    'bow': 'bow',
    'ottoman bow': 'bow',
    'crossbow': 'bow',
    'recurve': 'bow',
    // Polearms
    'رمح': 'lance',
    'lance': 'lance',
    'spear': 'lance',
    // Ships
    'سفينة': 'galley',
    'galley': 'galley',
    'ottoman galley': 'galley',
    'ship': 'galley',
    // Heavy weapons
    'فأس': 'axe',
    'axe': 'axe',
    'topuz': 'mace',
    'mace': 'mace',
    'topuz mace': 'mace',
    // Armor & Equipment
    'درع': 'armor',
    'armor': 'armor',
    'tirkeş': 'armor',
    'quiver': 'armor',
    // Siege
    'siege': 'siege',
    'siege tower': 'siege',
    'برج': 'siege',
    // Special weapons
    'greek fire': 'greekfire',
    'نار': 'greekfire',
    'fire': 'greekfire'
  };

  const lowerName = weaponName.toLowerCase();
  
  // Try exact match first
  if (typeMap[lowerName]) {
    return weaponImages[typeMap[lowerName]] || '';
  }
  
  // Try partial match
  const key = Object.keys(typeMap).find(k => 
    lowerName.includes(k) || k.includes(lowerName)
  );
  
  if (key && typeMap[key]) {
    return weaponImages[typeMap[key]] || '';
  }
  
  // Default to kilij
  return weaponImages['kilij'] || Object.values(weaponImages)[0] || '';
};

export default weaponImages;
