import { useMemo, useState } from 'react'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Cart from './components/Cart'

function App() {
  const [cart, setCart] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const total = useMemo(() => cart.reduce((sum, l) => sum + l.price * l.quantity, 0), [cart])

  const handleAdd = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id)
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { id: item.id, title: item.title, price: item.price, quantity: 1 }]
    })
  }

  const handleRemove = (id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const handleCheckout = async () => {
    try {
      const payload = {
        items: cart.map(l => ({ product_id: l.id, title: l.title, price: l.price, quantity: l.quantity })),
        customer: { name: 'Guest', email: 'guest@example.com' },
      }
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      alert(`Order placed! Confirmation: ${data.id}`)
      setCart([])
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-white">
      <Hero />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Shop onAdd={handleAdd} />
        </div>
        <div>
          <Cart items={cart} onRemove={handleRemove} onCheckout={handleCheckout} total={total} />
        </div>
      </div>
      <footer className="mt-16 py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} DeskSetups — retro, cozy, and productive.
      </footer>
    </div>
  )
}

export default App
