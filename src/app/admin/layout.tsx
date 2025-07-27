// app/admin/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push('/admin/login');
            } else {
                setUser(currentUser);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/admin/login');
    };

    const isActive = (href: string) =>
        pathname === href ? 'text-[#FFD700] font-semibold' : 'text-white';

    return (
        <div className="flex min-h-screen bg-[#fdf7e3]">
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-[#1C1C1C] text-white p-2 rounded"
            >
                <Menu />
            </button>

            <aside
                className={`fixed md:static top-0 left-0 min-h-screen bg-[#fdf7e3]ll w-64 bg-[#1C1C1C] text-white p-6 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <h2 className="text-2xl font-bold mb-8">ATHLETO Admin</h2>
                <nav className="flex flex-col gap-4">
                    <Link href="/admin/dashboard" className={`${isActive('/admin/dashboard')} hover:text-[#FFD700]`}>
                        📊 Orders
                    </Link>
                    <Link href="/admin/products" className={`${isActive('/admin/products')} hover:text-[#FFD700]`}>
                        🛍 Products
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 p-6 overflow-auto md:ml-64">{children}</main>
        </div>
    );
}
