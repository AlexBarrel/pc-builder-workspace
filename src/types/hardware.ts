export type ComponentCategory = 'cpu' | 'motherboard' | 'gpu' | 'ram' | 'storage' | 'psu' | 'case';

export interface HardwareSpecs {
  socket?: 'LGA1700' | 'AM5' | 'AM4' | 'LGA1851';
  memoryType?: 'DDR4' | 'DDR5';
  memoryCapacityGbs?: number;
  formFactor?: 'ATX' | 'Micro-ATX' | 'Mini-ITX';
  powerConsumptionWatts?: number;
  psuWattage?: number;
  hasIntegratedGraphics?: boolean;
}

export interface HardwareItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: ComponentCategory;
  specs: HardwareSpecs;
}

export interface CompatibilityIssue {
  type: 'error' | 'warning';
  title: string;
  message: string;
}