import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import { FiStar } from 'react-icons/fi';

const testimonialsData = [
  {
    id: 1,
    rating: 5,
    quote: "Akole Cafe has the most authentic cold coffee and cozy vibe in town! The staff is friendly and welcoming. A must-visit place!",
    name: "Priya Sharma",
    role: "Local Foodie",
  },
  {
    id: 2,
    rating: 5,
    quote: "My go-to spot in Akole! The sourdough pizza and iced caramel macchiato are absolute perfection. Amazing ambiance and music.",
    name: "Amit Deshmukh",
    role: "Coffee Connoisseur",
  },
  {
    id: 3,
    rating: 5,
    quote: "The botanical ambiance and single-origin brews make this place unique. Exceptional service and incredible desserts!",
    name: "Suresh Patil",
    role: "Verified Guest",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F5F2EA] text-primary relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] font-sans block">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2F4436]">
            What Our Guests Say
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D50] font-light max-w-lg mx-auto">
            Read feedback from our community about their Akole Cafe experience.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-7 rounded-2xl bg-white border border-[#C8A96A]/20 shadow-sm flex flex-col justify-between space-y-5"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#C8A96A]">
                {[...Array(item.rating)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs text-[#4A5D50] font-light leading-relaxed italic">
                "{item.quote}"
              </p>

              {/* Author */}
              <div className="pt-2 border-t border-gray-100">
                <h4 className="font-serif text-sm font-semibold text-[#2F4436]">{item.name}</h4>
                <span className="text-[11px] text-[#C8A96A] font-sans">{item.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
