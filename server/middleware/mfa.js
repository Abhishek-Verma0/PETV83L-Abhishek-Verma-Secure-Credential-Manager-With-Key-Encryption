const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify MFA is completed for sensitive operations
const requireMFA = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if this is a full auth token or just a pre-MFA token
    if (decoded.preAuth) {
      return res.status(403).json({ 
        message: 'MFA verification required',
        requiresMFA: true 
      });
    }

    const user = await User.findById(decoded.userId).select('-password -salt');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // If user has MFA enabled, ensure the token includes MFA verification
    if (user.mfaEnabled && !decoded.mfaVerified) {
      return res.status(403).json({ 
        message: 'MFA verification required',
        requiresMFA: true 
      });
    }

    req.user = { userId: user._id, ...decoded };
    next();
  } catch (error) {
    console.error('MFA middleware error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if MFA setup is allowed (user must be authenticated but MFA not required)
const requirePreAuth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password -salt');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { userId: user._id, ...decoded };
    next();
  } catch (error) {
    console.error('Pre-auth middleware error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = {
  requireMFA,
  requirePreAuth
};
