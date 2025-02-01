import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase/config"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" })
  const { currentUser } = useAuth()

  useEffect(() => {
    fetchExpenses()
  }, []) // Removed currentUser dependency

  const fetchExpenses = async () => {
    if (!currentUser) return

    const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid))

    try {
      const querySnapshot = await getDocs(q)
      const expensesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setExpenses(expensesData)
    } catch (error) {
      console.error("Error fetching expenses:", error)
      toast({
        title: "Error",
        description: "Failed to fetch expenses. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddExpense = async (e) => {
    e.preventDefault()
    if (!currentUser) return

    try {
      await addDoc(collection(db, "expenses"), {
        userId: currentUser.uid,
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        createdAt: serverTimestamp(),
      })

      setNewExpense({ description: "", amount: "" })
      fetchExpenses()
      toast({
        title: "Success",
        description: "Expense added successfully!",
      })
    } catch (error) {
      console.error("Error adding expense:", error)
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Expenses</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <Input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              required
            />
            <Button type="submit">Add Expense</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length > 0 ? (
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex justify-between items-center">
                  <span>{expense.description}</span>
                  <span className="font-semibold">₹{expense.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No expenses recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Expenses

