import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import { menuItems } from '../src/data/menu.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding process...');

    // Clear existing products and re-seed with full fields
    await Product.deleteMany({});
    console.log('🧹 Existing products cleared.');

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

    // Clear test dummy users & recreate only main Admin Account
    await User.deleteMany({});
    const adminEmail = 'akolecafe@gmail.com';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Akolecafe2007', salt);

    await User.create({
      name: 'Akole Cafe Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    console.log(`✅ Main Admin Account Ready: ${adminEmail} / Akolecafe2007`);

    // Clear test dummy orders
    await Order.deleteMany({});
    console.log('🧹 All test orders cleared from database.');

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
