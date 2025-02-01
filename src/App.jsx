import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { ThemeProvider } from "./components/ThemeProvider"
import { Sidebar } from "./components/Sidebar"
import { Login } from "./components/Login"
import RoleSetup from "./pages/RoleSetup"
import { MessStaffDashboard } from "./pages/MessStaffDashboard"
import { AdminDashboard } from "./pages/AdminDashboard"
import { Recipes } from "./pages/Menu"
import { OrderFood } from "./pages/OrderFood"
import { Dashboard } from "./pages/Dashboard"
import { ManageOrders } from "./pages/ManageOrders"
import { ManageMenu } from "./pages/ManageMenu"
import React from 'react'
// Remove these imports
// import { Favorites } from "./pages/Favorites"
// import { Settings } from "./pages/Settings"
import "./globals.css"
import FeedbackAndIssues from "./pages/Feedback"
import Expenses from "./pages/Expenses"
import MealSchedule from "./pages/MealSchedules"
import { Home } from "./pages/Home"
import { Favorites } from "./pages/Favorites"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (!currentUser.role || currentUser.role === "unset") {
    return <Navigate to="/role-setup" />
  }

  return children
}

function RoleBasedRedirect() {
  const { currentUser } = useAuth()

  switch (currentUser?.role) {
    case "student":
      return <Navigate to="/user-home" />
    case "mess_staff":
      return <Navigate to="/staff-home" />
    case "admin":
      return <Navigate to="/admin-home" />
    default:
      return <Navigate to="/role-setup" />
  }
}

function AppLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/role-setup"
                element={
                  <ProtectedRoute>
                    <RoleSetup />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin-home"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <AdminDashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Mess Staff Routes */}
              <Route
                path="/staff-home"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <MessStaffDashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff-orders"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <ManageOrders />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff-menu"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <ManageMenu />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff-meal-schedule"
                element={
                  <ProtectedRoute staffOnly>
                    <AppLayout>
                      <MealSchedule />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/user-home"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Home />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-favorites"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Favorites />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-meal-schedule"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <MealSchedule />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-menu"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Recipes />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-order"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <OrderFood />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-feedback"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <FeedbackAndIssues />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-expenses"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Expenses />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Default route */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <RoleBasedRedirect />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App

