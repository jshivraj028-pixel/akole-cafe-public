import React, { useState, useMemo } from 'react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import MenuFilter from '../components/menu/MenuFilter';
import MenuGrid from '../components/menu/MenuGrid';
import { menuItems } from '../data/menu';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredAndSortedItems = useMemo(() => {
    let result = [...menuItems];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

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

          <MenuGrid items={filteredAndSortedItems} />
        </Container>
      </section>
    </div>
  );
};

export default Menu;
