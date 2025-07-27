// src/lib/fetchProducts.ts
import { db } from './firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { Product } from '../types';

export async function fetchProducts(): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  const products: Product[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice ?? null,
      size: data.size,
      category: data.category,
      brand: data.brand ?? '',
      stock: data.stock,
      tag: data.tag ?? '',
      image: data.image,
      createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() ?? null,
    };
  });

  return products;
}
