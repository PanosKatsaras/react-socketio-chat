# React Socket.IO Chat

A real-time chat application built with React, Socket.IO, Node.js, Vite and Express.


![chat-img2](https://github.com/user-attachments/assets/e9f8a4ae-e7af-4db4-8827-cac4bff62e2a)


## Features

- Real-time bidirectional communication
- System notifications for user connections
- Distinct message styling for sender/receiver
- Auto-scroll to latest messages
- Responsive layout
- User identification with socket IDs
- Message timestamps


## Technologies

- React
- Socket.IO
- Express
- Node.js
- Vite

## Setup

1. Clone the repository:
```bash
git clone https://github.com/PanosKatsaras/react-socketio-chat.git
cd react-socket-chat
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Start the application:
```bash
# Start server (in server directory)
npm start

# Start client (in client directory)
npm run dev
```

4. Open http://localhost:5173 in your browser

## Usage

- Open multiple browser windows to test the chat
- Type messages in the input field
- Press Enter or click Send to submit
- Watch messages appear in real-time across all windows
