import { Link, useLocation } from "react-router-dom"
import { Home, UtensilsCrossed, Coffee, ShoppingCart, ClipboardList, UserCog, DollarSign, Calendar, Heart, Menu, X } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"

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
        { icon: ClipboardList, label: "Feedback", href: "/user-feedback" }
      ]
    case "mess_staff":
      return [
        ...commonItems,
        { icon: ClipboardList, label: "Manage Orders", href: "/staff-orders" },
        { icon: UtensilsCrossed, label: "Manage Menu", href: "/staff-menu" },
      ]
    default:
      return commonItems
  }
}

export function Sidebar() {
  const location = useLocation()
  const { currentUser } = useAuth()
  const menuItems = getMenuItems(currentUser?.role)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Hamburger button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-accent"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static
        top-0 left-0 z-40
        h-screen
        bg-card text-card-foreground
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'w-64' : 'w-64'}
        md:translate-x-0
      `}>
        <div className="p-4 border-b flex items-center">
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
                  onClick={closeSidebarOnMobile}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar;