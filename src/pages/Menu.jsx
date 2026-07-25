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
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchMenuItems(activeCategory, searchQuery);
        if (isMounted) {
          setItems(data && data.length > 0 ? data : staticFallbackItems);
        }
      } catch (err) {
        console.error('Failed to load menu products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();
    return () => { isMounted = false; };
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
    <>
      <PageBanner
        title="Artisanal Culinary & Brews"
        subtitle="Handcrafted Arabica Roasts • Sourdough Pizzas • Decadent Desserts"
        bgImage="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-secondary relative">
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
    </>
  );
};

export default Menu;
