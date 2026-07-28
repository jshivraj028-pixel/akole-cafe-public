import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiShield, FiStar } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import ReservationForm from '../components/reservation/ReservationForm';
import SectionTitle from '../components/common/SectionTitle';

import seatingIndoorImg from '../assets/seating-indoor.png';
import seatingPatioImg from '../assets/seating-patio.png';
import seatingMezzanineImg from '../assets/seating-mezzanine.png';

const seatingAreas = [
  {
    title: 'Indoor Luxury Lounge',
    image: seatingIndoorImg,
    description: 'Plush velvet seating with warm brass lighting, climate control, and botanical green walls.'
  },
  {
    title: 'Garden Patio Terrace',
    image: seatingPatioImg,
    description: 'Open-air al-fresco dining surrounded by flowering jasmines, fairy lights, and cool mountain breezes.'
  },
  {
    title: 'Private Mezzanine Suite',
    image: seatingMezzanineImg,
    description: 'Exclusive elevated seating area dedicated to private celebrations, corporate dinners, and birthdays.'
  }
];

const Reserve = () => {
  return (
    <>
      <PageBanner
        title="Reserve Your Table"
        subtitle="Experience Unrivaled Luxury Dining & Handcrafted Artisanal Coffee"
        bgImage={seatingIndoorImg}
      />

      <section className="py-20 bg-[#FAF6EE] dark:bg-[#0A160F] text-[#123524] dark:text-[#EAE3D2] relative transition-colors">
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
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#122219] border border-[#E5DDD0] dark:border-[#C8A96A]/20 shadow-xl group hover:border-[#D6AE4D] transition-all"
                >
                  <div className="h-52 overflow-hidden bg-[#0A160F]">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-left space-y-2">
                    <h3 className="font-serif font-bold text-lg text-[#123524] dark:text-white">
                      {area.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-black/70 dark:text-[#EAE3D2]/80 font-light">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Reservation Form Component */}
          <div className="max-w-4xl mx-auto">
            <ReservationForm />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Reserve;
