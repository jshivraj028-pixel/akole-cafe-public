import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiCompass, FiEye, FiAward, FiBookmark } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';

const milestones = [
  {
    year: '2018',
    title: 'The First Brew',
    description: 'Akole Café was born in a cozy corner of Akole, serving our first handcrafted lattes and artisanal food.'
  },
  {
    year: '2020',
    title: 'In-House Roastery',
    description: 'We launched our in-house roaster, sourcing single-origin beans directly from Coorg and Chikmagalur.'
  },
  {
    year: '2023',
    title: 'Best Specialty Café',
    description: 'Named Best Specialty Café at the India Coffee Awards and launched our franchise program.'
  }
];

const teamMembers = [
  {
    initials: 'RK',
    name: 'Rohan Kulkarni',
    role: 'Founder & Head Roaster'
  },
  {
    initials: 'MD',
    name: 'Meera Deshmukh',
    role: 'Creative Director'
  }
];

const awards = [
  {
    title: 'Best Specialty Café 2023',
    category: 'India Coffee Awards'
  },
  {
    title: 'Design Excellence',
    category: 'Hospitality Design Awards'
  }
];

const About = () => {
  return (
    <div className="bg-[#F5EFE3] min-h-screen text-[#1F3A2B]">
      {/* 1. Hero Page Banner */}
      <PageBanner
        title="Our"
        highlight="Story"
        subtitle="ABOUT US"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      {/* 2. Brand Story Paragraph Section */}
      <section className="py-16 sm:py-24 bg-[#F5EFE3]">
        <Container className="max-w-3xl text-center space-y-6">
          {/* Top Coffee Icon in Golden Ring */}
          <div className="w-12 h-12 rounded-full border border-[#C8A96A]/60 flex items-center justify-center text-[#C8A96A] mx-auto mb-2">
            <FiCoffee className="w-6 h-6 stroke-[1.5]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-[#4A5D50] text-sm sm:text-base leading-relaxed font-light"
          >
            <p>
              Akole Café was founded on a simple belief: great coffee brings people together. What started as a small passion project in a corner of Mumbai has grown into a movement — a community of coffee lovers, great food, and dreamers who share a love for the perfect cup.
            </p>
            <p>
              We source our beans directly from estates in Coorg, Chikmagalur, and select international origins. Every blend is roasted in-house to bring out the unique character of each origin. Our baristas are trained not just in technique, but in the art of creating experiences.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 3. Dark Espresso Brown Mission & Vision Section */}
      <section className="py-20 bg-[#351E13] text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center space-y-4 px-4"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 border border-[#C8A96A]/40 flex items-center justify-center text-[#D4B055] mb-1">
                <FiCompass className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4B055]">
                OUR MISSION
              </span>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-md">
                To craft exceptional coffee experiences that inspire connection, foster creativity, and celebrate the art of slow living in a fast-paced world.
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center text-center space-y-4 px-4"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 border border-[#C8A96A]/40 flex items-center justify-center text-[#D4B055] mb-1">
                <FiEye className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4B055]">
                OUR VISION
              </span>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-md">
                To be the benchmark of specialty coffee and community, inspiring a new generation of coffee culture.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. Milestones Timeline Section */}
      <section className="py-20 bg-[#F5EFE3]">
        <Container className="max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] block mb-2">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F3A2B] mb-12">
            Milestones
          </h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:left-1/2 before:-ml-px before:w-0.5 before:bg-[#D4B055]/30">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col items-center space-y-2 z-10 bg-[#F5EFE3] py-2 px-4"
              >
                <div className="w-3 h-3 rounded-full bg-[#D4B055] ring-4 ring-[#F5EFE3]" />
                <span className="font-serif text-2xl font-bold text-[#D4B055]">
                  {item.year}
                </span>
                <h4 className="font-serif italic text-lg font-medium text-[#1F3A2B]">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7C70] font-light max-w-md leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Team Section */}
      <section className="py-20 bg-[#F5EFE3] border-t border-[#C8A96A]/20">
        <Container className="max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] block mb-2">
            THE TEAM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F3A2B] mb-12">
            Meet the People Behind Your Cup
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/80 rounded-2xl p-8 shadow-sm border border-[#E5DDD0] flex flex-col items-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-[#523120] text-[#D4B055] font-serif font-bold text-2xl flex items-center justify-center shadow-md">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1F3A2B]">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#6B7C70] font-light tracking-wide mt-0.5">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Awards & Recognition Section */}
      <section className="py-20 bg-[#F5EFE3] border-t border-[#C8A96A]/20">
        <Container className="max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] block mb-2">
            RECOGNITION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F3A2B] mb-12">
            Awards & Achievements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/80 rounded-2xl p-6 border border-[#E5DDD0] flex flex-col items-center text-center space-y-2 shadow-sm"
              >
                <div className="text-[#D4B055] text-2xl mb-1">
                  {idx === 0 ? <FiAward className="w-8 h-8 stroke-[1.5]" /> : <FiBookmark className="w-8 h-8 stroke-[1.5]" />}
                </div>
                <h4 className="font-serif text-base font-semibold text-[#1F3A2B]">
                  {award.title}
                </h4>
                <p className="text-xs text-[#6B7C70] font-light">
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
