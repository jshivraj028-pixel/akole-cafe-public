import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Navigation, Globe, Copy, Check, Clock, Phone, ExternalLink, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const LocationModal = ({ isOpen, onClose }) => {
  const [mapType, setMapType] = useState('k'); // 'k' = Satellite, 'm' = Roadmap, 'h' = Hybrid
  const [copied, setCopied] = useState(false);
  const { showToast } = useTheme();

  const cafeAddress = "Akole Café, Main Road, Near Bus Stand, Akole, District Ahmednagar, Maharashtra 422601";
  const mapsSearchQuery = "Akole,Maharashtra,India";

  // Google Maps Embed URL based on view mode (t=k for Satellite, t=m for Map, t=h for Hybrid)
  const mapIframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapsSearchQuery)}&t=${mapType}&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cafeAddress);
    setCopied(true);
    if (showToast) showToast('Address copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md">
        {/* Backdrop overlay click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl bg-[#10291C] border border-[#D6AE4D]/40 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#183B2A] via-[#10291C] to-[#183B2A] border-b border-[#D6AE4D]/25 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 flex items-center justify-center text-[#D6AE4D] shadow-inner">
                <MapPin className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white flex items-center gap-2">
                  <span>Akole Café Location</span>
                  <span className="text-[10px] font-sans font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    🟢 Open Now
                  </span>
                </h3>
                <p className="text-xs text-[#D6AE4D] font-mono">Interactive Satellite & Map View</p>
              </div>
            </div>

            {/* View Mode Toggle Switchers */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:flex items-center bg-[#0A1A12] border border-[#D6AE4D]/30 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setMapType('k')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    mapType === 'k'
                      ? 'bg-gradient-to-r from-[#D6AE4D] to-[#F3E5AB] text-[#123524] font-extrabold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Satellite</span>
                </button>
                <button
                  onClick={() => setMapType('m')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    mapType === 'm'
                      ? 'bg-gradient-to-r from-[#D6AE4D] to-[#F3E5AB] text-[#123524] font-extrabold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Roadmap</span>
                </button>
                <button
                  onClick={() => setMapType('h')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    mapType === 'h'
                      ? 'bg-gradient-to-r from-[#D6AE4D] to-[#F3E5AB] text-[#123524] font-extrabold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>Hybrid</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors ml-2"
                aria-label="Close Map Modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Mobile View Toggle Switchers */}
          <div className="flex sm:hidden items-center justify-center bg-[#0A1A12] border-b border-[#D6AE4D]/20 p-2 gap-1.5">
            <button
              onClick={() => setMapType('k')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                mapType === 'k' ? 'bg-[#D6AE4D] text-[#123524]' : 'text-white/70'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Satellite
            </button>
            <button
              onClick={() => setMapType('m')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                mapType === 'm' ? 'bg-[#D6AE4D] text-[#123524]' : 'text-white/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Map
            </button>
            <button
              onClick={() => setMapType('h')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                mapType === 'h' ? 'bg-[#D6AE4D] text-[#123524]' : 'text-white/70'
              }`}
            >
              Hybrid
            </button>
          </div>

          {/* Map View Frame */}
          <div className="relative w-full h-[350px] sm:h-[420px] bg-[#0A1A12]">
            <iframe
              title="Akole Café Satellite Map"
              src={mapIframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.05] brightness-[0.95]"
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-3 left-3 bg-[#10291C]/90 border border-[#D6AE4D]/40 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D6AE4D] animate-ping" />
              <span className="text-xs font-bold text-white font-mono">
                {mapType === 'k' ? '🛰️ Satellite View' : mapType === 'm' ? '🗺️ Roadmap View' : '🌐 Hybrid Earth View'}
              </span>
            </div>
          </div>

          {/* Modal Footer & Info Bar */}
          <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0F261B] to-[#0A1A12] border-t border-[#D6AE4D]/20 space-y-3 shrink-0">
            {/* Address & Hours */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="md:col-span-2 bg-[#183B2A]/60 border border-[#D6AE4D]/20 p-3 rounded-2xl flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D6AE4D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white/90 leading-relaxed">{cafeAddress}</p>
                    <p className="text-[10px] text-[#D6AE4D] mt-0.5">Ahmednagar, Maharashtra, India</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D6AE4D]/20 text-[#D6AE4D] transition-colors shrink-0"
                  title="Copy Address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="bg-[#183B2A]/60 border border-[#D6AE4D]/20 p-3 rounded-2xl space-y-1.5 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4 text-[#D6AE4D]" />
                  <span>8:00 AM – 10:30 PM (Daily)</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Phone className="w-4 h-4 text-[#D6AE4D]" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsSearchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4 fill-[#123524]" />
                <span>Get Live Directions</span>
              </a>

              <a
                href={`https://earth.google.com/web/search/${encodeURIComponent(mapsSearchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all"
              >
                <Globe className="w-4 h-4 text-[#D6AE4D]" />
                <span>Google Earth 3D</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LocationModal;
