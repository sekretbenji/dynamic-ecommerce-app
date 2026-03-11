import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LiveStreamAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStreams();
  }, []);

  async function fetchStreams() {
    const res = await fetch('/api/live');
    const data = await res.json();
    setStreams(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const res = await fetch('/api/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description, streamUrl, startTime: new Date() }),
      });
      if (!res.ok) {
        const msg = (await res.json()).msg || 'Failed to create live stream';
        setError(msg);
        return;
      }
      setError(null);
      setTitle('');
      setDescription('');
      setStreamUrl('');
      fetchStreams();
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    }
  }

  async function endStream(id) {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    await fetch(`/api/live/${id}/end`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStreams();
  }

  async function deleteStream(id) {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    await fetch(`/api/live/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStreams();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manage Live Streams</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Create Live Stream</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
  import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LiveStreamAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStreams();
  }, []);

  async function fetchStreams() {
    const res = await fetch('/api/live');
    const data = await res.json();
    setStreams(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const res = await fetch('/api/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description, streamUrl, startTime: new Date() }),
      });
      if (!res.ok) {
        const msg = (await res.json()).msg || 'Failed to create live stream';
        setError(msg);
        return;
      }
      setError(null);
      setTitle('');
      setDescription('');
      setStreamUrl('');
      fetchStreams();
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    }
  }

  async function endStream(id) {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    await fetch(`/api/live/${id}/end`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStreams();
  }

  async function deleteStream(id) {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    await fetch(`/api/live/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStreams();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manage Live Streams</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Create Live Stream</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Stream URL (m3u8):</label>
          <input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Stream</button>
      </form>
      <h2>Existing Streams</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {streams.map((s) => (
          <li key={s.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <p>URL: {s.streamUrl}</p>
            <p>Started: {s.startTime ? new Date(s.startTime).toLocaleString() : 'N/A'}</p>
            <p>Ended: {s.endTime ? new Date(s.endTime).toLocaleString() : 'Active'}</p>
            <button onClick={() => endStream(s.id)} disabled={!!s.endTime} style={{ marginRight: '0.5rem' }}>
              End
            </button>
            <button onClick={() => deleteStream(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveStreamAdmin;
        <label>Stream URL (m3u8):</label>
          <input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Stream</button>
      </form>
      <h2>Existing Streams</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {streams.map((s) => (
          <li key={s.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <p>URL: {s.streamUrl}</p>
            <p>Started: {s.startTime ? new Date(s.startTime).toLocaleString() : 'N/A'}</p>
            <p>Ended: {s.endTime ? new Date(s.endTime).toLocaleString() : 'Active'}</p>
            <button onClick={() => endStream(s.id)} disabled={!!s.endTime} style={{ marginRight: '0.5rem' }}>
              End
            </button>
            <button onClick={() => deleteStream(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveStreamAdmin;
