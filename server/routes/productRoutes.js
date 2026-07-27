import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products with optional category and search filters
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && search.trim()) {
      const terms = search.trim().split(/\s+/).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(Boolean);
      if (terms.length > 0) {
        query.$and = terms.map(term => ({
          $or: [
            { name: { $regex: term, $options: 'i' } },
            { description: { $regex: term, $options: 'i' } },
            { category: { $regex: term, $options: 'i' } },
            { tags: { $regex: term, $options: 'i' } }
          ]
        }));
      }
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    let product = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      product = await Product.findById(req.params.id);
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST create new product (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, category, description, price, rating, image, tags, isBestseller, prepTime, calories } = req.body;
    
    if (!name || !category || !description || price === undefined) {
      return res.status(400).json({ message: 'Name, category, description and price are required.' });
    }

    const newProduct = new Product({
      name,
      category,
      description,
      price: Number(price),
      rating: rating ? Number(rating) : 4.8,
      image: image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      isBestseller: Boolean(isBestseller),
      prepTime: prepTime || '10 mins',
      calories: calories || '200 kcal'
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT update product by ID (Admin) - Supports both ObjectId & custom string IDs
router.put('/:id', async (req, res) => {
  try {
    const { name, category, description, price, rating, image, tags, isBestseller, prepTime, calories } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (rating !== undefined) updateData.rating = Number(rating);
    if (image !== undefined) updateData.image = image;
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    if (isBestseller !== undefined) updateData.isBestseller = Boolean(isBestseller);
    if (prepTime !== undefined) updateData.prepTime = prepTime;
    if (calories !== undefined) updateData.calories = calories;

    let updatedProduct = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    }

    if (!updatedProduct && name) {
      updatedProduct = await Product.findOneAndUpdate({ name }, updateData, { new: true });
    }

    if (!updatedProduct) {
      const newProd = new Product({
        name: name || 'Custom Product',
        category: category || 'Hot Coffee',
        description: description || '',
        price: price ? Number(price) : 100,
        rating: rating ? Number(rating) : 4.8,
        image: image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
        isBestseller: Boolean(isBestseller),
        prepTime: prepTime || '10 mins',
        calories: calories || '200 kcal'
      });
      updatedProduct = await newProd.save();
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE product by ID (Admin)
router.delete('/:id', async (req, res) => {
  try {
    let deletedProduct = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      deletedProduct = await Product.findByIdAndDelete(req.params.id);
    }
    if (!deletedProduct && req.query.name) {
      deletedProduct = await Product.findOneAndDelete({ name: req.query.name });
    }
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

export default router;
