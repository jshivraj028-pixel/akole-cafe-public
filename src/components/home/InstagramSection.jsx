import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import { FiInstagram } from 'react-icons/fi';

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
    <section className="py-20 sm:py-24 bg-[#F5F2EA] relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] font-sans block">
            FOLLOW US
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-serif text-3xl sm:text-4xl font-normal italic text-[#C8A96A] hover:text-[#2F4436] transition-colors"
          >
            <span>akolecafe</span>
          </a>
        </div>

        {/* 6 Square Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative h-40 sm:h-44 rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1B3828]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <FiInstagram className="w-7 h-7 text-[#C8A96A]" />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default InstagramSection;
