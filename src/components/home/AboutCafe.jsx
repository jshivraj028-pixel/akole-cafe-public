import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Container from '../common/Container';

const AboutCafe = () => {
  return (
    <section className="py-24 bg-[#0B150F] text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#D6AE4D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#123524]/20 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Stacked Cafe Interior Images with Premium Borders */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Main Cafe Interior Photo */}
            <div className="relative z-10 w-full max-w-md h-[400px] sm:h-[440px] rounded-[32px] overflow-hidden shadow-2xl border border-[#D6AE4D]/35 bg-[#123524]/40 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                alt="Akole Cafe Warm Interior Ambience"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Overlapping Inset Coffee Pouring Thumbnail */}
            <div className="absolute -bottom-6 right-4 sm:right-8 z-20 w-44 sm:w-52 h-44 sm:h-52 rounded-[24px] overflow-hidden border-4 border-[#0B150F] shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80"
                alt="Latte Art Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Gold Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6AE4D]/10 border border-[#D6AE4D]/30 text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> ABOUT US
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Where Every Cup <br />
              <span className="bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] bg-clip-text text-transparent italic font-normal block mt-1">Tells a Story</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-white/85 font-light leading-relaxed">
              <p>
                Founded in the heart of Akole, Maharashtra, Akole Cafe was born out of a deep passion to craft memorable coffee, woodfired delicacies, and warm hospitality.
              </p>
              <p>
                Every coffee bean is single-origin, shade-grown and roasted in small batches to preserve its natural flavors. We welcome you to experience our cozy botanical sanctuary.
              </p>
            </div>

            {/* Link Button */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#D6AE4D]/35 hover:border-[#D6AE4D] bg-[#D6AE4D]/5 hover:bg-[#D6AE4D]/10 font-serif text-[#D6AE4D] hover:text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-300 group"
              >
                <span>EXPLORE OUR STORY</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default AboutCafe;
