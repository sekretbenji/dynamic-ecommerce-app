import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchActiveStream();
  }, []);

  async function fetchProducts() {
    const response = await fetch(`/api/products?q=${encodeURIComponent(search)}`);
    const data = await response.json();
    setProducts(data);
  }

  async function fetchActiveStream() {
    const response = await fetch('/api/live?active=true');
    const data = await response.json();
    setStream(data[0] || null);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome</h1>
      {stream && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Live Now: {stream.title}</h2>
          <video controls style={{ width: '100%', maxWidth: '600px' }}>
            <source src={stream.streamUrl} type="application/vnd.apple.mpegurl" />
            Your browser does not support HLS streams.
          </video>
        </div>
      )}
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Search</button>
      </form>
      <h2>Products</h2>
      {products.length === 0 && <p>No products found.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Price: ${p.price}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ maxWidth: '200px' }} />}
            {p.videoUrl && (
              <video controls style={{ maxWidth: '200px' }}>
                <source src={p.videoUrl} />
              </video>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
