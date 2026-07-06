import React, { useState } from 'react';
import { BookOpen, Play, Star, Clock, User, Compass, CheckCircle2, ChevronRight, Video, Sparkles } from 'lucide-react';
import { Tutorial } from '../types';

interface TutorialsSectionProps {
  tutorials: Tutorial[];
}

export default function TutorialsSection({ tutorials }: TutorialsSectionProps) {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Digital Art' | 'Painting' | '3D Modeling' | 'Animation'>('All');

  const filteredTutorials = activeCategory === 'All' 
    ? tutorials 
    : tutorials.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Creative Masterclass</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Upgrade your creative skills with detailed video lessons hosted by lead developers</p>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 shrink-0">
          {(['All', 'Digital Art', 'Painting', '3D Modeling', 'Animation'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelectedTutorial(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black'
                  : 'bg-slate-50 dark:bg-luxury-black border border-slate-100 dark:border-luxury-border/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-luxury-card'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Course Catalog (Grid Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTutorial ? (
            /* Active Classroom Video Player Detail screen */
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-[32px] overflow-hidden shadow-md p-6 space-y-6 animate-fade-in">
              <button
                onClick={() => { setSelectedTutorial(null); setIsPlaying(false); }}
                className="text-xs text-luxury-accent hover:text-luxury-gold font-bold flex items-center gap-1.5 mb-2 cursor-pointer"
              >
                ← Back to catalog
              </button>

              {/* Immersive Video Screen Container */}
              <div className="aspect-video w-full rounded-2xl bg-zinc-950 overflow-hidden relative group shadow-inner border border-luxury-border/50">
                {isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3 p-4 bg-zinc-950">
                    <Video className="w-10 h-10 text-luxury-accent animate-pulse" />
                    <span className="text-xs text-zinc-400 font-mono">Playing Lesson {activeLessonIdx + 1}: "{selectedTutorial.lessons[activeLessonIdx]}"</span>
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="text-[10px] px-3 py-1.5 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all font-semibold cursor-pointer"
                    >
                      Pause Lesson
                    </button>
                  </div>
                ) : (
                  <>
                    <img 
                      src={selectedTutorial.thumbnail} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-luxury-accent/20 cursor-pointer"
                      >
                        <Play className="w-6 h-6 fill-current ml-1 text-luxury-black" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Lesson meta information */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="px-2.5 py-0.5 bg-luxury-accent/10 text-luxury-accent rounded-full font-bold uppercase text-[9px] border border-luxury-accent/20">
                    {selectedTutorial.category}
                  </span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedTutorial.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-luxury-gold" /> {selectedTutorial.difficulty}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedTutorial.instructor}</span>
                </div>
                <h3 className="text-xl font-light font-serif tracking-wide text-slate-800 dark:text-white">
                  {selectedTutorial.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  {selectedTutorial.description}
                </p>
              </div>

              {/* Progress Course Agenda List */}
              <div className="pt-4 border-t border-slate-50 dark:border-luxury-border/50 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Agenda & Lessons</h4>
                <div className="divide-y divide-slate-50 dark:divide-luxury-border/30">
                  {selectedTutorial.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setActiveLessonIdx(idx); setIsPlaying(true); }}
                      className={`py-3 px-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        idx === activeLessonIdx 
                          ? 'bg-luxury-accent/5 dark:bg-luxury-accent/5 border-l-4 border-luxury-accent' 
                          : 'hover:bg-slate-50 dark:hover:bg-luxury-black/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {idx < activeLessonIdx ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-luxury-border text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        <span className={`text-xs ${idx === activeLessonIdx ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-600 dark:text-zinc-300'}`}>
                          {lesson}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Tutorials list Grid cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
              {filteredTutorials.map((tut) => (
                <div
                  key={tut.id}
                  onClick={() => { setSelectedTutorial(tut); setActiveLessonIdx(0); }}
                  className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={tut.thumbnail} alt={tut.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/25 transition-colors" />
                    <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-white px-2 py-0.5 bg-black/60 rounded-md">
                      {tut.lessons.length} lessons
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="px-2 py-0.5 bg-luxury-accent/10 text-luxury-accent rounded font-semibold uppercase border border-luxury-accent/20">{tut.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tut.duration}</span>
                    </div>
                    <h3 className="text-sm font-light font-serif leading-snug line-clamp-2 text-slate-800 dark:text-white">
                      {tut.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {tut.description}
                    </p>
                    <div className="pt-2 border-t border-slate-50 dark:border-luxury-border/40 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Instructor: <strong className="text-slate-600 dark:text-zinc-300">{tut.instructor}</strong></span>
                      <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-luxury-black border border-transparent dark:border-luxury-border/30 rounded font-medium text-luxury-gold">{tut.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQ & Quick Advice Block (Right Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-tr from-luxury-accent/10 via-luxury-gold/5 to-transparent border border-luxury-accent/10 dark:border-luxury-border rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-luxury-accent">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-sans">ArtVerse Academy</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Our tutorials are strictly vetted and filmed directly by the community’s leading digital artists and museum curators. Take challenges to submit course work and get spotlight certificates!
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited stream access</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Downloadable base PSD models & 3D obj assets</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expert Advice</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Is there certification?</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">Yes! Complete any advanced course and submit your final composition in the Art Challenge group to receive an ArtVerse Skill badge.</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Can I host a tutorial?</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">Absolutely. If your profile exceeds 1,000 followers or you submit an active admin application, our curation board will review your proposal.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
