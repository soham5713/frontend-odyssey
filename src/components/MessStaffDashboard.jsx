import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, query, getDocs, updateDoc, doc } from 'firebase/firestore';

export function MessStaffDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMenuAndOrders = async () => {
      const menuRef = collection(db, 'menu');
      const ordersRef = collection(db, 'orders');
      const menuSnapshot = await getDocs(menuRef);
      const ordersSnapshot = await getDocs(ordersRef);

      const menuItems = [];
      menuSnapshot.forEach((doc) => {
        menuItems.push({ id: doc.id, ...doc.data() });
      });
      setMenuItems(menuItems);

      const orders = [];
      ordersSnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(orders);
    };

    fetchMenuAndOrders();
  }, []);

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'menu'), {
        name: newItem.name,
        price: parseFloat(newItem.price)
      });
      setNewItem({ name: '', price: '' });
      // Refresh menu items
      const menuRef = collection(db, 'menu');
      const menuSnapshot = await getDocs(menuRef);
      const menuItems = [];
      menuSnapshot.forEach((doc) => {
        menuItems.push({ id: doc.id, ...doc.data() });
      });
      setMenuItems(menuItems);
    } catch (error) {
      console.error("Error adding menu item: ", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      // Refresh orders
      const ordersRef = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersRef);
      const updatedOrders = [];
      ordersSnapshot.forEach((doc) => {
        updatedOrders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mess Staff Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>
        <form onSubmit={handleAddMenuItem} className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Item
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Menu</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border-b pb-4">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Preparing
                </button>
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                >
                  Ready
                </button>
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Delivered
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
