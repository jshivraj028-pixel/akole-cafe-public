import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true }, // Specific email or 'ALL' for broadcast
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['order_update', 'custom_admin', 'price_change', 'broadcast'], 
      default: 'order_update' 
    },
    orderId: { type: String, default: '' },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
