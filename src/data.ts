import { Artwork, Artist, Tutorial, BlogPost, ArtChallenge, ArtEvent, ForumPost, UserProfile } from './types';

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'Neon Odyssey',
    artistId: 'artist-1',
    artistName: 'Elena Rostova',
    category: 'Digital Art',
    medium: 'Digital (Procreate)',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'A vibrant cyberpunk landscape tracing the neural flows of a future city. Inspired by retro-futuristic synthwave art.',
    creationDate: '2026-03-15',
    dimensions: '4000 x 4000 px',
    price: null,
    availability: 'NFS',
    likes: 342,
    shares: 89,
    savedCount: 156,
    palette: ['#6C63FF', '#FF6584', '#0A0A12', '#2D1B4E'],
    views: 1250,
    featured: true,
    comments: [
      { id: 'c-1', user: 'Marcus Vance', text: 'This lighting is absolutely gorgeous. The glow feels so authentic!', date: '2026-06-20', rating: 5 },
      { id: 'c-2', user: 'Aria Chen', text: 'Stunning colors! Do you have a tutorial on how you paint glass surfaces?', date: '2026-06-25', rating: 5 }
    ]
  },
  {
    id: 'art-2',
    title: 'Whispers of Autumn',
    artistId: 'artist-2',
    artistName: 'Sora Tanaka',
    category: 'Traditional Art',
    medium: 'Oil on Canvas',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80',
    description: 'An abstract oil painting depicting the crisp wind through golden maple leaves in Kyoto, blending deep ochre and rich crimson colors.',
    creationDate: '2025-11-04',
    dimensions: '90 x 120 cm',
    price: 1850,
    availability: 'Available',
    likes: 215,
    shares: 42,
    savedCount: 94,
    palette: ['#FFD166', '#FF6584', '#B55B04', '#222222'],
    views: 890,
    featured: true,
    comments: [
      { id: 'c-3', user: 'Julian ArtLovers', text: 'An exquisite sense of movement here.', date: '2026-05-12', rating: 4 }
    ]
  },
  {
    id: 'art-3',
    title: 'Fragmented Reality',
    artistId: 'artist-3',
    artistName: 'Devon Miller',
    category: 'Abstract Art',
    medium: '3D Render (Blender)',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    description: 'A study on geometry, gravity, and glass reflection. Built using complex octane nodes and physics particles.',
    creationDate: '2026-05-22',
    dimensions: '3840 x 2160 px',
    price: 450,
    availability: 'Available',
    likes: 512,
    shares: 120,
    savedCount: 204,
    palette: ['#6C63FF', '#83E8BA', '#222222', '#F8F9FC'],
    views: 2430,
    featured: true,
    comments: [
      { id: 'c-4', user: 'Sarah Connor', text: 'The glass refraction index looks perfectly tuned. Outstanding job!', date: '2026-06-01', rating: 5 }
    ]
  },
  {
    id: 'art-4',
    title: 'Solitude',
    artistId: 'artist-4',
    artistName: 'Maya Patel',
    category: 'Photography Collection',
    medium: 'Digital Photography',
    image: 'https://images.unsplash.com/photo-1500628550463-c58c275ae79b?auto=format&fit=crop&w=1200&q=80',
    description: 'A lone lighthouse on the dramatic coast of Norway during a winter storm. Captures the severe and quiet beauty of isolation.',
    creationDate: '2025-01-18',
    dimensions: '6000 x 4000 px',
    price: 320,
    availability: 'Available',
    likes: 189,
    shares: 31,
    savedCount: 77,
    palette: ['#F8F9FC', '#0A0A12', '#4B5563', '#1F2937'],
    views: 620,
    featured: false,
    comments: []
  },
  {
    id: 'art-5',
    title: 'Serenade of the Forest',
    artistId: 'artist-1',
    artistName: 'Elena Rostova',
    category: 'Illustration Collection',
    medium: 'Digital Vector',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&q=80',
    description: 'An enchanted fairytale scene with glowing woodland creatures and stylized botanical drawings.',
    creationDate: '2026-02-10',
    dimensions: '3000 x 4000 px',
    price: null,
    availability: 'NFS',
    likes: 294,
    shares: 60,
    savedCount: 140,
    palette: ['#83E8BA', '#FFD166', '#0E3A2F', '#0A0A12'],
    views: 990,
    featured: false,
    comments: []
  },
  {
    id: 'art-6',
    title: 'Chinatown After Rain',
    artistId: 'artist-5',
    artistName: 'Kenji Sato',
    category: 'Watercolor',
    medium: 'Watercolor on Paper',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    description: 'A beautiful watercolor painting capturing neon lights reflecting on wet streets, masterfully balancing water flows and precise details.',
    creationDate: '2026-04-01',
    dimensions: '50 x 70 cm',
    price: 950,
    availability: 'Available',
    likes: 167,
    shares: 28,
    savedCount: 45,
    palette: ['#FF6584', '#6C63FF', '#1E1B4B', '#F8F9FC'],
    views: 480,
    featured: false,
    comments: []
  },
  {
    id: 'art-7',
    title: 'Infinite Bloom',
    artistId: 'artist-2',
    artistName: 'Sora Tanaka',
    category: 'Sculpture Collection',
    medium: 'Generative Metal & Glass',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    description: 'A physical interactive sculpture utilizing brass sheets and liquid light projections.',
    creationDate: '2025-08-20',
    dimensions: '180 x 180 x 240 cm',
    price: 12500,
    availability: 'Available',
    likes: 412,
    shares: 154,
    savedCount: 188,
    palette: ['#FFD166', '#FF6584', '#E2E8F0', '#121212'],
    views: 3100,
    featured: true,
    comments: []
  },
  {
    id: 'art-8',
    title: 'Pixel Sanctuary',
    artistId: 'artist-6',
    artistName: 'ChronoByte',
    category: 'Pixel Art',
    medium: 'Pixel Art (Aseprite)',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'A nostalgic 16-bit isometric layout of a retro gamer loft, complete with cozy warm lamps, CRT screens, and glowing cassettes.',
    creationDate: '2026-06-02',
    dimensions: '320 x 240 px (scaled)',
    price: 150,
    availability: 'Available',
    likes: 278,
    shares: 55,
    savedCount: 110,
    palette: ['#FFD166', '#6C63FF', '#1E293B', '#FF6584'],
    views: 1120,
    featured: false,
    comments: [
      { id: 'c-5', user: 'Megaman99', text: 'Pure pixel heaven! Love the animated coffee steam effect.', date: '2026-06-15', rating: 5 }
    ]
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'Digital Illustrator & Concept Artist',
    bio: 'Elena is a digital nomad exploring themes of neon futurism, magical flora, and dreamlike horizons. She has worked with key indie game studios on creative worldbuilding.',
    skills: ['Procreate', 'Photoshop', 'Concept Art', 'Color Keys'],
    achievements: ['Vanguard Creative Nominee 2025', 'ArtVerse Featured Artist of the Month'],
    socials: { instagram: '@elena.draws', twitter: '@elenarostova', artstation: 'elenarostova' },
    followers: 14200,
    isFollowing: true
  },
  {
    id: 'artist-2',
    name: 'Sora Tanaka',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'Contemporary Painter & Sculptor',
    bio: 'Sora Tanaka blends centuries-old Japanese ink brushing aesthetics with high-contrast oil layers and generative sculpture works. He explores themes of organic time.',
    skills: ['Oil Painting', 'Watercolor', 'Interactive Sculptures', 'Metal Casting'],
    achievements: ['Kyoto New Wave Art Grand Prize', 'Tokyo Biennial Guest'],
    socials: { instagram: '@sora.tanaka', website: 'soratanaka.art' },
    followers: 8900,
    isFollowing: false
  },
  {
    id: 'artist-3',
    name: 'Devon Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: '3D Designer & Crypto Artist',
    bio: 'Devon is a digital generalist creating mesmerizing gravity-defying environments. He loves working with complex light refraction, glass, and procedural textures.',
    skills: ['Blender', 'Octane Render', 'ZBrush', 'Procedural Textures'],
    achievements: ['CryptoArt Pioneer 2025', 'Top Blender Community Creator'],
    socials: { twitter: '@devon_render', website: 'devonmiller3d.com' },
    followers: 24500,
    isFollowing: false
  },
  {
    id: 'artist-4',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Landscape Photographer',
    bio: 'Maya travels the sub-arctic regions chasing dramatic light, high-seas action, and coastal architecture. Her work is famous for capturing raw solitude.',
    skills: ['Fine Art Photography', 'Lightroom', 'Drone Capture', 'Print Preparation'],
    achievements: ['National Wildlife Award Runner-up', 'Solo Gallery "Cold Borders"'],
    socials: { instagram: '@maya.clicks', website: 'mayapatel.co' },
    followers: 6300,
    isFollowing: false
  },
  {
    id: 'artist-5',
    name: 'Kenji Sato',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    role: 'Traditional Watercolorist',
    bio: 'Kenji paints live cityscapes, utilizing rapid watercolor bleed techniques to capture light, rainfall, and urban community spaces.',
    skills: ['Traditional Watercolor', 'Sketching', 'Urban Plein Air'],
    achievements: ['International Watercolor Society Gold Medal'],
    socials: { instagram: '@kenji.watercolors' },
    followers: 7200,
    isFollowing: false
  },
  {
    id: 'artist-6',
    name: 'ChronoByte',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    role: 'Pixel Artist & Game Dev',
    bio: 'A vintage console enthusiast producing miniature worlds brick by brick. His signature is warm, glowing lighting mapped onto tiny grid dimensions.',
    skills: ['Aseprite', 'Pixel Art Animation', 'Isometric Layouts', 'Palette Cycling'],
    achievements: ['PixelJam Best Aesthetic Winner'],
    socials: { twitter: '@chronobyte_pixels', instagram: '@chronobyte' },
    followers: 12100,
    isFollowing: false
  }
];

