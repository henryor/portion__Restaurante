"use client";
import { useState } from 'react'
import { Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
}

interface CartItem extends MenuItem {
  quantity: number
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Pizza Margherita", description: "Tomate, mozzarella, albahaca", price: 10, category: "Pizzas", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Pasta Carbonara", description: "Espaguetis, huevo, panceta, queso", price: 12, category: "Pastas", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Ensalada César", description: "Lechuga, pollo, crutones, aderezo César", price: 8, category: "Ensaladas", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Tiramisú", description: "Postre italiano con café y mascarpone", price: 6, category: "Postres", image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Risotto de Setas", description: "Arroz cremoso con setas variadas", price: 14, category: "Risottos", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Bruschetta", description: "Pan tostado con tomate, ajo y albahaca", price: 7, category: "Entrantes", image: "/placeholder.svg?height=100&width=100" },
]

export default function RestaurantMenu() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      }
      return [...currentCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const categories = Array.from(new Set(menuItems.map(item => item.category)))

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Nuestro Menú</h1>
        <p className="text-xl text-muted-foreground">Descubre nuestras deliciosas opciones</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="w-full justify-start overflow-auto">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="text-lg">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="bg-red-600 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.filter(item => item.category === category).map(item => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                        <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => addToCart(item)} className="w-full">
                          <Plus className="text-orange-300 mr-2 h-4 w-4" /> Agregar al carrito
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

{/* zona de pedido */}
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tu Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground">Tu carrito está vacío</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} por unidad</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                        />
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch">
              <Separator className="my-4" />
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Total:</h3>
                <p className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</p>
              </div>
              <Button className="w-full" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Realizar Pedido
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}