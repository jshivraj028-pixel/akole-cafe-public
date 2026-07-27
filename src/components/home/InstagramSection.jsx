import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import Container from '../common/Container';

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    alt: "Artisanal Latte Art",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    alt: "Croissant and Fresh Coffee",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    alt: "Iced Speciality Brew",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80",
    alt: "Freshly Roasted Coffee Beans",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80",
    alt: "Cozy Cafe Seating",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    alt: "Decadent Chocolate Cake",
  },
];

const InstagramSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#121A15] relative overflow-hidden border-t border-gray-200/80 dark:border-[#D6AE4D]/20 transition-colors duration-300">
      <Container>
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123524]/10 dark:bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-widest">
            <FiInstagram className="w-3.5 h-3.5" /> INSTAGRAM SHOWCASE
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-serif text-3xl sm:text-4xl font-extrabold italic text-[#D6AE4D] hover:text-[#123524] dark:hover:text-white transition-colors"
          >
            <span>@akolecafe</span>
          </a>
          <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light">
            Tag us in your stories and posts to get featured on our official VIP feed.
          </p>
        </div>

        {/* 6 Square Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative h-44 sm:h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 dark:border-[#D6AE4D]/25"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#123524]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-[#D6AE4D] shadow-md">
                  <FiInstagram className="w-5 h-5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default InstagramSection;
