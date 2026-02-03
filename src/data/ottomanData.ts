// Ottoman Empire Historical Data - Main Export File

export { sultans, type Sultan } from './sultans';
export { battles, type Battle } from './battles';
export { weapons, type Weapon } from './weapons';
export { cities, type City } from './cities';
export { warriors, type Warrior } from './warriors';
export { commanders, getSultanCommanders, type Commander } from './commanders';
export { ottomanMaps, type OttomanMap } from './maps';
export { 
  architectures, 
  architects, 
  getArchitectById, 
  getArchitecturesByArchitect, 
  getArchitecturesBySultan,
  type Architecture, 
  type Architect 
} from './architecture';
