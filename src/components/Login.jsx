import { useState } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "../contexts/AuthContext"
import { auth, db } from "../firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"

const googleProvider = new GoogleAuthProvider()

export function Login() {
  const [loading, setLoading] = useState(false)
  const { setCurrentUser } = useAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Check if user document exists
      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // Create new user document if it doesn't exist
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: "student", // Set default role to student
          balance: 0, // Initialize balance to 0
          createdAt: new Date().toISOString(),
        })
      }

      // Get the latest user data
      const updatedUserSnap = await getDoc(userRef)
      const userData = updatedUserSnap.data()

      // Update auth context with full user data
      setCurrentUser({ ...user, ...userData })

      // Navigate based on role
      switch (userData.role) {
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
          navigate("/role-setup")
      }

      toast({
        title: "Success",
        description: "Successfully logged in!",
      })
    } catch (error) {
      console.error("Error signing in with Google:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 space-y-4 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Welcome to Bhookh Lagg Gayi</h1>
        <Button onClick={handleGoogleSignIn} disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  )
}

