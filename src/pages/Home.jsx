import React from 'react';
import Hero from '../components/home/Hero';
import CoffeeExperience from '../components/home/CoffeeExperience';
import BestSeller from '../components/home/BestSeller';
import AboutCafe from '../components/home/AboutCafe';
import WhyChooseUs from '../components/home/WhyChooseUs';
import LoyaltyClub from '../components/home/LoyaltyClub';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';
import InstagramSection from '../components/home/InstagramSection';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <CoffeeExperience />
      <BestSeller />
      <AboutCafe />
      <WhyChooseUs />
      <LoyaltyClub />
      <GalleryPreview />
      <Testimonials />
      <InstagramSection />
      <Newsletter />
    </>
  );
};

export default Home;
