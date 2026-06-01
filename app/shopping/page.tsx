"use client"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Restaurant Management",
    description: "Complete solution for orders, tables, billing, kitchen display & inventory.",
    price: 12999,
    tag: "Popular",
    icon: "🍽️",
    features: ["Table Management", "KOT System", "Billing & GST", "Inventory"],
  },
  {
    id: 2,
    name: "HR Management",
    description: "Payroll, attendance, leave tracking and employee lifecycle management.",
    price: 9999,
    tag: "New",
    icon: "👥",
    features: ["Payroll", "Attendance", "Leave Tracker", "Appraisals"],
  },
  {
    id: 3,
    name: "Clinic Management",
    description: "Patient records, appointments, prescriptions and billing for clinics.",
    price: 11499,
    tag: "Trusted",
    icon: "🏥",
    features: ["Patient Records", "Appointments", "Prescriptions", "Reports"],
  },
  {
    id: 4,
    name: "Pharmacy Management",
    description: "Medicine stock, expiry alerts, purchase orders and sales billing.",
    price: 10499,
    tag: "Trusted",
    icon: "💊",
    features: ["Stock Control", "Expiry Alerts", "Purchase Orders", "GST Billing"],
  },
  {
    id: 5,
    name: "Tally Software",
    description: "Full-featured accounting with ledgers, vouchers, and financial reports.",
    price: 8999,
    tag: "Classic",
    icon: "📒",
    features: ["Ledger Management", "Vouchers", "Balance Sheet", "P&L Reports"],
  },
  {
    id: 6,
    name: "Store Management",
    description: "Retail POS, stock management, supplier tracking and daily reports.",
    price: 9499,
    tag: "Popular",
    icon: "🏪",
    features: ["POS Billing", "Stock Alerts", "Supplier Ledger", "Daily Reports"],
  },
  {
    id: 7,
    name: "Project Management",
    description: "Task boards, milestones, team collaboration and time tracking.",
    price: 7999,
    tag: "New",
    icon: "📋",
    features: ["Task Boards", "Milestones", "Team Chat", "Time Tracking"],
  },
  {
    id: 8,
    name: "GST & Billing",
    description: "GSTIN-compliant invoices, e-invoicing, returns filing and reconciliation.",
    price: 6999,
    tag: "Essential",
    icon: "🧾",
    features: ["GST Invoices", "E-Invoicing", "Returns Filing", "Reconciliation"],
  },
]

const tagColors: Record<string, string> = {
  Popular:   "bg-orange-100 text-orange-700",
  New:       "bg-green-100 text-green-700",
  Trusted:   "bg-blue-100 text-blue-700",
  Classic:   "bg-purple-100 text-purple-700",
  Essential: "bg-gray-100 text-gray-600",
}

