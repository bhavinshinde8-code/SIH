import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import readline from 'readline';
import Admin from '../models/Admin.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdminInteractively = async () => {
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!\n');

    console.log('🔐 Interactive Admin Setup (No secrets in code files)');
    const name = await askQuestion('Enter Admin Name: ');
    const email = await askQuestion('Enter Admin Email: ');
    const password = await askQuestion('Enter Admin Password: ');

    if (!email || !password) {
      console.log('❌ Email and password cannot be empty.');
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existingAdmin) {
      console.log(`⚠️ Admin with email "${email}" already exists in MongoDB.`);
    } else {
      await Admin.create({
        name: name || 'Municipal Admin',
        email: email.toLowerCase().trim(),
        password: password,
      });
      console.log(`\n✨ Admin "${email}" created & encrypted into MongoDB successfully!`);
    }

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    rl.close();
    process.exit(1);
  }
};

createAdminInteractively();
