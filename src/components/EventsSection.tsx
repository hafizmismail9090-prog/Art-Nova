import React, { useState } from 'react';
import { Calendar, MapPin, Users, Ticket, ArrowUpRight, CheckCircle2, Clock, Grid } from 'lucide-react';
import { ArtEvent } from '../types';

interface EventsSectionProps {
  events: ArtEvent[];
  onRegisterToggle: (eventId: string) => void;
}

export default function EventsSection({
  events,
  onRegisterToggle,
}: EventsSectionProps) {
  const [filterType, setFilterType] = useState<'All' | 'Exhibition' | 'Workshop' | 'Webinar' | 'Meetup'>('All');

  const filteredEvents = filterType === 'All'
    ? events
    : events.filter(e => e.type === filterType);

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Curation Events</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Join upcoming physical roundtable meetups, virtual webinars, and exclusive gallery launches</p>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 shrink-0">
          {(['All', 'Exhibition', 'Workshop', 'Webinar', 'Meetup'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black'
                  : 'bg-slate-50 dark:bg-luxury-black border border-slate-100 dark:border-luxury-border/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-luxury-card'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image section */}
            <div className="aspect-[16/10] w-full overflow-hidden relative">
              <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white/95 dark:bg-luxury-black/95 text-luxury-accent rounded-lg border border-transparent dark:border-luxury-border/50">
                {evt.type}
              </span>
            </div>

            {/* Content info section */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-luxury-accent" /> {evt.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {evt.time}</span>
                </div>
                <h3 className="text-base font-light font-serif leading-tight line-clamp-2 text-slate-800 dark:text-white">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {evt.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-50 dark:border-luxury-border/50">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-luxury-accent" /> {evt.registeredCount + (evt.isRegistered ? 1 : 0)} attending</span>
                </div>

                <button
                  onClick={() => onRegisterToggle(evt.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    evt.isRegistered
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200'
                      : 'bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black font-semibold shadow-sm'
                  }`}
                >
                  {evt.isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-pulse" />
                      Registered (Add to Calendar)
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 text-luxury-black" />
                      Register Free Ticket
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past events showcase banner */}
      <section className="bg-slate-50 dark:bg-luxury-card/30 border border-slate-100 dark:border-luxury-border/80 p-6 rounded-3xl mt-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Grid className="w-4 h-4" /> Past Exhibitions Archives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-luxury-black p-4 rounded-xl border border-slate-100 dark:border-luxury-border/30 flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">Kyoto Traditional Ink Showcase 2025</h4>
              <p className="text-[10px] text-slate-400 mt-1">Completed: Oct 12, 2025 | 1.2k attendees</p>
            </div>
          </div>
          <div className="bg-white dark:bg-luxury-black p-4 rounded-xl border border-slate-100 dark:border-luxury-border/30 flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">Virtual Reality Blender Sandbox launch</h4>
              <p className="text-[10px] text-slate-400 mt-1">Completed: Jan 04, 2026 | 900 digital users</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
