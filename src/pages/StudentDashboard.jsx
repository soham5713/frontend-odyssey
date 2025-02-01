import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, getDocs, query } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import { DigitalMessCard } from "../components/DigitalMessCard"

export function StudentDashboard() {
  const { currentUser } = useAuth()
  const [menuItems, setMenuItems] = useState([])

  const fetchMenu = async () => {
    const menuRef = collection(db, "menu")
    const querySnapshot = await getDocs(query(menuRef))
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setMenuItems(items)
  }

  useEffect(() => {
    fetchMenu().catch(error => console.error("Error fetching menu:", error))
  }, [])

  const handleOrderComplete = () => {
    // Refresh user data in AuthContext
    // This will be handled by the onAuthStateChanged listener in AuthContext
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="mb-6">
        <DigitalMessCard />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Menu</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
