// apps/frontend/src/components/layout/Navbar.tsx
'use client'; 
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src='/logo1.png' alt="ONE" width={100} height={50} />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/sobre" className="text-gray-700 hover:text-blue-600 font-medium">Sobre ONE</Link>
            <Link href="/rea" className="text-gray-700 hover:text-blue-600 font-medium">REA</Link>
            <Link href="/proyectos" className="text-gray-700 hover:text-blue-600 font-medium">Proyectos</Link>
            <Link href="/investigacion" className="text-gray-700 hover:text-blue-600 font-medium">Investigación</Link>
            <Link href="/contacto" className="text-gray-700 hover:text-blue-600 font-medium">Contacto</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/sobre" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Sobre ONE</Link>
                <Link href="/rea" className="block px-3 py-2 text-gray-700 hover:text-blue-600">REA</Link>
                <Link href="/proyectos" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Proyectos</Link>
                <Link href="/investigacion" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Investigación</Link>
                <Link href="/contacto" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contacto</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
