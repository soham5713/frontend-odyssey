import { Search, MapPin, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"

const restaurants = [
  { name: "Spice Paradise", rating: 4.5, cuisine: "Indian", address: "123 Spice St", phone: "(555) 123-4567" },
  { name: "Tandoori Nights", rating: 4.2, cuisine: "Indian", address: "456 Tandoor Ave", phone: "(555) 234-5678" },
  { name: "Curry House", rating: 4.3, cuisine: "Indian", address: "789 Curry Ln", phone: "(555) 345-6789" },
  { name: "Dosa Delight", rating: 4.1, cuisine: "South Indian", address: "321 Dosa Rd", phone: "(555) 456-7890" },
]

export function Restaurants() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Restaurants</h1>

      <div className="relative">
        <Input type="text" placeholder="Search for restaurants..." className="w-full pl-10 pr-4" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="space-y-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.name}
            className="bg-card text-card-foreground p-4 rounded-lg shadow flex items-center space-x-4"
          >
            <div className="h-24 w-24 bg-muted rounded-md"></div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
                <span className="text-muted-foreground ml-1">{restaurant.rating}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {restaurant.address}
              </div>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-1" />
                {restaurant.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

