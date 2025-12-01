
import { Product, Charity, ForumTopic, ChatMessage } from '../types';

export const CHARITIES: Charity[] = [
  {
    id: 'c1',
    name: 'Green Heart Foundation',
    mission: 'Supporting sustainable communities through textile recycling.',
    address: '123 Eco Lane, Brooklyn, NY 11211',
    description: 'Green Heart Foundation collects gently used clothing to support local shelters and recycling initiatives. We focus on reducing landfill waste by repurposing textiles.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop',
    accepts: ['Men\'s Clothes', 'Women\'s Clothes', 'Winter Coats']
  },
  {
    id: 'c2',
    name: 'Kids First Charity',
    mission: 'Providing clothing to children in need across the state.',
    address: '45 Hope Street, New York, NY 10001',
    description: 'We ensure every child has warm clothes for the winter and fresh outfits for school. Your donations go directly to families in underprivileged areas.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
    accepts: ['Kids Clothes', 'Shoes', 'School Supplies']
  },
  {
    id: 'c3',
    name: 'Textile Rebirth Co.',
    mission: 'Industrial recycling of damaged fabrics.',
    address: '88 Industrial Park, Queens, NY',
    description: 'Got torn or stained clothes? We take them! Our facility shreds and re-spins fibers to create new insulation materials and fabrics.',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop',
    accepts: ['Damaged Clothes', 'Scraps', 'Old Linens']
  }
];

export const DEFAULT_SELLER = {
  id: 'u1',
  name: 'Sarah Jenkins',
  rating: 4.8,
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah'
};

