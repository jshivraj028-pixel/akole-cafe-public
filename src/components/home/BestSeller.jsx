import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { fetchMenuItems } from '../../services/api';
import { menuItems as staticFallbackItems } from '../../data/menu';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
  { id: 'all', name: 'All Selections' },
  { id: 'coffee', name: 'Speciality Coffee' },
  { id: 'teas', name: 'Artisanal Teas' },
  { id: 'bakery', name: 'Gourmet Bakery' },
  { id: 'bites', name: 'Quick Bites' },
];

const staticBestsellers = [
  {
    id: 'bs-1',
    name: 'Iced Caramel Macchiato',
    category: 'coffee',
    description: 'Rich espresso layered with vanilla, cold milk & caramel drizzle.',
    price: 180,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  },
  {
    id: 'bs-2',
    name: 'Signature Cappuccino',
    category: 'coffee',
    description: 'Single-origin espresso topped with thick velvety microfoam & chocolate dust.',
    price: 160,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  },
  {
    id: 'bs-3',
    name: 'Classic Hot Chocolate',
    category: 'teas',
    description: 'Rich cocoa melted with steamed milk & dark chocolate shavings.',
    price: 170,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  },
  {
    id: 'bs-4',
    name: 'Caramel Cold Brew',
    category: 'coffee',
    description: 'Slow-steeped cold brew infused with salted caramel & cream.',
    price: 190,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  }
];

const BestSeller = ({ onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [allProducts, setAllProducts] = useState(staticBestsellers);

  useEffect(() => {
    let isMounted = true;
    const loadItems = async () => {
      try {
        const items = await fetchMenuItems('all');
        if (isMounted && Array.isArray(items) && items.length > 0) {
          setAllProducts(items);
        }
      } catch (err) {
        console.error('Failed to load menu items for bestsellers:', err);
      }
    };
    loadItems();
    return () => { isMounted = false; };
  }, []);

  const displayedItems = (() => {
    let list = allProducts.filter(item => item.isBestseller || item.tag === 'BESTSELLER');
    if (list.length === 0) list = allProducts;
    if (activeCategory !== 'all') {
      const catFiltered = list.filter(item => item.category === activeCategory);
      return catFiltered.length > 0 ? catFiltered : list.slice(0, 4);
    }
    return list.slice(0, 4);
  })();

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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item, idx) => (
            <motion.div
              key={item._id || item.id}
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
