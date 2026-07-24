import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, MapPin } from 'lucide-react';
import AuthCard from '../components/Auth/AuthCard';
import LoginForm from '../components/Auth/LoginForm';
import logoEmblem from '../assets/logo-emblem.png';

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-montserrat bg-[#F5EFE3] dark:bg-[#121A15] overflow-x-hidden">
      
      {/* LEFT SIDE (50%): Full 100vh Height Luxury Coffee Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#123524] flex-col justify-between p-12 xl:p-16 text-white shrink-0">
        
        {/* Full Height Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=80')`
          }}
        />

        {/* Dark Emerald & Gold Radial Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E291C] via-[#123524]/70 to-[#18422E]/80 z-0" />

        {/* Floating Coffee Cup Graphic Animation */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-12 opacity-15 pointer-events-none z-0"
        >
          <Coffee className="w-56 h-56 text-[#D6AE4D] stroke-[1]" />
        </motion.div>

        {/* 1. Top Left: Brand Logo & Title */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full border-2 border-[#D6AE4D] p-0.5 overflow-hidden bg-[#123524] shadow-md flex items-center justify-center">
              <img
                src={logoEmblem}
                alt="Akole Café Emblem Logo"
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform"
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
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 text-[#D6AE4D] text-[11px] uppercase font-bold tracking-[3px]">
            LUXURY CAFÉ & DINING
          </div>

          <h1 className="font-cormorant text-5xl xl:text-6xl font-normal leading-[1.1] text-white">
            Brewing Connections, <br />
            <span className="italic font-light text-[#D6AE4D]">Serving Memories.</span>
          </h1>

          <p className="text-sm font-montserrat text-white/80 font-light leading-relaxed max-w-md">
            Sign in to manage your VIP table reservations, earn gold loyalty points, and pre-order your favorite specialty brews.
          </p>
        </motion.div>

        {/* 3. Bottom: Location & Heritage Badge */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-white/60 font-light border-t border-white/10 pt-4">
          <MapPin className="w-4 h-4 text-[#D6AE4D]" />
          <span>Akole, Maharashtra • Artisanal Specialty Coffee</span>
        </div>

      </div>

      {/* RIGHT SIDE (50%): Login Form Container */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-12 relative bg-[#F5EFE3] dark:bg-[#121A15] text-[#1F3A2B] dark:text-[#EAE3D2]">
        
        {/* Top Mobile Header (Logo Only on Mobile) */}
        <div className="flex lg:hidden items-center mb-6 z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-[#D6AE4D] p-0.5 overflow-hidden">
              <img src={logoEmblem} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex items-baseline font-cormorant text-2xl">
              <span className="font-bold text-[#123524] dark:text-white">Akole</span>
              <span className="italic text-[#D6AE4D] ml-1">Café</span>
            </div>
          </Link>
        </div>

        {/* Center: Auth Card */}
        <div className="my-auto flex justify-center py-6">
          <AuthCard
            title="Welcome Back"
            subtitle="Sign in to continue your Akole Cafe experience."
          >
            <LoginForm />
          </AuthCard>
        </div>

        {/* Bottom Footer Copyright */}
        <div className="text-center text-[11px] text-[#8B9B90] dark:text-[#7A8E81] font-light pt-6">
          © {new Date().getFullYear()} Akole Café. All Rights Reserved.
        </div>

      </div>

    </div>
  );
};

export default Login;
