import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'

export default function Shop({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(['all'])
  const [active, setActive] = useState('all')
  const [q, setQ] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [catsRes, itemsRes] = await Promise.all([
          fetch(`${baseUrl}/api/categories`),
          fetch(`${baseUrl}/api/products`),
        ])
        const cats = await catsRes.json()
        const its = await itemsRes.json()
        setCategories(cats.categories || ['all'])
        setItems(its.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [baseUrl])

  const filtered = useMemo(() => {
    const t = active === 'all' ? items : items.filter(i => i.category === active)
    if (!q) return t
    const s = q.toLowerCase()
    return t.filter(i => i.title.toLowerCase().includes(s) || (i.description || '').toLowerCase().includes(s))
  }, [items, active, q])

  return (
    <section id="shop" className="relative z-10 -mt-16 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop Setups</h2>
              <p className="text-gray-600">Curated bundles for every workflow</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search setups..."
                className="px-4 py-2 rounded-md border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${active === c ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-600">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-600">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filtered.map(item => (
                <ProductCard key={item.id} item={item} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
