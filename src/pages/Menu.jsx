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
    // 0. Deduplicate items strictly by name so no duplicate cards ever appear
    const seenNames = new Set();
    const uniqueItems = items.filter(item => {
      if (!item || !item.name) return false;
      const key = item.name.toLowerCase().trim();
      if (seenNames.has(key)) return false;
      seenNames.add(key);
      return true;
    });

    let result = [...uniqueItems];

    // 1. Instant Search Filter across all fields
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const terms = q.split(/\s+/).filter(Boolean);

      result = result.filter(item => {
        const name = (item.name || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        const tags = Array.isArray(item.tags) 
          ? item.tags.join(' ').toLowerCase() 
          : String(item.tags || '').toLowerCase();

        const fullText = `${name} ${desc} ${cat} ${tags}`;
        return terms.every(term => fullText.includes(term));
      });
    } else {
      // 2. Category Filter
      if (activeCategory && activeCategory !== 'all') {
        result = result.filter(item => {
          const itemCat = (item.category || '').toLowerCase().trim();
          const targetCat = activeCategory.toLowerCase().trim();

          if (itemCat === targetCat) return true;

          // Alias fallbacks for category IDs
          if (targetCat === 'thali' && (itemCat === 'thali' || itemCat === 'thalis')) return true;
          if (targetCat === 'pizzas' && (itemCat === 'pizza' || itemCat === 'pizzas')) return true;
          if (targetCat === 'chinese' && (itemCat === 'chinese' || itemCat === 'indo-chinese')) return true;
          if (targetCat === 'fast-food' && (itemCat === 'fast-food' || itemCat === 'burgers')) return true;

          return false;
        });
      }
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
    <div className="min-h-screen bg-gradient-to-b from-[#F2F6ED] via-[#EDF3E7] to-[#E6EFE0]" style={{ color: '#1E2621' }}>
      {/* Header Banner */}
      <PageBanner
        title="Artisanal Digital Menu"
        subtitle="Explore Handmade Delicacies, Cold Beverages & Royal Sweets"
        bgImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-12 relative overflow-hidden">
        {/* Ambient Light Orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D5E4CE]/50 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
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
            <div className="py-20 text-center font-bold text-lg animate-pulse" style={{ color: '#1E2621' }}>
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
