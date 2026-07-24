import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import ProductCard from './ProductCard';

const categories = [
  { id: 'coffee', name: 'Speciality Coffee' },
  { id: 'teas', name: 'Artisanal Teas' },
  { id: 'bakery', name: 'Gourmet Bakery' },
  { id: 'bites', name: 'Quick Bites' },
];

const bestsellersData = [
  {
    id: 'bs-1',
    name: 'Iced Caramel Macchiato',
    description: 'Rich espresso layered with vanilla, cold milk & caramel drizzle.',
    price: 180,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER'
  },
  {
    id: 'bs-2',
    name: 'Signature Cappuccino',
    description: 'Single-origin espresso topped with thick velvety microfoam & chocolate dust.',
    price: 160,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER'
  },
  {
    id: 'bs-3',
    name: 'Classic Hot Chocolate',
    description: 'Rich cocoa melted with steamed milk & dark chocolate shavings.',
    price: 170,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER'
  },
  {
    id: 'bs-4',
    name: 'Caramel Cold Brew',
    description: 'Slow-steeped cold brew infused with salted caramel & cream.',
    price: 190,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER'
  }
];

const BestSeller = ({ onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('coffee');

  return (
    <section className="py-20 sm:py-24 bg-[#F5F2EA] text-primary relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] font-sans block">
            OUR SELECTIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2F4436]">
            Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D50] font-light max-w-lg mx-auto">
            Handcrafted coffee, artisanal teas, and gourmet treats made with love.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#2F4436] text-white shadow-md'
                    : 'bg-white/80 text-[#4A5D50] hover:bg-white hover:text-primary border border-[#C8A96A]/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellersData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={item} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BestSeller;
