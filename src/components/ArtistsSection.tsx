import React, { useState } from 'react';
import { Sparkles, Award, Instagram, Twitter, Globe, Send, UserCheck, UserPlus, Heart, Eye } from 'lucide-react';
import { Artist, Artwork } from '../types';

interface ArtistsSectionProps {
  artists: Artist[];
  artworks: Artwork[];
  onFollowToggle: (artistId: string) => void;
  setSelectedArtwork: (art: Artwork) => void;
}

export default function ArtistsSection({
  artists,
  artworks,
  onFollowToggle,
  setSelectedArtwork,
}: ArtistsSectionProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Get portfolio pieces of an artist
  const getArtistPortfolio = (artistId: string) => {
    return artworks.filter(a => a.artistId === artistId);
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">The Creative Collective</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Discover world-class digital creators, painters, and award-winning sculptors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Artist List (Left Grid Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {artists.map((artist) => {
            const portfolio = getArtistPortfolio(artist.id);
            return (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className={`bg-white dark:bg-luxury-card border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row gap-6 relative overflow-hidden ${
                  selectedArtist?.id === artist.id 
                    ? 'border-luxury-accent ring-1 ring-luxury-accent/20' 
                    : 'border-slate-100 dark:border-luxury-border/80'
                }`}
              >
                {/* Glow bubble */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-accent/5 rounded-full blur-2xl" />

                <img 
                  src={artist.avatar} 
                  alt={artist.name} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shrink-0 border border-slate-100 dark:border-luxury-border"
                />

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-white font-sans">{artist.name}</h3>
                      <p className="text-xs text-luxury-accent font-medium mt-0.5">{artist.role}</p>
                    </div>
                    
                    {/* Follow Toggle */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onFollowToggle(artist.id); }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        artist.isFollowing
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30'
                          : 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-semibold shadow-sm hover:opacity-95'
                      }`}
                    >
                      {artist.isFollowing ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5 text-luxury-black" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {artist.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {artist.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-[9px] bg-slate-50 dark:bg-luxury-black text-slate-500 dark:text-zinc-400 px-2.5 py-1 rounded-lg border border-transparent dark:border-luxury-border/30">
                        {skill}
                      </span>
                    ))}
                    {artist.skills.length > 3 && (
                      <span className="text-[9px] text-slate-400 px-2 py-1">+{artist.skills.length - 3} more</span>
                    )}
                  </div>

                  {/* Portfolio Quick Thumbnails */}
                  <div className="pt-3 border-t border-slate-50 dark:border-luxury-border/30">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">Recent portfolio pieces</p>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {portfolio.slice(0, 4).map((art) => (
                        <div
                          key={art.id}
                          onClick={(e) => { e.stopPropagation(); setSelectedArtwork(art); }}
                          className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-luxury-border hover:scale-105 active:scale-95 transition-all"
                        >
                          <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Artist Details Sidebar (Right Column) */}
        <div className="lg:col-span-1">
          {selectedArtist ? (
            <div className="sticky top-20 bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-6 animate-fade-in">
              <div className="text-center space-y-4">
                <img 
                  src={selectedArtist.avatar} 
                  alt={selectedArtist.name} 
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-50 dark:border-luxury-border"
                />
                <div>
                  <h3 className="text-lg font-light font-serif tracking-wide text-slate-800 dark:text-white">{selectedArtist.name}</h3>
                  <p className="text-xs text-luxury-accent font-medium mt-0.5">{selectedArtist.role}</p>
                </div>

                <div className="flex justify-center gap-3">
                  {selectedArtist.socials.instagram && (
                    <a href="#" className="p-2 bg-slate-50 dark:bg-luxury-black/60 border border-transparent dark:border-luxury-border rounded-xl text-slate-400 hover:text-pink-500 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {selectedArtist.socials.twitter && (
                    <a href="#" className="p-2 bg-slate-50 dark:bg-luxury-black/60 border border-transparent dark:border-luxury-border rounded-xl text-slate-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {selectedArtist.socials.website && (
                    <a href="#" className="p-2 bg-slate-50 dark:bg-luxury-black/60 border border-transparent dark:border-luxury-border rounded-xl text-slate-400 hover:text-luxury-accent transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-luxury-border/50">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Biography</h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{selectedArtist.bio}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Achievements & Awards</h4>
                  <ul className="space-y-1.5">
                    {selectedArtist.achievements.map((ach, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-zinc-300 flex items-start gap-1.5 leading-snug">
                        <Award className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Contact</h4>
                  <form onSubmit={(e) => { e.preventDefault(); alert(`Message sent to ${selectedArtist.name}!`); }} className="space-y-2">
                    <textarea 
                      placeholder={`Send a friendly creative inquiry to ${selectedArtist.name.split(' ')[0]}...`}
                      className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/30 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-luxury-accent transition-all h-20 resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer hover:opacity-95"
                    >
                      <Send className="w-3 h-3 text-luxury-black" />
                      Send Private Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky top-20 bg-slate-50 dark:bg-luxury-card/30 border border-dashed border-slate-200 dark:border-luxury-border p-8 rounded-3xl text-center space-y-3">
              <Sparkles className="w-8 h-8 text-luxury-accent mx-auto" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-white">Select an Artist</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Click any artist card to explore full biography, credentials, social links, and send private client requests.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
