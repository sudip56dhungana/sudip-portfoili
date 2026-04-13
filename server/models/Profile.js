const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    bio: { type: String },
    shortBio: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    skills: [
      {
        category: String,
        items: [String],
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
        current: { type: Boolean, default: false },
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        year: String,
        description: String,
      },
    ],
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