export const TUTORIALS: Tutorial[] = [
  {
    id: 'tut-1',
    title: 'Mastering Neon Glow in Digital Art',
    category: 'Digital Art',
    difficulty: 'Intermediate',
    instructor: 'Elena Rostova',
    duration: '2h 15m',
    description: 'Learn how to utilize layers, blending modes (Add, Screen, Color Dodge), and brush curves to draw realistic, eye-catching glowing neon tube lights, neon smoke, and reflective surfaces.',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    lessons: [
      'Welcome & Interface Setup',
      'The Science of Glow & Blending Modes',
      'Painting the Core Light Tube',
      'Adding Atmospheric Falloff & Scattering',
      'Drawing Ambient Reflections on Wet Surfaces',
      'Final Highlights & Post Processing'
    ]
  },
  {
    id: 'tut-2',
    title: 'Introduction to Plein Air Painting',
    category: 'Painting',
    difficulty: 'Beginner',
    instructor: 'Kenji Sato',
    duration: '1h 45m',
    description: 'Pack your brushes and head outside! Kenji Sato teaches the absolute fundamentals of capturing natural daylight, sketching fast, mixing colors on-the-go, and coping with changing shadows.',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    lessons: [
      'Choosing the Right Portable Kit',
      'Finding the Perfect Spot: Composition & Framing',
      'Underdrawing & Blocking In Values',
      'Mixing Limited Palettes for Sunlight',
      'Capturing Rapid Clouds & Water Refraction'
    ]
  },
  {
    id: 'tut-3',
    title: 'Abstract 3D Glass Refraction Nodes',
    category: '3D Modeling',
    difficulty: 'Advanced',
    instructor: 'Devon Miller',
    duration: '3h 10m',
    description: 'Master custom glass shaders in Blender Octane. Dive deep into dispersion index of refraction (IOR), metallic edge flaws, procedural dusty fingerprints, and dramatic depth of field camera controls.',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    lessons: [
      'Understanding Glass Shader Optics',
      'Constructing the Procedural Noise Node Tree',
      'Fingerprints, Scratches & Micro-imperfections',
      'Camera Setup: F-Stop, Focus Tracking & Lens Distortion',
      'Optimizing Cycles/Octane Render Settings for Glass'
    ]
  },
  {
    id: 'tut-4',
    title: 'Isometric Pixel Art for Indie Games',
    category: 'Animation',
    difficulty: 'Beginner',
    instructor: 'ChronoByte',
    duration: '1h 30m',
    description: 'A hands-on layout course for pixel design. Work with isometric projections, coordinate rules, lighting offsets, and pixel-doubling rules to create neat room decors.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    lessons: [
      'What is Isometric Art? (The 2:1 Ratio)',
      'Constructing Your Grid in Aseprite',
      'Basic Furniture: Desks, Chairs & Screens',
      'The Golden Rules of Pixel Line Cleaning',
      'Color Palette Constraints & Dynamic Shadows'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Evolution of Generative AI in Creative Industries',
    author: 'Elena Rostova',
    date: 'July 2, 2026',
    category: 'AI Art',
    readTime: '6 min read',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    summary: 'A balanced discussion exploring the intersection of creative human curation and generative machine models, and how artists are capitalizing on prompts.',
    content: `
      Generative AI is no longer a fringe tool. Over the past twelve months, creative workflows have adapted dramatically. The conversation has evolved from 'Will AI replace artists?' to 'How can artists direct AI to expand creative horizons?'

      ### The Co-Creation Engine
      Today's creative agencies are using generative models for rapid concept moodboarding. An illustrator can prototype ten composition structures in an hour, selecting the best parts and painting over them with human accuracy, intent, and fine emotional detail.

      ### Ownership and the New Aesthetic
      As machine outputs become ubiquitous, the value of hand-crafted traditional oil coatings, unique tactile textures, and high-fidelity local vector structures is climbing. The future is hybrid: custom hand-drawn motifs styled with advanced procedural lighting algorithms.
    `
  },
  {
    id: 'blog-2',
    title: 'Color Theory Masterclass: Creating Emotional Harmony',
    author: 'Sora Tanaka',
    date: 'June 28, 2026',
    category: 'Color Theory',
    readTime: '8 min read',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80',
    summary: 'Why does certain artwork evoke instant nostalgia while others feel clinical? We analyze complementary colors, warm undercoats, and value distribution.',
    content: `
      Color is the first line of emotional communication before your brain even processes the subject matter. In this guide, Sora Tanaka outlines his core rules for setting up a palette that dictates mood and tells stories.

      ### 1. The Rule of the dominant undercoat
      Before laying down final colors, glaze your entire surface with a thin, cohesive tone (such as burnt suent or warm gray). This peaks through every layer and provides instant visual unity.

      ### 2. Restraint Over Saturation
      A common mistake is utilizing fully saturated colors everywhere. To make a primary accent pop (e.g. glowing pink), surround it with muted, complementary grays or muted greens. High contrast is created by scarcity.
    `
  },
  {
    id: 'blog-3',
    title: 'Navigating the NFT Market in 2026: Fine Art vs Collectibles',
    author: 'Devon Miller',
    date: 'June 15, 2026',
    category: 'NFT News',
    readTime: '5 min read',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    summary: 'The initial hype has cleared. Now, we examine why authentic digital art series with curated physical twins are surviving and thriving on modern chains.',
    content: `
      The speculative noise of digital collectible templates has cooled down, opening a majestic path for fine-art blockchain representation. 

      ### The Rise of Physical Twins
      Collectors are now focusing heavily on artists who bridge the gap: digital tokens representing high-resolution interactive files, packaged with a physical canvas print signed by the artist. This establishes authentic value both in local galleries and modern metaverse portfolios.
    `
  }
];

