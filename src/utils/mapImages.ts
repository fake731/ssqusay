// Dynamic import for Ottoman Empire map images - Updated for 15 historical periods

const mapModules = import.meta.glob('../assets/maps/*.jpg', { eager: true }) as Record<string, { default: string }>;

// Map year to image path - 15 precise historical periods
const mapImageMapping: Record<number, string> = {
  1299: 'map-1299',
  1350: 'map-1350',
  1388: 'map-1388',
  1450: 'map-1450',
  1490: 'map-1490',
  1515: 'map-1515',
  1522: 'map-1522',
  1600: 'map-1600',
  1630: 'map-1630',
  1700: 'map-1700',
  1750: 'map-1750',
  1830: 'map-1830',
  1880: 'map-1880',
  1909: 'map-1909',
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
