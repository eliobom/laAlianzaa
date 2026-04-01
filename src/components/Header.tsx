import { useState } from 'react';
import { Store, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="bg-yellow-400 text-gray-900 py-2 px-4 flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-1 md:gap-2">
            <Store size={16} className="md:w-[18px]" />
            <span className="font-medium">Despacho a domicilio</span>
          </div>
          <span className="hidden sm:inline">Lunes a Viernes 10:00 a 17:00 - Sábados 10:00 a 15:00</span>
          <span className="sm:hidden text-xs">L-V 10-17, S 10-15</span>
        </div>
      </div>

      <header className="bg-gray-900 text-white py-3 md:py-4 px-4 md:px-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-xl md:text-2xl font-bold tracking-wider">
              <div className="text-white">LA ALIANZA</div>
              <div className="text-xs md:text-sm tracking-widest text-gray-300">C A R N I C E R I A S</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              Inicio
            </button>
            {user && (
              <>
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-all ${
                    currentPage === 'admin'
                      ? 'bg-yellow-400 text-gray-900'
                      : 'text-white hover:bg-gray-800'
                  }`}
                >
                  Admin
                </button>
                <button
                  onClick={signOut}
                  className="px-4 md:px-6 py-2 rounded-lg font-medium text-white hover:bg-red-600 transition-all"
                >
                  Salir
                </button>
              </>
            )}
            {!user && (
              <button
                onClick={() => onNavigate('login')}
                className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 'login'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg font-medium transition-all text-left ${
                currentPage === 'home'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              Inicio
            </button>
            {user && (
              <>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all text-left ${
                    currentPage === 'admin'
                      ? 'bg-yellow-400 text-gray-900'
                      : 'text-white hover:bg-gray-800'
                  }`}
                >
                  Admin
                </button>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg font-medium text-white hover:bg-red-600 transition-all text-left"
                >
                  Salir
                </button>
              </>
            )}
            {!user && (
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-all text-left ${
                  currentPage === 'login'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                Login
              </button>
            )}
          </nav>
        )}
      </header>
    </>
  );
}
