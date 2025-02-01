import { Search, ShoppingCart } from "lucide-react"

const foodItems = [
  { name: "Butter Chicken", price: 12.99, restaurant: "Spice Paradise" },
  { name: "Vegetable Biryani", price: 10.99, restaurant: "Tandoori Nights" },
  { name: "Paneer Tikka", price: 9.99, restaurant: "Curry House" },
  { name: "Masala Dosa", price: 8.99, restaurant: "Dosa Delight" },
  { name: "Chicken Tikka Masala", price: 13.99, restaurant: "Spice Paradise" },
  { name: "Palak Paneer", price: 11.99, restaurant: "Tandoori Nights" },
]

export function OrderFood() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Order Food</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search for dishes..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.name}
            className="bg-card text-card-foreground p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.restaurant}</p>
              <p className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</p>
            </div>
            <button className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

