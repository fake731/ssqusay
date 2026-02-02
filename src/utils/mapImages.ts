// Dynamic import for Ottoman Empire map images

const mapModules = import.meta.glob('../assets/maps/*.jpg', { eager: true }) as Record<string, { default: string }>;

// Map year to image path
const mapImageMapping: Record<number, string> = {
  1326: 'map-1326',
  1389: 'map-1389',
  1453: 'map-1453',
  1520: 'map-1520',
  1566: 'map-1566',
  1683: 'map-1683',
  1800: 'map-1800',
  1878: 'map-1878',
  1914: 'map-1914',
  1922: 'map-1922',
};

export const getMapImage = (year: number): string => {
  const imageName = mapImageMapping[year];
  if (!imageName) {
    console.warn(`No image mapping found for year: ${year}`);
    return '/placeholder.svg';
  }
  
  const imagePath = `../assets/maps/${imageName}.jpg`;
  const module = mapModules[imagePath];
  
  if (module) {
    return module.default;
  }
  
  console.warn(`Image not found for year: ${year}`);
  return '/placeholder.svg';
};
