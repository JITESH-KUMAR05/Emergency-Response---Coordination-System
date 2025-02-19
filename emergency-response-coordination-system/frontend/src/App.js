import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatBot from './components/ChatBot';
import axios from 'axios';

const socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off('message');
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('sendMessage', { user: 'User', text: input });
      setInput('');
    }
  };

  // Sample API call like emergency report
  const reportEmergency = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/emergency/report', {
        location: { lat: 0, lng: 0 },
        type: 'fire',
        description: 'Small fire reported',
        media: null
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error reporting emergency:', error);
    }
  };

  return (
    <div style={{ padding: '1em' }}>
      <h1>Emergency Response Coordination</h1>

      <div style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
        <h2>Live Chat</h2>
        <div style={{ minHeight: '200px', border: '1px solid #eee', padding: '0.5em', marginBottom: '0.5em' }}>
          {messages.map((msg, idx) => (
            <p key={idx}><strong>{msg.user}:</strong> {msg.text}</p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <button onClick={reportEmergency} style={{ marginBottom: '1em' }}>
        Report Emergency
      </button>

      <ChatBot />
    </div>
  );
}

export default App;