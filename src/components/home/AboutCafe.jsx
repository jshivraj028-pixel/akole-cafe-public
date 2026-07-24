import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

const AboutCafe = () => {
  return (
    <section className="py-24 bg-[#1B3828] text-secondary relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stacked Cafe Interior Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Main Cafe Interior Photo */}
            <div className="relative z-10 w-full max-w-md h-[400px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C8A96A]/20">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                alt="Akole Cafe Warm Interior Ambience"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Inset Coffee Pouring Thumbnail */}
            <div className="absolute -bottom-6 right-4 sm:right-8 z-20 w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#1B3828] shadow-2xl">
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
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] font-sans block">
              ABOUT US
            </span>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white leading-tight tracking-tight">
              Where Every Cup <br />
              <span className="italic font-serif font-normal text-[#E5C989]">Tells a Story</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
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
                className="inline-flex items-center gap-2 font-serif text-[#E5C989] hover:text-white font-medium text-xs tracking-wider uppercase transition-colors group"
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
