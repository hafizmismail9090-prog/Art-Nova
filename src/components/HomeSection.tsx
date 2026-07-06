import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, MessageSquare, Send, Sparkles, Trophy, Calendar, Compass } from 'lucide-react';
import { Artwork, Artist, BlogPost, ArtEvent } from '../types';

interface HomeSectionProps {
  artworks: Artwork[];
  artists: Artist[];
  blogs: BlogPost[];
  events: ArtEvent[];
  setActivePage: (page: string) => void;
  setSelectedArtwork: (art: Artwork) => void;
  onLike: (artId: string) => void;
}

export default function HomeSection({
  artworks,
  artists,
  blogs,
  events,
  setActivePage,
  setSelectedArtwork,
  onLike,
}: HomeSectionProps) {
  const featuredArt = artworks.filter(a => a.featured);
  const featuredArtist = artists.find(a => a.id === 'artist-1') || artists[0];
  const [sliderIndex, setSliderIndex] = useState(0);

  // Auto scroll featured banner slider
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % featuredArt.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredArt.length]);

  return (
    <div className="space-y-16 py-8 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative rounded-[32px] overflow-hidden bg-slate-900 dark:bg-luxury-card text-white py-20 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl border border-slate-800 dark:border-luxury-border">
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-luxury-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-luxury-gold/10 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-luxury-accent font-medium border border-white/5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" /> Welcome to ArtVerse
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-serif leading-tight tracking-wide text-white">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-accent via-luxury-gold to-white animate-gradient font-medium">Creativity</span> Comes to Life
          </h1>
          <p className="text-base text-slate-300 font-normal leading-relaxed">
            Discover a luxurious, modern digital sanctuary designed for illustrators, sculptors, painters, and art lovers. Share your passion, learn from master courses, and engage with our community.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActivePage('gallery')}
              className="px-6 py-3 bg-gradient-to-r from-luxury-accent to-luxury-gold hover:opacity-95 text-luxury-black font-semibold rounded-xl text-sm transition-all shadow-lg shadow-luxury-gold/15 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Explore Gallery
              <ArrowRight className="w-4 h-4 text-luxury-black" />
            </button>
            <button
              onClick={() => setActivePage('community')}
              className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700/80 dark:bg-luxury-black/60 dark:hover:bg-luxury-black/90 rounded-xl font-semibold text-sm transition-all border border-slate-700 dark:border-luxury-border flex items-center gap-2 cursor-pointer"
            >
              Join Community
            </button>
          </div>
        </div>

        {/* Featured Slider Card */}
        <div className="relative z-10 w-full md:w-1/2 max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden group">
          {featuredArt.length > 0 && (
            <div className="space-y-4">
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedArtwork(featuredArt[sliderIndex])}
              >
                <img 
                  src={featuredArt[sliderIndex].image} 
                  alt={featuredArt[sliderIndex].title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-luxury-accent text-luxury-black rounded-full">
                    {featuredArt[sliderIndex].category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 drop-shadow-md">
                    {featuredArt[sliderIndex].title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    By {featuredArt[sliderIndex].artistName}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs px-2">
                <span className="text-slate-400">Featured Masterpiece</span>
                <div className="flex gap-1">
                  {featuredArt.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSliderIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === sliderIndex ? 'bg-luxury-accent w-4' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Banner Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Explore Categories</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Find amazing artworks across classic and futuristic creative formats</p>
          </div>
          <button onClick={() => setActivePage('gallery')} className="text-xs font-bold text-luxury-accent hover:text-luxury-gold flex items-center gap-1.5 self-start md:self-auto cursor-pointer">
            Browse All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Traditional', count: '124 artworks', bg: 'bg-orange-500/10 dark:bg-orange-500/5 text-orange-400', img: '🎨' },
            { name: 'Digital Art', count: '512 artworks', bg: 'bg-luxury-accent/10 dark:bg-luxury-accent/5 text-luxury-accent', img: '💻' },
            { name: 'Abstract', count: '89 artworks', bg: 'bg-pink-500/10 dark:bg-pink-500/5 text-pink-400', img: '🧬' },
            { name: 'Photography', count: '230 artworks', bg: 'bg-blue-500/10 dark:bg-blue-500/5 text-blue-400', img: '📷' },
            { name: 'Sculptures', count: '45 artworks', bg: 'bg-amber-500/10 dark:bg-amber-500/5 text-luxury-gold', img: '🗿' },
            { name: 'Pixel Art', count: '156 artworks', bg: 'bg-teal-500/10 dark:bg-teal-500/5 text-teal-400', img: '👾' },
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setActivePage('gallery')}
              className="p-5 bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-2xl hover:border-luxury-accent/30 dark:hover:border-luxury-accent/20 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center space-y-3"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mx-auto ${cat.bg}`}>
                {cat.img}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{cat.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Inspiration Shortcut Block */}
      <section className="bg-slate-50 dark:bg-luxury-card/50 border border-slate-100 dark:border-luxury-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-luxury-accent/10 text-luxury-accent rounded-full text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3 h-3 text-luxury-gold" /> Creative Block Solution
          </div>
          <h3 className="text-xl font-light font-serif tracking-wide text-slate-800 dark:text-white">
            Generate Infinite AI Art Prompts & Palettes
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Need inspiration? Tell our Gemini Art Bot your preferred category, medium, and emotional mood, and copy custom artistic instructions and beautiful palettes instantly!
          </p>
        </div>
        <button
          onClick={() => {
            setActivePage('home');
            // Scroll to AI Generator
            const el = document.getElementById('ai-generator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-5 py-3 bg-gradient-to-r from-luxury-accent to-luxury-gold hover:opacity-95 text-luxury-black font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
        >
          Try Spark Bot
          <Compass className="w-4 h-4 text-luxury-black" />
        </button>
      </section>

      {/* Featured Artist of the Month */}
      <section className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-[32px] p-6 md:p-10 shadow-lg relative overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-luxury-accent/10 blur-3xl rounded-full" />
        
        <div className="flex items-center gap-2 mb-6 text-luxury-accent">
          <Star className="w-4 h-4 fill-current text-luxury-gold" />
          <span className="text-xs font-bold uppercase tracking-wider">Artist Spotlight</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <img 
            src={featuredArtist.avatar} 
            alt={featuredArtist.name} 
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shadow-md border-4 border-slate-50 dark:border-luxury-border"
          />
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-light font-serif tracking-wide text-slate-800 dark:text-white">{featuredArtist.name}</h3>
              <p className="text-xs text-luxury-accent font-medium mt-1">{featuredArtist.role}</p>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
              {featuredArtist.bio}
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {featuredArtist.skills.map((skill, i) => (
                <span key={i} className="text-[10px] bg-slate-50 dark:bg-luxury-black text-slate-600 dark:text-zinc-400 px-2.5 py-1 rounded-lg border border-transparent dark:border-luxury-border/40">
                  {skill}
                </span>
              ))}
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-50 dark:border-luxury-border/50 max-w-xs mx-auto md:mx-0">
              <div>
                <p className="text-base font-bold text-slate-800 dark:text-white">{(featuredArtist.followers / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-slate-400">Followers</p>
              </div>
              <button 
                onClick={() => setActivePage('artists')}
                className="py-1.5 px-4 bg-luxury-accent/10 dark:bg-luxury-accent/5 text-luxury-accent font-bold text-xs rounded-xl hover:bg-luxury-accent hover:text-luxury-black transition-all cursor-pointer"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Active Art Challenge Competition Banner */}
      <section className="bg-gradient-to-r from-luxury-card to-luxury-border rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl border border-luxury-accent/30">
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-luxury-gold/10 blur-2xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-luxury-accent/10 text-luxury-accent rounded-full text-xs font-bold uppercase tracking-wider border border-luxury-accent/20">
              <Trophy className="w-3.5 h-3.5 text-luxury-gold" /> Art Challenge
            </div>
            <h3 className="text-2xl md:text-3xl font-light font-serif tracking-wide">Cyber-Botanicals: Neon Oasis</h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Design a gorgeous digital rendering or watercolor landscape that blends natural forest elements with artificial neon lights. $1,500 Creative Grant & Spotlight placement.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Deadline Ends In</span>
            <span className="text-xl font-bold font-mono px-4 py-1.5 bg-luxury-black/60 text-luxury-accent rounded-xl border border-luxury-accent/20">
              14 Days, 06 Hours
            </span>
            <button
              onClick={() => setActivePage('challenges')}
              className="mt-2 px-6 py-2.5 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 hover:opacity-95"
            >
              Submit Entry
            </button>
          </div>
        </div>
      </section>

      {/* Creative Blog Preview */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Creative Blog</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Deep dives on color theory, digital techniques, and business advice</p>
          </div>
          <button onClick={() => setActivePage('blog')} className="text-xs font-bold text-luxury-accent hover:text-luxury-gold flex items-center gap-1.5 cursor-pointer">
            View All Articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <article 
              key={post.id} 
              onClick={() => setActivePage('blog')}
              className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="px-2 py-0.5 bg-slate-50 dark:bg-luxury-border/60 rounded-md font-semibold text-luxury-accent uppercase">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white font-sans leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Dynamic Newsletter Popup & Registration Area */}
      <section className="bg-slate-50 dark:bg-luxury-card/40 border border-slate-100 dark:border-luxury-border rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-luxury-accent/5 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-luxury-gold/5 blur-2xl rounded-full pointer-events-none" />
        
        <div className="max-w-xl mx-auto space-y-4 relative z-10">
          <h3 className="text-2xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Stay Inspired</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Get early access to physical exhibitions, live digital webinar tickets, custom artist palettes, and weekly community challenge prompts straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-luxury-border bg-white dark:bg-luxury-black text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
              required
            />
            <button
              type="submit"
              onClick={() => alert('Thanks for subscribing! Check your inbox for the welcome pack.')}
              className="px-5 py-2.5 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 hover:opacity-95"
            >
              Subscribe
              <Send className="w-3.5 h-3.5 text-luxury-black" />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
