import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { StudentDashboard } from "./StudentDashboard"
import { MessStaffDashboard } from "./MessStaffDashboard"
import { AdminDashboard } from "./AdminDashboard"

export function Dashboard() {
  const { currentUser, loading } = useAuth()
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login")
    } else if (currentUser && currentUser.role) {
      setUserRole(currentUser.role)
    }
  }, [currentUser, loading, navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return null
  }

  switch (userRole) {
    case "student":
      return <StudentDashboard />
    case "mess_staff":
      return <MessStaffDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      return <div>Invalid user role</div>
  }
}
