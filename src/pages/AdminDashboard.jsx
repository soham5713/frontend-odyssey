import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore"
import { Button } from "@/components/ui/button"

export function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchUsersAndTransactions = async () => {
      const usersRef = collection(db, "users")
      const transactionsRef = collection(db, "transactions")
      const usersSnapshot = await getDocs(query(usersRef))
      const transactionsSnapshot = await getDocs(query(transactionsRef))

      const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setUsers(usersData)

      const transactionsData = transactionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setTransactions(transactionsData)
    }

    fetchUsersAndTransactions()
  }, [])

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole })
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
    } catch (error) {
      console.error("Error updating user role: ", error)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border-b pb-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <div className="mt-2">
                <Button
                  onClick={() => handleUpdateUserRole(user.id, "student")}
                  variant="primary"
                >
                  Set as Student
                </Button>
                <Button
                  onClick={() => handleUpdateUserRole(user.id, "mess_staff")}
                  variant="success"
                >
                  Set as Mess Staff
                </Button>
                <Button
                  onClick={() => handleUpdateUserRole(user.id, "admin")}
                  variant="destructive"
                >
                  Set as Admin
                </Button>
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
              <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                ₹{transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
