import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiCompass, FiEye, FiAward, FiBookmark, FiHeart, FiCheckCircle } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';

const milestones = [
  {
    year: '2018',
    title: 'The First Artisan Brew',
    description: 'Akole Café was born in a cozy corner of Akole, serving our first handcrafted lattes and authentic Maharashtrian hospitality.'
  },
  {
    year: '2020',
    title: 'In-House Micro Roastery',
    description: 'We launched our in-house roaster, sourcing single-origin beans directly from estate farms in Coorg and Chikmagalur.'
  },
  {
    year: '2023',
    title: 'Best Specialty Café Award',
    description: 'Recognized as the Best Specialty Café at the Maharashtra Culinary Awards and introduced our VIP lounge dining.'
  }
];

const teamMembers = [
  {
    initials: 'MG',
    name: 'Mayur Gambhire',
    role: 'Co-Founder & Managing Director'
  },
  {
    initials: 'YJ',
    name: 'Yuvraj Jadhav',
    role: 'Co-Founder & Chief Operations Officer'
  },
  {
    initials: 'RK',
    name: 'Rohan Kulkarni',
    role: 'Founder & Head Barista Roaster'
  },
  {
    initials: 'MD',
    name: 'Meera Deshmukh',
    role: 'Executive Pastry Chef & Creative Director'
  }
];

const awards = [
  {
    title: 'Best Specialty Café 2023',
    category: 'India Coffee Excellence Awards'
  },
  {
    title: 'Design & Hospitality Award',
    category: 'Maharashtra Culinary Guild'
  }
];

const About = () => {
  return (
    <div className="bg-[#F8F5EE] dark:bg-[#0F1712] min-h-screen text-[#123524] dark:text-[#EAE3D2] transition-colors duration-300">
      
      {/* 1. Hero Page Banner */}
      <PageBanner
        title="Our Story"
        subtitle="CRAFTING MEMORIES & ARTISANAL COFFEE SINCE 2018"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      {/* 2. Brand Story Paragraph Section */}
      <section className="py-20 bg-white dark:bg-[#121A15]">
        <Container className="max-w-4xl text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#123524]/10 dark:bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D] mx-auto shadow-md">
            <FiCoffee className="w-6 h-6" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-sm sm:text-base text-[#6B7C70] dark:text-[#A0B0A5] leading-relaxed font-light"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#123524] dark:text-white tracking-tight">
              A Haven for Coffee Lovers & <span className="bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] bg-clip-text text-transparent">Food Dreamers</span>
            </h2>
            <p>
              Akole Café was founded on a simple belief: great coffee and genuine Maharashtrian warmth bring people together. What started as a passion project in Akole has grown into a cherished culinary sanctuary — a community where every cup is crafted with precision and care.
            </p>
            <p>
              We source our single-origin beans directly from shaded estates in Coorg and Chikmagalur. Every batch is micro-roasted in-house to bring out unique chocolate and nutty notes. Our baristas are trained not just in technique, but in the art of hospitality.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 3. Dark Emerald Mission & Vision Section */}
      <section className="py-20 bg-[#123524] text-white relative overflow-hidden">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#16231B] border border-[#D6AE4D]/30 shadow-2xl flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D]">
                <FiCompass className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D]">
                OUR MISSION
              </span>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                To craft exceptional coffee and culinary experiences that inspire connection, foster warmth, and celebrate slow living in a fast-paced world.
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#16231B] border border-[#D6AE4D]/30 shadow-2xl flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D]">
                <FiEye className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D]">
                OUR VISION
              </span>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                To be the gold standard of specialty coffee, artisanal baking, and Maharashtrian hospitality, inspiring a new generation of coffee culture.
              </p>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* 4. Milestones Timeline Section */}
      <section className="py-20 bg-[#F8F5EE] dark:bg-[#0F1712]">
        <Container className="max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block mb-2">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#123524] dark:text-white mb-14">
            Milestones of Excellence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(214, 174, 77, 0.15)" 
                }}
                className="p-8 rounded-[32px] bg-white/70 dark:bg-[#16231B]/75 backdrop-blur-md border border-[#D6AE4D]/25 shadow-xl flex flex-col items-center text-center space-y-3 relative group transition-all duration-300"
              >
                <span className="font-serif text-3xl font-extrabold text-[#D6AE4D]">
                  {item.year}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#123524] dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Team Section */}
      <section className="py-20 bg-white dark:bg-[#121A15] border-t border-gray-200/80 dark:border-[#D6AE4D]/20">
        <Container className="max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block mb-2">
            THE TEAM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#123524] dark:text-white mb-14">
            Meet the Artisans Behind Your Cup
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(214, 174, 77, 0.15)" 
                }}
                className="bg-white/75 dark:bg-[#16231B]/75 backdrop-blur-md rounded-[32px] p-8 shadow-xl border border-[#D6AE4D]/25 flex flex-col items-center text-center space-y-4 group transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#123524] text-[#D6AE4D] font-serif font-extrabold text-2xl flex items-center justify-center shadow-lg border border-[#D6AE4D]/40">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#D6AE4D] font-semibold uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Awards Section */}
      <section className="py-20 bg-[#F8F5EE] dark:bg-[#0F1712] border-t border-gray-200/80 dark:border-[#D6AE4D]/20">
        <Container className="max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block mb-2">
            RECOGNITION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#123524] dark:text-white mb-12">
            Awards & Accolades
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(214, 174, 77, 0.15)" 
                }}
                className="bg-white/75 dark:bg-[#16231B]/75 backdrop-blur-md rounded-[32px] p-8 border border-[#D6AE4D]/25 flex flex-col items-center text-center space-y-3 shadow-xl group transition-all duration-300"
              >
                <div className="text-[#D6AE4D] text-3xl mb-1">
                  <FiAward />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#123524] dark:text-white">
                  {award.title}
                </h4>
                <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light">
                  {award.category}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
};

export default About;
