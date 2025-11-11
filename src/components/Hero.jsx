import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fA4LwfT7IUUelEGO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-900/40 to-purple-900/80 pointer-events-none" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="text-white max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm mb-4">Retro • Cozy • Gaming</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Build your perfect desk setup
          </h1>
          <p className="mt-4 text-purple-100 text-lg">
            Curated kits for gaming, productivity, and creators — inspired by a dreamy, retro 3D desktop vibe.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#shop" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-pink-500 hover:bg-pink-400 text-white font-semibold transition-colors">Shop setups</a>
            <a href="/test" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">Check backend</a>
          </div>
        </div>
      </div>
    </section>
  )
}
