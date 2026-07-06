import React, { useState } from 'react';
import { Shield, Users, Image as ImageIcon, MessageSquare, Ticket, FileText, Check, X, Ban, Trash, Sparkles } from 'lucide-react';
import { Artwork, BlogPost, ArtEvent } from '../types';

interface AdminSectionProps {
  pendingArtworks: Artwork[];
  onApproveArtwork: (artId: string) => void;
  onRejectArtwork: (artId: string) => void;
  artworks: Artwork[];
  blogs: BlogPost[];
  events: ArtEvent[];
  subscribersCount: number;
}

export default function AdminSection({
  pendingArtworks,
  onApproveArtwork,
  onRejectArtwork,
  artworks,
  blogs,
  events,
  subscribersCount,
}: AdminSectionProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'approvals' | 'analytics' | 'comments'>('approvals');

  // Static mock audit logs
  const [mockComments, setMockComments] = useState([
    { id: 'mc-1', user: 'SpammyBot', text: 'Earn $500/day working from home! Click here...', date: '2026-07-05', artworkTitle: 'Neon Odyssey' },
    { id: 'mc-2', user: 'ArtCritic99', text: 'This composition feels slightly unbalanced in the top quadrant.', date: '2026-07-04', artworkTitle: 'Fragmented Reality' }
  ]);

  const handleDeleteComment = (commentId: string) => {
    setMockComments(prev => prev.filter(c => c.id !== commentId));
    alert('Comment deleted from database successfully.');
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white flex items-center gap-2">
            <Shield className="w-8 h-8 text-luxury-accent" /> Admin Command Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Review community asset uploads, view metrics, and manage site parameters</p>
        </div>
        <div className="flex bg-white dark:bg-luxury-black border border-slate-100 dark:border-luxury-border p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveAdminTab('approvals')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'approvals'
                ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-semibold shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 font-medium'
            }`}
          >
            Review Uploads ({pendingArtworks.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'analytics'
                ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-semibold shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 font-medium'
            }`}
          >
            Analytics & Subscribers
          </button>
          <button
            onClick={() => setActiveAdminTab('comments')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'comments'
                ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-semibold shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 font-medium'
            }`}
          >
            Comments Audit
          </button>
        </div>
      </div>

      {activeAdminTab === 'approvals' ? (
        /* Pending Artwork Approvals Board */
        <div className="space-y-6">
          <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm">
            <h3 className="text-base font-light font-serif text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-luxury-accent" /> Artworks Awaiting Curation Approval ({pendingArtworks.length})
            </h3>

            {pendingArtworks.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-100 dark:border-luxury-border rounded-2xl">
                <Check className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-800 dark:text-white">All uploads are processed!</p>
                <p className="text-xs text-slate-400 mt-1">There are no pending submissions awaiting moderator action.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-luxury-border/50 space-y-4">
                {pendingArtworks.map((art) => (
                  <div key={art.id} className="pt-4 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
                      <img src={art.image} alt="Preview" className="w-20 h-20 rounded-xl object-cover border dark:border-luxury-border" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">{art.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Uploaded by <strong className="text-luxury-accent">{art.artistName}</strong> • {art.category}</p>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic mt-1 max-w-md">"{art.description}"</p>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => { onApproveArtwork(art.id); alert('Artwork approved and added to site gallery!'); }}
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/25 text-emerald-600 dark:text-emerald-400 rounded-xl transition-all cursor-pointer"
                        title="Approve to main gallery"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { onRejectArtwork(art.id); alert('Artwork rejected/discarded.'); }}
                        className="p-2 bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/25 text-pink-600 dark:text-pink-400 rounded-xl transition-all cursor-pointer"
                        title="Reject submission"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : activeAdminTab === 'analytics' ? (
        /* Analytics & Subscribers View */
        <div className="space-y-6">
          
          {/* Metrics summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-5 rounded-2xl shadow-sm text-center">
              <Users className="w-6 h-6 text-luxury-accent mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">Total Curators/Artists</p>
              <p className="text-2xl font-light font-serif text-slate-800 dark:text-white mt-1">1,240 users</p>
            </div>
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-5 rounded-2xl shadow-sm text-center">
              <ImageIcon className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">Published Artworks</p>
              <p className="text-2xl font-light font-serif text-slate-800 dark:text-white mt-1">{artworks.length} items</p>
            </div>
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-5 rounded-2xl shadow-sm text-center">
              <Ticket className="w-6 h-6 text-luxury-accent mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">Newsletter subscribers</p>
              <p className="text-2xl font-light font-serif text-slate-800 dark:text-white mt-1">{subscribersCount} subbed</p>
            </div>
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-5 rounded-2xl shadow-sm text-center">
              <FileText className="w-6 h-6 text-luxury-accent mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">Active Blog/Lessons</p>
              <p className="text-2xl font-light font-serif text-slate-800 dark:text-white mt-1">{blogs.length} articles</p>
            </div>
          </div>

          {/* Dynamic visual analytics chart simulation */}
          <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-base font-light font-serif text-slate-800 dark:text-white">Active Creative Engagement Trends</h3>
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1.5 text-slate-600 dark:text-zinc-400">
                  <span>Digital Art Category views</span>
                  <span className="font-mono">84% popularity</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-luxury-black h-2.5 rounded-full overflow-hidden border border-transparent dark:border-luxury-border/30">
                  <div className="bg-gradient-to-r from-luxury-accent to-luxury-gold h-full rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 text-slate-600 dark:text-zinc-400">
                  <span>Traditional Painting queries</span>
                  <span className="font-mono">55% popularity</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-luxury-black h-2.5 rounded-full overflow-hidden border border-transparent dark:border-luxury-border/30">
                  <div className="bg-gradient-to-r from-luxury-accent to-luxury-gold h-full rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 text-slate-600 dark:text-zinc-400">
                  <span>VR & 3D Modeling course engagement</span>
                  <span className="font-mono">70% popularity</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-luxury-black h-2.5 rounded-full overflow-hidden border border-transparent dark:border-luxury-border/30">
                  <div className="bg-gradient-to-r from-luxury-accent to-luxury-gold h-full rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Comments Moderation / Audit Panel */
        <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-base font-light font-serif text-slate-800 dark:text-white">Auditing Comment Streams</h3>
          <div className="divide-y divide-slate-100 dark:divide-luxury-border/40">
            {mockComments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-10">All reported comments audited and clean!</p>
            ) : (
              mockComments.map((comment) => (
                <div key={comment.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-luxury-accent">{comment.user}</span>
                      <span className="text-[10px] text-slate-400">on "{comment.artworkTitle}"</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-luxury-black/30 p-2.5 rounded-lg border border-transparent dark:border-luxury-border/30">{comment.text}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-1.5 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-lg transition-all cursor-pointer shrink-0"
                    title="Delete Comment"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
