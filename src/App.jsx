import { Sidebar } from "./components/Sidebar"
import { ThemeProvider } from "./components/ThemeProvider"
import { Home } from "./components/Home"
import "./globals.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Home />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

