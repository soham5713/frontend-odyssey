import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase/config"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "../contexts/AuthContext"

export function RoleSetup() {
  const [selectedRole, setSelectedRole] = useState("")
  const { currentUser, setCurrentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser?.role) {
      setSelectedRole(currentUser.role)
    }
  }, [currentUser])

  const handleRoleChange = async (newRole) => {
    if (!currentUser) return

    try {
      const userRef = doc(db, "users", currentUser.uid)
      await updateDoc(userRef, { role: newRole })

      // Update local state
      setSelectedRole(newRole)

      // Update AuthContext
      const updatedUserDoc = await getDoc(userRef)
      const updatedUserData = updatedUserDoc.data()
      setCurrentUser({ ...currentUser, ...updatedUserData })

      toast({
        title: "Role Updated",
        description: `Your role has been updated to ${newRole}.`,
      })

      // Redirect based on new role
      switch (newRole) {
        case "student":
          navigate("/user-home")
          break
        case "mess_staff":
          navigate("/staff-home")
          break
        case "admin":
          navigate("/admin-home")
          break
        default:
          break
      }
    } catch (error) {
      console.error("Error updating role:", error)
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getRoleOptions = () => {
    const allRoles = ["student", "mess_staff", "admin"]

    // If the user is an admin, they can change to any role
    if (currentUser?.role === "admin") {
      return allRoles
    }

    // If the user is mess staff, they can change to student or mess staff
    if (currentUser?.role === "mess_staff") {
      return ["student", "mess_staff"]
    }

    // If the user is a student or has no role, they can only be a student
    return ["student"]
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Set Your Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Current role: <span className="font-medium">{currentUser?.role || "Not set"}</span>
          </p>
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {getRoleOptions().map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => handleRoleChange(selectedRole)}
            disabled={!selectedRole || selectedRole === currentUser?.role}
          >
            Update Role
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoleSetup

