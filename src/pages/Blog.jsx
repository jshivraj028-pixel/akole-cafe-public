import React from 'react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import BlogCard from '../components/blog/BlogCard';
import { blogPosts } from '../data/blogs';

const Blog = () => {
  return (
    <>
      <PageBanner
        title="Coffee Chronicles & Journal"
        subtitle="Brewing Guides • Single-Origin Stories • Recipe Pairings"
        bgImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-secondary">
        <Container>
          <SectionTitle
            subtitle="FROM OUR MASTER BARISTAS"
            title="Insights & Brewing Culture"
            description="Expand your coffee knowledge with expert guides, bean origin stories, and artisanal recipe pairings from Akole Cafe."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Blog;
