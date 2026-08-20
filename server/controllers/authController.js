import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Admin login & verify against MongoDB
// @route   POST /api/auth/admin-login
// @access  Public (Only authorized emails match)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if admin exists in MongoDB
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        department: admin.department,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid Admin credentials or unauthorized account' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current logged in admin profile
// @route   GET /api/auth/me
// @access  Private (Admin only)
export const getAdminProfile = async (req, res) => {
  if (req.admin) {
    res.json(req.admin);
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
};
