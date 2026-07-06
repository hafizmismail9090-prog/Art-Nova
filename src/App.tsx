import React, { useState, useEffect } from 'react';
import { Palette, Star, ArrowLeft, Heart, Bookmark, Share2, Download, MessageSquare, Plus, X, Globe, ArrowUp } from 'lucide-react';

import { INITIAL_ARTWORKS, INITIAL_ARTISTS, TUTORIALS, BLOG_POSTS, ART_CHALLENGES, ART_EVENTS, INITIAL_FORUM_POSTS, INITIAL_USER } from './data';
import { Artwork, Artist, Comment } from './types';

import Navigation from './components/Navigation';
import AIPromptGenerator from './components/AIPromptGenerator';
import HomeSection from './components/HomeSection';
import GallerySection from './components/GallerySection';
import ArtistsSection from './components/ArtistsSection';
import TutorialsSection from './components/TutorialsSection';
import BlogSection from './components/BlogSection';
import ChallengesSection from './components/ChallengesSection';
import EventsSection from './components/EventsSection';
import CommunitySection from './components/CommunitySection';
import AdminSection from './components/AdminSection';
import AboutContactFooter from './components/AboutContactFooter';

export default function App() {
  // Global States
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Community State managers
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const local = localStorage.getItem('artverse_artworks');
    return local ? JSON.parse(local) : INITIAL_ARTWORKS;
  });

  const [artists, setArtists] = useState<Artist[]>(() => {
    const local = localStorage.getItem('artverse_artists');
    return local ? JSON.parse(local) : INITIAL_ARTISTS;
  });

  const [challenges, setChallenges] = useState(() => {
    const local = localStorage.getItem('artverse_challenges');
    return local ? JSON.parse(local) : ART_CHALLENGES;
  });

  const [events, setEvents] = useState(() => {
    const local = localStorage.getItem('artverse_events');
    return local ? JSON.parse(local) : ART_EVENTS;
  });

  const [forumPosts, setForumPosts] = useState(() => {
    const local = localStorage.getItem('artverse_forum');
    return local ? JSON.parse(local) : INITIAL_FORUM_POSTS;
  });

  const [user, setUser] = useState(() => {
    const local = localStorage.getItem('artverse_user');
    return local ? JSON.parse(local) : INITIAL_USER;
  });

  const [subscribersCount, setSubscribersCount] = useState(148);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  // Upload Form quick fields
  const [quickTitle, setQuickTitle] = useState('');
  const [quickImage, setQuickImage] = useState('');
  const [quickCategory, setQuickCategory] = useState('Digital Art');
  const [quickMedium, setQuickMedium] = useState('Photoshop');
  const [quickDesc, setQuickDesc] = useState('');

  // Comment fields
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  // Synchronization with LocalStorage
  useEffect(() => {
    localStorage.setItem('artverse_artworks', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('artverse_artists', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('artverse_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('artverse_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('artverse_forum', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem('artverse_user', JSON.stringify(user));
  }, [user]);

  // Back to top listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setBackToTopVisible(true);
      } else {
        setBackToTopVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth Back to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper selectors
  const isLiked = (id: string) => user.likedArtworks.includes(id);
  const isSaved = (id: string) => user.savedArtworks.includes(id);

  // Like Toggle
  const handleLikeToggle = (artId: string) => {
    let updatedLiked = [...user.likedArtworks];
    const index = updatedLiked.indexOf(artId);
    if (index > -1) {
      updatedLiked.splice(index, 1);
    } else {
      updatedLiked.push(artId);
    }

    setUser(prev => ({ ...prev, likedArtworks: updatedLiked }));

    // Increment like counter in artwork database
    setArtworks(prev => prev.map(art => {
      if (art.id === artId) {
        return { ...art, likes: art.likes + (index > -1 ? -1 : 1) };
      }
      return art;
    }));
  };

  // Save/Bookmark Toggle
  const handleSaveToggle = (artId: string) => {
    let updatedSaved = [...user.savedArtworks];
    const index = updatedSaved.indexOf(artId);
    if (index > -1) {
      updatedSaved.splice(index, 1);
    } else {
      updatedSaved.push(artId);
    }

    setUser(prev => ({ ...prev, savedArtworks: updatedSaved }));
  };

  // Artist Follow Toggle
  const handleFollowToggle = (artistId: string) => {
    setArtists(prev => prev.map(artist => {
      if (artist.id === artistId) {
        const nextFollowing = !artist.isFollowing;
        return {
          ...artist,
          isFollowing: nextFollowing,
          followers: artist.followers + (nextFollowing ? 1 : -1)
        };
      }
      return artist;
    }));
  };

  // Register Event Toggle
  const handleRegisterToggle = (eventId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          isRegistered: !evt.isRegistered,
          registeredCount: evt.registeredCount + (evt.isRegistered ? -1 : 1)
        };
      }
      return evt;
    }));
  };

  // Join Challenge Toggle
  const handleJoinToggle = (challengeId: string) => {
    setChallenges(prev => prev.map(chal => {
      if (chal.id === challengeId) {
        return {
          ...chal,
          joined: !chal.joined,
          participants: chal.participants + (chal.joined ? -1 : 1)
        };
      }
      return chal;
    }));
  };

  // Add Forum post
  const handleAddForumPost = (title: string, category: string) => {
    const newPost = {
      id: `forum-${Date.now()}`,
      title,
      author: user.name,
      category,
      replies: 0,
      likes: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setForumPosts(prev => [newPost, ...prev]);
  };

  // Custom User Upload Artwork
  const handleUploadArtwork = (newArtData: Omit<Artwork, 'id' | 'likes' | 'shares' | 'savedCount' | 'comments' | 'views'>) => {
    const newId = `art-${Date.now()}`;
    const newArtObj: Artwork = {
      ...newArtData,
      id: newId,
      likes: 0,
      shares: 0,
      savedCount: 0,
      views: 1,
      comments: []
    };

    // Prepend to site database
    setArtworks(prev => [newArtObj, ...prev]);

    // Append to my portfolio list
    setUser(prev => ({
      ...prev,
      artworks: [...prev.artworks, newId]
    }));
  };

  // Quick Modal Upload Submit
  const handleQuickUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickImage.trim()) return;

    handleUploadArtwork({
      title: quickTitle,
      artistId: 'user-creative',
      artistName: user.name,
      category: quickCategory,
      medium: quickMedium,
      image: quickImage,
      description: quickDesc,
      creationDate: new Date().toISOString().split('T')[0],
      dimensions: '3840 x 2160 px',
      price: null,
      availability: 'NFS',
      palette: ['#6C63FF', '#FF6584', '#0A0A12', '#F8F9FC'],
      featured: false
    });

    setQuickTitle('');
    setQuickImage('');
    setQuickDesc('');
    setUploadModalOpen(false);
    alert('Your masterpiece is now live in the global gallery!');
  };

  // Artwork Comments/Ratings Submission
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArtwork || !commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: commentName,
      text: commentText,
      date: new Date().toISOString().split('T')[0],
      rating: commentRating
    };

    setArtworks(prev => prev.map(art => {
      if (art.id === selectedArtwork.id) {
        const updated = {
          ...art,
          comments: [...art.comments, newComment]
        };
        // Also update local selected view state
        setSelectedArtwork(updated);
        return updated;
      }
      return art;
    }));

    setCommentName('');
    setCommentText('');
    alert('Thank you! Your constructive review and rating are published.');
  };

  // Related artworks list (shares same category, ignores self)
  const relatedArtworks = selectedArtwork 
    ? artworks.filter(a => a.category === selectedArtwork.category && a.id !== selectedArtwork.id).slice(0, 3)
    : [];

  // Manage uploads from pending admin stack
  const pendingAdminArtworks = artworks.filter(a => a.artistId === 'user-creative' && !user.artworks.includes(a.id));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-luxury-black text-slate-100' : 'bg-[#FAFAFB] text-slate-800'}`}>
      
      {/* Premium custom background layout elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-luxury-accent/5 dark:bg-luxury-accent/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky/Interactive Navigation bar */}
        <Navigation
          activePage={activePage}
          setActivePage={(page) => { setActivePage(page); setSelectedArtwork(null); }}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          onOpenUpload={() => setUploadModalOpen(true)}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />

        {/* Primary Page Workspace Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {selectedArtwork ? (
            /* Immersive Artwork Details View page */
            <div className="py-8 space-y-10 animate-fade-in">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="text-xs text-indigo-500 hover:text-indigo-600 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Gallery
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Visual Image Screen layout */}
                <div className="space-y-4">
                  <div className="rounded-[32px] overflow-hidden bg-slate-900/10 dark:bg-black/50 border border-slate-100 dark:border-zinc-800 relative group aspect-square">
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-white/90 dark:bg-zinc-900/90 text-slate-800 dark:text-zinc-200 rounded-full shadow-sm">
                        {selectedArtwork.category}
                      </span>
                    </div>
                  </div>

                  {/* Micro action triggers */}
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-50 dark:border-zinc-800/50">
                    <div className="flex gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                      <button 
                        onClick={() => handleLikeToggle(selectedArtwork.id)}
                        className={`flex items-center gap-1.5 hover:text-pink-500 transition-colors ${isLiked(selectedArtwork.id) ? 'text-pink-500' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked(selectedArtwork.id) ? 'fill-current' : ''}`} />
                        {selectedArtwork.likes + (isLiked(selectedArtwork.id) ? 1 : 0)} Likes
                      </button>
                      <span>•</span>
                      <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {selectedArtwork.comments.length} Comments</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveToggle(selectedArtwork.id)}
                        className={`p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800 hover:scale-105 active:scale-95 transition-all ${
                          isSaved(selectedArtwork.id) ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 dark:bg-zinc-800 text-slate-500'
                        }`}
                        title="Save to favorites"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => alert('Download starting... (Mock downloaded successfully)')}
                        className="p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 hover:scale-105 transition-all text-slate-500"
                        title="Download sample asset preview"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side Info Details metadata */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white font-sans tracking-tight leading-tight">
                      {selectedArtwork.title}
                    </h1>
                    <p className="text-sm text-slate-400">
                      Created by <strong className="text-indigo-500">{selectedArtwork.artistName}</strong> on {selectedArtwork.creationDate}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed bg-slate-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-slate-100/50 dark:border-zinc-800/30">
                    {selectedArtwork.description}
                  </p>

                  {/* Artwork details list table */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-50 dark:border-zinc-800/50">
                      <p className="text-slate-400 uppercase font-semibold text-[10px]">Medium Format</p>
                      <p className="font-bold text-slate-800 dark:text-white mt-1">{selectedArtwork.medium}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-50 dark:border-zinc-800/50">
                      <p className="text-slate-400 uppercase font-semibold text-[10px]">Canvas Dimensions</p>
                      <p className="font-bold text-slate-800 dark:text-white mt-1">{selectedArtwork.dimensions}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-50 dark:border-zinc-800/50">
                      <p className="text-slate-400 uppercase font-semibold text-[10px]">Availability Status</p>
                      <p className="font-bold text-slate-800 dark:text-white mt-1">{selectedArtwork.availability}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-50 dark:border-zinc-800/50">
                      <p className="text-slate-400 uppercase font-semibold text-[10px]">Asset Value</p>
                      <p className="font-bold text-indigo-500 mt-1">{selectedArtwork.price ? `$${selectedArtwork.price.toLocaleString()}` : 'NFS / Digital'}</p>
                    </div>
                  </div>

                  {/* Color Palette visualization */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Curation Color Palette</h4>
                    <div className="flex gap-3">
                      {selectedArtwork.palette.map((color, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className="w-10 h-10 rounded-lg shadow-sm border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-mono text-[9px] text-slate-400">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review / Comment Submission Form */}
                  <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-zinc-800/50">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">Submit Curation Review</h3>
                    <form onSubmit={handleAddComment} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Your Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Mia Vance"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/30 text-slate-800 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Curation Rating (1 to 5 Stars)</label>
                          <select
                            value={commentRating}
                            onChange={(e) => setCommentRating(parseInt(e.target.value))}
                            className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/30 text-slate-800 dark:text-white"
                          >
                            <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                            <option value="4">⭐⭐⭐⭐ Great (4/5)</option>
                            <option value="3">⭐⭐⭐ Good (3/5)</option>
                            <option value="2">⭐⭐ Fair (2/5)</option>
                            <option value="1">⭐ Poor (1/5)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Review Description</label>
                        <textarea
                          placeholder="Provide supportive design critique on color layers, lights, and visual themes..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/30 text-slate-800 dark:text-white h-20 resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                      >
                        Publish Curation Review
                      </button>
                    </form>
                  </div>

                </div>

              </div>

              {/* Dynamic list of comments/ratings */}
              <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-6 rounded-[24px] shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-800 dark:text-white">Community reviews ({selectedArtwork.comments.length})</h3>
                {selectedArtwork.comments.length === 0 ? (
                  <p className="text-xs text-slate-400">No curation reviews published for this piece yet. Be the first to share feedback!</p>
                ) : (
                  <div className="divide-y divide-slate-50 dark:divide-zinc-800/40 space-y-3 pt-2">
                    {selectedArtwork.comments.map((comment) => (
                      <div key={comment.id} className="pt-3 flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 dark:text-white">{comment.user}</span>
                            <span className="text-[10px] text-slate-400">• {comment.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{comment.text}</p>
                        </div>
                        <div className="text-amber-500 font-mono text-[10px] shrink-0">
                          {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Artworks Section list */}
              {relatedArtworks.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-900">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-sans tracking-tight">Related Masterpieces</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {relatedArtworks.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => { setSelectedArtwork(art); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className="p-4 space-y-1">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-indigo-500 line-clamp-1">{art.title}</h4>
                          <p className="text-[10px] text-slate-400">By {art.artistName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Standard Pages routing block switch */
            <div className="space-y-4">
              
              {activePage === 'home' && (
                <>
                  <HomeSection
                    artworks={artworks}
                    artists={artists}
                    blogs={BLOG_POSTS}
                    events={events}
                    setActivePage={setActivePage}
                    setSelectedArtwork={setSelectedArtwork}
                    onLike={handleLikeToggle}
                  />
                  {/* AI Spark tool placed elegantly below the home feed */}
                  <AIPromptGenerator />
                </>
              )}

              {activePage === 'gallery' && (
                <GallerySection
                  artworks={artworks}
                  setSelectedArtwork={setSelectedArtwork}
                  likedIds={user.likedArtworks}
                  onLike={handleLikeToggle}
                  savedIds={user.savedArtworks}
                  onSave={handleSaveToggle}
                />
              )}

              {activePage === 'artists' && (
                <ArtistsSection
                  artists={artists}
                  artworks={artworks}
                  onFollowToggle={handleFollowToggle}
                  setSelectedArtwork={setSelectedArtwork}
                />
              )}

              {activePage === 'tutorials' && (
                <TutorialsSection tutorials={TUTORIALS} />
              )}

              {activePage === 'blog' && (
                <BlogSection blogs={BLOG_POSTS} />
              )}

              {activePage === 'challenges' && (
                <ChallengesSection
                  challenges={challenges}
                  onJoinToggle={handleJoinToggle}
                />
              )}

              {activePage === 'events' && (
                <EventsSection
                  events={events}
                  onRegisterToggle={handleRegisterToggle}
                />
              )}

              {activePage === 'community' && (
                <CommunitySection
                  user={user}
                  forumPosts={forumPosts}
                  artworks={artworks}
                  artists={artists}
                  onAddForumPost={handleAddForumPost}
                  setSelectedArtwork={setSelectedArtwork}
                  onUploadArtwork={handleUploadArtwork}
                />
              )}

              {activePage === 'admin' && (
                <AdminSection
                  pendingArtworks={pendingAdminArtworks}
                  onApproveArtwork={(id) => {
                    // Curation action
                    setUser(prev => ({
                      ...prev,
                      artworks: [...prev.artworks, id]
                    }));
                  }}
                  onRejectArtwork={(id) => {
                    setArtworks(prev => prev.filter(a => a.id !== id));
                  }}
                  artworks={artworks}
                  blogs={BLOG_POSTS}
                  events={events}
                  subscribersCount={subscribersCount}
                />
              )}

              {/* Standard Static Foot pages (About, Contact, Privacy, Terms, Disclaimer) */}
              {(activePage === 'about' || activePage === 'contact' || activePage === 'privacy' || activePage === 'terms' || activePage === 'disclaimer') && (
                <AboutContactFooter activePage={activePage} setActivePage={setActivePage} />
              )}

            </div>
          )}

        </main>

        {/* Global Footer components always on bottom */}
        <footer className="mt-16 bg-slate-50 dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutContactFooter activePage={activePage} setActivePage={setActivePage} />
          </div>
        </footer>

        {/* Floating Quick Action Button (Upload Shortcut) */}
        <button
          onClick={() => setUploadModalOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer"
          title="Quick Upload Artwork"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Back to Top floating action button */}
        {backToTopVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 p-3 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-100 dark:border-zinc-800 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
            title="Back to Top"
          >
            <ArrowLeft className="w-4 h-4 rotate-90" />
          </button>
        )}

        {/* Custom Upload Modal Dialog popup */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 max-w-lg w-full rounded-3xl p-6 relative shadow-2xl">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-slate-800 dark:text-white font-sans tracking-tight mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-500" /> Share Artwork Masterpiece
              </h3>

              <form onSubmit={handleQuickUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Infinite Bloom"
                    value={quickTitle}
                    onChange={(e) => setQuickTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/20 text-slate-800 dark:text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Unsplash Image URL</label>
                  <input
                    type="url"
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    value={quickImage}
                    onChange={(e) => setQuickImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/20 text-slate-800 dark:text-white focus:outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Category</label>
                    <select
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/20 text-slate-800 dark:text-white focus:outline-none"
                    >
                      <option value="Digital Art">Digital Art</option>
                      <option value="Traditional Art">Traditional Art</option>
                      <option value="Abstract Art">Abstract Art</option>
                      <option value="Pixel Art">Pixel Art</option>
                      <option value="Photography Collection">Photography</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Medium Format</label>
                    <input
                      type="text"
                      placeholder="e.g. Oil on Canvas"
                      value={quickMedium}
                      onChange={(e) => setQuickMedium(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/20 text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Inspirational Details</label>
                  <textarea
                    placeholder="Tell the community about your painting layers, brushes used, or design ideas..."
                    value={quickDesc}
                    onChange={(e) => setQuickDesc(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/20 text-slate-800 dark:text-white h-16 resize-none focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Publish Live
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
