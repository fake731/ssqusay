// Map sultan IDs to their unique images
const sultanImages: Record<number, string> = {};

// Dynamically import all sultan images
const sultanImageImports = import.meta.glob('../assets/sultans/*.jpg', { eager: true, as: 'url' });

// Map the imports to sultan IDs
Object.entries(sultanImageImports).forEach(([path, url]) => {
  const match = path.match(/sultan-(\d+)/);
  if (match) {
    sultanImages[parseInt(match[1])] = url as string;
  }
});

export const getSultanImage = (sultanId: number): string => {
  return sultanImages[sultanId] || sultanImages[1] || '';
};

export default sultanImages;
