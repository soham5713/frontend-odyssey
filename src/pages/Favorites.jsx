"use client"

import { useState, useEffect } from "react"
import { Heart, Trash2, Plus, Pizza, Soup, Cookie, Sandwich, Coffee } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const foodIcons = {
  pizza: Pizza,
  soup: Soup,
  cookie: Cookie,
  sandwich: Sandwich,
  coffee: Coffee,
}

export function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [newFavorite, setNewFavorite] = useState({
    name: "",
    time: "",
    price: 10,
    icon: "pizza",
  })

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const saveFavorites = (items) => {
    localStorage.setItem("favorites", JSON.stringify(items))
    setFavorites(items)
  }

  const handleDelete = (id) => {
    const newFavorites = favorites.filter((item) => item.id !== id)
    saveFavorites(newFavorites)
    toast({
      title: "Deleted",
      description: "Recipe removed from favorites",
    })
  }

  const handleAdd = () => {
    if (!newFavorite.name || !newFavorite.time) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newItem = {
      id: Date.now().toString(),
      ...newFavorite,
    }

    saveFavorites([...favorites, newItem])
    setNewFavorite({
      name: "",
      time: "",
      price: 10,
      icon: "pizza",
    })
    setIsOpen(false)
    toast({
      title: "Success",
      description: "New recipe added!",
    })
  }

  const timeSuggestions = ["15mins", "20mins", "30mins", "45mins", "1hour"]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Favorites</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Recipe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipe Name</Label>
                <Input
                  id="name"
                  value={newFavorite.name}
                  onChange={(e) => setNewFavorite({ ...newFavorite, name: e.target.value })}
                  placeholder="Enter recipe name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Cooking Time</Label>
                <Select
                  value={newFavorite.time}
                  onValueChange={(value) => setNewFavorite({ ...newFavorite, time: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cooking time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSuggestions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Slider
                  id="price"
                  min={0}
                  max={1000}
                  step={10}
                  value={[newFavorite.price]}
                  onValueChange={(value) => setNewFavorite({ ...newFavorite, price: value[0] })}
                />
                <div className="text-right text-sm text-muted-foreground">₹{newFavorite.price}</div>
              </div>

              <div className="space-y-2">
                <Label>Recipe Icon</Label>
                <RadioGroup
                  value={newFavorite.icon}
                  onValueChange={(value) => setNewFavorite({ ...newFavorite, icon: value })}
                  className="grid grid-cols-5 gap-4"
                >
                  {Object.entries(foodIcons).map(([key, Icon]) => (
                    <div key={key} className="flex flex-col items-center gap-2">
                      <RadioGroupItem value={key} id={key} className="sr-only" />
                      <Label
                        htmlFor={key}
                        className={`p-2 rounded-full cursor-pointer transition-colors ${
                          newFavorite.icon === key ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button onClick={handleAdd} className="w-full">
                Add Recipe
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="popLayout">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 stroke-muted-foreground" />
            <p>No recipes yet. Add your favorite recipes!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => {
              const Icon = foodIcons[item.icon] || Pizza
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  className="bg-card hover:bg-accent/50 text-card-foreground p-4 rounded-lg shadow-sm border 
                            transition-colors duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.time} | ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

