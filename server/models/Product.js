import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.8 },
    image: { type: String, required: true },
    tags: [{ type: String }],
    isBestseller: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    prepTime: { type: String, default: '10 mins' },
    calories: { type: String, default: '200 kcal' }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
