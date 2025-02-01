import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setCurrentUser({ ...user, ...doc.data() });
          } else {
            setCurrentUser(user);
          }
          setLoading(false);
        });

        return () => unsubscribeUser();
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
