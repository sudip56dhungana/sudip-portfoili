import React, { useState } from 'react';
import './Experience.css';

export default function Experience({ profile }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const experience = profile?.experience || [];

  if (experience.length === 0) return null;

  const active = experience[activeIdx];

  return (
    <section className="section experience-section grid-bg" id="experience">
      <div className="container">
        <p className="section-tag">Career Path</p>
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
          My professional journey and the companies I've had the pleasure of working with.
        </p>

        <div className="experience-layout">
          {/* Sidebar */}
          <div className="experience-sidebar">
            {experience.map((exp, i) => (
              <button
                key={i}
                className={`exp-tab ${activeIdx === i ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className="exp-tab-company">{exp.company}</span>
                <span className="exp-tab-role">{exp.role}</span>
                {exp.current && <span className="current-dot" />}
              </button>
            ))}

            {/* Timeline line */}
            <div className="sidebar-line">
              <div
                className="sidebar-line-fill"
                style={{ height: `${((activeIdx + 0.5) / experience.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Detail panel */}
          <div className="experience-detail glass-card" key={activeIdx}>
            <div className="detail-header">
              <div>
                <h3 className="detail-role">{active.role}</h3>
                <p className="detail-company">
                  @ <span>{active.company}</span>
                </p>
              </div>
              <div className="detail-meta">
                <span className="badge">{active.duration}</span>
                {active.current && (
                  <span className="current-badge">
                    <span className="dot-pulse" />
                    Current
                  </span>
                )}
              </div>
            </div>

            <div className="divider" style={{ margin: '1.5rem 0' }} />

            <p className="detail-description">{active.description}</p>

            <div className="detail-nav">
              <button
                className="nav-arrow"
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx(activeIdx - 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <span className="nav-counter">
                {activeIdx + 1} / {experience.length}
              </span>
              <button
                className="nav-arrow"
                disabled={activeIdx === experience.length - 1}
                onClick={() => setActiveIdx(activeIdx + 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
