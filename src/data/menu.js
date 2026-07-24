export const menuCategories = [
  { id: 'all', name: 'All Items', icon: '☕' },
  { id: 'hot-coffee', name: 'Hot Coffee', icon: '🔥' },
  { id: 'cold-coffee', name: 'Cold Coffee', icon: '🧊' },
  { id: 'espresso', name: 'Espresso', icon: '⚡' },
  { id: 'tea', name: 'Artisanal Tea', icon: '🫖' },
  { id: 'pizza', name: 'Gourmet Pizza', icon: '🍕' },
  { id: 'burger', name: 'Craft Burger', icon: '🍔' },
  { id: 'sandwich', name: 'Artisan Sandwich', icon: '🥪' },
  { id: 'desserts', name: 'Decadent Desserts', icon: '🍰' },
  { id: 'ice-cream', name: 'Gelato & Ice Cream', icon: '🍨' },
  { id: 'mocktails', name: 'Signature Mocktails', icon: '🍹' },
];

export const menuItems = [
  // HOT COFFEE
  {
    id: 'hc-1',
    name: 'Akole Signature Gold Latte',
    category: 'hot-coffee',
    description: 'Infused with edible 24k gold flakes, single-origin Arabica espresso, steamed oat milk, and Madagascar vanilla.',
    price: 340,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    tags: ['Signature', 'Bestseller', '24K Gold'],
    isBestseller: true,
    prepTime: '8 mins',
    calories: '180 kcal'
  },
  {
    id: 'hc-2',
    name: 'Royal Cardamom Cappuccino',
    category: 'hot-coffee',
    description: 'A rich blend of Indian green cardamom, slow-roasted beans, and silky foam with cinnamon dust.',
    price: 260,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    tags: ['Indian Spice', 'Chef Choice'],
    isBestseller: true,
    prepTime: '6 mins',
    calories: '150 kcal'
  },
  {
    id: 'hc-3',
    name: 'Belgian Dark Chocolate Mocha',
    category: 'hot-coffee',
    description: '70% dark Belgian cocoa blended with rich espresso and velvet microfoam.',
    price: 290,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    tags: ['Rich Chocolate'],
    isBestseller: false,
    prepTime: '7 mins',
    calories: '240 kcal'
  },
  {
    id: 'hc-4',
    name: 'Hazelnut Praline Flat White',
    category: 'hot-coffee',
    description: 'Double shot espresso combined with micro-textured milk and house-roasted roasted hazelnut syrup.',
    price: 270,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=800&q=80',
    tags: ['Nutty', 'Smooth'],
    isBestseller: false,
    prepTime: '5 mins',
    calories: '160 kcal'
  },

  // COLD COFFEE
  {
    id: 'cc-1',
    name: 'Sahyadri Cold Brew Tonic',
    category: 'cold-coffee',
    description: '24-hour steep cold brew poured over sparkling tonic water, rosemary stem, and dehydrated orange slice.',
    price: 280,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    tags: ['Refreshing', 'Bestseller'],
    isBestseller: true,
    prepTime: '4 mins',
    calories: '45 kcal'
  },
  {
    id: 'cc-2',
    name: 'Caramel Macchiato Cloud',
    category: 'cold-coffee',
    description: 'Iced espresso with whipped sea-salt caramel cold foam and raw cane sugar drizzle.',
    price: 310,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    tags: ['Sweet & Creamy'],
    isBestseller: true,
    prepTime: '5 mins',
    calories: '220 kcal'
  },
  {
    id: 'cc-3',
    name: 'Spanish Iced Latte',
    category: 'cold-coffee',
    description: 'Espresso poured over chilled condensed milk, whole milk, and ice crystals.',
    price: 290,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular'],
    isBestseller: false,
    prepTime: '5 mins',
    calories: '210 kcal'
  },

  // ESPRESSO
  {
    id: 'esp-1',
    name: 'Single Origin Chikmagalur Shot',
    category: 'espresso',
    description: 'Extracted under 9 bars of pressure. Notes of wild honey, green apple, and dark cocoa finish.',
    price: 180,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    tags: ['Pure Espresso', '100% Arabica'],
    isBestseller: false,
    prepTime: '3 mins',
    calories: '5 kcal'
  },
  {
    id: 'esp-2',
    name: 'Affogato al Caffe',
    category: 'espresso',
    description: 'Hot concentrated espresso shot poured over a scoop of artisanal Madagascar vanilla bean gelato.',
    price: 250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80',
    tags: ['Dessert Coffee'],
    isBestseller: true,
    prepTime: '4 mins',
    calories: '190 kcal'
  },

  // TEA
  {
    id: 'tea-1',
    name: 'Saffron Masala Chai Supreme',
    category: 'tea',
    description: 'Brewed with Kashmiri saffron strands, green cardamom, fresh ginger, and organic Assam CTC tea leaves.',
    price: 210,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    tags: ['Royal Blend', 'Heritage'],
    isBestseller: true,
    prepTime: '6 mins',
    calories: '110 kcal'
  },
  {
    id: 'tea-2',
    name: 'Blue Pea Flower Matcha Green Tea',
    category: 'tea',
    description: 'Anti-oxidant rich Japanese Ceremonial Matcha layered with blue butterfly pea infusion and almond milk.',
    price: 280,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    tags: ['Superfood', 'Healthy'],
    isBestseller: false,
    prepTime: '5 mins',
    calories: '90 kcal'
  },

  // PIZZA
  {
    id: 'piz-1',
    name: 'Truffle Mushroom & Burrata Pizza',
    category: 'pizza',
    description: 'Hand-tossed sourdough crust, black truffle cream base, wild sautéed mushrooms, fresh Italian burrata, and basil leaves.',
    price: 580,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    tags: ['Sourdough', 'Gourmet'],
    isBestseller: true,
    prepTime: '18 mins',
    calories: '680 kcal'
  },
  {
    id: 'piz-2',
    name: 'Akole Farmhouse Woodfired Pizza',
    category: 'pizza',
    description: 'San Marzano tomato sauce, fresh mozzarella, charred bell peppers, baby corn, olives, sun-dried tomatoes, and oregano.',
    price: 490,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    tags: ['Fresh Veggies', 'Local Classic'],
    isBestseller: false,
    prepTime: '15 mins',
    calories: '590 kcal'
  },

  // BURGER
  {
    id: 'brg-1',
    name: 'Smokey Avocado & Paneer Craft Burger',
    category: 'burger',
    description: 'Brioche bun, crisp spiced paneer patty, smashed hass avocado, smoked chipotle aioli, caramelized onions, and aged cheddar.',
    price: 360,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Artisan Brioche', 'Chef Recommended'],
    isBestseller: true,
    prepTime: '12 mins',
    calories: '540 kcal'
  },
  {
    id: 'brg-2',
    name: 'Double Truffle Mushroom Burger',
    category: 'burger',
    description: 'Charcoal brioche, portobello Mushroom patty, truffle Mayo, baby arugula, and melted Swiss cheese.',
    price: 390,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    tags: ['Charcoal Bun'],
    isBestseller: false,
    prepTime: '14 mins',
    calories: '510 kcal'
  },

  // SANDWICH
  {
    id: 'snd-1',
    name: 'Pesto Caprese Focaccia Melt',
    category: 'sandwich',
    description: 'House-made rosemary focaccia, heirloom tomatoes, buffalo mozzarella, fresh basil pesto, and balsamic glaze.',
    price: 320,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tags: ['Italian Focaccia'],
    isBestseller: true,
    prepTime: '10 mins',
    calories: '420 kcal'
  },

  // DESSERTS
  {
    id: 'des-1',
    name: 'Classic Venetian Tiramisu',
    category: 'desserts',
    description: 'Savoiardi ladyfingers soaked in Akole espresso, layered with mascarpone cream and dusted with Valrhona cocoa.',
    price: 340,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    tags: ['House Specialty', 'Authentic'],
    isBestseller: true,
    prepTime: '5 mins',
    calories: '380 kcal'
  },
  {
    id: 'des-2',
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'desserts',
    description: 'Warm dark chocolate cake with a gooey center, served alongside vanilla gelato and berry compote.',
    price: 320,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    tags: ['Warm & Indulgent'],
    isBestseller: false,
    prepTime: '10 mins',
    calories: '460 kcal'
  },

  // ICE CREAM
  {
    id: 'ice-1',
    name: 'Pistachio Sicilian Gelato Cup',
    category: 'ice-cream',
    description: 'Slow-churned gelato made with 100% Bronte Sicilian pistachios, roasted nut crunch, and waffle cone wedge.',
    price: 240,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f4078b57?auto=format&fit=crop&w=800&q=80',
    tags: ['Artisanal Gelato'],
    isBestseller: true,
    prepTime: '3 mins',
    calories: '220 kcal'
  },

  // MOCKTAILS
  {
    id: 'mck-1',
    name: 'Passionfruit Lavender Fizz',
    category: 'mocktails',
    description: 'Fresh passionfruit pulp, organic lavender syrup, sparkling water, crushed ice, and mint leaf crown.',
    price: 260,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    tags: ['Cooler', 'Botanical'],
    isBestseller: true,
    prepTime: '4 mins',
    calories: '120 kcal'
  },
  {
    id: 'mck-2',
    name: 'Smoked Berry & Hibiscus Elixir',
    category: 'mocktails',
    description: 'Cold-pressed wild berries, hibiscus blossom tea, apple wood smoke, and lime twist.',
    price: 290,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    tags: ['Smokey', 'Signature'],
    isBestseller: false,
    prepTime: '5 mins',
    calories: '135 kcal'
  }
];
