const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/messages - Send contact message (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: errors.join(', ') });
    }
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

// GET /api/messages - Get all messages (admin)
router.get('/', async (req, res) => {
  try {
    // Simple password check via query param (use proper auth in production)
    const { adminKey } = req.query;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    const unreadCount = await Message.countDocuments({ isRead: false });

    res.json({ success: true, messages, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH /api/messages/:id/read - Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const { adminKey } = req.body;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });

    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/messages/:id - Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const { adminKey } = req.body;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
