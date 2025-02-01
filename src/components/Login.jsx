import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Login() {
  const [error, setError] = useState("")
  const { signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate("/dashboard")
    } catch (error) {
      setError("Failed to sign in with Google")
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Smart Mess</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

