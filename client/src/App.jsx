import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import ChatInput from './components/ChatInput';

// Connect to the server
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5
});

function App() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState(null);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('connect', () => {
      // Create a 4 character user ID from the socket ID
      setUserId(socket.id.substring(0, 4));
    });

    socket.on('chat message', (msg) => {
      // console.log('Message received:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    // Listen for disconnection events
    socket.on('disconnect', (reason) => {
      console.log('Disconnected from server. Reason:', reason);
    });
    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Clean up event listeners without disconnecting
    return () => {
      socket.off('connect');
      socket.off('chat message');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = (message) => {
    if (message) {
      socket.emit('chat message', message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>React - Socket.IO Chat</h1>
      <h3>
        Open a new browser tab and enter the same URL to join the chat!
      </h3>
      <ul>
        {/* Message list */}
        {messages.map((msg, index) => (
          <li
            key={index}
            style={{
              padding: '4px 10px',
              margin: '4px 0',
              display: 'flex',
              justifyContent: msg.userId === userId ? 'flex-end' : 'flex-start',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {msg.type === 'system' ? (
              // System message
              <div style={{
                backgroundColor: '#79ea07',
                color: '#2e3b1c',
                padding: '10px',
                borderRadius: '4px',
                textAlign: 'center',
                fontWeight: '800',
                width: '100%',
              }}>
                {msg.text}
              </div>
            ) : (
              // User message
              <div style={{
                backgroundColor: msg.userId === userId ? '#d9fcde' : '#dee3df',
                color: msg.userId === userId ? '#1a1c1a' : '#1f2120',
                padding: '8px',
                borderRadius: '4px',
                maxWidth: '70%',
                fontWeight: '600'
              }}>
                <small style={{
                  color: '#7a7878',
                  display: 'block',
                  fontSize: '0.8em',
                  marginBottom: '4px'
                }}>
                  User <span style={{ color: '#f0a500', fontWeight: 'bold' }}>
                    {msg.userId}
                  </span> • {msg.timestamp}
                </small>
                <div>{msg.text}</div>
              </div>
            )}
          </li>
        ))}
        {/* This empty list item is used to scroll to the bottom of the chat */}
        <li ref={messagesEndRef} />
      </ul>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;