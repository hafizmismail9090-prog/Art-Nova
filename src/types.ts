export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
  rating: number;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  category: string;
  medium: string;
  image: string;
  description: string;
  creationDate: string;
  dimensions: string;
  price: number | null; // null if not for sale (digital/NFT/showcase)
  availability: 'Available' | 'Sold' | 'NFS';
  likes: number;
  shares: number;
  savedCount: number;
  comments: Comment[];
  palette: string[]; // hex codes
  views: number;
  featured: boolean;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  skills: string[];
  achievements: string[];
  socials: {
    instagram?: string;
    twitter?: string;
    website?: string;
    artstation?: string;
  };
  followers: number;
  isFollowing: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  category: 'Drawing' | 'Painting' | 'Digital Art' | '3D Modeling' | 'Animation';
  difficulty: 'Beginner' | 'Advanced' | 'Intermediate';
  instructor: string;
  duration: string;
  description: string;
  thumbnail: string;
  lessons: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  content: string;
}

export interface ArtChallenge {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO String or Date
  prize: string;
  theme: string;
  participants: number;
  joined: boolean;
}

export interface ArtEvent {
  id: string;
  title: string;
  description: string;
  date: string; // July 12, 2026
  time: string;
  location: string;
  image: string;
  registeredCount: number;
  isRegistered: boolean;
  type: 'Exhibition' | 'Workshop' | 'Webinar' | 'Meetup';
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  date: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  artworks: string[]; // artwork IDs
  savedArtworks: string[]; // artwork IDs
  likedArtworks: string[]; // artwork IDs
  notifications: string[]; // notification alerts
  isLoggedIn: boolean;
}
