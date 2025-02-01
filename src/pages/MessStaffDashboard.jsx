import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, addDoc, query, onSnapshot, updateDoc, doc, serverTimestamp } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function MessStaffDashboard() {
  const [menuItems, setMenuItems] = useState([])
  const [newItem, setNewItem] = useState({ name: "", price: "" })
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const menuRef = collection(db, "menu")
    const ordersRef = collection(db, "orders")

    const unsubscribeMenu = onSnapshot(query(menuRef), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMenuItems(items)
    })

    const unsubscribeOrders = onSnapshot(query(ordersRef), (snapshot) => {
      const orderData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setOrders(orderData)
      setLoading(false)
    })

    return () => {
      unsubscribeMenu()
      unsubscribeOrders()
    }
  }, [])

  const handleAddMenuItem = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "menu"), {
        name: newItem.name,
        price: Number.parseFloat(newItem.price),
        createdAt: serverTimestamp(),
      })
      setNewItem({ name: "", price: "" })
      toast({
        title: "Success",
        description: "Menu item added successfully!",
      })
    } catch (error) {
      console.error("Error adding menu item: ", error)
      toast({
        title: "Error",
        description: "Failed to add menu item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      })
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating order status: ", error)
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Mess Staff Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Menu Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMenuItem} className="space-y-4">
            <Input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full"
              required
            />
            <Input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="w-full"
              required
            />
            <Button type="submit">Add Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="text-muted-foreground">₹{item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border-b pb-4">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Status:</strong> <Badge>{order.status}</Badge>
                </p>
                <div className="mt-2 space-x-2">
                  <Button onClick={() => handleUpdateOrderStatus(order.id, "preparing")} variant="outline" size="sm">
                    Preparing
                  </Button>
                  <Button onClick={() => handleUpdateOrderStatus(order.id, "ready")} variant="outline" size="sm">
                    Ready
                  </Button>
                  <Button onClick={() => handleUpdateOrderStatus(order.id, "delivered")} variant="outline" size="sm">
                    Delivered
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

