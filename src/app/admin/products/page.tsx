// File: /admin/products.tsx
"use client";

import { useEffect, useState } from 'react';
import { db, auth } from '../../lib/firebase';
import {
    collection,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import ProductCreateForm from '../../components/ProductCreateForm';
import { uploadToCloudinary } from '../../lib/uploadToCloudinary';
import Image from 'next/image';
import { Trash2, Pencil } from 'lucide-react';

interface Product {
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
}

export default function ProductAdmin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<Product>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) router.push('/admin/login');
        });
        return () => unsub();
    }, [router]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'products'), (snap) => {
            const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
            setProducts(data);
        });
        return () => unsub();
    }, []);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (!confirm) return;
        await deleteDoc(doc(db, 'products', id));
    };

    const startEdit = (product: Product) => {
        setEditingId(product.id);
        setForm(product);
        setPreviewUrl(product.image);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({});
        setImageFile(null);
        setPreviewUrl(null);
    };

    const saveEdit = async () => {
        const confirm = window.confirm('Are you sure you want to save these changes?');
        if (!confirm || !editingId) return;
        setUploading(true);
        try {
            let imageUrl = form.image || '';
            if (imageFile) {
                const uploadedUrl = await uploadToCloudinary(imageFile);
                if (uploadedUrl) imageUrl = uploadedUrl;
            }

            const { ...productData } = form;

            await updateDoc(doc(db, 'products', editingId), {
                ...productData,
                image: imageUrl,
            });

            cancelEdit();
        } catch (e) {
            console.error(e);
            setError('Failed to update product');
        } finally {
            setUploading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fdf7e3] px-4 py-8 text-[#1C1C1C]">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">🛠 Manage Products</h1>
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <ProductCreateForm onSuccess={() => setEditingId(null)} />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or category..."
                    className="input mb-4 w-full"
                />

                <div className="grid gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl border p-4 shadow">
                            {editingId === product.id ? (
                                <div className="grid gap-2">
                                    <input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="input" />
                                    <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="input" />
                                    <input type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: +e.target.value })} placeholder="Price" className="input" />
                                    <input type="number" value={form.originalPrice || ''} onChange={e => setForm({ ...form, originalPrice: +e.target.value })} placeholder="Original Price" className="input" />
                                    <input value={form.size || ''} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="Size" className="input" />
                                    <input value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="input" />
                                    <input value={form.brand || ''} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="input" />
                                    <input type="number" value={form.stock || ''} onChange={e => setForm({ ...form, stock: +e.target.value })} placeholder="Stock" className="input" />
                                    <input value={form.tag || ''} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="Tag" className="input" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setImageFile(file);
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setPreviewUrl(reader.result as string);
                                                reader.readAsDataURL(file);
                                            } else {
                                                setPreviewUrl(null);
                                            }
                                        }}
                                        className="input"
                                    />
                                    {previewUrl && (
                                        <Image src={previewUrl} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded border" />
                                    )}
                                    <div className="flex gap-2">
                                        <button onClick={saveEdit} className="bg-[#1C1C1C] text-white px-4 py-2 rounded hover:bg-gray-800">
                                            {uploading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button onClick={cancelEdit} className="text-red-600 font-semibold">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <Image src={product.image} alt={product.name} width={96} height={96} className="w-24 h-24 object-cover rounded border" />
                                        <div>
                                            <h2 className="font-bold text-lg">{product.name}</h2>
                                            <p className="text-sm line-clamp-2">{product.description}</p>
                                            <p className="text-[#FFD700] font-semibold">${product.price}</p>
                                            <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEdit(product)} className="text-blue-600">
                                            <Pencil size={20} />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-600">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
