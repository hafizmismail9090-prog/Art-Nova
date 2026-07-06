import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Bell, Upload, Award, ShieldAlert, Palette, ChevronDown, User, Heart, Bookmark, LogIn } from 'lucide-react';
import { UserProfile } from '../types';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  user: UserProfile;
  onOpenUpload: () => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export default function Navigation({
  activePage,
  setActivePage,
  darkMode,
  setDarkMode,
  user,
  onOpenUpload,
  isAdmin,
  setIsAdmin,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Artists', id: 'artists' },
    { name: 'Tutorials', id: 'tutorials' },
    { name: 'Blog', id: 'blog' },
    { name: 'Challenges', id: 'challenges' },
    { name: 'Events', id: 'events' },
    { name: 'Community', id: 'community' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-luxury-black/80 backdrop-blur-md border-b border-slate-100 dark:border-luxury-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActivePage('home'); setIsAdmin(false); }}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-luxury-accent to-luxury-gold flex items-center justify-center text-white shadow-md">
              <Palette className="w-5 h-5 text-luxury-black" />
            </div>
            <span className="text-xl font-bold font-serif tracking-tight text-slate-800 dark:text-white flex items-center gap-1.5">
              ArtVerse
              <span className="text-[10px] bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black px-2 py-0.5 rounded-full uppercase font-bold">
                Beta
              </span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setIsAdmin(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activePage === item.id && !isAdmin
                    ? 'text-luxury-accent dark:text-luxury-accent bg-luxury-accent/10 dark:bg-luxury-accent/5'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-luxury-accent dark:hover:text-luxury-accent hover:bg-slate-50 dark:hover:bg-luxury-card/50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Actions & Profile */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-slate-200/60 dark:border-luxury-border hover:bg-slate-50 dark:hover:bg-luxury-card text-slate-600 dark:text-zinc-400 transition-all"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-luxury-gold" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl border border-slate-200/60 dark:border-luxury-border hover:bg-slate-50 dark:hover:bg-luxury-card text-slate-600 dark:text-zinc-400 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                {user.notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-luxury-accent rounded-full animate-ping" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-2xl shadow-xl p-4 animate-fade-in z-50">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-luxury-border">
                    <span className="text-sm font-bold text-slate-800 dark:text-white">Alerts</span>
                    <span className="text-xs text-luxury-accent">{user.notifications.length} Unread</span>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {user.notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
                    ) : (
                      user.notifications.map((notif, index) => (
                        <div key={index} className="text-xs text-slate-600 dark:text-zinc-300 p-2 hover:bg-slate-50 dark:hover:bg-luxury-border/50 rounded-lg">
                          ✨ {notif}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="py-2 px-4 bg-gradient-to-r from-luxury-accent to-luxury-gold hover:opacity-90 text-luxury-black font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-luxury-black" />
              Upload Art
            </button>

            {/* Admin toggle */}
            <button
              onClick={() => { setIsAdmin(!isAdmin); if (!isAdmin) setActivePage('admin'); }}
              className={`py-2 px-3.5 border rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                isAdmin 
                  ? 'bg-luxury-accent text-luxury-black border-luxury-accent' 
                  : 'border-slate-200/60 dark:border-luxury-border text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-luxury-card'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {isAdmin ? 'Admin Dashboard' : 'Enter Admin'}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-luxury-card transition-all border border-slate-100 dark:border-luxury-border"
              >
                <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-lg object-cover" />
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-luxury-card border border-slate-100 dark:border-luxury-border rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-luxury-border">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{user.role}</p>
                  </div>
                  <button
                    onClick={() => { setActivePage('community'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-luxury-border/50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    My Portfolio
                  </button>
                  <button
                    onClick={() => { setActivePage('gallery'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-luxury-border/50 flex items-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 text-slate-400" />
                    My Favorites
                  </button>
                  <button
                    onClick={() => { setActivePage('community'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-luxury-border/50 flex items-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                    Saved Challenges
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-400"
            >
              {darkMode ? <Sun className="w-4 h-4 text-luxury-gold" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-luxury-border bg-white dark:bg-luxury-black p-4 space-y-2 animate-fade-in">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActivePage(item.id); setIsAdmin(false); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === item.id && !isAdmin
                  ? 'text-luxury-accent bg-slate-50 dark:bg-luxury-card/60'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              {item.name}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-luxury-border space-y-2">
            <button
              onClick={() => { onOpenUpload(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-luxury-accent to-luxury-gold text-luxury-black rounded-xl text-sm flex items-center justify-center gap-2 font-bold"
            >
              <Upload className="w-4 h-4 text-luxury-black" />
              Upload Art
            </button>
            <button
              onClick={() => { setIsAdmin(!isAdmin); if (!isAdmin) setActivePage('admin'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 bg-luxury-accent text-luxury-black rounded-xl text-sm flex items-center justify-center gap-2 font-bold"
            >
              <ShieldAlert className="w-4 h-4 text-luxury-black" />
              {isAdmin ? 'Exit Admin' : 'Enter Admin Panel'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
