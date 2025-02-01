import { Link, useLocation } from "react-router-dom"
import { Home, UtensilsCrossed, Coffee, ShoppingCart, Heart, Settings } from "lucide-react"
import { ThemeSwitcher } from "./ThemeSwitcher"

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: UtensilsCrossed, label: "Menu", href: "/recipes" },
  { icon: Coffee, label: "Restaurants", href: "/restaurants" },
  { icon: ShoppingCart, label: "Order Food", href: "/order" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-card text-card-foreground h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Bhookh Lagg Gayi</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  location.pathname === item.href ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <ThemeSwitcher />
      </div>
    </div>
  )
}

