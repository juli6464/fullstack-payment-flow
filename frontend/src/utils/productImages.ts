import tshirt from '../assets/tshirt.jpg';
import hoodie from '../assets/hoodie.jpg';
import cap from '../assets/cap.jpg';

export const productImages: Record<string, string> = {
  'Classic T-Shirt': tshirt,
  'Premium Hoodie': hoodie,
  'Baseball Cap': cap,
};

export function getProductImage(name: string) {
  return productImages[name] ?? '';
}