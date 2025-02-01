/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export function OrderFood({ menuItems, balance, onOrderComplete }) {
  const { currentUser } = useAuth();
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const handlePlaceOrder = async () => {
    const total = calculateTotal();
    if (total > balance) {
      alert("Insufficient balance!");
      return;
    }

    try {
      // Create order
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: currentUser.uid,
        items: selectedItems,
        total: total,
        status: 'pending',
        createdAt: new Date()
      });

      // Update user balance
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        balance: balance - total
      });

      // Clear selected items
      setSelectedItems({});

      // Notify parent component
      onOrderComplete();

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Food</h2>
      <ul className="space-y-2 mb-4">
        {menuItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.name} - ₹{item.price.toFixed(2)}</span>
            <div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
              >
                -
              </button>
              <span>{selectedItems[item.id] || 0}</span>
              <button
                onClick={() => handleSelectItem(item.id)}
                className="bg-green-500 text-white px-2 py-1 rounded ml-2"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">Total: ₹{calculateTotal().toFixed(2)}</span>
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={calculateTotal() === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}