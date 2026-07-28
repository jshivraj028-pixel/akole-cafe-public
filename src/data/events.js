import eventMusicImg from '../assets/event-music.png';
import eventBaristaImg from '../assets/event-barista.png';
import seatingMezzanineImg from '../assets/seating-mezzanine.png';
import seatingPatioImg from '../assets/seating-patio.png';

export const eventsData = [
  {
    id: 'ev-1',
    title: 'Saturday Evening Live Jazz & Acoustic Guitar',
    category: 'Live Music',
    date: 'Every Saturday',
    time: '7:30 PM - 10:00 PM',
    location: 'Akole Cafe Garden Patio',
    price: 'Free Entry for Guests',
    image: eventMusicImg,
    description: 'Relax under twinkling garden lights with soulful live jazz, acoustic unplugged classics, and signature mocktails.',
    features: ['Live Musician Band', 'Outdoor Garden Seating', 'Special Evening Menu', 'Complimentary Welcome Drink']
  },
  {
    id: 'ev-2',
    title: 'Masterclass: Latte Art & Espresso Cupping',
    category: 'Coffee Workshops',
    date: '1st & 3rd Sunday of Every Month',
    time: '10:30 AM - 1:00 PM',
    location: 'Barista Lab',
    price: '₹ 1,200 per attendee',
    image: eventBaristaImg,
    description: 'Hands-on session with Head Barista Rohan. Learn steam texturing, pouring rosettes and heart art, and origin tasting.',
    features: ['Take-home Akole Coffee Bag (250g)', 'Certificate of Participation', 'Snack & Coffee Tasting Included', 'Limited to 10 Seats']
  },
  {
    id: 'ev-3',
    title: 'Chef Special Weekend Sourdough & Pizza Night',
    category: 'Weekend Specials',
    date: 'Fridays & Sundays',
    time: '6:00 PM - 11:00 PM',
    location: 'Main Dining Lounge',
    price: 'À la carte dining',
    image: seatingPatioImg,
    description: 'Exclusive 48-hour fermented sourdough woodfired pizzas topped with imported Italian cheeses and local organic herbs.',
    features: ['Off-Menu Chef Creations', 'Custom Wine & Mocktail Pairings', 'Live Pizza Stretcher Show']
  },
  {
    id: 'ev-4',
    title: 'Private Birthday & VIP Anniversary Dinners',
    category: 'Private Parties',
    date: 'On Reservation',
    time: 'Custom Slot',
    location: 'Royal Mezzanine Deck',
    price: 'Customized Packages',
    image: seatingMezzanineImg,
    description: 'Transform your special milestones into unforgettable moments with personalized table setup, custom multi-course menus, and dedicated butler service.',
    features: ['Custom Flower & Candle Setup', 'Bespoke Celebration Cake', 'Dedicated Service Captain', 'Private Audio System']
  }
];
