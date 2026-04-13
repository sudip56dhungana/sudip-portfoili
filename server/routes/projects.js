const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/projects - Create project (admin)
router.post('/', async (req, res) => {
  try {
    const { adminKey, ...data } = req.body;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    const project = new Project(data);
    await project.save();
    res.status(201).json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT /api/projects/:id - Update project (admin)
router.put('/:id', async (req, res) => {
  try {
    const { adminKey, ...data } = req.body;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!project) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/projects/:id - Delete project (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { adminKey } = req.body;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
