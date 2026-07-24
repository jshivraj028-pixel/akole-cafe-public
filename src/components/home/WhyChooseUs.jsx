import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { FiCoffee, FiShield, FiZap, FiSmile, FiWifi, FiStar, FiUsers, FiClock } from 'react-icons/fi';

const features = [
  { icon: FiCoffee, title: "Freshly Brewed Coffee", desc: "Single-origin Arabica roasted in micro-batches for rich crema and notes." },
  { icon: FiShield, title: "Premium Ingredients", desc: "Italian burrata, French butter, 24k edible gold, and zero preservatives." },
  { icon: FiZap, title: "Fast & Precise Service", desc: "Impeccable table hospitality with quick turnarounds." },
  { icon: FiSmile, title: "Cozy Luxury Atmosphere", desc: "Ergonomic leather armchairs, climate control, and botanical decor." },
  { icon: FiUsers, title: "Experienced Master Chefs", desc: "Artisan bakers and culinary masters with international experience." },
  { icon: FiWifi, title: "Gigabit High-Speed Wi-Fi", desc: "Dedicated quiet zones with power outlets for remote work." },
  { icon: FiStar, title: "Comfortable Seating", desc: "Private booths, mezzanine decks, and open garden patio." },
  { icon: FiClock, title: "Friendly Staff Concierge", desc: "Humble, attentive staff trained in luxury hospitality protocol." }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-primary text-secondary relative overflow-hidden">
      <div className="botanical-glow top-1/2 right-10 -translate-y-1/2 opacity-30" />

      <Container>
        <SectionTitle
          subtitle="Unmatched Excellence"
          title="Why Choose Akole Cafe"
          description="Designed to offer an extraordinary blend of luxury, flavor, and comfort."
          align="center"
          light={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-primary-dark/80 border border-accent-gold/20 hover:border-accent-gold/60 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-gradient text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-secondary mb-2 group-hover:text-accent-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-secondary/70 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
