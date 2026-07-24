import { menuItems } from '../data/menu';
import { eventsData } from '../data/events';
import { blogPosts } from '../data/blogs';

// Simulated API service for Akole Cafe
export const fetchMenuItems = async (category = 'all') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'all') resolve(menuItems);
      else resolve(menuItems.filter(item => item.category === category));
    }, 200);
  });
};

export const fetchEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(eventsData), 200);
  });
};

export const fetchBlogPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(blogPosts), 200);
  });
};

export const submitReservation = async (reservationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        bookingId: 'AKL-' + Math.floor(100000 + Math.random() * 900000),
        message: 'Table reservation received successfully.'
      });
    }, 500);
  });
};
