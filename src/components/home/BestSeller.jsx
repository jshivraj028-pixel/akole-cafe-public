import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { fetchMenuItems } from '../../services/api';
import { menuItems as staticFallbackItems } from '../../data/menu';
import { FiArrowRight } from 'react-icons/fi';
import icedCaramelMacchiatoImg from '../../assets/iced-caramel-macchiato.png';

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
    image: icedCaramelMacchiatoImg,
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
    name: 'Artisanal Earl Grey Tea',
    category: 'teas',
    description: 'Aromatic bergamot infused black tea brewed to perfection with lemon.',
    price: 140,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  },
  {
    id: 'bs-4',
    name: 'Matcha Green Tea Latte',
    category: 'teas',
    description: 'Ceremonial grade Japanese green matcha whisked with warm oat milk.',
    price: 190,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  },
  {
    id: 'bs-5',
    name: 'Belgian Chocolate Croissant',
    category: 'bakery',
    description: 'Flaky butter croissant filled with melted rich Belgian dark chocolate.',
    price: 150,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    tag: 'FRESH BAKED',
    isBestseller: true
  },
  {
    id: 'bs-6',
    name: 'Artisanal Blueberry Cheesecake',
    category: 'bakery',
    description: 'Creamy New York cheesecake topped with fresh blueberry compote.',
    price: 220,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER',
    isBestseller: true
  },
  {
    id: 'bs-7',
    name: 'Paneer Tikka Grilled Sandwich',
    category: 'bites',
    description: 'Smoky grilled paneer tikka layered with mint chutney in sourdough.',
    price: 180,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tag: 'POPULAR',
    isBestseller: true
  },
  {
    id: 'bs-8',
    name: 'Akole Special Misal Pav',
    category: 'bites',
    description: 'Authentic spicy sprout curry served with butter toasted pav & farsan.',
    price: 140,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tag: 'LOCAL SPECIAL',
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
          // Merge API items with fallback items to guarantee category availability
          setAllProducts(prev => {
            const combined = [...items];
            staticBestsellers.forEach(staticItem => {
              if (!combined.some(i => i.name.toLowerCase() === staticItem.name.toLowerCase())) {
                combined.push(staticItem);
              }
            });
            return combined;
          });
        }
      } catch (err) {
        console.error('Failed to load menu items for bestsellers:', err);
      }
    };
    loadItems();
    return () => { isMounted = false; };
  }, []);

  const displayedItems = (() => {
    if (activeCategory === 'all') {
      return allProducts.slice(0, 8);
    }
    
    return allProducts.filter(item => {
      const cat = (item.category || '').toLowerCase();
      const name = (item.name || '').toLowerCase();

      if (activeCategory === 'coffee') {
        return cat.includes('coffee') || cat.includes('beverage') || name.includes('coffee') || name.includes('cappuccino') || name.includes('latte') || name.includes('espresso') || name.includes('macchiato') || name.includes('brew');
      }
      if (activeCategory === 'teas') {
        return cat.includes('tea') || cat.includes('chai') || name.includes('tea') || name.includes('chai') || name.includes('matcha');
      }
      if (activeCategory === 'bakery') {
        return cat.includes('bakery') || cat.includes('cake') || cat.includes('pastry') || cat.includes('dessert') || cat.includes('sweet') || name.includes('croissant') || name.includes('cake') || name.includes('brownie');
      }
      if (activeCategory === 'bites') {
        return cat.includes('bites') || cat.includes('snack') || cat.includes('starter') || cat.includes('fast') || cat.includes('south indian') || name.includes('sandwich') || name.includes('misal') || name.includes('dosa') || name.includes('pav') || name.includes('burger') || name.includes('pizza');
      }
      return cat.includes(activeCategory);
    });
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
