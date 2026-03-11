import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LiveStreamView() {
  const { id } = useParams();
  const [stream, setStream] = useState(null);
  useEffect(() => {
    async function fetchStream() {
      const res = await fetch(`/api/live`);
      const data = await res.json();
      const found = data.find((s) => s.id === id);
      setStream(found);
    }
    fetchStream();
  }, [id]);
  if (!stream) return <p>Loading stream...</p>;
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{stream.title}</h1>
      <video controls autoPlay style={{ width: '100%', maxWidth: '800px' }}>
        <source src={stream.streamUrl} type="application/vnd.apple.mpegurl" />
        Your browser does not support HLS.
      </video>
      <p>{stream.description}</p>
    </div>
  );
}

export default LiveStreamView;
