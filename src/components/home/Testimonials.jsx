import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { testimonialsData } from '../../data/testimonials';
import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <Container>
        <SectionTitle
          subtitle="Guest Testimonials"
          title="Loved by Coffee Connoisseurs"
          description="Hear what patrons from Akole, Nashik, Pune, and Mumbai say about their Akole Cafe experience."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl bg-white border border-accent-gold/20 shadow-luxury flex flex-col justify-between relative group hover:-translate-y-2 transition-all duration-300"
            >
              <FaQuoteLeft className="absolute top-6 right-6 w-8 h-8 text-accent-gold/20 group-hover:text-accent-gold/40 transition-colors" />

              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 text-accent-gold">
                  {[...Array(item.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-dark-lighter leading-relaxed font-light italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-accent-gold/15">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-accent-gold"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary">{item.name}</h4>
                  <span className="text-[10px] text-accent-gold block">{item.role}</span>
                  <span className="text-[10px] text-dark-lighter font-light">{item.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
