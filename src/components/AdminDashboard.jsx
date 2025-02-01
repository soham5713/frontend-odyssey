import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUsersAndTransactions = async () => {
      const usersRef = collection(db, 'users');
      const transactionsRef = collection(db, 'transactions');
      const usersSnapshot = await getDocs(usersRef);
      const transactionsSnapshot = await getDocs(transactionsRef);

      const usersData = [];
      usersSnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);

      const transactionsData = [];
      transactionsSnapshot.forEach((doc) => {
        transactionsData.push({ id: doc.id, ...doc.data() });
      });
      setTransactions(transactionsData);
    };

    fetchUsersAndTransactions();
  }, []);

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      // Refresh users
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const updatedUsers = [];
      usersSnapshot.forEach((doc) => {
        updatedUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user role: ", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border-b pb-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleUpdateUserRole(user.id, 'student')}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Set as Student
                </button>
                <button
                  onClick={() => handleUpdateUserRole(user.id, 'mess_staff')}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                >
                  Set as Mess Staff
                </button>
                <button
                  onClick={() => handleUpdateUserRole(user.id, 'admin')}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Set as Admin
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center">
              <span>{transaction.description}</span>
              <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                ₹{transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
