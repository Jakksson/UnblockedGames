/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  Settings, 
  TrendingUp, 
  Clock, 
  LayoutGrid,
  ChevronRight,
  Monitor
} from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [games] = useState(gamesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return Array.from(cats);
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e1e1e1] font-sans selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0d0d12]/80 backdrop-blur-xl border-r border-white/5 p-6 space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">NEXUS G<span className="text-cyan-500">A</span>MES</h1>
          </div>

          <nav className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-2 mb-4 block">
                Navigation
              </label>
              <div className="space-y-1">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${!selectedCategory ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hoverline:text-white/80'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm font-medium">All Games</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:bg-white/5 transition-all">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Trending</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:bg-white/5 transition-all">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Recent</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-2 mb-4 block">
                Categories
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${selectedCategory === cat ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'}`}
                  >
                    <span className="text-sm font-medium">{cat}</span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === cat ? 'rotate-90' : 'opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
             <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5">
                <p className="text-xs text-white/60 mb-2">Nexus Pro</p>
                <p className="text-[10px] text-white/40 mb-3">No ads, high performance, and cloud saves.</p>
                <button className="w-full py-2 bg-white text-black text-[10px] font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                  UPGRADE NOW
                </button>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {selectedCategory || 'Discovery'}
              </h2>
              <p className="text-white/40 text-sm">Explore {filteredGames.length} available unblocked games.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-cyan-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search Nexus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-[#16161e] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />
            </div>
          </header>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-[#16161e] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all shadow-2xl shadow-black"
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={game.thumbnail} 
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161e] via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                        {game.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <Gamepad2 className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="font-bold text-white tracking-tight">{game.name}</h3>
                       <Monitor className="w-4 h-4 text-white/20" />
                    </div>
                    <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredGames.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Games Found</h3>
              <p className="text-white/40 max-w-xs">We couldn't find any games matching your current search or category.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory(null);}}
                className="mt-6 text-cyan-500 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="w-full h-full max-w-6xl bg-[#0d0d12] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between px-6 py-4 border-bottom border-white/5 bg-white/5">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl overflow-hidden">
                     <img src={selectedGame.thumbnail} className="w-full h-full object-cover" alt="" />
                   </div>
                   <div>
                     <h3 className="font-bold text-white">{selectedGame.name}</h3>
                     <p className="text-[10px] text-white/40 uppercase tracking-widest">{selectedGame.category} Mode</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl text-white/60 hover:bg-white/10 transition-colors">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 rounded-xl text-white/60 hover:bg-white/10 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Game Viewport */}
              <div className="flex-1 bg-black relative group">
                <iframe 
                  src={selectedGame.iframeUrl} 
                  className="w-full h-full border-0"
                  title={selectedGame.name}
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Footer Info */}
              <div className="px-6 py-4 text-xs text-white/30 flex justify-between items-center bg-[#0d0d12]">
                <div className="flex items-center gap-6">
                   <span>ESC to quit</span>
                   <span>F11 for Fullscreen</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span>Server Status: Optimized</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (Background) */}
      <footer className="relative z-10 border-t border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-3">
              <Gamepad2 className="w-6 h-6 text-white/20" />
              <span className="text-white/20 font-bold tracking-tight">NEXUS ENTERTAINMENT</span>
           </div>
           
           <div className="flex gap-8 text-[11px] font-bold text-white/20 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">Legal</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
           </div>

           <p className="text-[10px] text-white/10">
             © 2026 Nexus Games. All rights reserved.
           </p>
        </div>
      </footer>
    </div>
  );
}
