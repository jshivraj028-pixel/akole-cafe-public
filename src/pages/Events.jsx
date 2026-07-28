import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiSend, FiStar } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import EventCard from '../components/events/EventCard';
import { eventsData } from '../data/events';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import eventMusicImg from '../assets/event-music.png';
import seatingMezzanineImg from '../assets/seating-mezzanine.png';

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
        bgImage={eventMusicImg}
      />

      <section className="py-20 bg-[#FAF6EE] dark:bg-[#0A160F] text-[#123524] dark:text-[#EAE3D2] transition-colors">
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

          {/* Private Host Section - Ultra Luxury Ambient Card */}
          <div className="mt-20 rounded-[32px] p-8 sm:p-12 border border-[#D6AE4D]/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0F291B] via-[#123524] to-[#0A1A12] text-white">
            {/* Ambient Background Image Overlay with Fade Mask */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none z-0"
              style={{
                backgroundImage: `url(${seatingMezzanineImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)'
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-6 space-y-5 text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#D6AE4D]" /> BESPOKE HOST SERVICES
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  Host Your Private Party <br />
                  <span className="bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] bg-clip-text text-transparent italic font-normal">at Akole Café</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed max-w-lg">
                  Whether planning an intimate birthday dinner, corporate team lounge, or engagement celebration, our dedicated event captain will customize floral decor, lighting, and tasting menus.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#D6AE4D]/30 text-center">
                    <span className="text-xs font-bold text-[#D6AE4D] block">100 Guests</span>
                    <span className="text-[10px] text-white/70">Max Capacity</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#D6AE4D]/30 text-center">
                    <span className="text-xs font-bold text-[#D6AE4D] block">Custom Cakes</span>
                    <span className="text-[10px] text-white/70">Artisanal Bakery</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#D6AE4D]/30 text-center">
                    <span className="text-xs font-bold text-[#D6AE4D] block">VIP Captain</span>
                    <span className="text-[10px] text-white/70">Dedicated Host</span>
                  </div>
                </div>
              </div>

              {/* Private Enquiry Form - Crisp High-Contrast Inputs */}
              <form onSubmit={handlePrivateSubmit} className="lg:col-span-6 bg-white/95 dark:bg-[#122219] p-7 sm:p-8 rounded-[28px] border-2 border-[#D6AE4D] shadow-2xl space-y-4 text-left">
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-[#123524] dark:text-[#D6AE4D]">Request Private Event Consultation</h4>
                  <p className="text-xs text-gray-600 dark:text-white/70">Fill out your details to receive a custom quote & menu package.</p>
                </div>
                
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#123524] dark:text-white/80 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mayur Gambhire"
                    value={privateForm.name}
                    onChange={(e) => setPrivateForm({ ...privateForm, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#1C2D23] border border-gray-300 dark:border-[#D6AE4D]/40 rounded-xl py-3 px-4 text-xs font-medium text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6AE4D] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#123524] dark:text-white/80 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={privateForm.phone}
                      onChange={(e) => setPrivateForm({ ...privateForm, phone: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#1C2D23] border border-gray-300 dark:border-[#D6AE4D]/40 rounded-xl py-3 px-4 text-xs font-medium text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6AE4D] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#123524] dark:text-white/80 mb-1">Event Type</label>
                    <select
                      value={privateForm.eventType}
                      onChange={(e) => setPrivateForm({ ...privateForm, eventType: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#1C2D23] border border-gray-300 dark:border-[#D6AE4D]/40 rounded-xl py-3 px-3 text-xs font-medium text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D] transition-all cursor-pointer"
                    >
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary Dinner</option>
                      <option value="Corporate Meet">Corporate Meetup</option>
                      <option value="Coffee Workshop">Custom Coffee Tasting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#123524] dark:text-white/80 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={privateForm.date}
                    onChange={(e) => setPrivateForm({ ...privateForm, date: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#1C2D23] border border-gray-300 dark:border-[#D6AE4D]/40 rounded-xl py-3 px-4 text-xs font-medium text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#123524] dark:text-white/80 mb-1">Special Requests</label>
                  <textarea
                    rows="2"
                    placeholder="Guest count, decor preferences, dietary requirements..."
                    value={privateForm.notes}
                    onChange={(e) => setPrivateForm({ ...privateForm, notes: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#1C2D23] border border-gray-300 dark:border-[#D6AE4D]/40 rounded-xl py-3 px-4 text-xs font-medium text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6AE4D] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1A12] font-black text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#FFF5D6]"
                >
                  <FiSend className="w-4 h-4 text-[#0C1A12]" />
                  <span>SUBMIT EVENT ENQUIRY</span>
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Events;
