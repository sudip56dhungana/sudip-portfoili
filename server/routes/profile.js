const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET /api/profile - Get profile
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Return default data if no profile exists
      return res.json({
        success: true,
        profile: {
          name: 'Your Name',
          title: 'Full Stack Developer',
          subtitle: 'Building beautiful web experiences',
          bio: 'I’m a full-stack developer focused on helping clients bring their ideas online. I build complete web solutions—from user-friendly interfaces to solid backend systems so you get a reliable product without the hassle. I care about clean work, clear communication, and delivering results that meet your needs.',
          shortBio: 'Full Stack Developer | React | Node.js | MongoDB',
          email: 'sudipdhungana41@gmail.com',
          phone: '+9779847108767',
          location: 'Kathmandu, Nepal',
          skills: [
            { category: 'Frontend', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind'] },
            { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL'] },
            { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'] },
            { category: 'DevOps', items: ['Git', 'Docker', 'AWS', 'CI/CD'] },
          ],
          experience: [
            {
              company: 'Tech Corp',
              role: 'Senior Developer',
              duration: '2022 - Present',
              description: 'Leading frontend development and mentoring junior developers.',
              current: true,
            },
            {
              company: 'Startup XYZ',
              role: 'Full Stack Developer',
              duration: '2020 - 2022',
              description: 'Built scalable APIs and React dashboards from scratch.',
              current: false,
            },
          ],
          education: [
            {
              institution: 'University of Technology',
              degree: 'BE Computer (Cmputer Engineering)',
              year: '2019 - 2024',
              description: 'Graduated with honors. FGraduated with honors from Universal Engineering and Science College. Completed a final year project on heart disease prediction using decision tree and random forest models, focusing on building accurate and practical data-driven solutionsocus on software engineering.',
            },
          ],
          socials: {
            github: 'https://github.com/sudip56dhungana',
            linkedin: 'https://www.linkedin.com/in/er-sudip-dhungana-ab39501b7/',
            twitter: 'https://twitter.com/yourusername',
            facebook: 'https://www.facebook.com/sudip.dhungnana/',
          },
        },
      });
    }
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT /api/profile - Update profile (admin)
router.put('/', async (req, res) => {
  try {
    const { adminKey, ...data } = req.body;
    if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, data, { new: true, runValidators: true });
    } else {
      profile = new Profile(data);
      await profile.save();
    }

    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
