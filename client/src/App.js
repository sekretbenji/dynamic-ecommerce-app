import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductUpload from './pages/ProductUpload';
import VideoUpload from './pages/VideoUpload';
import LiveStreamAdmin from './pages/LiveStreamAdmin';
import LiveStreamView from './pages/LiveStreamView';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Link to="/">Home</Link> |{' '} 
        <Link to="/login">Login</Link> |{' '} 
        <Link to="/register">Register</Link> |{' '} 
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductUpload />} />
        <Route path="/admin/videos" element={<VideoUpload />} />
        <Route path="/admin/live" element={<LiveStreamAdmin />} />
        <Route path="/live/:id" element={<LiveStreamView />} />
      </Routes>
    </div>
  );
}

export default App;
