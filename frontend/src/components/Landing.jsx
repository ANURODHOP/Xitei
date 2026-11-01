import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import fastFoodModelUrl from '../assets/fast-foods.glb?url';

/* ── 3D Model with gentle auto-rotate that pauses on grab ── */
function CartoonModel() {
  const { scene } = useGLTF(fastFoodModelUrl);
  const ref = useRef();
  const [dragging, setDragging] = useState(false);

  useFrame((_, delta) => {
    if (!dragging && ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.4}
      position={[0, -0.8, 0]}
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
    />
  );
}

/* ── Category pill data ── */
const CATEGORIES = [
  { label: 'Food & Drinks', emoji: '🍔' },
  { label: 'Electronics', emoji: '📱' },
  { label: 'Fashion', emoji: '👗' },
  { label: 'Home & Kitchen', emoji: '🏠' },
  { label: 'Sports', emoji: '⚽' },
  { label: 'Books', emoji: '📚' },
];

/* ── Why-us rows ── */
const WHY = [
  {
    title: 'Live stock tracking',
    body: 'Every product shows real-time availability. What you see is actually in stock — no disappointments at checkout.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Stripe-secured payments',
    body: 'Industry-standard payment processing. Your card data never touches our servers.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    ),
  },
  {
    title: 'Instant order confirmation',
    body: 'Get a confirmation email the moment your order goes through — no waiting, no guessing.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    ),
  },
];

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900 shrink-0">
            Xitei
          </Link>

          {/* Centre: search hint (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="w-full flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-pointer hover:border-gray-400 transition-colors">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search products…</span>
            </div>
          </div>

          {/* Right: nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="ml-2 px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-md hover:bg-black transition-colors">
              Register
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-800 rounded-md"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen
              ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1 text-sm font-medium">
            <Link to="/login" className="py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>Sign in</Link>
            <Link to="/register" className="py-2 px-3 mt-1 rounded-md text-center bg-gray-900 text-white hover:bg-black" onClick={() => setMobileOpen(false)}>Register</Link>
          </div>
        )}
      </header>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[88vh] lg:min-h-0 lg:py-20">

        {/* Left: copy */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-block mb-5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-full tracking-wide uppercase">
            🛒 Free to browse — no account needed to explore
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.15] tracking-tight">
            Shop smarter.<br />
            <span className="text-gray-400 font-normal">Get everything<br />delivered.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Xitei brings you thousands of products with live stock updates, secure Stripe checkout, and instant order confirmation.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              to="/register"
              className="px-7 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-black transition-colors"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="px-7 py-3.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-gray-400 justify-center lg:justify-start">
            {['No hidden fees', 'Secure checkout', 'Real stock data', 'Instant email confirmation'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: 3D viewer card */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="w-full max-w-[420px] aspect-square bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden relative shadow-sm">
            {/* Drag hint */}
            <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-2.5 py-1 text-[10px] font-medium text-gray-500 flex items-center gap-1 pointer-events-none select-none">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
              Drag to rotate
            </div>

            <Canvas
              camera={{ position: [0, 1.5, 5], fov: 38 }}
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[4, 6, 4]} intensity={1.8} castShadow />
                <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#e8f4ff" />
                <Environment preset="city" />
                <CartoonModel />
                <ContactShadows
                  position={[0, -1.2, 0]}
                  opacity={0.2}
                  scale={6}
                  blur={2}
                  far={4}
                />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.8}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      {/* ══════════════════ CATEGORY STRIP ══════════════════ */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-5">Browse categories</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map(c => (
              <Link
                key={c.label}
                to="/register"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-white hover:shadow-sm transition-all"
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY XITEI ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Built for real shopping</h2>
          <p className="mt-2 text-gray-500 text-sm max-w-sm mx-auto">
            No fluff. No fake counters. Just a fast, honest shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY.map(w => (
            <div key={w.title} className="p-7 border border-gray-200 rounded-xl hover:shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  {w.icon}
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{w.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CTA BLOCK ══════════════════ */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-2xl px-8 sm:px-14 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to start shopping?</h2>
            <p className="mt-2 text-gray-400 text-sm max-w-xs">Create an account in under 30 seconds and start browsing immediately.</p>
          </div>
          <Link
            to="/register"
            className="shrink-0 px-8 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Get started — it's free
          </Link>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span className="font-bold text-gray-700 text-sm">Xitei</span>
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