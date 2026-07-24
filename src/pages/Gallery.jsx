import React from 'react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import GalleryGrid from '../components/gallery/GalleryGrid';

const Gallery = () => {
  return (
    <>
      <PageBanner
        title="Visual Showcase"
        subtitle="A Glimpse into the Ambiance, Artistry, & Atmosphere of Akole Cafe"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-secondary">
        <Container>
          <SectionTitle
            subtitle="EXPLORE OUR SPACE"
            title="The Art of Luxury Dining"
            description="Browse through our interior spaces, barista craft sessions, woodfired oven creations, and vibrant customer gatherings."
            centered
          />

          <div className="mt-12">
            <GalleryGrid />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Gallery;
