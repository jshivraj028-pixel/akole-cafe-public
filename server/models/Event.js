import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, default: 'Akole Cafe' },
  price: { type: String, default: 'Free' },
  image: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
