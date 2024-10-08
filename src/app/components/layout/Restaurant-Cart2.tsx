"use client"

import { useState } from 'react'
import { Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Product {
  id: number
  name: string
  description: string
  fullPrice: number
  halfPrice: number
  image: string
}

interface CartItem extends Product {
  quantity: number
  portion: 'full' | 'half'
}

const products: Product[] = [
  { id: 1, name: "Pizza Margherita", description: "Tomate, mozzarella, albahaca", fullPrice: 10, halfPrice: 6, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Pasta Carbonara", description: "Espaguetis, huevo, panceta, queso", fullPrice: 12, halfPrice: 7, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Ensalada César", description: "Lechuga, pollo, crutones, aderezo César", fullPrice: 8, halfPrice: 5, image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Tiramisú", description: "Postre italiano con café y mascarpone", fullPrice: 6, halfPrice: 4, image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Risotto de Setas", description: "Arroz cremoso con setas variadas", fullPrice: 14, halfPrice: 8, image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Bruschetta", description: "Pan tostado con tomate, ajo y albahaca", fullPrice: 7, halfPrice: 4, image: "/placeholder.svg?height=100&width=100" },
]

export default function RestaurantCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPortion, setSelectedPortion] = useState<{ [key: number]: 'full' | 'half' }>({})

  const addToCart = (product: Product, portion: 'full' | 'half') => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id && item.portion === portion)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id && item.portion === portion
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentCart, { ...product, quantity: 1, portion }]
    })
  }

  const removeFromCart = (productId: number, portion: 'full' | 'half') => {
    setCart(currentCart => currentCart.filter(item => !(item.id === productId && item.portion === portion)))
  }

  const updateQuantity = (productId: number, portion: 'full' | 'half', newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId, portion)
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === productId && item.portion === portion
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.portion === 'full' ? item.fullPrice : item.halfPrice
      return total + price * item.quantity
    }, 0)
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold mb-6">Menú del Restaurante</h1>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-4">
            {products.map(product => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
                  <div className="flex justify-between mb-4">
                    <p>Porción completa: ${product.fullPrice.toFixed(2)}</p>
                    <p>Media porción: ${product.halfPrice.toFixed(2)}</p>
                  </div>
                  <RadioGroup
                    onValueChange={(value) => setSelectedPortion({ ...selectedPortion, [product.id]: value as 'full' | 'half' })}
                    defaultValue="full"
                    className="flex justify-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id={`full-${product.id}`} />
                      <Label htmlFor={`full-${product.id}`}>Completa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="half" id={`half-${product.id}`} />
                      <Label htmlFor={`half-${product.id}`}>Media</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => addToCart(product, selectedPortion[product.id] || 'full')} 
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Agregar al carrito
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Tu Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                cart.map(item => (
                  <div key={`${item.id}-${item.portion}`} className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.portion === 'full' ? 'Porción completa' : 'Media porción'}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${(item.portion === 'full' ? item.fullPrice : item.halfPrice).toFixed(2)} por unidad
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.portion, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.portion, parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                      />
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.portion, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id, item.portion)}>
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
  )
}