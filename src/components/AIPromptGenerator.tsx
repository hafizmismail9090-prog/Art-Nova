import React, { useState } from 'react';
import { Sparkles, Copy, Check, Lightbulb } from 'lucide-react';

interface Inspiration {
  title: string;
  prompt: string;
  palette: string[];
  technique: string;
}

export default function AIPromptGenerator() {
  const [category, setCategory] = useState('Digital Art');
  const [medium, setMedium] = useState('Digital Illustration');
  const [mood, setMood] = useState('Dreamy & Cosmic');
  const [loading, setLoading] = useState(false);
  const [inspiration, setInspiration] = useState<Inspiration | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const categories = ['Digital Art', 'Traditional Art', 'Abstract Art', 'Photography', 'Sculpture', 'Pixel Art'];
  const mediums = ['Digital Painting', 'Watercolor', 'Oil on Canvas', '3D Render', 'Aseprite Pixel Art', 'Ink & Pen'];
  const moods = ['Dreamy & Cosmic', 'Moody & Dark', 'Cyberpunk Retro', 'Vibrant & Playful', 'Minimalist & Calm', 'Eerie & Ethereal'];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-inspiration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, medium, mood })
      });
      const data = await response.json();
      setInspiration(data);
    } catch (err) {
      console.error(err);
      // Fallback is handled inside backend response, but let's provide a reliable UI fallback
      setInspiration({
        title: 'Nebula Sanctuary',
        prompt: `A cozy glass greenhouse floating in deep space, filled with luminous biomechanical flowers that glow in shades of magenta and teal. Below, a small river of stardust flows smoothly, reflecting a massive ringed planet on the horizon.`,
        palette: ['#6C63FF', '#FF6584', '#FFD166', '#0A0A12'],
        technique: 'Paint the glass panes first using a low-opacity white brush, then apply a soft cyan color on top set to "Linear Dodge (Add)" to simulate cosmic sunlight.'
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number | null = null) => {
    navigator.clipboard.writeText(text);
    if (index !== null) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1500);
    }
  };

  return (
    <div id="ai-generator" className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all">
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:indigo-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 dark:pink-500/5 blur-3xl rounded-full" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-xl">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white font-sans tracking-tight">
            AI Art Inspiration Generator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by Gemini to spark instant creative ideas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-2">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-2">Medium</label>
          <select 
            value={medium}
            onChange={(e) => setMedium}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {mediums.map(med => <option key={med} value={med}>{med}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-2">Mood / Vibe</label>
          <select 
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {moods.map(md => <option key={md} value={md}>{md}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating Spark of Genius...
          </>
        ) : (
          <>
            <Lightbulb className="w-4 h-4" />
            Generate Creative Prompt
          </>
        )}
      </button>

      {inspiration && (
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800/50 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-slate-800 dark:text-white font-sans">
              ✨ {inspiration.title}
            </h4>
            <button
              onClick={() => copyToClipboard(inspiration.prompt)}
              className="text-xs text-indigo-500 hover:text-indigo-600 flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg transition-all"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedPrompt ? 'Copied' : 'Copy Prompt'}
            </button>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-zinc-800/30 p-4 rounded-xl leading-relaxed mb-6">
            {inspiration.prompt}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                Color Palette Suggestion
              </h5>
              <div className="grid grid-cols-4 gap-2">
                {inspiration.palette?.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(color, idx)}
                    className="group relative flex flex-col items-center gap-1 focus:outline-none"
                    title="Click to copy hex"
                  >
                    <div 
                      className="w-full h-12 rounded-lg shadow-sm border border-slate-100 dark:border-zinc-800 transition-all duration-300 group-hover:scale-105 active:scale-95"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-[10px] text-slate-500 dark:text-zinc-400 mt-1">
                      {copiedIndex === idx ? 'Copied!' : color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                Pro Technique to Try
              </h5>
              <div className="bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/30 dark:border-indigo-900/10 p-3 rounded-xl">
                <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed italic">
                  "{inspiration.technique}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
