import { createContext, useContext, useState, useEffect } from "react"
import { auth, db, googleProvider } from "../firebase/config"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Check if the user document exists in Firestore
      const userDocRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        // If the user document doesn't exist, create a new one
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          role: "student", // Default role
          balance: 0, // Initial balance
        })
      }

      // Fetch the user data and update the currentUser state
      const updatedUserDoc = await getDoc(userDocRef)
      const userData = updatedUserDoc.data()
      setCurrentUser({ ...user, role: userData.role, balance: userData.balance })

      return user
    } catch (error) {
      console.error("Error signing in with Google", error)
      throw error
    }
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)
        const userData = userDoc.data()
        setCurrentUser({ ...user, role: userData.role, balance: userData.balance })
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

