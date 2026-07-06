import React, { useState } from 'react';
import { User, MessageSquare, Heart, Bookmark, Bell, Plus, Image as ImageIcon, Send, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';
import { UserProfile, ForumPost, Artwork, Artist } from '../types';

interface CommunitySectionProps {
  user: UserProfile;
  forumPosts: ForumPost[];
  artworks: Artwork[];
  artists: Artist[];
  onAddForumPost: (title: string, category: string) => void;
  setSelectedArtwork: (art: Artwork) => void;
  onUploadArtwork: (newArt: Omit<Artwork, 'id' | 'likes' | 'shares' | 'savedCount' | 'comments' | 'views'>) => void;
}

export default function CommunitySection({
  user,
  forumPosts,
  artworks,
  artists,
  onAddForumPost,
  setSelectedArtwork,
  onUploadArtwork,
}: CommunitySectionProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'forum'>('profile');
  
  // Forum Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Digital Art');

  // Custom Art Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Digital Art');
  const [uploadMedium, setUploadMedium] = useState('Digital Illustration');
  const [uploadImage, setUploadImage] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadPrice, setUploadPrice] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // User details
  const myArtworks = artworks.filter(a => user.artworks.includes(a.id));
  const mySavedArtworks = artworks.filter(a => user.savedArtworks.includes(a.id));
  const followedArtists = artists.filter(a => a.isFollowing);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;
    onAddForumPost(newPostTitle, newPostCategory);
    setNewPostTitle('');
    alert('Forum topic published! Check it out in the list below.');
  };

  const handleUploadArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadImage.trim()) {
      alert('Please provide a title and an image URL.');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      onUploadArtwork({
        title: uploadTitle,
        artistId: 'user-creative',
        artistName: user.name,
        category: uploadCategory,
        medium: uploadMedium,
        image: uploadImage,
        description: uploadDesc,
        creationDate: new Date().toISOString().split('T')[0],
        dimensions: '4000 x 3000 px',
        price: uploadPrice ? parseFloat(uploadPrice) : null,
        availability: uploadPrice ? 'Available' : 'NFS',
        palette: ['#6C63FF', '#FF6584', '#121212', '#F8F9FC'],
        featured: false
      });
      setIsUploading(false);
      // Clear fields
      setUploadTitle('');
      setUploadImage('');
      setUploadDesc('');
      setUploadPrice('');
      alert('Congratulations! Your master artwork is now live in the global Exhibition Gallery!');
    }, 1200);
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">The Artist Hub</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Manage your design portfolio, publish files, or connect with peers in the Forum</p>
        </div>
        <div className="flex bg-white dark:bg-luxury-black border border-slate-100 dark:border-luxury-border p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black shadow-sm font-semibold'
                : 'text-slate-600 dark:text-zinc-400 font-medium'
            }`}
          >
            My Artist Room
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'forum'
                ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black shadow-sm font-semibold'
                : 'text-slate-600 dark:text-zinc-400 font-medium'
            }`}
          >
            Peers Forum
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        /* My Artist Room View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Profile Card Summary (Left Column) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm text-center space-y-4">
              <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl mx-auto object-cover border-4 border-slate-50 dark:border-luxury-border" />
              <div>
                <h3 className="text-lg font-light font-serif text-slate-800 dark:text-white">{user.name}</h3>
                <p className="text-xs text-luxury-accent mt-1 font-semibold">{user.role}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed italic">
                "{user.bio}"
              </p>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-50 dark:border-luxury-border/50">
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{user.followersCount}</p>
                  <p className="text-[10px] text-slate-400">Followers</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{user.followingCount}</p>
                  <p className="text-[10px] text-slate-400">Following</p>
                </div>
              </div>
            </div>

            {/* Upload/Add Artwork Form in Profile */}
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-luxury-accent" /> Live Upload Artwork
              </h4>
              <form onSubmit={handleUploadArtwork} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Masterpiece title"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://unsplash.com/..."
                    value={uploadImage}
                    onChange={(e) => setUploadImage(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Category</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none"
                    >
                      <option value="Digital Art">Digital Art</option>
                      <option value="Traditional Art">Traditional</option>
                      <option value="Abstract Art">Abstract</option>
                      <option value="Pixel Art">Pixel Art</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Medium</label>
                    <input
                      type="text"
                      placeholder="e.g. Photoshop CC"
                      value={uploadMedium}
                      onChange={(e) => setUploadMedium(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Description</label>
                  <textarea
                    placeholder="Tell us about your creative inspiration..."
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white h-12 resize-none focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Price (optional, $)</label>
                  <input
                    type="number"
                    placeholder="Leave blank for Not For Sale"
                    value={uploadPrice}
                    onChange={(e) => setUploadPrice(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-2 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer hover:opacity-95"
                >
                  {isUploading ? 'Adding artwork...' : 'Upload & Publish to site'}
                </button>
              </form>
            </div>
          </div>

          {/* User Portfolio details (Right columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* My Uploads */}
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm">
              <h3 className="text-base font-light font-serif text-slate-800 dark:text-white mb-4">My Uploaded Artworks ({myArtworks.length})</h3>
              {myArtworks.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 dark:border-luxury-border rounded-2xl">
                  <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">You haven't uploaded any masterpiece yet. Use the upload module on the left!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {myArtworks.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArtwork(art)}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative border border-slate-100 dark:border-luxury-border"
                    >
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 animate-fade-in" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">{art.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Favorites (Saved Art) */}
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm">
              <h3 className="text-base font-light font-serif text-slate-800 dark:text-white mb-4">My Saved Gallery Favorites ({mySavedArtworks.length})</h3>
              {mySavedArtworks.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 dark:border-luxury-border rounded-2xl">
                  <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No bookmarks added yet. Head to the Exhibition Gallery to bookmark visual assets!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mySavedArtworks.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArtwork(art)}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative border border-slate-100 dark:border-luxury-border"
                    >
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 animate-fade-in" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">{art.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Followed Artists */}
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm">
              <h3 className="text-base font-light font-serif text-slate-800 dark:text-white mb-4">Followed Artists ({followedArtists.length})</h3>
              {followedArtists.length === 0 ? (
                <p className="text-xs text-slate-400">Not following any artists yet. Explore our Creative Collective!</p>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-1">
                  {followedArtists.map((artist) => (
                    <div key={artist.id} className="flex flex-col items-center space-y-1.5 text-center shrink-0">
                      <img src={artist.avatar} alt={artist.name} className="w-12 h-12 rounded-full object-cover border-2 border-luxury-accent/30" />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 max-w-[80px] truncate">{artist.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* Forum / Discussion Feed view */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Forum topics list (Left Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border/80 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-base font-light font-serif text-slate-800 dark:text-white">Active General Topics</h3>
              <div className="divide-y divide-slate-50 dark:divide-luxury-border/30">
                {forumPosts.map((post) => (
                  <div key={post.id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-snug hover:text-luxury-accent cursor-pointer">
                        💬 {post.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 bg-luxury-accent/10 text-luxury-accent rounded border border-luxury-accent/20">{post.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400 shrink-0">
                      <span>{post.replies} replies</span>
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Create new thread side block (Right Sidebar Column) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Start Discussion Thread</h3>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Topic Title</label>
                  <textarea
                    placeholder="e.g. Best export canvas resolutions for fine prints?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white h-16 resize-none focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Subcategory</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="Digital Art">Digital Art</option>
                    <option value="Painting Techniques">Painting Techniques</option>
                    <option value="3D Modeling">3D Modeling</option>
                    <option value="Creative Business">Creative Business</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer hover:opacity-95"
                >
                  Publish Forum Thread
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-tr from-luxury-accent/10 via-luxury-gold/5 to-transparent border border-luxury-accent/10 dark:border-luxury-border p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-luxury-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 animate-bounce text-luxury-gold" /> ArtVerse Rules
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                Remember to keep discussions creative, polite, and constructive. Helpful creators will be highlighted by admins!
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
