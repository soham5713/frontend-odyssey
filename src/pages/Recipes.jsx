import { Search } from "lucide-react"

const recipes = [
  { name: "Butter Chicken", time: "30 mins", difficulty: "Medium" },
  { name: "Palak Paneer", time: "25 mins", difficulty: "Easy" },
  { name: "Chicken Biryani", time: "45 mins", difficulty: "Hard" },
  { name: "Dal Makhani", time: "35 mins", difficulty: "Medium" },
  { name: "Aloo Gobi", time: "20 mins", difficulty: "Easy" },
  { name: "Tandoori Chicken", time: "40 mins", difficulty: "Medium" },
]

export function Recipes() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Recipes</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.name} className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <div className="h-40 bg-muted rounded-md mb-2"></div>
            <h3 className="font-medium">{recipe.name}</h3>
            <p className="text-sm text-muted-foreground">
              {recipe.time} | {recipe.difficulty}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

