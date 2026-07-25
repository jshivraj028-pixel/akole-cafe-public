import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { fetchMenuItems } from '../../services/api';
import { menuItems as staticFallbackItems } from '../../data/menu';
import { FiArrowRight } from 'react-icons/fi';

const BestSeller = ({ onQuickView }) => {
  const [bestsellers, setBestsellers] = useState(() => 
    staticFallbackItems.filter(item => item.isBestseller).slice(0, 6)
  );

  useEffect(() => {
    let isMounted = true;
    const loadBestsellers = async () => {
      try {
        const items = await fetchMenuItems('all');
        if (isMounted && items && items.length > 0) {
          const filtered = items.filter(item => item.isBestseller).slice(0, 6);
          if (filtered.length > 0) setBestsellers(filtered);
        }
      } catch (err) {
        console.error('Failed to load bestsellers:', err);
      }
    };
    loadBestsellers();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-24 bg-primary text-secondary relative overflow-hidden">
      {/* Glow Effects */}
      <div className="botanical-glow top-0 left-1/4 opacity-30" />
      <div className="botanical-glow bottom-0 right-1/4 opacity-30" />

      <Container>
        <SectionTitle
          subtitle="Guest Favorites"
          title="Signature Bestsellers"
          description="Hand-picked culinary highlights praised by our patrons across Maharashtra."
          align="center"
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((item, idx) => (
            <motion.div
              key={item._id || item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <ProductCard product={item} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/menu" variant="gold" size="lg" icon={FiArrowRight}>
            View Full Artisanal Menu
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default BestSeller;
