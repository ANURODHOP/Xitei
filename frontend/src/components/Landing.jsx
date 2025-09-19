import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import {Link} from 'react-router-dom'; 

import bg1 from '../assets/bg-junkFoods.png'; // Ensure the path is correct and the image exists
import fastFoodModelUrl from '../assets/fast-foods.glb?url'; // Import as URL for correct bundling in Vite

// Enhanced Spinning Cylinder with dynamic lighting and subtle hover effect
function SpinningCylinder({ position }) {
  const texture = new TextureLoader().load(bg1);
  const ref = React.useRef();
  const [hovered, setHover] = React.useState(false);

  useFrame(() => {
    ref.current.rotation.y += hovered ? 0.02 : 0.005; // Faster spin on hover
  });

  return (
    <mesh 
      ref={ref} 
      position={position} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
    >
      <cylinderGeometry args={[6, 6, 12, 128, 1, true, 0, Math.PI * 2]} /> {/* Larger size, higher segments for ultra-smooth */}
      <meshPhysicalMaterial 
        map={texture} 
        side={2} 
        emissive="#ff9900" 
        emissiveIntensity={0.6} 
        roughness={0.3} 
        metalness={0.5} 
        clearcoat={1} 
        clearcoatRoughness={0.1}
      /> {/* Premium physical material with clearcoat for glossy look */}
    </mesh>
  );
}

// Enhanced Fast Food Model with floating animation and interactive scaling
function FastFoodModel({ position }) {
  const { scene } = useGLTF(fastFoodModelUrl);
  const ref = React.useRef();
  const [hovered, setHover] = React.useState(false);

  useFrame((state) => {
    ref.current.rotation.z += (state.pointer.x ) * 0.002; // Rotate based on mouse X position
    ref.current.rotation.x = -1; // Rotate based on mouse X position
    
  })


  return (
    <primitive 
      ref={ref} 
      object={scene} 
      position={position} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
    />
  );
}

// Main Landing Component with premium design: sleek gradients, animations, and responsive layout
function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white font-sans antialiased text-gray-800">
      {/* Premium Navigation with subtle shadow and smooth transitions */}
      <nav className="bg-indigo-800 text-white p-6 flex justify-between items-center shadow-lg sticky top-0 z-20">
        <h1 className="text-3xl font-extrabold tracking-tight">Xitei</h1>
        <div className="space-x-4">
          <button className="text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Features</button>
          <button className="text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">About</button>
          <Link to='/register' className="bg-white text-indigo-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-300 cursor-pointer">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section: Eye-catching with 3D cylinder, overlay text, and parallax feel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-80 z-0" />
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
            Revolutionize Your Deliveries with Xitei
          </h2>
          <p className="text-2xl text-white mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
            Fast, reliable, and premium delivery service for groceries, essentials, and more. Experience speed like never before.
          </p>
          <button className="bg-white text-indigo-800 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition duration-500 transform hover:scale-105">
            Start Delivering Today
          </button>
        </div>
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={2.0} />
              <directionalLight position={[15, 20, 15]} intensity={3.0} castShadow color="#ffffff" />
              <pointLight position={[-15, -10, -15]} intensity={2.5} color="#ffcc00" />
              <SpinningCylinder position={new Vector3(0, 0, 0)} />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              <Environment preset="sunset" background /> {/* Premium HDR environment for realistic lighting */}
              <mesh receiveShadow position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.4} />
              </mesh>
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* Features Section: Clean cards with subtle animations */}
      <section className="py-24 bg-white px-8 md:px-16">
        <h2 className="text-5xl font-bold text-center mb-16">Why Choose Xitei?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 bg-indigo-50 rounded-xl shadow-md hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">Lightning Fast Delivery</h3>
            <p className="text-gray-600">Get your orders in minutes with our optimized routes and real-time tracking.</p>
          </div>
          <div className="p-8 bg-indigo-50 rounded-xl shadow-md hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">Eco-Friendly Options</h3>
            <p className="text-gray-600">Choose sustainable packaging and electric vehicles for a greener planet.</p>
          </div>
          <div className="p-8 bg-indigo-50 rounded-xl shadow-md hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
            <p className="text-gray-600">Our team is always here to help with any queries or issues.</p>
          </div>
        </div>
      </section>

      {/* Featured Fast Food Section: Integrated 3D model with premium presentation */}
      <section className="py-24 bg-gradient-to-r from-blue-100 to-indigo-100 text-center px-8 md:px-16">
        <h2 className="text-5xl font-bold mb-8">Indulge in Premium Fast Food Deliveries</h2>
        <p className="text-2xl max-w-3xl mx-auto mb-12 text-gray-600">
          Crave-worthy meals delivered fresh and hot. Explore our curated selection of fast food favorites.
        </p>
        <div className="w-full h-[600px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <Canvas camera={{ position: [0, 0, 500], fov: 100, rotation:[0,0,0] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={1.0} />
              <FastFoodModel position={[0, 0, 0]}/>
              <OrbitControls enableZoom={false} enablePan={true}/>
            </Suspense>  
          </Canvas>  
        </div>
      </section>

      {/* CTA Section: Bold call to action with gradient */}
      <section className="py-24 bg-indigo-800 text-white text-center">
        <h2 className="text-5xl font-bold mb-8">Ready to Experience Xitei?</h2>
        <p className="text-2xl max-w-2xl mx-auto mb-12">Join thousands of satisfied customers and elevate your delivery game.</p>
        <Link to='/register' className="bg-white text-indigo-800 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition duration-300 cursor-pointer">
          Sign Up Now
        </Link>
      </section>

      {/* Footer: Simple and elegant */}
      <footer className="bg-indigo-900 text-white py-8 text-center">
        <p>&copy; 2025 Xitei. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

// Add global animations via CSS (can be added in index.css or via style tag)
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease-out; }
.delay-200 { animation-delay: 0.2s; }
`;
document.head.appendChild(style);