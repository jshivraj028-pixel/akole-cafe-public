import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Event from './models/Event.js';
import Blog from './models/Blog.js';
import { menuItems } from '../src/data/menu.js';
import { eventsData } from '../src/data/events.js';
import { blogPosts } from '../src/data/blogs.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB is not connected (IP not whitelisted or MongoDB service offline).');
      console.log('💡 All app features, teammates, products & orders will run seamlessly via the embedded dataset & localStorage!');
      process.exit(0);
    }

    console.log('🌱 Starting database seeding process into MongoDB Atlas...');

    // 1. Seed Products with full fields (including isVeg, spicyLevel, isChefSpecial)
    await Product.deleteMany({});
    const formattedProducts = menuItems.map(item => ({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      rating: item.rating || 4.8,
      isVeg: item.isVeg !== undefined ? item.isVeg : true,
      spicyLevel: item.spicyLevel !== undefined ? item.spicyLevel : 0,
      isBestseller: Boolean(item.isBestseller),
      isChefSpecial: Boolean(item.isChefSpecial),
      image: item.image,
      tags: item.tags || [],
      isActive: true,
      prepTime: item.prepTime || '10 mins',
      calories: item.calories || '200 kcal'
    }));
    await Product.insertMany(formattedProducts);
    console.log(`✅ Successfully seeded ${formattedProducts.length} menu items into MongoDB!`);

    // 2. Seed Main Admin Account
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Akolecafe2007', salt);

    const initialUsers = [
      { name: 'Akole Cafe Admin', email: 'akolecafe@gmail.com', password: hashedPassword, role: 'admin', phone: '+91 98765 43210' }
    ];
    await User.insertMany(initialUsers);
    console.log(`✅ Main Admin Account Ready: akolecafe@gmail.com / Akolecafe2007`);

    // 3. Seed Events
    await Event.deleteMany({});
    await Event.insertMany(eventsData.map(e => ({
      title: e.title,
      category: e.category,
      date: e.date,
      time: e.time,
      location: e.location,
      price: e.price,
      image: e.image,
      description: e.description,
      features: e.features || []
    })));
    console.log(`✅ Seeded ${eventsData.length} cafe events into MongoDB!`);

    // 4. Seed Blogs
    await Blog.deleteMany({});
    await Blog.insertMany(blogPosts.map(b => ({
      title: b.title,
      slug: b.slug,
      category: b.category,
      date: b.date,
      author: b.author,
      authorRole: b.authorRole,
      readTime: b.readTime,
      image: b.image,
      summary: b.summary,
      content: b.content
    })));
    console.log(`✅ Seeded ${blogPosts.length} blog posts into MongoDB!`);

    // 5. Clear Orders
    await Order.deleteMany({});
    console.log('✅ Cleared old orders database.');

    console.log('🎉 ALL DATA SEEDED SUCCESSFULLY INTO MONGODB CLOUD DATABASE!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
