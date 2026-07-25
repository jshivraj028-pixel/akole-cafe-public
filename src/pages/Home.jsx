  import React from 'react';
import Hero from '../components/home/Hero';
import CoffeeExperience from '../components/home/CoffeeExperience';
import BestSeller from '../components/home/BestSeller';
import AboutCafe from '../components/home/AboutCafe';
import Testimonials from '../components/home/Testimonials';
import LoyaltyClub from '../components/home/LoyaltyClub';
import InstagramSection from '../components/home/InstagramSection';

const Home = ({ onQuickView }) => {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Vintage Botanical Coffee Cherry Banner & Dark Espresso Banner Card */}
      <CoffeeExperience />

      {/* 3. Bestsellers Section with Category Tabs */}
      <BestSeller onQuickView={onQuickView} />

      {/* 4. About Section - "Where Every Cup Tells a Story" */}
      <AboutCafe />

      {/* 5. Testimonials Section - "What Our Guests Say" */}
      <Testimonials />

      {/* 6. The Akole Loyalty Club Section */}
      <LoyaltyClub />

      {/* 7. Instagram Section - "@akolecafe" */}
      <InstagramSection />
    </>
  );
};

export default Home;
