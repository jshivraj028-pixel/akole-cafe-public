import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiCoffee } from 'react-icons/fi';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-primary text-secondary flex items-center justify-center relative overflow-hidden">
      <div className="botanical-glow top-1/4 left-1/4 opacity-40" />
      <div className="botanical-glow bottom-10 right-10 opacity-30" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto space-y-6"
        >
          <div className="w-24 h-24 rounded-full bg-gold-gradient text-primary flex items-center justify-center mx-auto shadow-gold text-4xl font-extrabold font-serif">
            404
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-secondary">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-secondary/80 font-light leading-relaxed">
            The cup you are looking for seems to have been finished! Let us guide you back to our luxury lounge or fresh artisanal menu.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button to="/" variant="gold" size="lg" icon={FiHome}>
              Return to Homepage
            </Button>
            <Button to="/menu" variant="outline" size="lg" icon={FiCoffee}>
              Explore Menu
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default NotFound;
