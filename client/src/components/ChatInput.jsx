import React, { useState } from 'react';

// ChatInput Component
// Handles the input form for sending chat messages
function ChatInput({ onSendMessage }) {
  // State to manage input field value
  const [input, setInput] = useState('');
   
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (input) { // Check if input is not empty
      onSendMessage(input); // Call parent callback with message
      setInput(''); // Clear input field after sending
    }
  };

  return (
    // Form wrapper with submit handler
    <form onSubmit={handleSubmit}>
      <input
        className="chat-input"
        type="text"
        value={input} // Controlled component with state value 
        onChange={(e) => setInput(e.target.value)} // Update state on input change
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;