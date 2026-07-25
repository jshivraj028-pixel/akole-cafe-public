import React, { useState, useEffect, useMemo } from 'react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import MenuFilter from '../components/menu/MenuFilter';
import MenuGrid from '../components/menu/MenuGrid';
import { fetchMenuItems } from '../services/api';
import { menuItems as staticFallbackItems } from '../data/menu';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [items, setItems] = useState(staticFallbackItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      try {
        const data = await fetchMenuItems(activeCategory, searchQuery);
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.error('Failed to load menu products:', err);
      } finally {
        if (isMounted && !isSilent) setLoading(false);
      }
    };

    loadProducts(false);
    const interval = setInterval(() => {
      loadProducts(true);
    }, 6000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeCategory, searchQuery]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, sortBy]);

  return (
    <div className="bg-[#F5F2EA] min-h-screen">
      {/* Dark Coffee Header Banner */}
      <PageBanner
        title="Our Menu"
        bgImage="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-12 bg-[#F5F2EA] relative">
        <Container>
          <MenuFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {loading ? (
            <div className="py-20 text-center text-primary/60 font-serif text-lg animate-pulse">
              Fetching fresh artisanal menu items from MongoDB...
            </div>
          ) : (
            <MenuGrid items={filteredAndSortedItems} />
          )}
        </Container>
      </section>
    </div>
  );
};

export default Menu;
