import React, { useState } from 'react';

function ChatBot() {
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    // Dummy integration: in a full app, call an AI API for chatbot/voice assistant functions.
    setResponse('This is an AI-generated response to your query.');
  };

  return (
    <div style={{ border: '1px solid #aaa', padding: '1em' }}>
      <h2>AI Chatbot</h2>
      <button onClick={handleAsk}>Ask a Question</button>
      {response && <p>{response}</p>}
    </div>
  );
}

export default ChatBot;