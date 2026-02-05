// Dynamic import for Ottoman Trade images

const tradeModules = import.meta.glob('../assets/trade/*.jpg', { eager: true }) as Record<string, { default: string }>;

const tradeImageMapping: Record<number, string> = {
  1: 'trade-silkroad',
  2: 'trade-spices',
  3: 'trade-bazaar',
  4: 'trade-fleet',
  5: 'trade-currency',
  6: 'trade-guild',
  7: 'trade-mining',
  8: 'trade-waqf',
};

export const getTradeImage = (id: number): string => {
  const imageName = tradeImageMapping[id];
  if (!imageName) {
    return '/placeholder.svg';
  }
  
  const imagePath = `../assets/trade/${imageName}.jpg`;
  const module = tradeModules[imagePath];
  
  if (module) {
    return module.default;
  }
  
  return '/placeholder.svg';
};
