import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
    image: "https://b.zmtcdn.com/data/pictures/0/21189690/cc1a494668bfccf9d82f88a91eb94c7c_o2_featured_v2.jpg?output-format=webp",
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
    price: "₹80",
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

export function Recipes() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Our Menu</h1>

      <div className="relative">
        <Input type="text" placeholder="Search for recipes..." className="w-full pl-10 pr-4" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Everyday Items</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {everydayItems.map((item) => (
              <Card key={item.name} className="w-[200px]">
                <CardContent className="p-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-[120px] w-full object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.time} | {item.price}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Other Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherItems.map((item) => (
            <Card key={item.name}>
              <CardContent className="p-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="secondary">{item.time}</Badge>
                    <span className="font-bold">{item.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Order Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recipes