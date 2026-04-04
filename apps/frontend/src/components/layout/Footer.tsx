import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700 pt-10">
          <div className='flex items-center justify-center md:justify-center'>
            <div className="w-34 md:w-28 lg:w-32">
              <Image
                src="/One.png"
                alt="Isotipo de ONE Education"
                width={128}
                height={128}
                className="w-full h-auto object-contain"
                priority={false}
              />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <p className="text-sm leading-6 mb-4">
              ¿Te quedaron dudas? Escríbenos ahora mismo, estamos aquí para ayudarte.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                <a href="tel:+573125312462" className="hover:text-white transition-colors">
                  +57 312 5312462
                </a>
              </li>
              <li>
                <a href="mailto:steam@one-edu.co" className="hover:text-white transition-colors">
                  steam@one-edu.co
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">De tu interés</h3>
            <ul className="text-sm space-y-3">
              <li>
                <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre ONE
                </Link>
              </li>
              <li>
                <Link href="/investigacion" className="hover:text-white transition-colors">
                  Investigación
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} ONE Education. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};