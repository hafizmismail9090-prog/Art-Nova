import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, Share2, Bookmark, Eye, ArrowUpDown, ChevronDown, Check, Compass } from 'lucide-react';
import { Artwork } from '../types';

interface GallerySectionProps {
  artworks: Artwork[];
  setSelectedArtwork: (art: Artwork) => void;
  likedIds: string[];
  onLike: (artId: string) => void;
  savedIds: string[];
  onSave: (artId: string) => void;
}

export default function GallerySection({
  artworks,
  setSelectedArtwork,
  likedIds,
  onLike,
  savedIds,
  onSave,
}: GallerySectionProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high' | 'featured'>('newest');
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = useMemo(() => {
    const cats = new Set(artworks.map(a => a.category));
    return ['All', ...Array.from(cats)];
  }, [artworks]);

  const filteredAndSortedArtworks = useMemo(() => {
    let result = [...artworks];

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        a => a.title.toLowerCase().includes(q) || 
             a.artistName.toLowerCase().includes(q) || 
             a.medium.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(a => a.category === activeCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
      }
      if (sortBy === 'popular') {
        return b.likes - a.likes;
      }
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === 'price-low') {
        const priceA = a.price === null ? Infinity : a.price;
        const priceB = b.price === null ? Infinity : b.price;
        return priceA - priceB;
      }
      if (sortBy === 'price-high') {
        const priceA = a.price === null ? -1 : a.price;
        const priceB = b.price === null ? -1 : b.price;
        return priceB - priceA;
      }
      return 0;
    });

    return result;
  }, [artworks, search, activeCategory, sortBy]);

  const shareArtwork = (art: Artwork, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/#artwork-${art.id}`);
    alert(`Artwork share link for "${art.title}" copied to clipboard!`);
  };

  const hasMore = visibleCount < filteredAndSortedArtworks.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">The Exhibition Gallery</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Explore and filter handcrafted premium creative pieces</p>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing {Math.min(visibleCount, filteredAndSortedArtworks.length)} of {filteredAndSortedArtworks.length} masterpieces
        </div>
      </div>

      {/* Control Panel: Search & Filter bar */}
      <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search artwork title, medium, or artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/30 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
          />
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2 w-full lg:w-auto self-start lg:self-auto shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-zinc-400 shrink-0">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/40 text-slate-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
          >
            <option value="newest">Newest Releases</option>
            <option value="popular">Most Liked</option>
            <option value="featured">Curated & Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-luxury-accent text-luxury-black shadow-md shadow-luxury-accent/10 font-bold'
                : 'bg-white dark:bg-luxury-card text-slate-600 dark:text-zinc-400 border border-slate-100 dark:border-luxury-border/80 hover:bg-slate-50 dark:hover:bg-luxury-border/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      {filteredAndSortedArtworks.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-luxury-card/30 border border-dashed border-slate-200 dark:border-luxury-border rounded-2xl">
          <Compass className="w-10 h-10 text-slate-400 mx-auto mb-4 animate-spin-slow" />
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-300">No masterpieces found</p>
          <p className="text-xs text-slate-400 mt-1">Try modifying your search query or choosing another category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedArtworks.slice(0, visibleCount).map((art) => {
            const isLiked = likedIds.includes(art.id);
            const isSaved = savedIds.includes(art.id);

            return (
              <div
                key={art.id}
                onClick={() => setSelectedArtwork(art)}
                className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group relative"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100 dark:bg-zinc-950">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Floating category */}
                  <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white/90 dark:bg-luxury-card/95 text-slate-800 dark:text-luxury-accent rounded-full shadow-sm backdrop-blur-sm">
                    {art.category}
                  </span>

                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => { e.stopPropagation(); onLike(art.id); }}
                      className={`p-2 rounded-xl backdrop-blur-sm shadow-sm hover:scale-110 active:scale-95 transition-all ${
                        isLiked 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-white/80 dark:bg-luxury-black/80 text-slate-600 dark:text-zinc-400'
                      }`}
                      title={isLiked ? 'Unlike' : 'Like'}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onSave(art.id); }}
                      className={`p-2 rounded-xl backdrop-blur-sm shadow-sm hover:scale-110 active:scale-95 transition-all ${
                        isSaved 
                          ? 'bg-luxury-gold text-luxury-black font-bold' 
                          : 'bg-white/80 dark:bg-luxury-black/80 text-slate-600 dark:text-zinc-400'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={(e) => shareArtwork(art, e)}
                      className="p-2 rounded-xl bg-white/80 dark:bg-luxury-black/80 text-slate-600 dark:text-zinc-400 backdrop-blur-sm shadow-sm hover:scale-110 transition-all"
                      title="Share artwork link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white font-sans leading-tight line-clamp-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      By <span className="font-medium text-slate-600 dark:text-zinc-300">{art.artistName}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-luxury-border/50">
                    <span className="text-[10px] font-medium text-slate-400 font-mono">
                      {art.medium}
                    </span>
                    <span className="text-xs font-bold text-luxury-accent dark:text-luxury-gold">
                      {art.price ? `$${art.price.toLocaleString()}` : 'Not for Sale'}
                    </span>
                  </div>

                  {/* Micro interaction indicators */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-pink-500 fill-current" /> {art.likes + (isLiked ? 1 : 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {art.views} views
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Infinite Scroll trigger button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            className="px-6 py-3 border border-slate-200 dark:border-luxury-border text-xs font-bold rounded-xl text-slate-600 dark:text-zinc-300 bg-white dark:bg-luxury-card hover:bg-slate-50 dark:hover:bg-luxury-border transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Load More Masterpieces
          </button>
        </div>
      )}

    </div>
  );
}
