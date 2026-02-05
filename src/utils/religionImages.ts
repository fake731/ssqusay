// Dynamic import for Ottoman Religion images

const religionModules = import.meta.glob('../assets/religion/*.jpg', { eager: true }) as Record<string, { default: string }>;

const religionImageMapping: Record<number, string> = {
  1: 'religion-sheikh',
  2: 'religion-scholar',
  3: 'religion-court',
  4: 'religion-school',
  5: 'religion-millet',
  6: 'religion-caliphate',
  7: 'religion-sufi',
  8: 'religion-hisba',
};

export const getReligionImage = (id: number): string => {
  const imageName = religionImageMapping[id];
  if (!imageName) {
    return '/placeholder.svg';
  }
  
  const imagePath = `../assets/religion/${imageName}.jpg`;
  const module = religionModules[imagePath];
  
  if (module) {
    return module.default;
  }
  
  return '/placeholder.svg';
};
