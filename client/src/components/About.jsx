import React from 'react';
import './About.css';

export default function About({ profile }) {
  if (!profile) return null;

  return (
    <section className="section about-section grid-bg" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left */}
          <div className="about-left">
            <p className="section-tag">Who I Am</p>
            <h2 className="section-title">About Me</h2>
            <p className="about-bio">{profile.bio}</p>

            <div className="about-details">
              {profile.email && (
                <div className="detail-row">
                  <span className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <a href={`mailto:${profile.email}`} className="detail-value">{profile.email}</a>
                </div>
              )}
              {profile.phone && (
                <div className="detail-row">
                  <span className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span className="detail-value">{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="detail-row">
                  <span className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="detail-value">{profile.location}</span>
                </div>
              )}
            </div>

            {/* {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
                Download Resume
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            )} */}
          </div>

          {/* Right — Skills */}
          <div className="about-right">
            <h3 className="skills-title">Skills & Technologies</h3>
            <div className="skills-grid">
              {(profile.skills || []).map((group, i) => (
                <div className="skill-group glass-card" key={i}>
                  <h4 className="skill-category">{group.category}</h4>
                  <div className="skill-tags">
                    {(group.items || []).map((item, j) => (
                      <span key={j} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div className="education-section">
                <h3 className="skills-title" style={{ marginTop: '2rem' }}>Education</h3>
                {profile.education.map((edu, i) => (
                  <div className="edu-card glass-card" key={i}>
                    <div className="edu-header">
                      <h4 className="edu-degree">{edu.degree}</h4>
                      <span className="edu-year badge">{edu.year}</span>
                    </div>
                    <p className="edu-institution">{edu.institution}</p>
                    {edu.description && <p className="edu-desc">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
