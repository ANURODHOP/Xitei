import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M10 12v4m4-4v4" />
      </svg>
    ),
    title: 'Curated Selection',
    desc: 'Hand-picked products across dozens of categories. Quality checked before it reaches your door.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Secure Payments',
    desc: 'Every transaction is encrypted end-to-end. Pay with card through our Stripe-powered checkout.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Real-Time Stock',
    desc: 'Live inventory tracking. What you see is always what\'s actually available — no surprises at checkout.',
  },
];

const categories = [
  { name: 'Electronics', emoji: '📱' },
  { name: 'Fashion', emoji: '👗' },
  { name: 'Home & Kitchen', emoji: '🏠' },
  { name: 'Sports', emoji: '⚽' },
  { name: 'Books', emoji: '📚' },
  { name: 'Food & Beverages', emoji: '🥗' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ─── Navigation ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight text-gray-900">Xitei</span>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#categories" className="hover:text-gray-900 transition-colors">Categories</a>
            <Link
              to="/login"
              className="hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-4 space-y-2 text-sm font-medium text-gray-700">
            <a href="#features" className="block py-2 hover:text-gray-900" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#categories" className="block py-2 hover:text-gray-900" onClick={() => setMenuOpen(false)}>Categories</a>
            <Link to="/login" className="block py-2 hover:text-gray-900" onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link
              to="/register"
              className="block mt-2 text-center bg-gray-900 text-white px-5 py-2.5 rounded-md font-medium hover:bg-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <span className="inline-block mb-4 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full tracking-wider uppercase">
          Now live — Shop with confidence
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          Everything you need,<br className="hidden sm:block" /> delivered to you.
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Xitei is a modern shopping platform. Browse thousands of products, track stock in real time, and check out securely in seconds.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="bg-gray-900 text-white px-8 py-3.5 rounded-md font-semibold text-base hover:bg-black transition-colors w-full sm:w-auto"
          >
            Create your account
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-md font-semibold text-base hover:border-gray-400 hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Sign in
          </Link>
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
            No hidden fees
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
            Secure checkout
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
            Real stock updates
          </span>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="border-t border-gray-100" />

      {/* ─── Features ─── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Why Xitei?</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">Built around the shopping experience that actually matters to you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-7 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-gray-700 mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section id="categories" className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-3 text-gray-500">Find exactly what you're looking for.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                to="/register"
                key={cat.name}
                className="flex flex-col items-center justify-center gap-3 p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-sm transition-all group cursor-pointer"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gray-900 rounded-2xl px-8 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to start shopping?</h2>
          <p className="mt-4 text-gray-400 max-w-md mx-auto text-base">
            Create a free account and start browsing thousands of products today.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block bg-white text-gray-900 px-8 py-3.5 rounded-md font-semibold text-base hover:bg-gray-100 transition-colors"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <span className="font-semibold text-gray-700">Xitei</span>
          <span>&copy; {new Date().getFullYear()} Xitei. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}