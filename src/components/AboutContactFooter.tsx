import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Heart, Palette } from 'lucide-react';

interface AboutContactFooterProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function AboutContactFooter({
  activePage,
  setActivePage,
}: AboutContactFooterProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion States
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const faqs = [
    { q: 'Is ArtVerse free to register for digital creators?', a: 'Absolutely! ArtVerse is fully free for artists to upload their work, build public portfolios, publish tutorials, and participate in challenges.' },
    { q: 'How does the AI Art Inspiration Generator work?', a: 'Spark Bot is powered by Gemini. Simply select your category, medium, and mood in our prompt bot on the Home Page, and it produces complex prompt sentences, techniques, and optimized hex code palettes!' },
    { q: 'Can I sell physical twins of my traditional art?', a: 'Yes. You can mark any artwork as "Available" with a custom price point. Collectors can send inquiry emails directly to you using the contact form.' },
    { q: 'Are there specifications or guidelines for upload assets?', a: 'We support PNG, JPEG, and WebP, ideally sized above 1200px for sharp display. SFW rules apply strictly across community uploads.' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      alert('Your message has been sent to the ArtVerse support board. We will get back to you within 24 hours!');
    }, 1200);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-16 py-8 animate-fade-in">
      
      {activePage === 'about' && (
        /* About Page */
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-light font-serif tracking-wide text-slate-800 dark:text-white">About ArtVerse</h1>
            <p className="text-base text-luxury-accent">Where Creativity Comes to Life</p>
          </div>

          <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-8 rounded-[32px] shadow-sm space-y-6 text-slate-700 dark:text-zinc-300 leading-relaxed text-sm">
            <p>
              ArtVerse is a luxury, modern creative collective and portfolio sanctuary tailored for students, digital creators, fine traditional painters, 3D sculptors, and collectors. Established in 2026, we aim to build a beautifully clean space that supports organic artistic sharing.
            </p>
            <h3 className="text-lg font-light font-serif tracking-wide text-slate-800 dark:text-white pt-2">Our Curation Mission</h3>
            <p>
              We believe great art speaks for itself. By combining structured gallery viewing filters, detailed professional drawing/painting masterclasses, active monthly challenges with financial creative grants, and an advanced AI-powered prompt spark machine, we provide a fully integrated creative engine.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 dark:bg-luxury-black/30 rounded-xl border border-slate-100/50 dark:border-luxury-border/40">
                <h4 className="font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-1.5"><Heart className="w-4 h-4 text-pink-500" /> Human Community</h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Authentic interactions, peer reviews, direct artist inquiries, and shared design learning.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-luxury-black/30 rounded-xl border border-slate-100/50 dark:border-luxury-border/40">
                <h4 className="font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-1.5"><Palette className="w-4 h-4 text-luxury-accent" /> High-End Aesthetic</h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Rich glassmorphism details, fluid transitions, pixel-perfect grids, and a focus on visual display.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePage === 'contact' && (
        /* Contact Page with Google Maps placeholder */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Contact Form Left Side */}
          <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-8 rounded-[32px] shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-light font-serif tracking-wide text-slate-800 dark:text-white">Get in Touch</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Have any questions regarding art curation, pricing, or hosting masterclasses?</p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Liam Vance"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-bold mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="liam@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-bold mb-2">Message</label>
                <textarea
                  placeholder="Write details of your feedback or purchase inquiry..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full p-4 text-xs rounded-xl border border-slate-200 dark:border-luxury-border bg-slate-50 dark:bg-luxury-black/20 text-slate-800 dark:text-white h-24 resize-none focus:outline-none focus:ring-1 focus:ring-luxury-accent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                    Sending message...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-luxury-black" />
                    Publish Message Inquiry
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map & Office Right Side */}
          <div className="space-y-6">
            
            {/* Office Info details */}
            <div className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters & Support</h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-luxury-accent" />
                  <span>ArtVerse Tower, Creative District Block C, New York, NY 10012</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-luxury-gold" />
                  <span>support@artverse.creative</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>+1 (212) 555-8890</span>
                </div>
              </div>
            </div>

            {/* Immersive Map Placeholder */}
            <div className="aspect-video w-full rounded-3xl bg-slate-100 dark:bg-luxury-card border border-slate-200/50 dark:border-luxury-border overflow-hidden relative flex flex-col items-center justify-center text-center p-4">
              <MapPin className="w-8 h-8 text-luxury-accent animate-bounce mb-2" />
              <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-300">New York Creative Lounge</h4>
              <p className="text-[10px] text-slate-400 max-w-xs mt-1">Visit us live for coffee sessions, physical print checks, and community reviews.</p>
            </div>

          </div>

        </div>
      )}

      {/* Shared Interactive Collapsible FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-light font-serif tracking-wide text-slate-800 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-luxury-accent" /> Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400 mt-1">Get instant answers regarding Spark Bot, submissions, and course agendas</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-luxury-accent" /> : <ChevronDown className="w-4 h-4 text-luxury-accent" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-50 dark:border-luxury-border/30 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Legal Sub-pages (Privacy, Terms, Disclaimer) rendered as inline boxes if active */}
      {(activePage === 'privacy' || activePage === 'terms' || activePage === 'disclaimer') && (
        <section className="bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border p-8 rounded-3xl max-w-4xl mx-auto space-y-4 animate-fade-in text-slate-600 dark:text-zinc-400 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-luxury-accent">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">
              {activePage === 'privacy' && 'Privacy Policy'}
              {activePage === 'terms' && 'Terms & Conditions'}
              {activePage === 'disclaimer' && 'Disclaimer Advisory'}
            </h3>
          </div>
          
          {activePage === 'privacy' && (
            <p>
              Your privacy is extremely important to us. ArtVerse collects only essential profile credentials (such as user avatars, portfolio descriptions, and registered favorites) stored in temporary session cookies. We never trade, share, or sell sensitive data to external analytics boards.
            </p>
          )}

          {activePage === 'terms' && (
            <p>
              By accessing ArtVerse, you agree to respect community guidelines. Do not upload plagiarism, offensive graphics, or copyright infringement assets. All uploaded artworks remain the intellectual property of their respective creators.
            </p>
          )}

          {activePage === 'disclaimer' && (
            <p>
              All dummy artworks, pricing points, events, and course videos listed on ArtVerse are simulated and intended for demonstration purposes. AI-generated prompts are experimental suggestions created on the fly.
            </p>
          )}
        </section>
      )}

      {/* Global Bottom Site Footer */}
      <footer className="pt-12 border-t border-slate-100 dark:border-luxury-border grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
        <div className="space-y-4">
          <span className="text-base font-light font-serif tracking-wide text-slate-800 dark:text-white flex items-center gap-2">
            🎨 ArtVerse
          </span>
          <p className="text-[11px]">
            Where Creativity Comes to Life. A luxurious modern portfolio, masterclass gallery, and responsive digital community platform.
          </p>
          <p className="text-[10px] text-slate-400">
            © {currentYear} ArtVerse Inc. All rights reserved. New York, USA.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">Quick Navigation</h4>
          <ul className="space-y-1.5 font-medium">
            <li><button onClick={() => setActivePage('home')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Home Feed</button></li>
            <li><button onClick={() => setActivePage('gallery')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Exhibition Gallery</button></li>
            <li><button onClick={() => setActivePage('artists')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Collective Artists</button></li>
            <li><button onClick={() => setActivePage('tutorials')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Masterclass Lessons</button></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">Legal Regulations</h4>
          <ul className="space-y-1.5 font-medium">
            <li><button onClick={() => setActivePage('privacy')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Privacy Policy</button></li>
            <li><button onClick={() => setActivePage('terms')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Terms & Conditions</button></li>
            <li><button onClick={() => setActivePage('disclaimer')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Disclaimer Advisory</button></li>
            <li><button onClick={() => setActivePage('contact')} className="hover:text-luxury-accent text-left transition-colors cursor-pointer">Contact Support</button></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">Curation Office</h4>
          <p className="text-[11px] leading-relaxed">
            Support: support@artverse.creative<br />
            Lounge: ArtVerse Tower, NY 10012<br />
            Hours: <span className="text-luxury-accent font-semibold">Mon - Fri 9:00 AM - 6:00 PM EST</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
