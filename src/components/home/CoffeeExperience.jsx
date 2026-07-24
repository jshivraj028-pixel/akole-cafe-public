import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiSun, FiHeart, FiFeather } from 'react-icons/fi';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

const experiences = [
  {
    icon: FiAward,
    title: "100% Shade-Grown Beans",
    description: "Sourced directly from high-altitude plantations in Chikmagalur, roasted in small batches for pristine flavor balance."
  },
  {
    icon: FiSun,
    title: "Artisanal Woodfired Cuisine",
    description: "Sourdough pizzas and craft burgers prepared fresh daily using 48-hour fermented dough and organic local ingredients."
  },
  {
    icon: FiHeart,
    title: "Warm Heritage Hospitality",
    description: "A welcoming atmosphere designed for families, couples, and friends to create long-lasting memories in Akole."
  },
  {
    icon: FiFeather,
    title: "Botanical Luxury Interiors",
    description: "Elegantly curated spaces with natural emerald tones, warm brass accents, and serene indoor flora."
  }
];

const CoffeeExperience = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <Container>
        <SectionTitle
          subtitle="The Akole Standard"
          title="Crafted for Coffee Connoisseurs & Gourmets"
          description="Every visit to Akole Cafe is a sensory journey where tradition meets contemporary culinary mastery."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-accent-gold/20 shadow-luxury hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary text-accent-gold flex items-center justify-center mb-6 group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-300 shadow-gold">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-3 group-hover:text-accent-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-dark-lighter leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CoffeeExperience;