export const ART_CHALLENGES: ArtChallenge[] = [
  {
    id: 'chal-1',
    title: 'Neon Oasis Worldbuilding',
    description: 'Design a landscape or character that thrives inside a high-contrast glowing forest. Blend organic roots with cybernetic lights.',
    deadline: '2026-07-20T23:59:59-07:00',
    prize: '$1,500 Creative Grant & Banner Placement',
    theme: 'Cyber-Botanicals',
    participants: 142,
    joined: false
  },
  {
    id: 'chal-2',
    title: 'Retro-Futuristic Cafe',
    description: 'Construct a warm, cozy interior layout with CRT screens, nostalgic consoles, and tiny retro elements. Pixel art and 3D submissions both welcome.',
    deadline: '2026-07-30T23:59:59-07:00',
    prize: 'Wacom Tablet + Custom ArtVerse Artist Spotlight Feature',
    theme: 'Cozy Nostalgia',
    participants: 94,
    joined: true
  }
];

export const ART_EVENTS: ArtEvent[] = [
  {
    id: 'event-1',
    title: 'Cybernetic Horizons: Virtual Art Exhibition',
    description: 'An interactive virtual reality art exhibition featuring the top twenty generative digital artists of 2026. Join via VR or standard web browser.',
    date: 'July 15, 2026',
    time: '18:00 UTC',
    location: 'ArtVerse VR Gallery Room 4',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    registeredCount: 320,
    isRegistered: false,
    type: 'Exhibition'
  },
  {
    id: 'event-2',
    title: 'Light & Atmosphere Painting Workshop',
    description: 'A live interactive masterclass with Sora Tanaka focusing on traditional layering, ambient occlusions, and dynamic contrast.',
    date: 'July 24, 2026',
    time: '14:00 UTC',
    location: 'Zoom Webinar Rooms & Discord Live Feed',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80',
    registeredCount: 185,
    isRegistered: true,
    type: 'Workshop'
  },
  {
    id: 'event-3',
    title: 'Creative Meetup: Digital Sculptors Roundtable',
    description: 'An informal chat with blender pros and metal physical artists regarding high-end fabrication workflows.',
    date: 'August 05, 2026',
    time: '20:00 UTC',
    location: 'ArtVerse NYC Lounge & online Discord room',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    registeredCount: 88,
    isRegistered: false,
    type: 'Meetup'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  { id: 'f-1', title: 'How do you handle color saturation fatigue on OLED screens?', author: 'Aria Chen', category: 'Digital Art', replies: 14, likes: 32, date: '2026-07-04' },
  { id: 'f-2', title: 'Best oil primers for smooth linen canvas coatings?', author: 'Kenji Sato', category: 'Painting Techniques', replies: 8, likes: 22, date: '2026-07-03' },
  { id: 'f-3', title: 'Is Octane render speed significantly faster than Cycles in Blender 4.2?', author: 'Devon Miller', category: '3D Modeling', replies: 19, likes: 45, date: '2026-07-01' }
];

export const INITIAL_USER: UserProfile = {
  name: 'Creative Soul',
  role: 'Amateur Illustrator & Tech Enthusiast',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  bio: 'Passionate about vector graphics, glowing lights, and futuristic synth tunes. Learning digital tools step by step!',
  followersCount: 154,
  followingCount: 84,
  artworks: [],
  savedArtworks: ['art-1', 'art-3'],
  likedArtworks: ['art-1'],
  notifications: [
    'Elena Rostova uploaded a new drawing tutorial!',
    'Your entry in Retro-Futuristic Cafe has been submitted successfully!',
    'Aria Chen commented on Neon Odyssey.'
  ],
  isLoggedIn: true
};
