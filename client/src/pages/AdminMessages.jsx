import React, { useState } from 'react';
import { getMessages, markMessageRead, deleteMessage, createProject, getProjects, deleteProject } from '../api';
import './AdminMessages.css';

export default function AdminMessages() {
  const [adminKey, setAdminKey] = useState('');
  const [inputKey, setInputKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [error, setError] = useState('');
  const [projectError, setProjectError] = useState('');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [filter, setFilter] = useState('all'); // all | unread | read
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    techStack: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    category: 'web'
  });

  const fetchProjects = async () => {
    setProjectLoading(true);
    setProjectError('');
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (err) {
      setProjectError('Failed to load projects.');
    } finally {
      setProjectLoading(false);
    }
  };

  const fetchMessages = async (key) => {
    setLoading(true);
    setError('');
    try {
      const res = await getMessages(key);
      setMessages(res.data.messages);
      setUnreadCount(res.data.unreadCount);
      setAdminKey(key);
      await fetchProjects();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load messages. Check your admin key.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    fetchMessages(inputKey.trim());
  };

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id, adminKey);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
      if (selectedMsg?._id === id) setSelectedMsg({ ...selectedMsg, isRead: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id, adminKey);
      if (selectedMsg?._id === id) setSelectedMsg(null);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const techStack = projectForm.techStack.split(',').map(t => t.trim()).filter(t => t);
      await createProject({ ...projectForm, techStack }, adminKey);
      await fetchProjects();
      setShowProjectForm(false);
      setProjectForm({
        title: '',
        description: '',
        longDescription: '',
        techStack: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        category: 'web'
      });
      alert('Project added successfully!');
    } catch (err) {
      console.error('Failed to add project:', err);
      alert('Failed to add project. Please try again.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await deleteProject(id, adminKey);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  const handleSelect = (msg) => {
    setSelectedMsg(msg);
    if (!msg.isRead) handleMarkRead(msg._id);
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead;
    if (filter === 'read') return m.isRead;
    return true;
  });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Login screen
  if (!adminKey) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 className="admin-login-title">Admin Access</h1>
          <p className="admin-login-sub">Sudip Dhunagana</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="form-input admin-key-input"
              placeholder="Admin key..."
              autoFocus
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Verifying...' : 'Access Messages'}
            </button>
          </form>

          <a href="/" className="admin-back-link">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <a href="/" className="admin-logo">
            <span style={{ color: 'var(--accent)' }}>&lt;</span>Portfolio<span style={{ color: 'var(--accent)' }}>/&gt;</span>
          </a>
          <span className="admin-sep">/</span>
          <span className="admin-page-label">Messages</span>
        </div>
        <div className="admin-header-right">
          <button
            className="btn-primary admin-add-project"
            onClick={() => setShowProjectForm(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
            Add Project
          </button>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} unread</span>
          )}
          <button
            className="btn-outline admin-refresh"
            onClick={() => fetchMessages(adminKey)}
            disabled={loading}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}>
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Refresh
          </button>
          <button
            className="btn-outline"
            onClick={() => { setAdminKey(''); setMessages([]); }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-filters">
            {['all', 'unread', 'read'].map((f) => (
              <button
                key={f}
                className={`sidebar-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="filter-count">
                  {f === 'all' ? messages.length : messages.filter(m => f === 'unread' ? !m.isRead : m.isRead).length}
                </span>
              </button>
            ))}
          </div>

          <div className="messages-list">
            {loading ? (
              <div className="list-loading">
                <div className="loading-spinner" style={{ width: 32, height: 32, margin: '2rem auto' }} />
              </div>
            ) : filtered.length === 0 ? (
              <div className="list-empty">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <p>No messages</p>
              </div>
            ) : (
              filtered.map((msg) => (
                <div
                  key={msg._id}
                  className={`message-item ${!msg.isRead ? 'unread' : ''} ${selectedMsg?._id === msg._id ? 'selected' : ''}`}
                  onClick={() => handleSelect(msg)}
                >
                  {!msg.isRead && <span className="unread-dot" />}
                  <div className="msg-item-header">
                    <span className="msg-item-name">{msg.name}</span>
                    <span className="msg-item-date">{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="msg-item-subject">{msg.subject}</p>
                  <p className="msg-item-preview">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Detail view */}
        <main className="admin-detail">
          {selectedMsg ? (
            <div className="message-detail">
              <div className="detail-toolbar">
                <div className="detail-status">
                  {selectedMsg.isRead ? (
                    <span className="status-read">Read</span>
                  ) : (
                    <span className="status-unread">Unread</span>
                  )}
                </div>
                <div className="toolbar-actions">
                  {!selectedMsg.isRead && (
                    <button
                      className="toolbar-btn"
                      onClick={() => handleMarkRead(selectedMsg._id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Mark Read
                    </button>
                  )}
                  <a
                    href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                    className="toolbar-btn accent"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Reply
                  </a>
                  <button
                    className="toolbar-btn danger"
                    onClick={() => setDeleteConfirm(selectedMsg._id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>

              <div className="message-detail-body">
                <h2 className="detail-subject">{selectedMsg.subject}</h2>

                <div className="detail-meta-row">
                  <div className="detail-sender">
                    <div className="sender-avatar">
                      {selectedMsg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="sender-name">{selectedMsg.name}</p>
                      <p className="sender-email">{selectedMsg.email}</p>
                    </div>
                  </div>
                  <p className="detail-timestamp">{formatDate(selectedMsg.createdAt)}</p>
                </div>

                <div className="divider" style={{ margin: '1.5rem 0' }} />

                <div className="detail-message-body">
                  {selectedMsg.message.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>

                <div className="detail-reply-prompt">
                  <a
                    href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                    className="btn-primary"
                    style={{ display: 'inline-flex' }}
                  >
                    Reply via Email
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="detail-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3>Select a message</h3>
              <p>Choose a message from the list to read it here</p>
            </div>
          )}

          <section className="project-management">
            <div className="project-section-header">
              <div>
                <h2>Portfolio Projects</h2>
                <p>Manage your project list directly from admin.</p>
              </div>
            </div>

            {projectLoading ? (
              <div className="project-loading">Loading projects...</div>
            ) : projectError ? (
              <div className="project-error">{projectError}</div>
            ) : projects.length === 0 ? (
              <div className="project-empty">
                <p>No projects yet. Use the Add Project button above to create one.</p>
              </div>
            ) : (
              <div className="project-list">
                {projects.map((project) => (
                  <div key={project._id} className="project-card admin-project-card">
                    <div>
                      <div className="project-card-top">
                        <h3>{project.title}</h3>
                        {project.featured && <span className="project-featured-badge">Featured</span>}
                      </div>
                      <p className="project-card-category">{project.category}</p>
                      <p className="project-card-description">{project.description}</p>
                    </div>
                    <div className="project-card-actions">
                      <button className="btn-outline" onClick={() => handleDeleteProject(project._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Add Project Modal */}
      {showProjectForm && (
        <div className="modal-overlay" onClick={() => setShowProjectForm(false)}>
          <div className="modal-box project-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Project</h3>
              <button
                className="modal-close"
                onClick={() => setShowProjectForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="project-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                  >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Long Description</label>
                <textarea
                  value={projectForm.longDescription}
                  onChange={(e) => setProjectForm({...projectForm, longDescription: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                    />
                    Feature this project
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setShowProjectForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Message</h3>
            <p>Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                className="btn-primary"
                style={{ background: '#ef4444' }}
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
