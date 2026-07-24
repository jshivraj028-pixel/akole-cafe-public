import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight, FiX } from 'react-icons/fi';
import Button from '../common/Button';

const BlogCard = ({ post }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl overflow-hidden border border-accent-gold/20 shadow-luxury flex flex-col justify-between group transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-primary-dark cursor-pointer" onClick={() => setIsReadModalOpen(true)}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-accent-gold text-[10px] uppercase font-bold tracking-widest rounded-full border border-accent-gold/30">
              {post.category}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md border border-accent-gold/30 text-[11px] text-secondary/90 flex items-center gap-1 font-medium">
            <FiClock className="w-3 h-3 text-accent-gold" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white/90">
          <div>
            <div className="flex items-center gap-2 text-xs text-dark/60 mb-2 font-medium">
              <span className="flex items-center gap-1"><FiUser className="text-accent-goldDark" /> {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>

            <h3
              onClick={() => setIsReadModalOpen(true)}
              className="font-serif text-xl font-bold text-primary group-hover:text-coffee transition-colors leading-snug mb-3 cursor-pointer"
            >
              {post.title}
            </h3>

            <p className="text-xs text-dark/70 line-clamp-3 leading-relaxed font-light mb-4">
              {post.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-accent-gold/15">
            <button
              onClick={() => setIsReadModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-goldDark hover:text-primary transition-colors"
            >
              Read Article <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {isReadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReadModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-primary border border-accent-gold/40 rounded-3xl overflow-y-auto text-secondary shadow-2xl p-6 sm:p-10"
            >
              <button
                onClick={() => setIsReadModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-primary-dark text-secondary hover:text-accent-gold flex items-center justify-center border border-accent-gold/30"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 border border-accent-gold/30">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-accent-gold text-primary font-bold text-xs uppercase tracking-wider rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-accent-gold font-medium">
                  <span>{post.author} ({post.authorRole})</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-secondary leading-tight">
                  {post.title}
                </h2>

                <div className="prose prose-invert max-w-none text-sm text-secondary/80 leading-relaxed font-light whitespace-pre-line border-t border-accent-gold/20 pt-4">
                  {post.content}
                </div>

                <div className="pt-6 border-t border-accent-gold/20 flex justify-end">
                  <Button onClick={() => setIsReadModalOpen(false)} variant="gold" size="md">
                    Close Article
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogCard;
