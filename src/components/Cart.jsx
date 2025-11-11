export default function Cart({ items, onRemove, onCheckout, total }) {
  return (
    <div className="sticky top-6 bg-white/70 backdrop-blur rounded-2xl p-6 border border-white/60 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900">Your Cart</h3>
      <div className="mt-4 space-y-3 max-h-[50vh] overflow-auto pr-2">
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          items.map((line) => (
            <div key={line.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-gray-900">{line.title}</p>
                <p className="text-sm text-gray-600">{line.quantity} × ${line.price.toFixed(2)}</p>
              </div>
              <button onClick={() => onRemove(line.id)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-700">Total</span>
        <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>
      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="mt-4 w-full px-4 py-2 rounded-md bg-pink-500 text-white font-semibold hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Checkout
      </button>
    </div>
  )
}
