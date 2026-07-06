import React, { useState } from 'react';
import { Trophy, Calendar, Users, Sparkles, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ArtChallenge } from '../types';

interface ChallengesSectionProps {
  challenges: ArtChallenge[];
  onJoinToggle: (challengeId: string) => void;
}

export default function ChallengesSection({
  challenges,
  onJoinToggle,
}: ChallengesSectionProps) {
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submittedChallengeId, setSubmittedChallengeId] = useState<string | null>(null);

  const handleSubmit = (challengeId: string, e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedChallengeId(challengeId);
    setTimeout(() => {
      setSubmittedChallengeId(null);
      setSubmissionTitle('');
      setSubmissionUrl('');
      alert('Your artwork submission has been uploaded successfully! The curators will review your piece shortly.');
    }, 1500);
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Active Art Challenges</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Participate in monthly creative contests, submit your artwork, win real grants, and earn site accolades</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main challenges details list (Left columns) */}
        <div className="lg:col-span-2 space-y-8">
          {challenges.map((chal) => (
            <div
              key={chal.id}
              className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border/80 rounded-[32px] p-6 md:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-accent via-luxury-gold to-luxury-accent/60" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-luxury-accent/10 text-luxury-accent rounded-full text-xs font-bold uppercase border border-luxury-accent/20">
                    <Trophy className="w-3.5 h-3.5 text-luxury-gold" /> Theme: {chal.theme}
                  </div>
                  <h3 className="text-xl font-light font-serif tracking-wide text-slate-800 dark:text-white">
                    {chal.title}
                  </h3>
                </div>

                {/* Join toggle button */}
                <button
                  onClick={() => onJoinToggle(chal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    chal.joined
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200'
                      : 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-semibold shadow-sm hover:opacity-95'
                  }`}
                >
                  {chal.joined ? 'Joined (Ready to Submit)' : 'Register & Join Challenge'}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                {chal.description}
              </p>

              {/* Contest facts layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-luxury-black/30 border border-transparent dark:border-luxury-border/30 rounded-2xl mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Creative Prize</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">{chal.prize}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Creators</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-luxury-accent" /> {chal.participants} registered
                  </p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Deadline</p>
                  <p className="text-xs font-bold text-luxury-accent mt-0.5">Countdown: 14 Days left</p>
                </div>
              </div>

              {/* Submission Area if Joined */}
              {chal.joined ? (
                <div className="border-t border-slate-100 dark:border-luxury-border/50 pt-6">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-luxury-accent animate-pulse" /> Submit Your Masterpiece entry
                  </h4>
                  <form onSubmit={(e) => handleSubmit(chal.id, e)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 dark:text-zinc-400 uppercase mb-2">Artwork Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Whispering Willows"
                        value={submissionTitle}
                        onChange={(e) => setSubmissionTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 dark:text-zinc-400 uppercase mb-2">Portfolio/Image URL</label>
                      <input
                        type="url"
                        placeholder="e.g. https://images.unsplash.com/..."
                        value={submissionUrl}
                        onChange={(e) => setSubmissionUrl(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-95"
                      >
                        {submittedChallengeId === chal.id ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                            Registering Submission...
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="w-3.5 h-3.5 text-luxury-black" />
                            Upload Entry Piece
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="border-t border-slate-50 dark:border-luxury-border/30 pt-4 flex items-center gap-2 text-slate-400 text-xs italic">
                  <AlertCircle className="w-4 h-4 text-luxury-accent" />
                  <span>Register above to enable the artwork submission form for this challenge.</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Challenge Accolades Sidebar (Right column) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accolades & Leaderboard</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Earn community rank points for entering contests and rating community submissions. The top three monthly rank holders receive the "Challenge Titan" badge on their profile cards!
            </p>
            <div className="space-y-3 pt-2">
              {[
                { rank: '1st', name: 'Elena Rostova', points: '14,200 pts', badge: '🥇' },
                { rank: '2nd', name: 'Devon Miller', points: '12,450 pts', badge: '🥈' },
                { rank: '3rd', name: 'Sora Tanaka', points: '9,800 pts', badge: '🥉' },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-luxury-black/40 border border-slate-100/50 dark:border-luxury-border/30 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-luxury-accent">{user.rank}</span>
                    <span className="font-medium text-slate-800 dark:text-zinc-300">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                    <span>{user.points}</span>
                    <span>{user.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-luxury-accent/10 via-luxury-gold/5 to-transparent border border-luxury-accent/10 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-luxury-accent uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
              <li>• All assets, drawings, code, or photo presets must be originally owned or curatively adapted.</li>
              <li>• Limit submissions to exactly one entry per challenge theme.</li>
              <li>• Submissions open for comment voting by community members upon moderator approval.</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
