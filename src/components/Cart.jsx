import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from 'lucide-react'

export function Cart({ isOpen, onOpenChange, items, totalAmount, onAddItem, onRemoveItem, onClearCart }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline" onClick={() => onRemoveItem(item)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button size="icon" variant="outline" onClick={() => onAddItem(item)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4">
          <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>
          <Button className="w-full mt-4">Checkout</Button>
          <Button variant="outline" className="w-full mt-2" onClick={onClearCart}>
            Clear Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
