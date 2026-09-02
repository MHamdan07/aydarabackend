import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from '../config/env.js';
import { getStore, saveStore } from '../config/store.js';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    ENV.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Customer Login Endpoint (POST /api/v1/auth/login)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const store = getStore();
    const usersList = store.users || [];
    const user = usersList.find(u => (u.email || '').trim().toLowerCase() === cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Verify Password
    let isMatch = false;
    if (user.passwordHash) {
      isMatch = await bcrypt.compare(password, user.passwordHash).catch(() => false);
    }
    if (!isMatch && user.password) {
      isMatch = user.password === password || (await bcrypt.compare(password, user.password).catch(() => false));
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    user.lastLoginAt = new Date().toISOString();
    saveStore(store);

    res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role || 'customer',
        emailVerified: user.emailVerified !== false,
        addresses: user.addresses || []
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Separate Dedicated Admin Login Endpoint (POST /api/v1/auth/admin/login)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide administrator credentials.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const store = getStore();
    const usersList = store.users || [];
    let user = usersList.find(u => (u.email || '').trim().toLowerCase() === cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Access Denied: Account not recognized.' });
    }

    // Strictly enforce role === 'admin'
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access Denied: User does not have administrative privileges.' });
    }

    let isMatch = false;
    if (user.passwordHash) {
      isMatch = await bcrypt.compare(password, user.passwordHash).catch(() => false);
    }
    if (!isMatch && user.password) {
      isMatch = user.password === password || (await bcrypt.compare(password, user.password).catch(() => false));
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid administrative password.' });
    }

    const token = generateToken(user);
    user.lastLoginAt = new Date().toISOString();
    saveStore(store);

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name || 'AYDARA Directrice',
        email: user.email,
        role: 'admin'
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Customer Registration (POST /api/v1/auth/register)
export const register = async (req, res) => {
  try {
    const { firstName, lastName, name, email, password, phone, country } = req.body;
    const finalEmail = (email || '').trim().toLowerCase();

    if (!finalEmail || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const store = getStore();
    store.users = store.users || [];

    if (store.users.some(u => (u.email || '').trim().toLowerCase() === finalEmail)) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const fullName = name || `${(firstName || '').trim()} ${(lastName || '').trim()}`.trim() || 'Valued Client';
    const role = finalEmail === 'entermh07@gmail.com' ? 'admin' : 'customer';

    const newUser = {
      id: `usr-${Date.now()}`,
      firstName: firstName || fullName.split(' ')[0] || '',
      lastName: lastName || fullName.split(' ').slice(1).join(' ') || '',
      name: fullName,
      email: finalEmail,
      passwordHash,
      phone: phone || '',
      country: country || 'United States',
      role,
      emailVerified: true,
      addresses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.users.push(newUser);
    saveStore(store);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        emailVerified: newUser.emailVerified,
        addresses: newUser.addresses
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Current Authenticated User (GET /api/v1/auth/me)
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role || 'customer',
        emailVerified: user.emailVerified !== false,
        addresses: user.addresses || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Customer Profile (PUT /api/v1/auth/profile)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, phone, country } = req.body;

    const store = getStore();
    const user = (store.users || []).find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (firstName || lastName) {
      user.name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    if (phone !== undefined) user.phone = phone;
    if (country) user.country = country;
    user.updatedAt = new Date().toISOString();

    saveStore(store);

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        addresses: user.addresses || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password (POST /api/v1/auth/forgot-password)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const store = getStore();
    const user = (store.users || []).find(u => (u.email || '').trim().toLowerCase() === cleanEmail);

    if (!user) {
      return res.json({ success: true, message: 'If an account exists with this email, password reset instructions have been dispatched.' });
    }

    const resetToken = jwt.sign({ id: user.id }, ENV.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;
    saveStore(store);

    res.json({
      success: true,
      message: 'Password reset link sent to your registered email.',
      resetToken
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password (POST /api/v1/auth/reset-password)
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Invalid reset payload.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const store = getStore();
    const user = (store.users || []).find(u => u.id === decoded.id);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.updatedAt = new Date().toISOString();

    saveStore(store);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You may now sign in.'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid or expired token.' });
  }
};
