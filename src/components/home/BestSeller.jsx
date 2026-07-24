import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import { menuItems } from '../../data/menu';
import { FiArrowRight } from 'react-icons/fi';

const BestSeller = ({ onQuickView }) => {
  const bestsellers = menuItems.filter(item => item.isBestseller).slice(0, 6);

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
              key={item.id}
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
