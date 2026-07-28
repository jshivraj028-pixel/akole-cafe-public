import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'akole_cafe_secret_key_2026';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');

      if (!user || user.isDeleted) {
        return res.status(401).json({ message: 'Account not found or has been deleted.' });
      }

      if (user.isBanned) {
        return res.status(403).json({ message: 'Your account has been banned.' });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

export const adminProtect = async (req, res, next) => {
  await protect(req, res, () => {
    if (req.user && (req.user.role === 'admin' || req.user.email.toLowerCase() === 'akolecafe@gmail.com')) {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied: Administrator privileges required.' });
    }
  });
};
