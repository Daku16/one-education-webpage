// apps/frontend/src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  CircleHelp,
  BookOpen,
  Lightbulb,
  Microscope,
  Phone,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  {
    href: '/',
    label: 'Inicio',
    icon: Home,
    iconClass: 'text-orange-500',
  },
  {
    href: '/sobre',
    label: 'Sobre ONE',
    icon: CircleHelp,
    iconClass: 'text-sky-600',
  },
  {
    href: '/rea',
    label: 'REA',
    icon: BookOpen,
    iconClass: 'text-emerald-600',
  },
  {
    href: '/proyectos',
    label: 'Proyectos',
    icon: Lightbulb,
    iconClass: 'text-amber-500',
  },
  {
    href: '/investigacion',
    label: 'Investigación',
    icon: Microscope,
    iconClass: 'text-indigo-600',
  },
  {
    href: '/contacto',
    label: 'Contacto',
    icon: Phone,
    iconClass: 'text-green-600',
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-sky-100 bg-white/85 shadow-md backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo1.png"
            alt="ONE Education"
            width={110}
            height={52}
            priority
            className="h-auto w-auto"
          />
        </Link>

        <div className="hidden items-center gap-2 rounded-full bg-white/90 px-2 py-2 shadow-sm md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold tracking-tight transition-all duration-200',
                  isActive
                    ? 'bg-cyan-100 text-zinc-900 shadow-sm'
                    : 'text-zinc-800 hover:bg-cyan-50 hover:text-sky-700',
                ].join(' ')}
              >
                <Icon
                  size={22}
                  strokeWidth={2.2}
                  className={item.iconClass}
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex rounded-xl p-2 text-zinc-800 transition hover:bg-sky-50 md:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-sky-100 bg-white md:hidden"
          >
            <div className="space-y-2 px-4 py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold transition',
                      isActive
                        ? 'bg-cyan-100 text-zinc-900'
                        : 'text-zinc-800 hover:bg-cyan-50',
                    ].join(' ')}
                  >
                    <Icon
                      size={22}
                      strokeWidth={2.2}
                      className={item.iconClass}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
