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
        const profileData = profileRes?.data?.profile;
        const projectsData = projectsRes?.data?.projects;

        setProfile(profileData || null);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (err) {
        console.error('Failed to load data:', err);
        // Use fallback defaults
        setProfile({
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
              company: 'Verticode',
              role: 'Software Engineer',
              duration: '2025 - Present',
              description: 'Leading frontend development and mentoring junior developers.',
              current: true,
            },
            {
              company: 'Techguru',
              role: 'frontend Developer and API Developer',
              duration: '2024 - 2025',
              description: 'Built scalable APIs and React dashboards from scratch.',
              current: false,
            },
          ],
          education: [
            {
              institution: 'University of Technology',
              degree: 'BE Computer (Cmputer Engineering)',
              year: '2019 - 2024',
              description: 'Graduated with honors from Universal Engineering and Science College. Completed a final year project on heart disease prediction using decision tree and random forest models, focusing on building accurate and practical data-driven solutionsocus on software engineering.',
            },
          ],
          socials: {
            github: 'https://github.com/sudip56dhungana',
            linkedin: 'https://www.linkedin.com/in/er-sudip-dhungana-ab39501b7/',
            twitter: 'https://twitter.com/yourusername',
            facebook: 'https://www.facebook.com/sudip.dhungnana/',
          },
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
