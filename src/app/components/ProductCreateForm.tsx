'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { uploadToCloudinary } from '../lib/uploadToCloudinary'; // ✅ import Cloudinary uploader

interface Props {
  onSuccess?: () => void;
}

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  size: string;
  category: string;
  brand: string;
  stock: string;
  tag: string;
}

const initialState: ProductFormState = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  size: '',
  category: '',
  brand: '',
  stock: '',
  tag: '',
};

export default function ProductCreateForm({ onSuccess }: Props) {
  const [form, setForm] = useState<ProductFormState>(initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!imageFile) return setError('❌ Image is required');

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageFile); // ✅ Upload to Cloudinary
      if (!imageUrl) {
        setError('❌ Failed to upload image to Cloudinary.');
        return;
      }

      const productData = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        size: form.size.trim(),
        category: form.category.trim(),
        brand: form.brand.trim() || null,
        stock: parseInt(form.stock),
        tag: form.tag.trim() || null,
        image: imageUrl, // ✅ Use Cloudinary image URL
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'products'), productData);

      setForm(initialState);
      setImageFile(null);
      onSuccess?.();
      alert('✅ Product uploaded successfully!');
    } catch (err) {
      console.error(err);
      setError('❌ Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-white border p-4 rounded-xl shadow mb-8">
      <h2 className="text-xl font-bold">➕ Add New Product</h2>
      {error && <p className="text-red-600">{error}</p>}

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="input" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className="input" />
      <input name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="Original Price (optional)" type="number" className="input" />
      <input name="size" value={form.size} onChange={handleChange} placeholder="Sizes (comma separated)" required className="input" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="input" />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand (optional)" className="input" />
      <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" required className="input" />
      <input name="tag" value={form.tag} onChange={handleChange} placeholder="Tag (New, Sale, etc.)" className="input" />
      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} required className="input" />

      <button
        type="submit"
        disabled={uploading}
        className="bg-[#1C1C1C] text-white py-2 px-4 rounded hover:bg-gray-800"
      >
        {uploading ? 'Uploading...' : 'Upload Product'}
      </button>
    </form>
  );
}
