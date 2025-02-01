import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { collection, query, where, getDocs, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import { toast } from "@/components/ui/use-toast"

export function MessStaffDashboard() {
  const [newItem, setNewItem] = useState({ name: "", price: "" })
  const [schedule, setSchedule] = useState({})
  const [newScheduleItem, setNewScheduleItem] = useState({ day: "", type: "", menu: "" })

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const mealTypes = ["Breakfast", "Lunch", "Dinner"]

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

      // Update the meal schedule if a day and meal type are selected
      if (newScheduleItem.day && newScheduleItem.type) {
        const scheduleRef = collection(db, "mealSchedule")
        const q = query(scheduleRef, where("day", "==", newScheduleItem.day), where("type", "==", newScheduleItem.type))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          // Add new schedule item
          await addDoc(scheduleRef, {
            day: newScheduleItem.day,
            type: newScheduleItem.type,
            menu: newItem.name,
          })
        } else {
          // Update existing schedule item
          const docRef = doc(db, "mealSchedule", querySnapshot.docs[0].id)
          await updateDoc(docRef, {
            menu: querySnapshot.docs[0].data().menu + ", " + newItem.name,
          })
        }

        setNewScheduleItem({ day: "", type: "", menu: "" })
        fetchSchedule()
        toast({
          title: "Success",
          description: "Meal schedule updated successfully!",
        })
      }
    } catch (error) {
      console.error("Error adding menu item: ", error)
      toast({
        title: "Error",
        description: "Failed to add menu item. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Menu Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMenuItem} className="space-y-4">
            <Input
              type="text"
              placeholder="Menu Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <Button type="submit">Add Menu Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Meal Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              value={newScheduleItem.day}
              onValueChange={(value) => setNewScheduleItem({ ...newScheduleItem, day: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={newScheduleItem.type}
              onValueChange={(value) => setNewScheduleItem({ ...newScheduleItem, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select a day and meal type to update the schedule when adding a new menu item.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Meal Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                {mealTypes.map((type) => (
                  <TableHead key={type}>{type}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {daysOfWeek.map((day) => (
                <TableRow key={day}>
                  <TableCell>{day}</TableCell>
                  {mealTypes.map((type) => (
                    <TableCell key={type}>
                      {schedule[day] && schedule[day][type] ? (
                        <span>{schedule[day][type].menu}</span>
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
    </div>
  )
}