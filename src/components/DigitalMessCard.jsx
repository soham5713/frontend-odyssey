import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { IndianRupee } from 'lucide-react'
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore"

export function DigitalMessCard() {
  const { currentUser } = useAuth()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid)
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data())
        }
      })

      return () => unsubscribe()
    }
  }, [currentUser])

  if (!currentUser || !userData) {
    return (
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Digital Mess Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Digital Mess Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code Section */}
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG 
              value={currentUser.uid} 
              size={128}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        {/* User Details Section */}
        <div className="space-y-4">
          {/* Name */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-semibold text-lg">{userData.name}</p>
          </div>

          {/* ID */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">ID</p>
            <Badge variant="secondary" className="font-mono">
              {currentUser.uid.slice(0, 8).toUpperCase()}
            </Badge>
          </div>

          {/* Balance */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <div className="flex items-center justify-center space-x-1">
              <IndianRupee className="h-6 w-6 text-muted-foreground" />
              <p className="text-3xl font-bold text-primary">
                {(userData.balance || 0).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge 
            className={userData.balance > 0 ? "bg-green-500" : "bg-red-500"}
          >
            {userData.balance > 0 ? "Active" : "Low Balance"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
