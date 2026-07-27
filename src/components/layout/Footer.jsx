import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import Container from '../common/Container';
import logoEmblem from '../../assets/logo-emblem.png';

const Footer = () => {
  return (
    <footer className="bg-[#0F1712] text-white border-t border-[#D6AE4D]/35 pt-20 pb-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#123524]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D6AE4D]/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10 relative z-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-full bg-[#2A1D17] border border-[#D6AE4D]/45 shadow-xl p-1 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#D6AE4D]">
                <img
                  src={logoEmblem}
                  alt="Akole Café Logo"
                  className="w-full h-full object-contain filter drop-shadow-md transform scale-[1.1]"
                />
              </div>
              <div className="flex items-baseline font-cormorant text-2xl tracking-[-0.5px]">
                <span className="font-bold text-white">Akole</span>
                <span className="italic font-medium text-[#D6AE4D] ml-1">Café</span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed font-light">
              "Brewing Connections, Serving Memories." <br />
              Akole Cafe is a sanctuary of handcrafted coffee, artisanal pizzas, serene luxury dining, and warm Maharashtrian hospitality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FiInstagram, href: 'https://instagram.com/akolecafe', label: 'Instagram' },
                { icon: FiFacebook, href: 'https://facebook.com/akolecafe', label: 'Facebook' },
                { icon: FiTwitter, href: 'https://twitter.com/akolecafe', label: 'Twitter' },
                { icon: FaWhatsapp, href: 'https://wa.me/918432387670?text=Hello%20Akole%20Cafe%2C%20I%20would%20like%20to%20make%20an%20inquiry', label: 'WhatsApp' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 text-[#D6AE4D] border border-[#D6AE4D]/25 flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-all duration-300 transform hover:scale-110 shadow-md"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-xs font-extrabold text-[#D6AE4D] tracking-widest mb-6 uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs text-white/75 font-light">
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
                  <Link to={item.path} className="hover:text-[#D6AE4D] hover:translate-x-1 transition-all duration-200 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div>
            <h4 className="font-serif text-xs font-extrabold text-[#D6AE4D] tracking-widest mb-6 uppercase">
              Hours & Location
            </h4>
            <div className="space-y-4 text-xs text-white/75 font-light">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-4.5 h-4.5 text-[#D6AE4D] shrink-0 mt-0.5" />
                <p className="leading-relaxed">Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601</p>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="w-4.5 h-4.5 text-[#D6AE4D] shrink-0" />
                <a href="tel:+918432387670" className="hover:text-[#D6AE4D] transition-colors">+91 84323 87670</a>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="w-4.5 h-4.5 text-[#D6AE4D] shrink-0" />
                <a href="mailto:akolecafe@gmail.com" className="hover:text-[#D6AE4D] transition-colors">akolecafe@gmail.com</a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <FiClock className="w-4.5 h-4.5 text-[#D6AE4D] shrink-0 mt-0.5" />
                <p>Mon - Sun: 7:00 AM - 10:30 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif text-xs font-extrabold text-[#D6AE4D] tracking-widest mb-6 uppercase">
              Join VIP Club
            </h4>
            <p className="text-xs text-white/70 mb-5 font-light leading-relaxed">
              Subscribe to receive exclusive invitations to coffee cuppings and special offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AE4D]/60 rounded-full py-2.5 px-5 text-xs text-white placeholder-white/40 focus:outline-none transition-all"
              />
              <button 
                type="submit" 
                className="w-full rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1A12] font-black text-xs py-3 uppercase tracking-[2px] shadow-lg shadow-[#D6AE4D]/30 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-[#FFF5D6]"
              >
                <Sparkles className="w-4 h-4 text-[#0C1A12] stroke-[2.5]" /> 
                <span className="font-extrabold text-[#0C1A12]">JOIN VIP CLUB</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-light relative z-10">
          <p>© {new Date().getFullYear()} Akole Cafe. All Rights Reserved. Crafted with passion in Maharashtra.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-[#D6AE4D] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#D6AE4D] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;