import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiCheckCircle, FiDollarSign, FiUsers, FiBriefcase, FiAward, FiSend } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

const franchiseFeatures = [
  {
    icon: FiTrendingUp,
    title: 'Proven High Profit Margin',
    description: 'Specialty coffee and gourmet pizzas offer up to 65% gross profit margin with rapid 18-24 month ROI payback.'
  },
  {
    icon: FiAward,
    title: 'Turnkey Design & Fit-Out',
    description: 'Full architectural assistance, luxury botanical interior setup, custom brass coffee bars, and woodfired oven installation.'
  },
  {
    icon: FiUsers,
    title: 'Comprehensive Staff Training',
    description: 'Complete 30-day barista Q-Grader certification, chef culinary training, and customer service SOPs provided.'
  },
  {
    icon: FiBriefcase,
    title: 'Centralized Supply Chain',
    description: 'Direct estate single-origin coffee bean supply, proprietary sauces, and branded packaging delivered to your door.'
  }
];

const Franchise = () => {
  const { showToast } = useTheme();
  const [storeArea, setStoreArea] = useState(1200); // sq ft
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Nashik', budget: '₹25L - ₹35L', experience: 'Yes' });

  // Estimated Calculations based on sq ft
  const estimatedInvestment = Math.round((storeArea * 2500) / 100000); // in Lakhs INR
  const estimatedMonthlyRev = Math.round((storeArea * 1100) / 100000); // in Lakhs INR

  const handleFranchiseSubmit = (e) => {
    e.preventDefault();
    showToast(`Franchise Application Received! Our expansion director will call you within 24 hours.`, 'success');
    setForm({ name: '', phone: '', email: '', city: 'Nashik', budget: '₹25L - ₹35L', experience: 'Yes' });
  };

  return (
    <>
      <PageBanner
        title="Franchise & Partner Opportunities"
        subtitle="Bring World-Class Luxury Coffee & Dining to Your City Across India"
        bgImage="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-secondary">
        <Container>
          <SectionTitle
            subtitle="GROW WITH US"
            title="Why Invest in an Akole Cafe Franchise?"
            description="Specialty coffee and luxury casual dining are India's fastest-growing food & beverage segments."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {franchiseFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-accent-gold/20 shadow-luxury group hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-gradient text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-primary mb-2 group-hover:text-coffee transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs text-dark/70 font-light leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive ROI Calculator */}
          <div className="my-16 glass-panel p-8 sm:p-12 rounded-3xl border border-accent-gold/40 shadow-2xl bg-primary text-secondary">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-gold block mb-1">
                Financial Simulator
              </span>
              <h3 className="font-serif text-3xl font-extrabold">Franchise Investment & Revenue Estimator</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider text-accent-gold font-semibold">Target Store Carpet Area</label>
                    <span className="font-mono text-sm font-bold text-secondary">{storeArea} Sq. Ft.</span>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="3000"
                    step="100"
                    value={storeArea}
                    onChange={(e) => setStoreArea(Number(e.target.value))}
                    className="w-full accent-accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-secondary/50 mt-1">
                    <span>800 Sq Ft (Boutique Cafe)</span>
                    <span>3,000 Sq Ft (Flagship Lounge)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary-dark/80 border border-accent-gold/30 space-y-2 text-xs">
                  <p className="text-secondary/70">✓ Includes Interiors, Kitchen Equipment, Barista Machine & Initial Stock</p>
                  <p className="text-secondary/70">✓ Estimated Royalty Fee: <span className="text-accent-gold font-semibold">5% of Monthly Sales</span></p>
                </div>
              </div>

              {/* Estimation Cards */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-primary-dark/90 border border-accent-gold/40 text-center">
                  <span className="text-xs uppercase tracking-wider text-secondary/70 block">Estimated Capital Investment</span>
                  <span className="font-serif text-3xl font-extrabold text-accent-gold block mt-2">₹ {estimatedInvestment} Lakhs</span>
                  <span className="text-[10px] text-secondary/60 block mt-1">Turnkey Execution</span>
                </div>

                <div className="p-6 rounded-2xl bg-primary-dark/90 border border-accent-gold/40 text-center">
                  <span className="text-xs uppercase tracking-wider text-secondary/70 block">Estimated Monthly Turnover</span>
                  <span className="font-serif text-3xl font-extrabold text-accent-gold block mt-2">₹ {estimatedMonthlyRev} Lakhs</span>
                  <span className="text-[10px] text-secondary/60 block mt-1">Based on standard occupancy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Franchise Inquiry Form */}
          <div className="max-w-2xl mx-auto glass-card p-8 sm:p-10 rounded-3xl border border-accent-gold/30 shadow-luxury">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-primary">Apply for Franchise Partnership</h3>
              <p className="text-xs text-dark/70 mt-1 font-light">Fill out the form below to receive the detailed Akole Franchise Prospectus PDF.</p>
            </div>

            <form onSubmit={handleFranchiseSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-accent-goldDark font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Deshmukh"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-secondary/60 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-dark placeholder-dark/40 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-accent-goldDark font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-secondary/60 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-dark placeholder-dark/40 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-accent-goldDark font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="anand@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-secondary/60 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-dark placeholder-dark/40 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-accent-goldDark font-semibold mb-1">Proposed Location / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nashik / Pune / Sangamner"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-secondary/60 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-dark placeholder-dark/40 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-accent-goldDark font-semibold mb-1">Investment Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-secondary/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-primary"
                  >
                    <option value="₹25L - ₹35L">₹25 Lakhs - ₹35 Lakhs</option>
                    <option value="₹35L - ₹50L">₹35 Lakhs - ₹50 Lakhs</option>
                    <option value="₹50L+">₹50 Lakhs+ (Flagship Lounge)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-accent-goldDark font-semibold mb-1">Prior F&B Experience?</label>
                  <select
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full bg-secondary/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-primary"
                  >
                    <option value="Yes">Yes, 2+ Years in Food/Hospitality</option>
                    <option value="No">No, New Franchise Investor</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full mt-2" icon={FiSend}>
                Submit Application for Prospectus
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Franchise;
