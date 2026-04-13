import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { getProfile, getProjects } from '../api';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          getProfile(),
          getProjects(),
        ]);
        setProfile(profileRes.data.profile);
        setProjects(projectsRes.data.projects);
      } catch (err) {
        console.error('Failed to load data:', err);
        // Use fallback defaults
        setProfile({
          name: 'Your Name',
          title: 'Full Stack Developer',
          subtitle: 'Building beautiful web experiences',
          bio: 'A passionate developer who loves crafting clean and efficient code.',
          shortBio: 'Full Stack Developer | React | Node.js | MongoDB',
          email: 'sudipdhungana41@gmail.com',
          location: 'Kathmandu, Nepal',
          skills: [
            { category: 'Frontend', items: ['React', 'JavaScript', 'CSS3'] },
            { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
            { category: 'Database', items: ['MongoDB', 'PostgreSQL'] },
            { category: 'DevOps', items: ['Git', 'Docker', 'AWS'] },
          ],
          experience: [
            {
              company: 'Tech Corp',
              role: 'Senior Developer',
              duration: '2022 - Present',
              description: 'Leading frontend development and mentoring junior developers.',
              current: true,
            },
          ],
          education: [
            {
              institution: 'University of Technology',
              degree: 'BE Computer (Cmputer Engineering)',
              year: '2019 - 2024',
              description: 'Graduated with honors.',
            },
          ],
          socials: { github: '#', linkedin: '#', twitter: '#', facebook: '#' },
        });
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <Navbar profileName={profile?.name} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Portfolio projects={projects} />
        <Experience profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
