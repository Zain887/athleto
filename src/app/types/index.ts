// types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: string;
  category: string;
  brand?: string;
  stock: number;
  tag?: string;
  image: string;
  createdAt?: string | null;
}
