import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Container from '../common/Container';
import Button from '../common/Button';
import logoEmblem from '../../assets/logo-emblem.png';

const Footer = () => {
  return (
    <footer className="bg-[#1B3828] text-secondary border-t border-[#C8A96A]/20 pt-16 pb-8 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                <img
                  src={logoEmblem}
                  alt="Akole Café Logo"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-extrabold text-white">Akole</span>
                <span className="font-serif italic text-2xl text-[#D4B055] ml-0.5">Café</span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed font-light">
              "Brewing Connections, Serving Memories." <br />
              Akole Cafe is a sanctuary of handcrafted coffee, artisanal pizzas, serene luxury dining, and warm Maharashtrian hospitality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 text-[#C8A96A] flex items-center justify-center hover:bg-[#C8A96A] hover:text-[#1B3828] transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#C8A96A] tracking-wider mb-4 uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/80 font-light">
              {[
                { name: 'Menu', path: '/menu' },
                { name: 'About Us', path: '/about' },
                { name: 'Reserve Table', path: '/reserve' },
                { name: 'Live Events', path: '/events' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Coffee Blog', path: '/blog' },
                { name: 'Franchise Opportunity', path: '/franchise' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="hover:text-[#C8A96A] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#C8A96A] tracking-wider mb-4 uppercase">
              Hours & Location
            </h4>
            <div className="space-y-3 text-xs text-white/80 font-light">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-[#C8A96A] shrink-0 mt-0.5" />
                <p>Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601</p>
              </div>

              <div className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-[#C8A96A] shrink-0" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-[#C8A96A] shrink-0" />
                <p>hello@akolecafe.com</p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <FiClock className="w-4 h-4 text-[#C8A96A] shrink-0 mt-0.5" />
                <p>Mon - Sun: 7:00 AM - 10:30 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#C8A96A] tracking-wider mb-4 uppercase">
              Join VIP Club
            </h4>
            <p className="text-xs text-white/70 mb-4 font-light leading-relaxed">
              Subscribe to receive exclusive invitations to coffee cuppings and special offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-4 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#C8A96A]"
              />
              <Button type="submit" variant="gold" size="sm" className="w-full rounded-full bg-[#C8A96A] text-[#1B3828] font-bold text-xs">
                Join VIP Club
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-light">
          <p>© {new Date().getFullYear()} Akole Cafe. All Rights Reserved. Crafted with passion in Maharashtra.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-[#C8A96A] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#C8A96A] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;