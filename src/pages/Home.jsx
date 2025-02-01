import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ArrowRight, Star, Clock, ChefHat, Utensils } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const popularRecipes = [
  {
    name: "Butter Chicken",
    time: "30 mins",
    difficulty: "Easy",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/04/butter-chicken-recipe.jpg",
  },
  {
    name: "Palak Paneer",
    time: "25 mins",
    difficulty: "Medium",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/palak-paneer-recipe.jpg",
  },
  {
    name: "Chicken Biryani",
    time: "45 mins",
    difficulty: "Hard",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/chicken-biryani-recipe.jpg",
  },
]

const topRestaurants = [
  {
    name: "Spice Paradise",
    rating: 4.5,
    cuisine: "North Indian",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/16/99/0d/68/photo1jpg.jpg",
  },
  {
    name: "Tandoori Nights",
    rating: 4.2,
    cuisine: "Mughlai",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/10/73/a8/53/tandoori-nights.jpg",
  },
  {
    name: "Curry House",
    rating: 4.3,
    cuisine: "South Indian",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/23/dd/23/e3/curry-house.jpg",
  },
  {
    name: "Dosa Delight",
    rating: 4.1,
    cuisine: "South Indian",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/11/e9/0c/8d/dosa-delight.jpg",
  },
]

export function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Welcome to Bhookh Lagg Gayi</h1>
        <p className="text-xl text-muted-foreground">Discover, Cook, and Order Delicious Indian Cuisine</p>
      </motion.div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="flex">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search for recipes, restaurants, or dishes..."
              className="w-full pl-10 pr-4 py-6 text-lg rounded-l-full border-2 border-r-0 border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-6 w-6" />
          </div>
          <Button type="submit" className="rounded-r-full px-8 text-lg h-[3.2rem]">
            Search
          </Button>
        </div>
      </form>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Popular Recipes</h2>
          <Link to="/recipes" className="text-primary hover:underline flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{recipe.name}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> {recipe.time}
                    </span>
                    <span className="flex items-center">
                      <ChefHat className="mr-1 h-4 w-4" /> {recipe.difficulty}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="bg-primary/5 p-4">
                  <Button variant="outline" className="w-full">
                    View Recipe
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Top Rated Restaurants</h2>
          <Link to="/restaurants" className="text-primary hover:underline flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="flex h-full">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-1/3 object-cover"
                  />
                  <CardContent className="p-4 flex flex-col justify-between w-2/3">
                    <div>
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{restaurant.rating.toFixed(1)}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Menu
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className="bg-primary text-primary-foreground p-8 rounded-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Utensils className="h-16 w-16 mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-4">Hungry? Order food now!</h2>
        <p className="mb-6 text-lg">Get your favorite dishes delivered right to your doorstep.</p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/order">Order Now</Link>
        </Button>
      </motion.section>
    </div>
  )
}

