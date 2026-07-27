import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, default: 'General' },
  date: { type: String, required: true },
  author: { type: String, required: true },
  authorRole: { type: String, default: 'Author' },
  readTime: { type: String, default: '5 min read' },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
