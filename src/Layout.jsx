import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { Menu, X, LogOut, User } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <div className="min-h-screen parchment-bg">
      <nav className="bg-amber-900/90 backdrop-blur border-b-2 border-amber-950 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl('TableOfContents')} className="text-2xl book-title text-amber-50 flex items-center gap-2">
              📖 Book of Shadows
            </Link>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-100 p-2"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <div className="hidden md:flex items-center gap-6">
              <Link to={createPageUrl('TableOfContents')} className="handwritten text-amber-50 hover:text-amber-200">
                Contents
              </Link>
              <Link to={createPageUrl('MyGrimoire')} className="handwritten text-amber-50 hover:text-amber-200">
                Grimoire
              </Link>
              <Link to={createPageUrl('TheAunty')} className="handwritten text-amber-50 hover:text-amber-200">
                Aunty
              </Link>
              <Link to={createPageUrl('Spells')} className="handwritten text-amber-50 hover:text-amber-200">
                Spells
              </Link>
              {user && (
                <button onClick={handleLogout} className="handwritten text-amber-50 hover:text-amber-200 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-3">
              <Link to={createPageUrl('MyGrimoire')} className="text-amber-100 hover:text-amber-300">
                My Grimoire
              </Link>
              <Link to={createPageUrl('TheAunty')} className="text-amber-100 hover:text-amber-300">
                The Aunty
              </Link>
              <Link to={createPageUrl('MoonTracker')} className="text-amber-100 hover:text-amber-300">
                Moon
              </Link>
              <Link to={createPageUrl('Covens')} className="text-amber-100 hover:text-amber-300">
                Covens
              </Link>
              {user && (
                <button onClick={handleLogout} className="text-amber-100 hover:text-amber-300 text-left">
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-amber-900/90 text-amber-100 py-8 mt-16 border-t-2 border-amber-950">
        <div className="container mx-auto px-4 text-center">
          <p className="fancy-script text-2xl">✨ Blessed be ✨</p>
        </div>
      </footer>
    </div>
  );
}