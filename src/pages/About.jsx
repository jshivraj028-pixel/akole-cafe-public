import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiHeart, FiUserCheck, FiCoffee, FiFeather } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';

const values = [
  {
    icon: FiCoffee,
    title: 'Single-Origin Precision',
    description: 'We source 100% shade-grown Arabica beans from high-altitude estates in Chikmagalur, roasted to perfection weekly.'
  },
  {
    icon: FiShield,
    title: 'Uncompromised Quality',
    description: 'From imported Italian burrata cheese to organic Kashmiri saffron, every ingredient is selected with uncompromising standards.'
  },
  {
    icon: FiHeart,
    title: 'Warm Maharashtrian Hospitality',
    description: 'We treat every guest like royalty, blending global luxury standards with genuine local warmth in Akole.'
  },
  {
    icon: FiFeather,
    title: 'Botanical Sanctuary',
    description: 'Our interiors feature lush living green walls, custom brass accents, and acoustics designed for serene conversations.'
  }
];

const teamMembers = [
  {
    name: 'Rohan Kulkarni',
    role: 'Head Coffee Roaster & Master Barista',
    bio: 'Certified Q-Grader with 12 years of specialty coffee brewing experience across Milan and India.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Riya Sharma',
    role: 'Executive Pastry Chef',
    bio: 'Le Cordon Bleu graduate specializing in authentic Venetian tiramisu and artisanal French viennoiserie.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Aniket Deshmukh',
    role: 'Culinary Director & Sourdough Specialist',
    bio: 'Pioneer of slow-fermented 48-hour sourdough pizzas baked in 450°C woodfired ovens.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  }
];

const About = () => {
  return (
    <>
      <PageBanner
        title="Our Heritage & Story"
        subtitle="Bringing World-Class Coffee & Culinary Excellence to Akole, Maharashtra"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Story Section */}
      <section className="py-20 bg-secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-accent-gold/40 shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
                  alt="Akole Cafe Interior"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl border border-accent-gold/40 shadow-gold max-w-xs text-secondary hidden sm:block">
                <span className="font-serif text-3xl font-bold text-accent-gold">Est. 2024</span>
                <p className="text-xs text-secondary/80 mt-1 font-light">Akole's first luxury destination coffee bar & restaurant.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6 text-dark"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-goldDark block">
                The Journey of Akole Cafe
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
                Where Passion for Coffee Meets <span className="text-gold-gradient italic font-normal">Memorable Hospitality</span>
              </h2>

              <p className="text-sm sm:text-base text-dark/80 font-light leading-relaxed">
                Founded with a vision to redefine rural and semi-urban dining experiences in Maharashtra, Akole Cafe was born out of a deep love for handcrafted specialty coffee, authentic woodfired gastronomy, and elegant architectural design.
              </p>

              <p className="text-sm text-dark/70 font-light leading-relaxed">
                Located in the scenic town of Akole, surrounded by the majestic Sahyadri ranges, our cafe serves as a sanctuary where friends gather, families celebrate milestones, and professionals find inspiration over freshly brewed cups of gold-infused lattes.
              </p>

              {/* Mission & Vision Pill box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-primary text-secondary border border-accent-gold/30">
                  <h4 className="font-serif text-base font-bold text-accent-gold mb-1">Our Mission</h4>
                  <p className="text-xs text-secondary/70 font-light">To deliver uncompromised luxury coffee and culinary experiences accessible to everyone in Maharashtra.</p>
                </div>
                <div className="p-4 rounded-xl bg-primary text-secondary border border-accent-gold/30">
                  <h4 className="font-serif text-base font-bold text-accent-gold mb-1">Our Vision</h4>
                  <p className="text-xs text-secondary/70 font-light">To become India's benchmark for regional luxury cafe chains celebrating local heritage and international standards.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-primary text-secondary relative overflow-hidden">
        <div className="botanical-glow top-1/2 left-10 opacity-30" />
        <Container>
          <SectionTitle
            subtitle="OUR PILLARS"
            title="What Sets Akole Cafe Apart"
            description="Built upon unyielding quality standards, sustainable direct-trade sourcing, and guest-first commitment."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-gradient text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <val.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-secondary mb-2 group-hover:text-accent-gold transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs text-secondary/70 font-light leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <Container>
          <SectionTitle
            subtitle="THE ARTISANS"
            title="Meet Our Master Chefs & Baristas"
            description="Our passionate team brings decades of combined culinary expertise and world-class craft to your table."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card rounded-2xl overflow-hidden border border-accent-gold/20 shadow-luxury group"
              >
                <div className="h-72 overflow-hidden bg-primary-dark">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center bg-white">
                  <h4 className="font-serif text-xl font-bold text-primary group-hover:text-coffee transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs uppercase font-semibold text-accent-goldDark tracking-wider my-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-dark/70 font-light mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;
