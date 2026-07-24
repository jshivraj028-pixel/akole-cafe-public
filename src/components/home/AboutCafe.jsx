import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { FiCheckCircle, FiCoffee, FiHeart, FiUsers, FiAward } from 'react-icons/fi';

const AboutCafe = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                alt="Akole Cafe Interior Ambience"
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Overlapping Floating Image */}
            <div className="absolute -bottom-8 -right-4 z-20 w-64 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-gold hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                alt="Akole Barista Coffee Extraction"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Gold Badge */}
            <div className="absolute top-6 left-6 z-20 p-4 rounded-xl glass-panel text-secondary border border-accent-gold/40 shadow-gold">
              <span className="font-serif text-3xl font-bold text-accent-gold block">Est. 2024</span>
              <span className="text-[10px] uppercase tracking-widest font-sans">Akole • Maharashtra</span>
            </div>
          </motion.div>

          {/* Right Column: Story & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionTitle
              subtitle="The Story of Akole Cafe"
              title="Where Tradition Meets International Luxury Dining"
              description="Founded in the serene town of Akole, Maharashtra, Akole Cafe was born from a passion to craft memorable coffee and dining experiences without compromising on sophistication."
              align="left"
            />

            <p className="text-sm text-dark-lighter font-light leading-relaxed">
              We believe coffee is more than a morning beverage; it is a ritual of connection. From master baristas calibrating extractions to pasty chefs layering mascarpone, our team dedicates every detail to perfection.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Fresh Ingredients', desc: '100% Organic & Local' },
                { title: 'Passionate Team', desc: 'Certified Master Baristas' },
                { title: 'Luxury Dining', desc: 'Bespoke Botanical Ambience' },
                { title: 'Zero Compromise', desc: 'Authentic Sourdough & Specialty Beans' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-accent-gold/20 shadow-sm">
                  <FiCheckCircle className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-primary">{item.title}</h4>
                    <p className="text-[11px] text-dark-lighter">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button to="/about" variant="primary" size="md">
                Learn Our Full Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutCafe;
