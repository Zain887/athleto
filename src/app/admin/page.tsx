'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import {
  collection,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';

interface CartItem {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address?: string;
  city?: string;
  payment?: string;
  total: number;
  status?: string;
  cart: CartItem[];
  createdAt?: Timestamp;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      setOrders(data);
    });
    return () => unsubscribe();
  }, [user]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch {
      setError('Invalid credentials');
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const toggleStatus = async (id: string, currentStatus: string = 'pending') => {
    try {
      const newStatus = currentStatus === 'delivered' ? 'pending' : 'delivered';
      const ref = doc(db, 'orders', id);
      await updateDoc(ref, { status: newStatus });
    } catch (error) {
      console.error('Permission Error:', error);
      alert('You do not have permission to update this order.');
    }
  };

  const deleteOrder = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete order. Check permissions.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf7e3] px-4">
        <form
          onSubmit={signIn}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-[#1C1C1C]"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">🔐 Admin Login</h2>
          {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-[#FFD700] px-4 py-2 mb-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-[#FFD700] px-4 py-2 mb-5 rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#FFD700] text-[#1C1C1C] font-bold py-2 rounded hover:bg-yellow-400"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    const paymentMatch = filter ? order.payment?.toLowerCase() === filter.toLowerCase() : true;
    const statusMatch = statusFilter ? order.status === statusFilter : true;
    return paymentMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-[#fdf7e3] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#1C1C1C]">🧾 Orders Dashboard</h1>
          <button
            onClick={logout}
            className="bg-[#FFD700] text-[#1C1C1C] px-4 py-2 rounded font-bold hover:bg-yellow-400"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <div className="flex gap-3 flex-wrap">
            <select
              onChange={e => setFilter(e.target.value)}
              value={filter}
              className="border border-[#FFD700] px-4 py-2 rounded text-[#1C1C1C]"
            >
              <option value="">All Payments</option>
              <option value="COD">Cash on Delivery</option>
              <option value="BankTransfer">Bank Transfer</option>
              <option value="JazzCash">JazzCash</option>
            </select>

            <select
              onChange={e => setStatusFilter(e.target.value)}
              value={statusFilter}
              className="border border-[#FFD700] px-4 py-2 rounded text-[#1C1C1C]"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <button
            onClick={() => {
              const csvHeader = ['Name', 'Phone', 'Address', 'City', 'Payment', 'Total', 'Status', 'Cart'];
              const csvRows = orders.map(o => [
                o.name,
                o.phone,
                o.address,
                o.city,
                o.payment,
                o.total,
                o.status || 'pending',
                o.cart.map(i => `${i.name} x${i.quantity}`).join('; ')
              ]);
              const content = [csvHeader, ...csvRows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
              const blob = new Blob([content], { type: 'text/csv' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'orders.csv';
              link.click();
            }}
            className="bg-[#FFD700] text-[#1C1C1C] px-4 py-2 rounded font-bold hover:bg-yellow-400 transition"
          >
            ⬇️ Export CSV
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-center text-[#1C1C1C]">No orders found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map(order => (
              <li
                key={order.id}
                className="bg-white border-2 border-[#FFD700] rounded-2xl p-6 shadow-md text-[#1C1C1C] hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold">👤 {order.name}</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => toggleStatus(order.id, order.status)}
                      className={`px-2 py-1 text-xs rounded font-semibold ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status === 'delivered' ? 'Delivered' : 'Pending'}
                    </button>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded font-semibold"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
                <p className="mb-1"><strong>📞 Phone:</strong> {order.phone}</p>
                <p className="mb-1"><strong>📍 Address:</strong> {order.address}, {order.city}</p>
                <p className="mb-1"><strong>💳 Payment:</strong> {order.payment}</p>
                <p className="mb-1"><strong>💰 Total:</strong> <span className="text-[#FFD700] font-semibold">${order.total}</span></p>

                <div className="mt-3">
                  <p className="font-bold mb-1">🛒 Cart:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {order.cart?.map((item, i) => (
                      <li key={i}>
                        {item.name} (x{item.quantity}) - <span className="text-[#FFD700]">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
