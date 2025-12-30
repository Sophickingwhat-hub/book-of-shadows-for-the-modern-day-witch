import React from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Book, Moon, Sparkles, Users, Calendar, Scroll } from 'lucide-react';

export default function Home() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-serif text-amber-100 mb-4">
            ✨ Book of Shadows ✨
          </h1>
          <p className="text-xl text-purple-200">
            Your Digital Grimoire & Magical Practice Companion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link to={createPageUrl('MyGrimoire')} className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 p-6 rounded-xl border-2 border-amber-700 hover:border-amber-500 transition-all hover:scale-105">
            <Book className="w-12 h-12 text-amber-300 mb-4" />
            <h3 className="text-2xl font-serif text-amber-100 mb-2">My Grimoire</h3>
            <p className="text-amber-200">Your personal collection of spells, herbs, and crystals</p>
          </Link>

          <Link to={createPageUrl('MoonTracker')} className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 p-6 rounded-xl border-2 border-indigo-700 hover:border-indigo-500 transition-all hover:scale-105">
            <Moon className="w-12 h-12 text-indigo-300 mb-4" />
            <h3 className="text-2xl font-serif text-indigo-100 mb-2">Moon Tracker</h3>
            <p className="text-indigo-200">Track lunar phases and plan rituals</p>
          </Link>

          <Link to={createPageUrl('TheAunty')} className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 p-6 rounded-xl border-2 border-purple-700 hover:border-purple-500 transition-all hover:scale-105">
            <Sparkles className="w-12 h-12 text-purple-300 mb-4" />
            <h3 className="text-2xl font-serif text-purple-100 mb-2">Ask The Aunty</h3>
            <p className="text-purple-200">Get magical guidance from your wise crone</p>
          </Link>

          <Link to={createPageUrl('Covens')} className="bg-gradient-to-br from-rose-900/50 to-rose-800/50 p-6 rounded-xl border-2 border-rose-700 hover:border-rose-500 transition-all hover:scale-105">
            <Users className="w-12 h-12 text-rose-300 mb-4" />
            <h3 className="text-2xl font-serif text-rose-100 mb-2">Covens</h3>
            <p className="text-rose-200">Join or create magical circles</p>
          </Link>

          <Link to={createPageUrl('WheelOfTheYear')} className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-6 rounded-xl border-2 border-green-700 hover:border-green-500 transition-all hover:scale-105">
            <Calendar className="w-12 h-12 text-green-300 mb-4" />
            <h3 className="text-2xl font-serif text-green-100 mb-2">Wheel of the Year</h3>
            <p className="text-green-200">Sabbat calendar & rituals</p>
          </Link>

          <Link to={createPageUrl('JournalEntries')} className="bg-gradient-to-br from-amber-900/50 to-yellow-800/50 p-6 rounded-xl border-2 border-yellow-700 hover:border-yellow-500 transition-all hover:scale-105">
            <Scroll className="w-12 h-12 text-yellow-300 mb-4" />
            <h3 className="text-2xl font-serif text-yellow-100 mb-2">Journal</h3>
            <p className="text-yellow-200">Record your magical experiences</p>
          </Link>
        </div>
      </div>
    </div>
  );
}