// Curated high-res reliable landmarks images of India
export const heroSlides = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=85',
    title: 'India Gate',
    location: 'New Delhi, India',
    tag: 'National Memorial'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=85',
    title: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    tag: 'Wonder of the World'
  },
  {
    type: 'image',
    url: 'https://i.pinimg.com/736x/52/85/9b/52859b4f3dc06bbfeb6183951cd8bfab.jpg',
    title: 'Raigad Fort (Raygad)',
    location: 'Capital of Maratha Empire, Maharashtra',
    tag: 'Chhatrapati Shivaji Maharaj Capital'
  },
  {
    type: 'image',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrOUoexMHwYG_eIBof8ajJH2y9P6Io460q8_WczQah3g&s=10',
    title: 'Harihar Fort',
    location: '80° Vertical Rock Steps, Nashik, Maharashtra',
    tag: 'Sahyadri Thrill Trek'
  },
  {
    type: 'image',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsIIxJc-GaA0zwVgCuXW8pJZk7p4b8TMrRjBpmSvgq3g&s=10',
    title: 'Saptashrungi Devi Gad',
    location: 'Vani, Nashik, Maharashtra',
    tag: '51 Sacred Shakti Peethas'
  },

];

export const categories = [
  { id: 'all', label: 'All Experiences', icon: 'Sparkles' },
  { id: 'ancient', label: 'Ancient & Spiritual', icon: 'Landmark' },
  { id: 'wildlife', label: 'Wildlife & Nature', icon: 'Trees' },
  { id: 'heritage', label: 'Heritage & Culture', icon: 'Castle' },
  { id: 'trek', label: 'Trek & Adventure', icon: 'Mountain' },
];

