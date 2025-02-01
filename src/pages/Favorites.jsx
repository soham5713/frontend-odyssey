import { Heart, Trash2 } from "lucide-react"

const favorites = [
  { type: "recipe", name: "Butter Chicken", details: "30 mins | Medium" },
  { type: "restaurant", name: "Spice Paradise", details: "Indian Cuisine" },
  { type: "recipe", name: "Vegetable Biryani", details: "45 mins | Hard" },
  { type: "restaurant", name: "Tandoori Nights", details: "North Indian Cuisine" },
]

export function Favorites() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Favorites</h1>

      <div className="space-y-4">
        {favorites.map((item, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

