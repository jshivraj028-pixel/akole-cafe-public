import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiArrowRight, FiX } from 'react-icons/fi';
import { galleryItems } from '../../data/gallery';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const GalleryPreview = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const previewItems = galleryItems.slice(0, 6);

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <Container>
        <SectionTitle
          subtitle="VISUAL JOURNEY"
          title="Moments at Akole Cafe"
          description="Immerse yourself in the warm botanical ambiance, golden lighting, and artisanal coffee creations of Akole's finest luxury cafe."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative h-80 rounded-3xl overflow-hidden group shadow-luxury border border-[#D6AE4D]/30 cursor-pointer bg-[#0C1A12]"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Permanent dark gradient bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A12]/95 via-[#0C1A12]/40 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 bg-[#123524]/90 backdrop-blur-md text-[#D6AE4D] text-[10px] uppercase font-bold tracking-widest rounded-full border border-[#D6AE4D]/40 shadow-md">
                  {item.category}
                </span>

                {/* Top Right Eye Button: Hidden by default, appears ONLY on hover */}
                <span
                  style={{ borderRadius: '50%', width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}
                  className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 bg-black/50 hover:bg-[#D6AE4D] text-[#D6AE4D] hover:text-[#0C1E14] backdrop-blur-md border border-[#D6AE4D]/50 flex items-center justify-center shadow-lg transition-all duration-300 p-0"
                >
                  <FiMaximize2 className="w-4 h-4" />
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h4 className="font-serif text-lg font-bold group-hover:text-[#D6AE4D] transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-white/80 line-clamp-1 font-light mt-0.5">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/gallery" variant="gold" size="lg" icon={FiArrowRight}>
            Explore Full Gallery
          </Button>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 max-w-4xl w-full bg-[#122219] border border-[#D6AE4D]/40 rounded-3xl overflow-hidden shadow-2xl text-white"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:text-[#D6AE4D] flex items-center justify-center border border-white/30 cursor-pointer"
                >
                  <FiX className="w-6 h-6" />
                </button>
                <div className="relative h-80 sm:h-[480px]">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-[#122219] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#D6AE4D]/20">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#D6AE4D]">{selectedImage.title}</h3>
                    <p className="text-xs text-white/80 font-light mt-1">{selectedImage.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#D6AE4D] text-[#123524] text-[10px] font-extrabold uppercase tracking-widest rounded-md shrink-0">
                    {selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default GalleryPreview;
