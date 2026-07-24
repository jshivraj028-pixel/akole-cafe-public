import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiHeart, FiMessageCircle } from 'react-icons/fi';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

const instaPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    likes: '1.2k',
    comments: '84',
    handle: '@akolecafe'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    likes: '2.4k',
    comments: '132',
    handle: '@akolecafe'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    likes: '980',
    comments: '56',
    handle: '@akolecafe'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    likes: '3.1k',
    comments: '210',
    handle: '@akolecafe'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    likes: '1.8k',
    comments: '92',
    handle: '@akolecafe'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    likes: '1.5k',
    comments: '77',
    handle: '@akolecafe'
  }
];

const InstagramSection = () => {
  return (
    <section className="py-20 bg-primary text-secondary relative overflow-hidden">
      <Container>
        <SectionTitle
          subtitle="FOLLOW OUR JOURNEY"
          title="#AkoleCafeMoments"
          description="Tag @akolecafe in your stories and posts to get featured on our official luxury wall."
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 my-12">
          {instaPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative h-48 sm:h-56 rounded-xl overflow-hidden group shadow-luxury border border-accent-gold/20"
            >
              <img
                src={post.image}
                alt="Instagram Moment"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-accent-gold">
                <FiInstagram className="w-8 h-8 transform group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-4 text-xs font-semibold text-secondary">
                  <span className="flex items-center gap-1"><FiHeart className="text-accent-gold fill-accent-gold" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><FiMessageCircle className="text-accent-gold" /> {post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-gradient text-primary font-semibold text-sm hover:scale-105 transition-transform shadow-gold"
          >
            <FiInstagram className="w-5 h-5" /> Follow @akolecafe on Instagram
          </a>
        </div>
      </Container>
    </section>
  );
};

export default InstagramSection;
