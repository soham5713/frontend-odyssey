import { useState, useEffect } from "react"
import { Heart, Plus, Minus, ShoppingCart, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const foodImages = {
  "Butter Chicken": "/placeholder.svg?height=200&width=300",
  "Paneer Tikka": "/placeholder.svg?height=200&width=300",
  "Vegetable Biryani": "/placeholder.svg?height=200&width=300",
  "Masala Dosa": "/placeholder.svg?height=200&width=300",
  "Chicken Tikka": "/placeholder.svg?height=200&width=300",
  "Palak Paneer": "/placeholder.svg?height=200&width=300",
}

const restaurants = {
  "Butter Chicken": "Spice Paradise",
  "Paneer Tikka": "Curry House",
  "Vegetable Biryani": "Tandoori Nights",
  "Masala Dosa": "Dosa Delight",
  "Chicken Tikka": "Spice Paradise",
  "Palak Paneer": "Tandoori Nights",
}

const prices = {
  "Butter Chicken": 12.99,
  "Paneer Tikka": 9.99,
  "Vegetable Biryani": 10.99,
  "Masala Dosa": 8.99,
  "Chicken Tikka": 13.99,
  "Palak Paneer": 11.99,
}

export function FoodGrid() {
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [dishes, setDishes] = useState(Object.keys(foodImages))

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    const storedCart = localStorage.getItem("cart")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    const filtered = Object.keys(foodImages).filter(
      (dish) =>
        dish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurants[dish].toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setDishes(filtered)
  }, [searchQuery])

  const toggleFavorite = (dish) => {
    const newFavorites = favorites.includes(dish) ? favorites.filter((fav) => fav !== dish) : [...favorites, dish]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    toast({
      title: favorites.includes(dish) ? "Removed from favorites" : "Added to favorites",
      description: dish,
    })
  }

  const updateCart = (dish, increment) => {
    const currentQuantity = cart[dish] || 0
    const newQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1)

    const newCart = {
      ...cart,
      [dish]: newQuantity,
    }

    if (newQuantity === 0) {
      delete newCart[dish]
    }

    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>{Object.values(cart).reduce((a, b) => a + b, 0)}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {dishes.map((dish) => (
              <motion.div
                key={dish}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-card rounded-lg overflow-hidden border shadow-sm"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={foodImages[dish] || "/placeholder.svg"}
                    alt={dish}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleFavorite(dish)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(dish) ? "fill-red-500 text-red-500" : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{dish}</h3>
                      <p className="text-sm text-muted-foreground">{restaurants[dish]}</p>
                    </div>
                    <p className="font-semibold">${prices[dish]}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCart(dish, false)}
                        disabled={!cart[dish]}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{cart[dish] || 0}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCart(dish, true)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant={cart[dish] ? "secondary" : "default"}
                      size="sm"
                      onClick={() => updateCart(dish, true)}
                    >
                      {cart[dish] ? "Update Cart" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

