import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { fetchMenuItems } from '../../services/api';
import { menuItems as staticFallbackItems } from '../../data/menu';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  }
];

const BestSeller = ({ onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [allProducts, setAllProducts] = useState(staticBestsellers);

  const scrollContainerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadItems = async () => {
      try {
        const fetched = await fetchMenuItems();
        if (isMounted && fetched && fetched.length > 0) {
          const apiBestsellers = fetched.filter(item => item.isBestseller || item.tag === 'BESTSELLER');
          if (apiBestsellers.length > 0) {
            setAllProducts(apiBestsellers);
          } else {
            setAllProducts(fetched.slice(0, 8));
          }
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
    <section className="py-20 sm:py-24 bg-[#F5F2EA] dark:bg-[#0F1712] text-primary dark:text-[#EAE3D2] relative overflow-hidden transition-colors duration-300">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] dark:text-[#D6AE4D] font-sans block">
            OUR SELECTIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2F4436] dark:text-white">
            Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D50] dark:text-[#A0B0A5] font-light max-w-lg mx-auto">
            Handcrafted coffee, artisanal teas, and gourmet treats made with love.
          </p>

          {/* Responsive Category Tabs with Mouse Drag + Arrow Controls */}
          <div className="relative flex items-center justify-center max-w-4xl mx-auto w-full pt-4">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              style={{ borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px' }}
              className="hidden sm:flex bg-[#122219]/80 dark:bg-[#0E1A13]/85 hover:bg-[#123524]/95 dark:hover:bg-[#182C20]/95 backdrop-blur-2xl border-2 border-[#D6AE4D] hover:border-[#FFF3C4] text-[#D6AE4D] hover:text-[#F3E5AB] shadow-xl hover:shadow-[0_0_20px_rgba(214,174,77,0.4)] items-center justify-center shrink-0 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer z-10 p-0 mr-2 group"
              aria-label="Scroll left"
              title="Scroll Left"
            >
              <FiChevronLeft className="w-4.5 h-4.5 stroke-[3] group-hover:-translate-x-0.5 transition-transform text-[#D6AE4D] group-hover:text-[#F3E5AB]" />
            </button>

            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-2.5 px-1 w-full max-w-4xl mx-auto select-none cursor-grab active:cursor-grabbing"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-300 shrink-0 whitespace-nowrap backdrop-blur-md cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#2F4436] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] shadow-md border border-[#D6AE4D] scale-105'
                      : 'bg-white/80 dark:bg-[#16231B]/80 text-[#4A5D50] dark:text-[#A0B0A5] hover:bg-white dark:hover:bg-[#16231B] border border-[#C8A96A]/20 dark:border-[#D6AE4D]/25 hover:shadow-[0_0_15px_rgba(214,174,77,0.3)]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              style={{ borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px' }}
              className="hidden sm:flex bg-[#122219]/80 dark:bg-[#0E1A13]/85 hover:bg-[#123524]/95 dark:hover:bg-[#182C20]/95 backdrop-blur-2xl border-2 border-[#D6AE4D] hover:border-[#FFF3C4] text-[#D6AE4D] hover:text-[#F3E5AB] shadow-xl hover:shadow-[0_0_20px_rgba(214,174,77,0.4)] items-center justify-center shrink-0 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer z-10 p-0 ml-2 group"
              aria-label="Scroll right"
              title="Scroll Right"
            >
              <FiChevronRight className="w-4.5 h-4.5 stroke-[3] group-hover:translate-x-0.5 transition-transform text-[#D6AE4D] group-hover:text-[#F3E5AB]" />
            </button>
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
