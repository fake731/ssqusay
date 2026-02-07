// Dynamic import for Ottoman Empire map images - Updated for 15 historical periods

const mapModules = import.meta.glob('../assets/maps/*.jpg', { eager: true }) as Record<string, { default: string }>;

// Map year to image path - 15 precise historical periods
const mapImageMapping: Record<number, string> = {
  1299: 'map-1299',
  1326: 'map-1326',
  1350: 'map-1350',
  1388: 'map-1388',
  1389: 'map-1389',
  1450: 'map-1450',
  1453: 'map-1453',
  1490: 'map-1490',
  1515: 'map-1515',
  1520: 'map-1520',
  1522: 'map-1522',
  1566: 'map-1566',
  1600: 'map-1600',
  1630: 'map-1630',
  1683: 'map-1683',
  1700: 'map-1700',
  1750: 'map-1750',
  1800: 'map-1800',
  1830: 'map-1830',
  1878: 'map-1878',
  1880: 'map-1880',
  1909: 'map-1909',
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
