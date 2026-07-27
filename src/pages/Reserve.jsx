import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiShield, FiStar } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import ReservationForm from '../components/reservation/ReservationForm';
import SectionTitle from '../components/common/SectionTitle';

const seatingAreas = [
  {
    title: 'Indoor Luxury Lounge',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    description: 'Plush velvet seating with warm brass lighting, climate control, and botanical green walls.'
  },
  {
    title: 'Garden Patio Terrace',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Open-air al-fresco dining surrounded by flowering jasmines, fairy lights, and cool mountain breezes.'
  },
  {
    title: 'Private Mezzanine Suite',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    description: 'Exclusive elevated seating area dedicated to private celebrations, corporate dinners, and birthdays.'
  }
];

const Reserve = () => {
  return (
    <>
      <PageBanner
        title="Reserve Your Table"
        subtitle="Experience Unrivaled Luxury Dining & Handcrafted Artisanal Coffee"
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-secondary relative">
        <Container>
          {/* Seating Showcase Grid */}
          <div className="mb-16">
            <SectionTitle
              subtitle="SEATING ENVIRONMENTS"
              title="Choose Your Dining Vibe"
              description="From intimate interior alcoves to open-air starlit garden seating."
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {seatingAreas.map((area, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden border border-accent-gold/20 shadow-luxury group"
                >
                  <div className="h-52 overflow-hidden bg-primary-dark">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 text-center bg-white">
                    <h4 className="font-serif text-lg font-bold text-primary group-hover:text-coffee transition-colors">
                      {area.title}
                    </h4>
                    <p className="text-xs text-dark/70 font-light mt-1.5 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <ReservationForm />

          {/* Reservation Policy Note */}
          <div className="mt-16 max-w-3xl mx-auto p-6 rounded-2xl bg-primary text-secondary border border-accent-gold/30 shadow-luxury">
            <h4 className="font-serif text-lg font-bold text-accent-gold mb-3 flex items-center gap-2">
              <FiShield className="w-5 h-5 text-accent-gold" /> Dining Guidelines & Holding Policy
            </h4>
            <ul className="space-y-2 text-xs text-secondary/80 font-light list-disc list-inside">
              <li>Tables are held for a maximum of 15 minutes past the reserved time slot during peak hours.</li>
              <li>For parties larger than 8 guests or private venue bookings, our concierge will call to confirm custom arrangements.</li>
              <li>Vegetarian, Vegan, and Jain options are available across all menu categories.</li>
              <li>Free high-speed Wi-Fi and valet parking available for all reserved guests.</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Reserve;
