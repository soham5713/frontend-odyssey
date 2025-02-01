import { useState, useEffect } from "react"
import { QrCode, Search, ShoppingCart, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Cart } from "../components/Cart"
import { DigitalMessCard } from "../components/DigitalMessCard"

const everydayItems = [
  {
    id: 1,
    name: "Vada Pav",
    time: "5 mins",
    price: 15,
    image: "https://b.zmtcdn.com/data/dish_photos/d30/abcfc93246fc0abe8641acaf14879d30.jpg?output-format=webp",
    category: "Everyday",
  },
  {
    id: 2,
    name: "Samosa Pav",
    time: "10 mins",
    price: 15,
    image: "https://b.zmtcdn.com/data/dish_photos/1d7/0c1d8db0c53d279758a65c17d2e8c1d7.jpg",
    category: "Everyday",
  },
  {
    id: 3,
    name: "Tea",
    time: "5 mins",
    price: 10,
    image:
      "https://b.zmtcdn.com/data/pictures/0/21189690/cc1a494668bfccf9d82f88a91eb94c7c_o2_featured_v2.jpg?output-format=webp",
    category: "Everyday",
  },
  {
    id: 4,
    name: "Coffee",
    time: "5 mins",
    price: 15,
    image: "https://b.zmtcdn.com/data/dish_photos/a13/836939e026f69be6c0a81d7999d57a13.jpg?output-format=webp",
    category: "Everyday",
  },
  {
    id: 5,
    name: "Bun Maska",
    time: "2 mins",
    price: 20,
    image: "https://b.zmtcdn.com/data/dish_photos/60d/6df9831370c35b54be33f00b3daf660d.jpg?output-format=webp",
    category: "Everyday",
  },
  {
    id: 6,
    name: "Misal Pav",
    time: "15 mins",
    price: 40,
    image: "https://b.zmtcdn.com/data/dish_photos/553/15effdb964f5e5ce565c36df1d73a553.jpg?output-format=webp",
    category: "Everyday",
  },
]

const otherItems = [
  {
    id: 7,
    name: "Dosa",
    time: "20 mins",
    price: 40,
    image:
      "https://b.zmtcdn.com/data/pictures/6/32026/3aa9879441c7be23eaeaf9f261e7b098_o2_featured_v2.jpg?output-format=webp",
    category: "Other",
  },
  {
    id: 8,
    name: "Paneer Paratha",
    time: "15 mins",
    price: 60,
    image: "https://b.zmtcdn.com/data/dish_photos/19b/16f32aa3c5d84448f79ec4150b9aa19b.jpeg?output-format=webp",
    category: "Other",
  },
  {
    id: 9,
    name: "Idli",
    time: "10 mins",
    price: 30,
    image: "https://b.zmtcdn.com/data/dish_photos/148/a90afd3d116ef0160dc48faca7217148.png?output-format=webp",
    category: "Other",
  },
  {
    id: 10,
    name: "Omelette",
    time: "20 mins",
    price: 40,
    image: "https://b.zmtcdn.com/data/dish_photos/090/66a3ae54a04af0ddf78070f7061fc090.jpg?output-format=webp",
    category: "Other",
  },
]

const allItems = [...everydayItems, ...otherItems]

export function OrderFood() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState(allItems)
  const [cart, setCart] = useState({})
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const results = allItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredItems(results)
  }, [searchTerm])

  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1,
    }))
  }

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart }
      if (newCart[item.id] > 1) {
        newCart[item.id]--
      } else {
        delete newCart[item.id]
      }
      return newCart
    })
  }

  const clearCart = () => {
    setCart({})
  }

  const cartItems = Object.keys(cart).map((id) => {
    const item = allItems.find((item) => item.id === Number.parseInt(id))
    return { ...item, quantity: cart[id] }
  })

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="relative">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Header with title and cart */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-4xl font-bold">Order Food</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  onClick={toggleSidebar}
                >
                  {isSidebarOpen ? <X /> : <QrCode className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for dishes..."
                className="w-full pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Special</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get 20% off on all items between 2 PM - 5 PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Bites</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Ready in under 10 minutes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Meal Combos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Save up to ₹50 on combos</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs and food items */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="everyday">Everyday</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="everyday">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems
                    .filter((item) => item.category === "Everyday")
                    .map((item) => (
                      <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="other">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems
                    .filter((item) => item.category === "Other")
                    .map((item) => (
                      <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar content */}
          <div className={`
            fixed top-0 right-0 h-full w-80 bg-background p-4 z-50
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:transform-none lg:z-0 lg:w-80 lg:block
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            <DigitalMessCard />
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View Order History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Recharge Balance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cart component */}
      <Cart
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        totalAmount={totalAmount}
        onAddItem={addToCart}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  )
}

function FoodCard({ item, onAddToCart }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative pt-[56.25%]">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ready in: {item.time}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <p className="text-lg font-semibold">₹{item.price}</p>
        <Button size="sm" onClick={() => onAddToCart(item)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OrderFood