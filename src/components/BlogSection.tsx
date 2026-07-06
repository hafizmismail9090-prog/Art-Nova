import React, { useState } from 'react';
import { Calendar, User, Clock, Heart, MessageSquare, ChevronLeft, ArrowRight, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPosts(prev => [...prev, postId]);
    }
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">The Creative Blog</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Read curated insights on color harmonies, design trends, digital tools, and creator interviews</p>
      </div>

      {selectedPost ? (
        /* Single Full Blog Article view */
        <article className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-[32px] overflow-hidden shadow-md p-6 md:p-10 space-y-6 max-w-4xl mx-auto animate-fade-in">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs text-luxury-accent hover:text-luxury-gold font-bold flex items-center gap-1.5 cursor-pointer"
          >
            ← Back to blog feed
          </button>

          {/* Featured Image */}
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-sm">
            <img src={selectedPost.thumbnail} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="px-2.5 py-0.5 bg-luxury-accent/10 text-luxury-accent rounded font-semibold text-[9px] uppercase border border-luxury-accent/20">
              {selectedPost.category}
            </span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedPost.author}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white leading-tight">
            {selectedPost.title}
          </h2>

          {/* Article Content with custom typography styling */}
          <div className="prose prose-stone dark:prose-invert max-w-none text-slate-700 dark:text-zinc-300 text-sm md:text-base space-y-6 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-luxury-border/50 pt-6">
            {selectedPost.content}
          </div>

          {/* Share & Like actions */}
          <div className="pt-6 border-t border-slate-100 dark:border-luxury-border/50 flex items-center justify-between">
            <button
              onClick={(e) => toggleLike(selectedPost.id, e)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                likedPosts.includes(selectedPost.id)
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-luxury-black text-slate-600 dark:text-zinc-400 border border-slate-100 dark:border-luxury-border'
              }`}
            >
              <Heart className={`w-4 h-4 ${likedPosts.includes(selectedPost.id) ? 'fill-current' : ''}`} />
              {likedPosts.includes(selectedPost.id) ? 'Liked!' : 'Like Article'}
            </button>
            <button
              onClick={() => alert('Article share link copied!')}
              className="px-4 py-2 text-xs font-bold border border-slate-100 dark:border-luxury-border hover:bg-slate-50 dark:hover:bg-luxury-card rounded-xl text-slate-600 dark:text-zinc-400 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-luxury-accent" />
              Share Link
            </button>
          </div>
        </article>
      ) : (
        /* Blog feed index */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="px-2 py-0.5 bg-luxury-accent/10 text-luxury-accent rounded font-semibold uppercase border border-luxury-accent/20">{post.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-base font-light font-serif leading-snug line-clamp-2 text-slate-800 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50 dark:border-luxury-border/40 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> By {post.author}</span>
                  <button 
                    onClick={(e) => toggleLike(post.id, e)}
                    className="p-1.5 hover:text-pink-500 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-pink-500 fill-current' : ''}`} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
