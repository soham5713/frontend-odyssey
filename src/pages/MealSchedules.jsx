import React, { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase/config"
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner']

export function MealSchedule() {
  const [schedule, setSchedule] = useState({})
  const [newMeal, setNewMeal] = useState({ day: '', type: '', menu: '' })
  const [editingMeal, setEditingMeal] = useState(null)
  const { currentUser, userRole } = useAuth()

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    try {
      const q = query(collection(db, "mealSchedule"))
      const querySnapshot = await getDocs(q)
      const scheduleData = {}
      querySnapshot.forEach((doc) => {
        const meal = doc.data()
        if (!scheduleData[meal.day]) {
          scheduleData[meal.day] = {}
        }
        scheduleData[meal.day][meal.type] = { id: doc.id, menu: meal.menu }
      })
      setSchedule(scheduleData)
    } catch (error) {
      console.error("Error fetching meal schedule:", error)
      toast({
        title: "Error",
        description: "Failed to fetch meal schedule. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddMeal = async (e) => {
    e.preventDefault()
    if (userRole !== 'mess_staff') return

    try {
      await addDoc(collection(db, "mealSchedule"), newMeal)
      setNewMeal({ day: '', type: '', menu: '' })
      fetchSchedule()
      toast({
        title: "Success",
        description: "Meal added to schedule successfully!",
      })
    } catch (error) {
      console.error("Error adding meal:", error)
      toast({
        title: "Error",
        description: "Failed to add meal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditMeal = async () => {
    if (userRole !== 'mess_staff' || !editingMeal) return

    try {
      const mealRef = doc(db, "mealSchedule", editingMeal.id)
      await updateDoc(mealRef, {
        menu: editingMeal.menu
      })

      fetchSchedule()
      setEditingMeal(null)
      toast({
        title: "Success",
        description: "Meal updated successfully!",
      })
    } catch (error) {
      console.error("Error updating meal:", error)
      toast({
        title: "Error",
        description: "Failed to update meal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteMeal = async (day, type) => {
    if (userRole !== 'mess_staff') return

    try {
      const mealId = schedule[day][type].id
      await deleteDoc(doc(db, "mealSchedule", mealId))

      fetchSchedule()
      toast({
        title: "Success",
        description: "Meal deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting meal:", error)
      toast({
        title: "Error",
        description: "Failed to delete meal. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Meal Schedule</h1>
      
      {userRole === 'mess_staff' && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Meal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <Select
                value={newMeal.day}
                onValueChange={(value) => setNewMeal({ ...newMeal, day: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={newMeal.type}
                onValueChange={(value) => setNewMeal({ ...newMeal, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Menu"
                value={newMeal.menu}
                onChange={(e) => setNewMeal({ ...newMeal, menu: e.target.value })}
                required
              />
              <Button type="submit">Add Meal</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Weekly Meal Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                {mealTypes.map(type => (
                  <TableHead key={type}>{type}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {daysOfWeek.map(day => (
                <TableRow key={day}>
                  <TableCell>{day}</TableCell>
                  {mealTypes.map(type => (
                    <TableCell key={type}>
                      {schedule[day] && schedule[day][type] ? (
                        <div className="flex items-center space-x-2">
                          <span>{schedule[day][type].menu}</span>
                          {userRole === 'mess_staff' && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Meal</DialogTitle>
                                  </DialogHeader>
                                  <Input
                                    value={editingMeal?.menu || schedule[day][type].menu}
                                    onChange={(e) => setEditingMeal({ ...editingMeal, id: schedule[day][type].id, menu: e.target.value })}
                                  />
                                  <Button onClick={handleEditMeal}>Save</Button>
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteMeal(day, type)}>Delete</Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not set</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {userRole !== 'mess_staff' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            This meal schedule is set by the mess staff. If you have any questions or special dietary requirements, please contact the mess staff directly.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default MealSchedule
