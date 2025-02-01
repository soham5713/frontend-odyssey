import { Link, useLocation } from "react-router-dom"
import { Home, UtensilsCrossed, Coffee, ShoppingCart, ClipboardList, UserCog, DollarSign, Calendar, Heart } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const getMenuItems = (role) => {
  const commonItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: UserCog, label: "Change Role", href: "/role-setup" },
  ]

  switch (role) {
    case "student":
      return [
        ...commonItems,
        { icon: UtensilsCrossed, label: "Menu", href: "/user-menu" },
        { icon: ShoppingCart, label: "Order Food", href: "/user-order" },
        { icon: DollarSign, label: "Expenses", href: "/user-expenses" },
        { icon: Calendar, label: "Meal Schedule", href: "/user-meal-schedule" },
        { icon: Heart, label: "Favorites", href: "/user-favorites" },
      ]
      case "mess_staff":
        return [
          ...commonItems,
          { icon: ClipboardList, label: "Manage Orders", href: "/staff-orders" },
          { icon: UtensilsCrossed, label: "Manage Menu", href: "/staff-menu" },
          { icon: Calendar, label: "Meal Schedule", href: "/admin-meal-schedule" },
        ]
    default:
      return commonItems
  }
}

export function Sidebar() {
  const location = useLocation()
  const { currentUser } = useAuth()
  const menuItems = getMenuItems(currentUser?.role)

  return (
    <div className="w-64 bg-card text-card-foreground h-screen flex flex-col">
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
    </div>
  )
}