type CartItem = { id: number; qty: number }

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist]   = useState<number[]>([])
  const [toast, setToast]         = useState<string | null>(null)
  const [cartOpen, setCartOpen]   = useState(false)
  const [wishOpen, setWishOpen]   = useState(false)

  // ── helpers ──────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  function addToCart(id: number, name: string) {
    setCartItems(prev => {
      const exists = prev.find(x => x.id === id)
      if (exists) return prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { id, qty: 1 }]
    })
    showToast(`${name} added to cart 🛒`)
    setCartOpen(true)
  }

  function removeFromCart(id: number) {
    setCartItems(prev => prev.filter(x => x.id !== id))
  }

  function changeQty(id: number, delta: number) {
    setCartItems(prev =>
      prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x)
    )
  }

  function toggleWishlist(id: number, name: string) {
    setWishlist(prev => {
      if (prev.includes(id)) {
        showToast("Removed from wishlist")
        return prev.filter(x => x !== id)
      }
      showToast(`${name} added to wishlist ♥`)
      return [...prev, id]
    })
  }

  function moveToCart(id: number, name: string) {
    setWishlist(prev => prev.filter(x => x !== id))
    addToCart(id, name)
  }

  // ── derived ───────────────────────────────────────────────
  const cartTotal = cartItems.reduce((sum, ci) => {
    const p = products.find(x => x.id === ci.id)
    return sum + (p ? p.price * ci.qty : 0)
  }, 0)

  const cartCount = cartItems.reduce((s, c) => s + c.qty, 0)

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ══════════════════════════════════════
          HERO / TOP BAR
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 mt-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 border border-gray-200 rounded-full px-4 py-1">
              Software Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight">
              The right software<br />
              <span className="text-gray-400">for every business.</span>
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              Pick the tools that fit. Add to cart and get started today.
            </p>
          </div>

          {/* Wishlist + Cart buttons */}
          <div className="flex items-center gap-3 pt-2">
            {/* Wishlist */}
            <button
              onClick={() => setWishOpen(true)}
              className="relative flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist
              {wishlist.length > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRODUCT GRID
      ══════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map(p => {
            const inCart     = cartItems.some(x => x.id === p.id)
            const inWishlist = wishlist.includes(p.id)

            return (
              <div
                key={p.id}
                className="group relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1px solid #f0f0f0' }}
              >
                {/* Tag */}
                <span className={`absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${tagColors[p.tag]}`}>
                  {p.tag}
                </span>

                {/* Wishlist heart */}
                <button
                  onClick={() => toggleWishlist(p.id, p.name)}
                  className={`absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150
                    ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-300 opacity-0 group-hover:opacity-100'}`}
                  title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg className="w-3.5 h-3.5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mt-2">
                  {p.icon}
                </div>

                {/* Name & desc */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-black leading-snug">{p.name}</h3>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed">{p.description}</p>
                </div>

                {/* Feature chips */}
                <ul className="flex flex-wrap gap-1.5">
                  {p.features.map(f => (
                    <li key={f} className="text-[10px] font-medium bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md">{f}</li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-xl font-extrabold text-black">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400 ml-1">/yr</span>
                  </div>
                  <button
                    onClick={() => addToCart(p.id, p.name)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150
                      ${inCart ? 'bg-black text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                  >
                    {inCart ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Add More
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* ══════════════════════════════════════
          CART DRAWER
      ══════════════════════════════════════ */}
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-bold text-base">Your Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </div>
          <button onClick={() => setCartOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm font-medium">Your cart is empty</p>
              <button onClick={() => setCartOpen(false)} className="text-xs text-black underline underline-offset-2">Browse products</button>
            </div>
          ) : (
            cartItems.map(ci => {
              const p = products.find(x => x.id === ci.id)!
              return (
                <div key={ci.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                    {p.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">₹{p.price.toLocaleString('en-IN')}/yr</p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => changeQty(ci.id, -1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm font-bold"
                    >−</button>
                    <span className="w-5 text-center text-sm font-semibold">{ci.qty}</span>
                    <button
                      onClick={() => changeQty(ci.id, 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm font-bold"
                    >+</button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(ci.id)}
                    className="p-1 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-300 transition-colors flex-shrink-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-base font-extrabold">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
              Checkout →
            </button>
            <button
              onClick={() => setCartItems([])}
              className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════
          WISHLIST DRAWER
      ══════════════════════════════════════ */}
      {wishOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setWishOpen(false)}
        />
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${wishOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-bold text-base">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>
            )}
          </div>
          <button onClick={() => setWishOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-sm font-medium">No items in wishlist</p>
              <button onClick={() => setWishOpen(false)} className="text-xs text-black underline underline-offset-2">Browse products</button>
            </div>
          ) : (
            wishlist.map(wid => {
              const p = products.find(x => x.id === wid)!
              const inCart = cartItems.some(x => x.id === wid)
              return (
                <div key={wid} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                    {p.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">₹{p.price.toLocaleString('en-IN')}/yr</p>
                  </div>

                  {/* Move to cart */}
                  <button
                    onClick={() => moveToCart(wid, p.name)}
                    className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors
                      ${inCart ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-black text-white hover:bg-gray-800'}`}
                    disabled={inCart}
                  >
                    {inCart ? 'In Cart' : '+ Cart'}
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => toggleWishlist(wid, p.name)}
                    className="p-1 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-300 transition-colors flex-shrink-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <button
              onClick={() => {
                wishlist.forEach(id => {
                  const p = products.find(x => x.id === id)
                  if (p && !cartItems.some(c => c.id === id)) addToCart(id, p.name)
                })
                setWishlist([])
                setWishOpen(false)
                setCartOpen(true)
              }}
              className="w-full bg-black text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Move all to Cart
            </button>
          </div>
        )}
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg animate-fade-in pointer-events-none whitespace-nowrap">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease; }
      `}</style>
    </div>
  )
}