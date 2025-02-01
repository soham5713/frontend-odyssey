import { Search, ArrowRight } from "lucide-react"

export function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Bhookh Lagg Gayi</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search for recipes, restaurants, or dishes..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Popular Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Butter Chicken", "Palak Paneer", "Chicken Biryani"].map((dish) => (
            <div key={dish} className="bg-card text-card-foreground p-4 rounded-lg shadow">
              <div className="h-40 bg-muted rounded-md mb-2"></div>
              <h3 className="font-medium">{dish}</h3>
              <p className="text-sm text-muted-foreground">30 mins | Easy</p>
            </div>
          ))}
        </div>
        <a href="/recipes" className="inline-flex items-center text-primary hover:underline">
          View all recipes <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Top Rated Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Spice Paradise", "Tandoori Nights", "Curry House", "Dosa Delight"].map((restaurant) => (
            <div
              key={restaurant}
              className="bg-card text-card-foreground p-4 rounded-lg shadow flex items-center space-x-4"
            >
              <div className="h-16 w-16 bg-muted rounded-md"></div>
              <div>
                <h3 className="font-medium">{restaurant}</h3>
                <p className="text-sm text-muted-foreground">⭐⭐⭐⭐☆ (4.2)</p>
              </div>
            </div>
          ))}
        </div>
        <a href="/restaurants" className="inline-flex items-center text-primary hover:underline">
          Explore more restaurants <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </section>

      <section className="bg-primary text-primary-foreground p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Hungry? Order food now!</h2>
        <p className="mb-4">Get your favorite dishes delivered right to your doorstep.</p>
        <button className="bg-background text-foreground px-4 py-2 rounded-md hover:bg-secondary">Order Now</button>
      </section>
    </div>
  )
}

