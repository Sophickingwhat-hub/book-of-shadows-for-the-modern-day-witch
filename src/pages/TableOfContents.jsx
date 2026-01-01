import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BookOpen } from 'lucide-react';

export default function TableOfContents() {
  const sections = [
    {
      title: 'INTRODUCTION',
      items: [
        { roman: 'I', name: 'Introduction', page: 'Introduction' },
        { roman: 'II', name: 'Book Blessings', page: 'BookBlessings' },
        { roman: 'III', name: 'Dedication & Protection', page: 'DedicationProtection' },
        { roman: 'IV', name: 'My Grimoire', page: 'MyGrimoire' }
      ]
    },
    {
      title: 'CORRESPONDENCES & MATERIA',
      items: [
        { roman: 'IV', name: 'Correspondences', page: 'Correspondences' },
        { roman: 'V', name: 'Herbs', page: 'Herbs' },
        { roman: 'VI', name: 'Crystals', page: 'Crystals' },
        { roman: 'VII', name: 'Incense', page: 'Incense' },
        { roman: 'VIII', name: 'Candles', page: 'Candles' },
        { roman: 'IX', name: 'Moon Watcher', page: 'MoonTracker' },
        { roman: 'X', name: 'Tools', page: 'Tools' }
      ]
    },
    {
      title: 'SPELLS & RITUALS',
      items: [
        { roman: 'X', name: 'Spells', page: 'Spells' },
        { roman: 'XI', name: 'Spell Builder', page: 'SpellBuilder' },
        { roman: 'XII', name: 'Rituals', page: 'MoonRituals' },
        { roman: 'XIII', name: 'Ritual Builder', page: 'RitualBuilder' },
        { roman: 'XIV', name: 'Sacred Sounds', page: 'SacredSounds' }
      ]
    },
    {
      title: 'MAGICAL TIMING',
      items: [
        { roman: 'XV', name: 'Moon Calendar', page: 'MoonTracker' },
        { roman: 'XVI', name: 'Wheel of the Year', page: 'WheelOfTheYear' },
        { roman: 'XVII', name: 'Year-Ahead Planner', page: 'YearAheadPlanner' }
      ]
    },
    {
      title: 'WRITTEN IN THE STARS',
      items: [
        { roman: 'XVIII', name: 'Natal Chart', page: 'NatalChart' },
        { roman: 'XIX', name: 'Karmic Relationship', page: 'KarmicRelationship' }
      ]
    },
    {
      title: 'THE GRAND ORACLE',
      items: [
        { roman: 'XX', name: 'Grand Oracle', page: 'GrandOracle' }
      ]
    },
    {
      title: 'PATHS OF THE CRAFT',
      items: [
        { roman: 'XXI', name: 'Which Witch Are You?', page: 'WhichWitch' },
        { roman: 'XXII', name: 'The Many Paths', page: 'ManyPaths' }
      ]
    },
    {
      title: 'JOURNALING & INNER WORK',
      items: [
        { roman: 'XXIII', name: 'Journal', page: 'JournalEntries' },
        { roman: 'XXIV', name: 'Shadow Work', page: 'ShadowWork' },
        { roman: 'XXV', name: 'Ancestor Work', page: 'AncestorWork' },
        { roman: 'XXVI', name: 'Dream Incubator', page: 'Dreams' }
      ]
    },
    {
      title: 'COMMUNITY & LINEAGE',
      items: [
        { roman: 'XXVII', name: 'Deities', page: 'Deities' },
        { roman: 'XXVIII', name: 'Community Spells', page: 'CommunitySpells' },
        { roman: 'XXIX', name: 'My Coven', page: 'Covens' },
        { roman: 'XXX', name: 'Bloodline Sync', page: 'BloodlineSync' }
      ]
    },
    {
      title: 'INTERACTIVE',
      items: [
        { roman: 'XXXI', name: 'Ask Aunty', page: 'TheAunty' },
        { roman: 'XXXII', name: 'Knowledge Base', page: 'KnowledgeBase' },
        { roman: 'XXXIII', name: 'AR Altar', page: 'ARAltarSimulator' }
      ]
    },
    {
      title: 'SETTINGS & BOOK INFO',
      items: [
        { roman: 'XXXIV', name: 'Subscription', page: 'Subscription' },
        { roman: 'XXXV', name: 'Settings', page: 'Settings' },
        { roman: 'XXXVI', name: 'Legal Data', page: 'Legal' }
      ]
    }
  ];

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-900" />
          <h1 className="text-6xl book-title text-amber-950 mb-2">Book of Shadows</h1>
          <p className="fancy-script text-2xl text-amber-800">A Witch's Grimoire</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="fancy-script text-2xl text-amber-900 mb-4">{section.title}</h2>
              {section.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  to={createPageUrl(item.page)}
                  className="flex items-baseline gap-4 hover:text-amber-700 transition-colors group"
                >
                  <span className="handwritten text-2xl font-bold text-amber-950 w-16">{item.roman}</span>
                  <span className="handwritten text-xl text-amber-900 group-hover:translate-x-2 transition-transform">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border-2 border-amber-800 rounded-lg bg-amber-50/50">
          <p className="fancy-script text-lg text-amber-900 text-center mb-2">🌙 Moon Phase</p>
          <p className="handwritten text-center text-amber-800">Waxing Gibbous</p>
          <p className="handwritten text-center text-sm text-amber-700 mt-2">Perfect for growth spells</p>
        </div>
      </div>
    </div>
  );
}