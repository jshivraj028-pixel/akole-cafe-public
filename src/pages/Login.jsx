import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, MapPin, Sparkles, Award } from 'lucide-react';
import AuthCard from '../components/Auth/AuthCard';
import LoginForm from '../components/Auth/LoginForm';
import logoEmblem from '../assets/logo-emblem.png';

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-montserrat bg-[#F9F6F0] dark:bg-[#121A15] overflow-x-hidden">
      
      {/* LEFT SIDE (50%): FIXED 100vh Height Non-Scrolling Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 h-screen lg:sticky top-0 overflow-hidden bg-[#0D2818] flex-col justify-between p-10 xl:p-14 text-white shrink-0">
        
        {/* Full Height Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-overlay transform scale-105 transition-transform duration-1000 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=80')`
          }}
        />

        {/* Dark Emerald & Gold Radial Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#081C10] via-[#0D2818]/80 to-[#163D27]/85 z-0 pointer-events-none" />

        {/* Floating Coffee Cup Graphic Animation */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-16 right-10 opacity-15 pointer-events-none z-0"
        >
          <Coffee className="w-56 h-56 text-[#D6AE4D] stroke-[1]" />
        </motion.div>

        {/* 1. Top Left: Brand Logo & Title */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 flex items-center justify-center">
              <img
                src={logoEmblem}
                alt="Akole Café Emblem Logo"
                className="w-full h-full object-contain drop-shadow-md transform group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-baseline font-cormorant text-3xl tracking-[-0.5px]">
              <span className="font-bold text-white">Akole</span>
              <span className="italic font-medium text-[#D6AE4D] ml-1">Café</span>
            </div>
          </Link>
        </div>

        {/* 2. Center: Luxury Hero Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6 max-w-lg my-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6AE4D]/15 border border-[#D6AE4D]/35 text-[#D6AE4D] text-[11px] uppercase font-bold tracking-[3px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARTISANAL COFFEE & DINING</span>
          </div>

          <h1 className="font-cormorant text-5xl xl:text-6xl font-normal leading-[1.08] text-white">
            Brewing Connections, <br />
            <span className="italic font-light text-[#D6AE4D]">Serving Memories.</span>
          </h1>

          <p className="text-xs xl:text-sm font-montserrat text-white/80 font-light leading-relaxed max-w-md">
            Sign in to manage your table reservations, earn loyalty points, and pre-order your favorite specialty brews.
          </p>

          <div className="flex items-center gap-4 text-xs text-[#D6AE4D] pt-2">
            <div className="flex items-center gap-1.5 font-semibold">
              <Award className="w-4 h-4 text-[#D6AE4D]" />
              <span>500 Welcome Points</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 font-semibold">
              <Coffee className="w-4 h-4 text-[#D6AE4D]" />
              <span>Priority Table Access</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Bottom: Location & Heritage Badge */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-white/60 font-light border-t border-white/10 pt-4">
          <MapPin className="w-4 h-4 text-[#D6AE4D]" />
          <span>Akole, Maharashtra • Artisanal Specialty Coffee</span>
        </div>

      </div>

      {/* RIGHT SIDE (50%): Independent Scrollable Login Form Container */}
      <div className="w-full lg:w-1/2 min-h-screen lg:h-screen overflow-y-auto flex flex-col justify-between p-6 sm:p-10 relative bg-[#F9F6F0] dark:bg-[#121A15] text-[#123524] dark:text-[#EAE3D2]">
        
        {/* Top Mobile Header (Logo Only on Mobile) */}
        <div className="flex lg:hidden items-center mb-4 z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src={logoEmblem} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-baseline font-cormorant text-2xl">
              <span className="font-bold text-[#123524] dark:text-white">Akole</span>
              <span className="italic text-[#D6AE4D] ml-1">Café</span>
            </div>
          </Link>
        </div>

        {/* Center: Auth Card */}
        <div className="my-auto flex justify-center py-4">
          <AuthCard
            title="Welcome Back"
            subtitle="Sign in to continue your Akole Cafe experience."
          >
            <LoginForm />
          </AuthCard>
        </div>

        {/* Bottom Footer Copyright */}
        <div className="text-center text-[11px] text-[#8B9B90] dark:text-[#7A8E81] font-light pt-4 pb-2">
          © {new Date().getFullYear()} Akole Café. All Rights Reserved.
        </div>

      </div>

    </div>
  );
};
export default Login;
