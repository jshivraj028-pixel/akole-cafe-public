import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiCoffee } from 'react-icons/fi';
import Container from '../common/Container';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 bg-primary overflow-hidden">
      {/* Background Image Overlay with Botanical Luxury Vibe */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay scale-105 transition-all duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80')`
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-0" />

      {/* Ambient Botanical Glows */}
      <div className="botanical-glow top-1/4 left-10 -translate-y-1/2 opacity-60" />
      <div className="botanical-glow bottom-10 right-10 opacity-40" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-accent-gold/40 shadow-luxury">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-ping" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-gold">
                Akole's Premier Luxury Destination
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary leading-[1.1] tracking-tight">
              Brewing <span className="text-gold-gradient italic font-normal">Connections,</span> <br />
              Serving <span className="text-secondary font-extrabold">Memories.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-secondary/80 font-light max-w-xl leading-relaxed">
              Step into a sanctuary where single-origin Arabica roasts, woodfired culinary creations, and warm Maharashtrian hospitality unite under luxury botanical ambience in Akole.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button to="/menu" variant="gold" size="lg" icon={FiArrowRight}>
                Explore Menu
              </Button>
              <Button to="/reserve" variant="outline" size="lg" icon={FiCalendar}>
                Reserve Table
              </Button>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-accent-gold/20 max-w-md">
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent-gold">100%</span>
                <p className="text-[11px] uppercase tracking-wider text-secondary/70">Single Origin</p>
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent-gold">4.9★</span>
                <p className="text-[11px] uppercase tracking-wider text-secondary/70">Guest Rating</p>
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold text-accent-gold">15k+</span>
                <p className="text-[11px] uppercase tracking-wider text-secondary/70">Cups Served</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Coffee Cup Animation & Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer Decorative Gold Circle */}
            <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-accent-gold/40 animate-spin-slow absolute" />
            
            {/* Glowing Backdrop */}
            <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full bg-gold-gradient/20 blur-2xl absolute" />

            {/* Main Floating Coffee Cup Image */}
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-72 sm:w-96 h-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-accent-gold/40 shadow-luxury"
            >
              <img
                src="https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80"
                alt="Akole Signature Gold Latte Pour"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              
              {/* Floating Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-accent-gold/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary font-bold">
                    <FiCoffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-secondary">24k Gold Latte</h4>
                    <p className="text-[10px] text-accent-gold">Signature Artisanal Brew</p>
                  </div>
                </div>
                <span className="font-bold text-accent-gold text-sm">₹340</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;
