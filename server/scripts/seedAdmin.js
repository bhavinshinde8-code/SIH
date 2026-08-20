import dns from 'dns';
// Force Google DNS servers to resolve MongoDB Atlas SRV properly on all networks
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Place from '../models/Place.js';

dotenv.config();

const initialAdmins = [
  {
    name: 'Bhavin Shinde (Admin 1)',
    email: 'admin1@tourism.in',
    password: 'Admin@Secure2026',
    department: 'Nashik Municipal Tourism Office',
  },
  {
    name: 'Deepak Tambe (Admin 2)',
    email: 'admin2@tourism.in',
    password: 'Admin@Secure2026',
    department: 'Nashik Municipal Tourism Office',
  }
];

const initialPlaces = [
  {
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

const seedDatabase = async () => {
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');

    // Check & Seed Admins
    console.log('🛡️ Seeding 2 Authorized Admins into MongoDB...');
    for (const adminData of initialAdmins) {
      const exists = await Admin.findOne({ email: adminData.email });
      if (!exists) {
        await Admin.create(adminData);
        console.log(`   ✨ Created Admin in MongoDB: ${adminData.name} (${adminData.email})`);
      } else {
        console.log(`   ℹ️ Admin already in MongoDB: ${adminData.email}`);
      }
    }

    // Check & Seed Places
    console.log('🏛️ Seeding Historical Tourism Places into MongoDB...');
    const placeCount = await Place.countDocuments();
    if (placeCount === 0) {
      await Place.insertMany(initialPlaces);
      console.log(`   ✨ Inserted ${initialPlaces.length} historical places into MongoDB!`);
    } else {
      console.log(`   ℹ️ Places collection already contains ${placeCount} places in MongoDB.`);
    }

    console.log('\n🎉 Real database setup & seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
