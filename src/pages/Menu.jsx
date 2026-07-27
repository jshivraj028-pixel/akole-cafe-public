import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import MenuFilter from '../components/menu/MenuFilter';
import MenuGrid from '../components/menu/MenuGrid';
import { fetchMenuItems } from '../services/api';
import { menuItems as staticFallbackItems } from '../data/menu';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [vegFilter, setVegFilter] = useState('all');
  const [items, setItems] = useState(staticFallbackItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async (isSilent = false) => {
      if (!isSilent && items.length === 0) setLoading(true);
      try {
        const data = await fetchMenuItems('all', '');
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.warn('Using static fallback menu dataset:', err);
        if (isMounted) setItems(staticFallbackItems);
      } finally {
        if (isMounted && !isSilent) setLoading(false);
      }
    };

    loadProducts(false);
    const interval = setInterval(() => {
      loadProducts(true);
    }, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // 1. Category Filter
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // 2. Instant Search Filter (name, description, category, tags)
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        const nameMatch = item.name && item.name.toLowerCase().includes(q);
        const descMatch = item.description && item.description.toLowerCase().includes(q);
        const catMatch = item.category && item.category.toLowerCase().includes(q);
        const tagMatch = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q));
        const priceMatch = String(item.price).includes(q);
        return nameMatch || descMatch || catMatch || tagMatch || priceMatch;
      });
    }

    // 3. Pure Veg / Non-Veg Filter
    if (vegFilter === 'veg') {
      result = result.filter(item => item.isVeg === true || item.isVeg === undefined);
    } else if (vegFilter === 'nonveg') {
      result = result.filter(item => item.isVeg === false);
    }

    // 4. Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, activeCategory, searchQuery, vegFilter, sortBy]);

  return (
    <div className="bg-[#F5F2EA] dark:bg-[#121A15] min-h-screen">
      {/* Dark Coffee Header Banner */}
      <PageBanner
        title="Artisanal Digital Menu"
        bgImage="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-12 bg-[#F5F2EA] dark:bg-[#121A15] relative">
        <Container>
          <MenuFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            vegFilter={vegFilter}
            setVegFilter={setVegFilter}
          />

          {loading ? (
            <div className="py-20 text-center text-[#123524] dark:text-[#D6AE4D] font-serif text-lg animate-pulse">
              Loading fresh artisanal delicacies...
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
