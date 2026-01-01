import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Book, Leaf, Gem, Wand, Flame, Users as DeityIcon, Calendar, Scroll, Sparkles, Moon } from 'lucide-react';

export default function MyGrimoire() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-serif text-amber-100 text-center mb-4">📖 My Grimoire</h1>
        <p className="text-center text-purple-200 mb-12">Your personal collection of magical knowledge</p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link to={createPageUrl('Spells')} className="bg-gradient-to-br from-purple-900/60 to-purple-800/60 p-8 rounded-xl border-2 border-purple-700 hover:border-purple-500 transition-all hover:scale-105">
            <Sparkles className="w-12 h-12 text-purple-300 mb-4" />
            <h3 className="text-2xl font-serif text-purple-100 mb-2">Spells</h3>
            <p className="text-purple-200">Your book of spells and rituals</p>
          </Link>

          <Link to={createPageUrl('Herbs')} className="bg-gradient-to-br from-green-900/60 to-green-800/60 p-8 rounded-xl border-2 border-green-700 hover:border-green-500 transition-all hover:scale-105">
            <Leaf className="w-12 h-12 text-green-300 mb-4" />
            <h3 className="text-2xl font-serif text-green-100 mb-2">Herbs</h3>
            <p className="text-green-200">Botanical grimoire</p>
          </Link>

          <Link to={createPageUrl('Crystals')} className="bg-gradient-to-br from-cyan-900/60 to-cyan-800/60 p-8 rounded-xl border-2 border-cyan-700 hover:border-cyan-500 transition-all hover:scale-105">
            <Gem className="w-12 h-12 text-cyan-300 mb-4" />
            <h3 className="text-2xl font-serif text-cyan-100 mb-2">Crystals</h3>
            <p className="text-cyan-200">Stone and crystal collection</p>
          </Link>

          <Link to={createPageUrl('Tools')} className="bg-gradient-to-br from-amber-900/60 to-amber-800/60 p-8 rounded-xl border-2 border-amber-700 hover:border-amber-500 transition-all hover:scale-105">
            <Wand className="w-12 h-12 text-amber-300 mb-4" />
            <h3 className="text-2xl font-serif text-amber-100 mb-2">Tools</h3>
            <p className="text-amber-200">Magical instruments</p>
          </Link>

          <Link to={createPageUrl('Incense')} className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 p-8 rounded-xl border-2 border-slate-600 hover:border-slate-500 transition-all hover:scale-105">
            <Flame className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-2xl font-serif text-slate-100 mb-2">Incense</h3>
            <p className="text-slate-200">Sacred scents</p>
          </Link>

          <Link to={createPageUrl('Deities')} className="bg-gradient-to-br from-rose-900/60 to-rose-800/60 p-8 rounded-xl border-2 border-rose-700 hover:border-rose-500 transition-all hover:scale-105">
            <DeityIcon className="w-12 h-12 text-rose-300 mb-4" />
            <h3 className="text-2xl font-serif text-rose-100 mb-2">Deities</h3>
            <p className="text-rose-200">Divine connections</p>
          </Link>

          <Link to={createPageUrl('Correspondences')} className="bg-gradient-to-br from-indigo-900/60 to-indigo-800/60 p-8 rounded-xl border-2 border-indigo-700 hover:border-indigo-500 transition-all hover:scale-105">
            <Calendar className="w-12 h-12 text-indigo-300 mb-4" />
            <h3 className="text-2xl font-serif text-indigo-100 mb-2">Correspondences</h3>
            <p className="text-indigo-200">Magical associations</p>
          </Link>

          <Link to={createPageUrl('Sigils')} className="bg-gradient-to-br from-violet-900/60 to-violet-800/60 p-8 rounded-xl border-2 border-violet-700 hover:border-violet-500 transition-all hover:scale-105">
            <Sparkles className="w-12 h-12 text-violet-300 mb-4" />
            <h3 className="text-2xl font-serif text-violet-100 mb-2">Sigils</h3>
            <p className="text-violet-200">Symbolic magic</p>
          </Link>

          <Link to={createPageUrl('MoonRituals')} className="bg-gradient-to-br from-blue-900/60 to-blue-800/60 p-8 rounded-xl border-2 border-blue-700 hover:border-blue-500 transition-all hover:scale-105">
            <Moon className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-2xl font-serif text-blue-100 mb-2">Moon Rituals</h3>
            <p className="text-blue-200">Lunar ceremonies</p>
          </Link>
        </div>
      </div>
    </div>
  );
}