export const MOCK_PRODUCTS: Product[] = [
  // Recent / Mixed
  { 
    id: '1', 
    title: 'Vintage Floral Dress', 
    brand: 'Reformation', 
    rentPrice: 45, 
    buyPrice: 180, 
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop'
    ],
    type: 'rent-buy', 
    category: 'Dresses', 
    location: 'Brooklyn, NY',
    description: 'Beautiful vintage floral dress, perfect for summer weddings. Worn twice, excellent condition. Silk blend material.',
    condition: 'Like New',
    size: 'S',
    seller: DEFAULT_SELLER
  },
  { 
    id: '2', 
    title: 'Oversized Denim Jacket', 
    brand: 'Levi\'s', 
    rentPrice: 20, 
    buyPrice: 85, 
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop', 
    gallery: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop'
    ],
    type: 'rent-buy', 
    category: 'Outerwear', 
    location: 'SoHo, NY',
    description: 'Classic oversized denim jacket. Great for layering. Has a slight vintage fade that looks amazing.',
    condition: 'Good',
    size: 'M',
    seller: { ...DEFAULT_SELLER, name: 'Mike Chen', id: 'u2', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mike' }
  },
  // Updated Silk Scarf Image
  { 
    id: '3', 
    title: 'Silk Scarf', 
    brand: 'Hermes', 
    rentPrice: 30, 
    buyPrice: 200, 
    imageUrl: 'https://images.unsplash.com/photo-1582142327305-180b7e283296?q=80&w=600&auto=format&fit=crop', 
    type: 'rent-buy', 
    category: 'Accessories', 
    seller: DEFAULT_SELLER, 
    location: 'Manhattan' 
  },

  // Rent/Buy - Updated Linen Suit Image
  { 
    id: '4', 
    title: 'Summer Linen Suit', 
    brand: 'Zara', 
    rentPrice: 50, 
    buyPrice: 150, 
    imageUrl: 'https://images.unsplash.com/photo-1593030761757-71bd90dbe780?q=80&w=600&auto=format&fit=crop', 
    type: 'rent-buy', 
    category: 'Suits', 
    location: 'Downtown',
    seller: DEFAULT_SELLER,
    description: 'Light beige linen suit. Breathable and stylish.'
  },
  { 
    id: '5', 
    title: 'Evening Gown', 
    brand: 'Gucci', 
    rentPrice: 150, 
    buyPrice: 0, // RENT ONLY
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop', 
    type: 'rent', 
    category: 'Dresses', 
    location: 'Upper East Side', 
    seller: DEFAULT_SELLER,
    description: 'Stunning evening gown, Rent only. Perfect for galas.' 
  },
  { 
    id: '6', 
    title: 'Leather Boots', 
    brand: 'Dr. Martens', 
    rentPrice: 0, // BUY ONLY
    buyPrice: 140, 
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b69f?q=80&w=600&auto=format&fit=crop', 
    type: 'buy', 
    category: 'Shoes', 
    location: 'West Village', 
    seller: DEFAULT_SELLER,
    description: 'Barely used Dr. Martens. Buying only.' 
  },
  { id: '7', title: 'Wool Trench Coat', brand: 'Burberry', rentPrice: 100, buyPrice: 800, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', type: 'rent-buy', category: 'Outerwear', location: 'Chelsea', seller: DEFAULT_SELLER },
  { id: '8', title: 'Designer Bag', brand: 'Prada', rentPrice: 80, buyPrice: 0, imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', type: 'rent', category: 'Bags', location: 'SoHo', seller: DEFAULT_SELLER },
  
  // Donations
  { id: '9', title: 'Green Heart Donation', brand: 'Green Heart', rentPrice: 0, buyPrice: 0, imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop', type: 'donation', category: 'Charity', charityId: 'c1' },
  { id: '10', title: 'Kids First Drive', brand: 'Kids First', rentPrice: 0, buyPrice: 0, imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop', type: 'donation', category: 'Charity', charityId: 'c2' },
  { id: '11', title: 'Textile Recycling', brand: 'Rebirth Co.', rentPrice: 0, buyPrice: 0, imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop', type: 'donation', category: 'Charity', charityId: 'c3' },
];

export const FORUM_THREADS: ForumTopic[] = [
  { 
    id: '1', 
    title: 'How to organize your wardrobe', 
    author: 'Lina George', 
    authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lina',
    content: 'I have been struggling to keep my clothes organized. Does anyone have a good system for sorting seasonal items versus daily wear? I have a small apartment closet.',
    replies: 584, 
    date: '11/12/2025', 
    color: '#7B4B33' 
  },
  { id: '2', title: 'How to repair small tears', author: 'Kate Ju', replies: 383, date: '09/12/2025', color: '#C8B293' },
  { id: '3', title: 'How to remove stains', author: 'Beitel Jenny', replies: 233, date: '25/11/2025', color: '#D1C5A9' },
  { id: '4', title: 'How to upgrade old jeans', author: 'Bo Juwan', replies: 661, date: '09/12/2025', color: '#E3ECE6' },
  { id: '5', title: 'How to make old clothes look new', author: 'John Look', replies: 122, date: '20/11/2025', color: '#F2C493' },
  { id: '6', title: 'How to properly store your cloth', author: 'Luke Frank', replies: 105, date: '20/11/2025', color: '#6A92A5' },
];

export const MOCK_CHATS = [
    { userId: 'u1', userName: 'Sarah Jenkins', lastMessage: 'Is the dress still available?', time: '2m ago', avatar: DEFAULT_SELLER.avatar },
    { userId: 'u2', userName: 'Mike Chen', lastMessage: 'Thanks for the jacket!', time: '1d ago', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mike' }
];

export const CHAT_HISTORY: Record<string, ChatMessage[]> = {
    'u1': [
        { id: 'm1', senderId: 'me', text: 'Hi Sarah, I love the floral dress!', timestamp: '10:30 AM', isMe: true },
        { id: 'm2', senderId: 'u1', text: 'Thanks! It is really comfy.', timestamp: '10:32 AM', isMe: false },
        { id: 'm3', senderId: 'me', text: 'Is it available for next weekend?', timestamp: '10:33 AM', isMe: true },
        { id: 'm4', senderId: 'u1', text: 'Yes, it is currently unbooked.', timestamp: '10:35 AM', isMe: false },
    ]
};
