export default function ProductCard({ item, onAdd }) {
  return (
    <div className="group bg-white/80 backdrop-blur border border-white/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(item)}
            className="px-3 py-2 rounded-md bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
