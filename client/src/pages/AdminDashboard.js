import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ role: payload.role, id: payload.id });
      if (payload.role !== 'admin') {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/products">Upload Product</Link></li>
        <li><Link to="/admin/videos">Upload Video</Link></li>
        <li><Link to="/admin/live">Manage Live Stream</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
