import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiSend, FiStar } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import EventCard from '../components/events/EventCard';
import { eventsData } from '../data/events';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

const Events = () => {
  const { showToast } = useTheme();
  const [privateForm, setPrivateForm] = useState({ name: '', phone: '', eventType: 'Birthday Party', date: '', notes: '' });

  const handlePrivateSubmit = (e) => {
    e.preventDefault();
    showToast('Private Event Enquiry Sent! Our events manager will contact you shortly.', 'success');
    setPrivateForm({ name: '', phone: '', eventType: 'Birthday Party', date: '', notes: '' });
  };

  return (
    <>
      <PageBanner
        title="Live Events & Gatherings"
        subtitle="Acoustic Jazz Nights • Barista Workshops • Private Celebrations"
        bgImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-secondary">
        <Container>
          <SectionTitle
            subtitle="WHAT'S HAPPENING AT AKOLE CAFE"
            title="Upcoming Experiences"
            description="Discover our curated schedule of weekend acoustic music, barista masterclasses, and culinary tasting nights."
            centered
          />

          <div className="space-y-8 my-12">
            {eventsData.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>

          {/* Private Host Section */}
          <div className="mt-20 glass-panel p-8 sm:p-12 rounded-3xl border border-accent-gold/40 shadow-2xl relative overflow-hidden bg-primary text-secondary">
            <div className="botanical-glow -top-20 -right-20 opacity-30" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase tracking-widest text-accent-gold font-bold">
                  Bespoke Host Services
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary leading-tight">
                  Host Your Private Party <br />
                  <span className="text-gold-gradient italic font-normal">at Akole Cafe</span>
                </h3>
                <p className="text-xs sm:text-sm text-secondary/80 font-light leading-relaxed">
                  Whether planning an intimate birthday dinner, corporate team lounge, or engagement celebration, our dedicated event captain will customize floral decor, lighting, and tasting menus.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-medium text-accent-gold pt-2">
                  <span>✓ Up to 100 Guests Capacity</span>
                  <span>✓ Custom Celebration Cakes</span>
                  <span>✓ Dedicated Butler Captain</span>
                </div>
              </div>

              {/* Private Enquiry Form */}
              <form onSubmit={handlePrivateSubmit} className="lg:col-span-6 bg-primary-dark/90 p-6 rounded-2xl border border-accent-gold/30 space-y-3">
                <h4 className="font-serif text-lg font-bold text-accent-gold mb-2">Request Private Event Consultation</h4>
                
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={privateForm.name}
                    onChange={(e) => setPrivateForm({ ...privateForm, name: e.target.value })}
                    className="w-full bg-primary/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={privateForm.phone}
                    onChange={(e) => setPrivateForm({ ...privateForm, phone: e.target.value })}
                    className="w-full bg-primary/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold"
                  />
                  <select
                    value={privateForm.eventType}
                    onChange={(e) => setPrivateForm({ ...privateForm, eventType: e.target.value })}
                    className="w-full bg-primary/90 border border-accent-gold/30 rounded-xl py-2.5 px-3 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                  >
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Anniversary">Anniversary Dinner</option>
                    <option value="Corporate Meet">Corporate Meetup</option>
                    <option value="Coffee Workshop">Custom Coffee Tasting</option>
                  </select>
                </div>

                <div>
                  <input
                    type="date"
                    required
                    value={privateForm.date}
                    onChange={(e) => setPrivateForm({ ...privateForm, date: e.target.value })}
                    className="w-full bg-primary/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <textarea
                    rows="2"
                    placeholder="Additional requests (guest count, decor theme)..."
                    value={privateForm.notes}
                    onChange={(e) => setPrivateForm({ ...privateForm, notes: e.target.value })}
                    className="w-full bg-primary/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <Button type="submit" variant="gold" size="md" className="w-full" icon={FiSend}>
                  Submit Event Enquiry
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Events;
