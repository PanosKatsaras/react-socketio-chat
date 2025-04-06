const express = require('express');
const { Server } = require('socket.io');

// Create Express app and server
const app = express();
const server = require('http').createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"]
  }
});

// Handle new client connections
io.on('connection', (socket) => {
  // Create a shorter user ID from the socket ID
  const userId = socket.id.substring(0, 4);

  // Send welcome message to newly connected client
  socket.emit('chat message', {
    text: "Chat is ON!",
    userId: 'system',
    type: 'system'
  });

  // Handle incoming chat messages from clients
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', {
      text: msg,
      userId: userId,
      timestamp: new Date().toLocaleTimeString()
    });
  });

  // Handle client disconnection
  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected. Reason:`, reason);
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});