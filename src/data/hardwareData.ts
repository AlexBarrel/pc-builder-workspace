import type { HardwareItem } from '../types/hardware';

export const HARDWARE_CATALOG: HardwareItem[] = [
  {
    id: 'cpu-1',
    name: 'Intel Core i7-14700K',
    brand: 'Intel',
    price: 410,
    category: 'cpu',
    specs: { socket: 'LGA1700', powerConsumptionWatts: 125 }
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    price: 380,
    category: 'cpu',
    specs: { socket: 'AM5', powerConsumptionWatts: 120 }
  },
  {
    id: 'mb-1',
    name: 'ASUS ROG STRIX Z790-E GAMING',
    brand: 'ASUS',
    price: 350,
    category: 'motherboard',
    specs: { socket: 'LGA1700', memoryType: 'DDR5', formFactor: 'ATX' }
  },
  {
    id: 'mb-2',
    name: 'GIGABYTE B650 AORUS ELITE AX',
    brand: 'GIGABYTE',
    price: 220,
    category: 'motherboard',
    specs: { socket: 'AM5', memoryType: 'DDR5', formFactor: 'ATX' }
  },
  {
    id: 'ram-1',
    name: 'Corsair Vengeance RGB 32GB (2x16GB)',
    brand: 'Corsair',
    price: 130,
    category: 'ram',
    specs: { memoryType: 'DDR5', memoryCapacityGbs: 32 }
  },
  {
    id: 'ram-2',
    name: 'G.Skill Ripjaws V 32GB DDR4',
    brand: 'G.Skill',
    price: 75,
    category: 'ram',
    specs: { memoryType: 'DDR4', memoryCapacityGbs: 32 }
  },
  {
    id: 'gpu-1',
    name: 'NVIDIA GeForce RTX 4080 Super',
    brand: 'NVIDIA',
    price: 999,
    category: 'gpu',
    specs: { powerConsumptionWatts: 320 }
  },
  {
    id: 'psu-1',
    name: 'Corsair RM850x 850W 80+ Gold',
    brand: 'Corsair',
    price: 140,
    category: 'psu',
    specs: { psuWattage: 850 }
  },
  {
    id: 'psu-2',
    name: 'EVGA 600 W1 600W',
    brand: 'EVGA',
    price: 55,
    category: 'psu',
    specs: { psuWattage: 600 }
  },
  {
    id: 'case-1',
    name: 'NZXT H7 Flow',
    brand: 'NZXT',
    price: 130,
    category: 'case',
    specs: { formFactor: 'ATX' }
  }
];

export const SLOTS: { category: HardwareItem['category']; label: string }[] = [
  { category: 'cpu', label: 'Процессор (CPU)' },
  { category: 'motherboard', label: 'Материнская плата' },
  { category: 'ram', label: 'Оперативная память (RAM)' },
  { category: 'gpu', label: 'Видеокарта (GPU)' },
  { category: 'storage', label: 'Накопитель (SSD/HDD)' },
  { category: 'psu', label: 'Блок питания (PSU)' },
  { category: 'case', label: 'Корпус' }
];