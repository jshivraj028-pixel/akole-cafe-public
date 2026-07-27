import express from 'express';
import Order from '../models/Order.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// GET all orders (Admin view) - Sorted newest first
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// POST new order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, deliveryAddress, items, totalAmount, paymentMethod } = req.body;

    if (!customerName || !customerPhone || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required order details' });
    }

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = new Order({
      orderId,
      customerName,
      customerEmail: customerEmail || 'guest@akolecafe.com',
      customerPhone,
      deliveryAddress,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();

    // Create initial notification for customer
    try {
      if (savedOrder.customerEmail) {
        await Notification.create({
          userEmail: savedOrder.customerEmail.toLowerCase().trim(),
          title: 'Order Placed Successfully ☕',
          message: `Your order #${savedOrder.orderId} for ₹${savedOrder.totalAmount} has been received by Akole Cafe.`,
          type: 'order_update',
          orderId: savedOrder.orderId
        });
      }
    } catch (e) {}

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

// PUT update order status (Admin view with automatic Notification trigger)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const query = req.params.id.startsWith('ORD-') ? { orderId: req.params.id } : { _id: req.params.id };

    const updatedOrder = await Order.findOneAndUpdate(
      query,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Generate automatic customer notification based on status
    try {
      if (updatedOrder.customerEmail) {
        let title = `Order Update: ${status}`;
        let message = `Your order #${updatedOrder.orderId} status has been updated to ${status}.`;

        if (status === 'Confirmed') {
          title = 'Order Confirmed 🎉';
          message = `Your order #${updatedOrder.orderId} has been confirmed by Akole Cafe and is being prepared!`;
        } else if (status === 'Out for Delivery') {
          title = 'Out for Delivery 🚚';
          message = `Great news! Your order #${updatedOrder.orderId} is Out for Delivery. Our agent is on the way to ${updatedOrder.deliveryAddress}.`;
        } else if (status === 'Delivered') {
          title = 'Order Delivered ✅';
          message = `Order #${updatedOrder.orderId} has been successfully Delivered. Enjoy your meal!`;
        } else if (status === 'Cancelled') {
          title = 'Order Cancelled ❌';
          message = `Order #${updatedOrder.orderId} has been cancelled.`;
        }

        await Notification.create({
          userEmail: updatedOrder.customerEmail.toLowerCase().trim(),
          title,
          message,
          type: 'order_update',
          orderId: updatedOrder.orderId
        });
      }
    } catch (notifErr) {
      console.warn('Could not save notification:', notifErr.message);
    }

    res.json({ message: `Order status updated to ${status}`, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});

// DELETE order (Admin view)
router.delete('/:id', async (req, res) => {
  try {
    const query = req.params.id.startsWith('ORD-') ? { orderId: req.params.id } : { _id: req.params.id };
    const deleted = await Order.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
});

export default router;
