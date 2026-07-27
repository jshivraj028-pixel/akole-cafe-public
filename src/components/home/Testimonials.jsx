import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import Container from '../common/Container';

const testimonialsData = [
  {
    id: 1,
    rating: 5,
    quote: "Akole Cafe has the most authentic cold coffee and cozy vibe in town! The staff is friendly and welcoming. A must-visit place!",
    name: "Priya Sharma",
    role: "Local Foodie",
    avatarInitial: "PS"
  },
  {
    id: 2,
    rating: 5,
    quote: "My go-to spot in Akole! The sourdough pizza and iced caramel macchiato are absolute perfection. Amazing ambiance and music.",
    name: "Amit Deshmukh",
    role: "Coffee Connoisseur",
    avatarInitial: "AD"
  },
  {
    id: 3,
    rating: 5,
    quote: "The botanical ambiance and single-origin brews make this place unique. Exceptional service and incredible desserts!",
    name: "Suresh Patil",
    role: "Verified Guest",
    avatarInitial: "SP"
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#F8F5EE] dark:bg-[#0F1712] text-[#123524] dark:text-[#EAE3D2] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#D6AE4D]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#123524]/5 dark:bg-[#D6AE4D]/5 blur-3xl pointer-events-none" />

      <Container>
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123524]/10 dark:bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-widest">
            <FiStar className="w-3.5 h-3.5 text-[#D6AE4D] fill-current" /> TESTIMONIALS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#123524] dark:text-white tracking-tight">
            What Our <span className="bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] bg-clip-text text-transparent">Guests Say</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed max-w-md mx-auto">
            Read verified feedback from our community about their signature Akole Cafe experience.
          </p>
        </div>

        {/* Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(214, 174, 77, 0.15), 0 10px 10px -5px rgba(214, 174, 77, 0.1)"
              }}
              className="p-8 rounded-3xl bg-white/75 dark:bg-[#16231B]/75 backdrop-blur-md border border-gray-200/80 dark:border-[#D6AE4D]/25 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group transition-all duration-300"
            >
              {/* Giant Decorative Quotes Icon */}
              <span className="absolute -top-4 -left-2 text-7xl font-serif text-[#D6AE4D]/10 select-none pointer-events-none group-hover:scale-110 transition-transform duration-300">
                “
              </span>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#D6AE4D] z-10">
                {[...Array(item.rating)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 fill-current stroke-[2]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed italic z-10">
                "{item.quote}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-100 dark:border-[#D6AE4D]/15 flex items-center gap-3.5 z-10">
                <div className="w-10 h-10 rounded-xl bg-[#123524] text-[#D6AE4D] font-serif font-extrabold text-sm flex items-center justify-center shadow-md border border-[#D6AE4D]/35 shrink-0">
                  {item.avatarInitial}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-extrabold text-[#123524] dark:text-white leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#D6AE4D] font-semibold uppercase tracking-wider block mt-0.5">
                    {item.role}
                  </span>
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
