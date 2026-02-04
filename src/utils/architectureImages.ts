// Dynamic import for architecture images

const architectureImages = import.meta.glob('../assets/architecture/*.jpg', { eager: true });

// Map architecture IDs to their image paths - Updated with new landmarks
const architectureImageMap: Record<number, string> = {
  1: 'suleymaniye-mosque',
  2: 'blue-mosque',
  3: 'topkapi-palace',
  4: 'dolmabahce-palace',
  5: 'fatih-mosque',
  6: 'selimiye-mosque',
  7: 'sehzade-mosque',
  8: 'hagia-sophia',
  9: 'sokollu-bridge',
  10: 'cagaloglu-hamam',
  11: 'ahmed3-fountain'
};

const architectImageMap: Record<number, string> = {
  1: 'architect-sinan',
  2: 'architect-sinan', // Davud Aga - using Sinan as fallback
  3: 'architect-sinan'  // Sedefkar Mehmed - using Sinan as fallback
};

export const getArchitectureImage = (architectureId: number): string => {
  const imageName = architectureImageMap[architectureId];
  if (!imageName) {
    return '/placeholder.svg';
  }
  
  const imagePath = `../assets/architecture/${imageName}.jpg`;
  const imageModule = architectureImages[imagePath] as { default: string } | undefined;
  
  return imageModule?.default || '/placeholder.svg';
};

export const getArchitectImage = (architectId: number): string => {
  const imageName = architectImageMap[architectId];
  if (!imageName) {
    return '/placeholder.svg';
  }
  
  const imagePath = `../assets/architecture/${imageName}.jpg`;
  const imageModule = architectureImages[imagePath] as { default: string } | undefined;
  
  return imageModule?.default || '/placeholder.svg';
};
