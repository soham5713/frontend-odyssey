import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import { ThemeProvider } from "./components/ThemeProvider"
import { Home } from "./pages/Home"
import { Recipes } from "./pages/Recipes"
import { Restaurants } from "./pages/Restaurants"
import { OrderFood } from "./pages/OrderFood"
import { Favorites } from "./pages/Favorites"
import { Settings } from "./pages/Settings"
import "./globals.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/order" element={<OrderFood />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

