import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiLinkedin, FiYoutube, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Container from '../common/Container';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-secondary border-t border-accent-gold/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="botanical-glow bottom-0 right-0 opacity-20 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-accent-gold/15">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary shadow-gold">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-widest text-secondary">
                  AKOLE <span className="text-accent-gold font-light">CAFE</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent-gold/80 font-sans -mt-1">
                  Akole • Maharashtra
                </span>
              </div>
            </Link>

            <p className="text-xs text-secondary/70 leading-relaxed font-light">
              "Brewing Connections, Serving Memories." <br />
              Akole Cafe is a sanctuary of handcrafted coffee, artisanal pizzas, serene luxury dining, and warm Maharashtrian hospitality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-primary/80 border border-accent-gold/30 text-accent-gold flex items-center justify-center hover:bg-accent-gold hover:text-primary transition-all duration-300 shadow-sm"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-accent-gold tracking-wider mb-4 uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-secondary/80">
              {['Menu', 'About Us', 'Reserve Table', 'Live Events', 'Photo Gallery', 'Coffee Blog', 'Franchise Opportunity'].map((item, idx) => {
                const path = '/' + item.toLowerCase().split(' ')[0];
                return (
                  <li key={idx}>
                    <Link
                      to={path === '/about' ? '/about' : path === '/reserve' ? '/reserve' : path === '/photo' ? '/gallery' : path === '/coffee' ? '/blog' : path === '/franchise' ? '/franchise' : path === '/live' ? '/events' : '/menu'}
                      className="hover:text-accent-gold transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold group-hover:w-3 transition-all" />
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Opening Hours & Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-accent-gold tracking-wider mb-4 uppercase">
              Hours & Location
            </h4>
            <div className="space-y-3 text-xs text-secondary/80 font-light">
              <div className="flex items-start gap-2.5">
                <FiClock className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-secondary">Mon - Sun: 8:00 AM - 11:00 PM</p>
                  <p className="text-[11px] text-accent-gold/80">Kitchen Closes at 10:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <p>Main College Road, Near High School Ground, Akole, Ahmednagar District, Maharashtra 422601</p>
              </div>

              <div className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-accent-gold shrink-0" />
                <p>+91 98220 12345 / +91 94230 67890</p>
              </div>

              <div className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-accent-gold shrink-0" />
                <p>concierge@akolecafe.com</p>
              </div>
            </div>
          </div>

          {/* Col 4: VIP Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-accent-gold tracking-wider mb-4 uppercase">
              Join Akole Club
            </h4>
            <p className="text-xs text-secondary/70 mb-4 font-light leading-relaxed">
              Subscribe to receive exclusive invitation to private coffee cuppings, weekend live jazz, and 15% off your first online order.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full bg-primary/80 border border-accent-gold/30 rounded-full py-2.5 px-4 text-xs text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold"
              />
              <Button type="submit" variant="gold" size="sm" className="w-full">
                Join VIP Club
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary/50 font-light">
          <p>© {new Date().getFullYear()} Akole Cafe. All Rights Reserved. Crafted with passion in Maharashtra.</p>
          <div className="flex gap-6 text-[11px]">
            <Link to="/contact" className="hover:text-accent-gold transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-accent-gold transition-colors">Terms of Hospitality</Link>
            <Link to="/contact" className="hover:text-accent-gold transition-colors">Safety Standards</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
