import { QRCodeSVG } from "qrcode.react"
import { useAuth } from "../contexts/AuthContext"

export function DigitalMessCard() {
  const { currentUser } = useAuth()

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Digital Mess Card</h2>
      <div className="mb-4 flex justify-center">
        <QRCodeSVG value={currentUser.uid} size={128} />
      </div>
      <p className="text-center mb-2">
        <strong>Name:</strong> {currentUser.displayName}
      </p>
      <p className="text-center mb-2">
        <strong>ID:</strong> {currentUser.uid.slice(0, 8)}
      </p>
      <p className="text-center text-2xl font-bold text-green-600">Balance: ₹{currentUser.balance.toFixed(2)}</p>
    </div>
  )
}

