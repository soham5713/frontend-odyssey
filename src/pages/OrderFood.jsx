import { Search, ShoppingCart } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const everydayItems = [
  {
    name: "Vada Pav",
    time: "5 mins",
    price: "₹15",
    image: "https://b.zmtcdn.com/data/dish_photos/d30/abcfc93246fc0abe8641acaf14879d30.jpg?output-format=webp",
  },
  {
    name: "Samosa Pav",
    time: "10 mins",
    price: "₹15",
    image: "https://b.zmtcdn.com/data/dish_photos/1d7/0c1d8db0c53d279758a65c17d2e8c1d7.jpg",
  },
  {
    name: "Tea",
    time: "5 mins",
    price: "₹10",
    image:
      "https://b.zmtcdn.com/data/pictures/0/21189690/cc1a494668bfccf9d82f88a91eb94c7c_o2_featured_v2.jpg?output-format=webp",
  },
  {
    name: "Coffee",
    time: "5 mins",
    price: "₹15",
    image: "https://b.zmtcdn.com/data/dish_photos/a13/836939e026f69be6c0a81d7999d57a13.jpg?output-format=webp",
  },
  {
    name: "Bun Maska",
    time: "2 mins",
    price: "₹20",
    image: "https://b.zmtcdn.com/data/dish_photos/60d/6df9831370c35b54be33f00b3daf660d.jpg?output-format=webp",
  },
  {
    name: "Misal Pav",
    time: "15 mins",
    price: "₹40",
    image: "https://b.zmtcdn.com/data/dish_photos/553/15effdb964f5e5ce565c36df1d73a553.jpg?output-format=webp",
  },
]

const otherItems = [
  {
    name: "Dosa",
    time: "20 mins",
    price: "₹40",
    image:
      "https://b.zmtcdn.com/data/pictures/6/32026/3aa9879441c7be23eaeaf9f261e7b098_o2_featured_v2.jpg?output-format=webp",
  },
  {
    name: "Paneer Paratha",
    time: "15 mins",
    price: "₹60",
    image: "https://b.zmtcdn.com/data/dish_photos/19b/16f32aa3c5d84448f79ec4150b9aa19b.jpeg?output-format=webp",
  },
  {
    name: "Idli",
    time: "10 mins",
    price: "₹30",
    image: "https://b.zmtcdn.com/data/dish_photos/148/a90afd3d116ef0160dc48faca7217148.png?output-format=webp",
  },
  {
    name: "Omelette",
    time: "20 mins",
    price: "₹40",
    image: "https://b.zmtcdn.com/data/dish_photos/090/66a3ae54a04af0ddf78070f7061fc090.jpg?output-format=webp",
  },
]

const allItems = [...everydayItems, ...otherItems]

export function OrderFood() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold">Order Food</h1>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search for dishes..."
          className="w-full pl-10 pr-4"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item) => (
          <div key={item.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative pt-[56.25%]">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ready in: {item.time}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold">{item.price}</p>
                <Button size="icon" variant="ghost">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