export const nashikPlaces = [
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar Shiva Temple',
    category: 'ancient',
    tag: 'Jyotirlinga & Ancient Architecture',
    rating: 4.9,
    reviews: 1240,
    location: 'Trimbak, Nashik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVPM0TI9q-WGsejNuAsHYX4djfx4FnRPhgtRdJ2L4QQ&s=10',
    description: 'One of the twelve sacred Jyotirlingas, nestled at the foothills of Brahmagiri mountain, famous for origin of River Godavari and black stone architecture built by Peshwa Balaji Baji Rao.',
    bestTime: 'Oct - Mar',
    host: 'Nashik Heritage Guides',
    highlights: ['12 Jyotirlingas', 'Brahmagiri Hill Origin', 'Kushavarta Kund', 'Hemadpanthi Architecture']
  },
  {
    id: 'saptashrungi',
    name: 'Saptashrungi Devi Gad (Vani)',
    category: 'ancient',
    tag: 'Holy Shakti Peetha & 7 Hills',
    rating: 4.9,
    reviews: 1820,
    location: 'Nanduri, Vani, Nashik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsIIxJc-GaA0zwVgCuXW8pJZk7p4b8TMrRjBpmSvgq3g&s=10',
    description: 'A revered Shakti Peetha surrounded by seven mountain peaks (Saptashringa). Home to the 10-foot tall idol of Goddess Saptashrungi Nivasini with 18 arms holding divine weapons.',
    bestTime: 'Sept - April',
    host: 'Saptashrungi Shrine Board',
    highlights: ['51 Shakti Peethas', 'Funicular Trolley Ride', '7 Mountain Pinnacles', 'Chaitra Navratri Festival']
  },
  {
    id: 'harihar',
    name: 'Harihar Fort (Harishgad)',
    category: 'trek',
    tag: 'Iconic 80° Vertical Rock-cut Stairs',
    rating: 4.9,
    reviews: 2100,
    location: 'Harshewadi, Nashik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrOUoexMHwYG_eIBof8ajJH2y9P6Io460q8_WczQah3g&s=10',
    description: 'Renowned worldwide for its thrilling nearly 80-degree vertical stone-cut stairs carved directly into the prism rock face, offering panoramic views of the Sahyadris.',
    bestTime: 'Oct - Feb',
    host: 'Sahyadri Trekkers Club',
    highlights: ['Vertical Rock Steps', '360° Sahyadri Vista', 'Storage Cisterns', 'Historical Bastions']
  },
  {
    id: 'pandavleni',
    name: 'Pandavleni Caves (Trirashmi)',
    category: 'heritage',
    tag: '2nd Century BCE Rock-cut Caves',
    rating: 4.7,
    reviews: 890,
    location: 'Trirashmi Hills, Nashik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuKJqsW8QF4pUXPvEEdXKNWK05GSXUR5Qrq1ZY8sXe_Q&s=10',
    description: 'A group of 24 rock-cut caves carved between the 2nd century BCE and 5th century CE, depicting Hinayana Buddhist architecture, intricate viharas, and inscriptions.',
    bestTime: 'July - Feb',
    host: 'Sahyadri History Guild',
    highlights: ['Ancient Water Cisterns', 'Panoramic City View', 'Intricate Carvings', 'Buddhist Stupas']
  },
  {
    id: 'anjeneri',
    name: 'Anjaneri Fort & Hills',
    category: 'trek',
    tag: 'Birthplace of Lord Hanuman & Trek',
    rating: 4.8,
    reviews: 950,
    location: 'Trimbak Road, Nashik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHI57Cle2igx_xpZvVekmKPG1YQWRIh6jRbsCeiwo1Nw&s=10',
    description: 'Believed to be the holy birthplace of Lord Hanuman. A scenic trek through Sahyadri ranges with breathtaking cliff views, Jain temples, and reverse waterfall phenomenon in monsoons.',
    bestTime: 'June - Jan',
    host: 'Adventure Nashik Hosts',
    highlights: ['Hanuman Temple at Summit', 'Scenic Sahyadri Trek', 'Monsoon Waterfalls', 'Jain Cave Temples']
  },
  {
    id: 'panchavati',
    name: 'Panchavati & Sita Gufa',
    category: 'ancient',
    tag: 'Ramayana Era Sacred Heritage',
    rating: 4.8,
    reviews: 1530,
    location: 'Godavari Riverbank, Nashik',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3BHPcI0cUDEThi8zJMwkzO5qZS3Z2fePtJeTAZODkw&s=10',
    description: 'The legendary place where Lord Rama, Sita, and Lakshmana stayed during their exile. Includes the sacred 5 Banyan trees, Kalaram Temple, and holy Ramkund ghat.',
    bestTime: 'Year-round',
    host: 'Panchavati Pilgrim Trust',
    highlights: ['5 Sacred Banyan Trees', 'Kalaram Temple', 'Ramkund Ghat', 'Sita Gumpha']
  },
  {
    id: 'gangapur-wildlife',
    name: 'Gangapur Backwaters & Grasslands',
    category: 'wildlife',
    tag: 'Migratory Birds & Nature Haven',
    rating: 4.6,
    reviews: 620,
    location: 'Gangapur Dam, Nashik',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    description: 'Expansive serene waters and grasslands attracting flamingos, painted storks, kingfishers, and diverse flora. Perfect for tranquil sunsets and bird watching expeditions.',
    bestTime: 'Nov - Mar',
    host: 'Nashik Eco Tourism',
    highlights: ['Bird Watching', 'Sunset Viewpoint', 'Water Sports Complex', 'Vineyard Landscapes']
  }
];

export const features = [
  {
    title: 'Data From Resprctive Munciple Office',
    desc: 'Get authentic local insights, hidden gems, and tailored historical narratives directly from registered hosts.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Smart Destination Search',
    desc: 'Search ancient temples, thrilling treks, heritage caves, and wildlife spots with filters and real-time timings.',
    icon: 'Compass'
  },
  {
    title: 'Seamless Travel Planning',
    desc: 'Explore entry fees, best seasons, parking info, and guide contact details in one unified portal.',
    icon: 'Map'
  }
];

// 2 Pre-authorized Admin accounts (No registration needed / public signup disabled)
export const authorizedAdmins = [
  {
    id: 'admin-1',
    name: 'Municipal Admin 1',
    email: 'admin1@tourism.in',
    password: 'admin@password123',
    role: 'admin'
  },
  {
    id: 'admin-2',
    name: 'Municipal Admin 2',
    email: 'admin2@tourism.in',
    password: 'admin@password123',
    role: 'admin'
  }
];

