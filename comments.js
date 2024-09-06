// Create web server
// Create a new web server
const express = require('express');
const app = express();

// Create a new server
const http = require('http');
const server = http.createServer(app);

// Create a new socket server
const socket = require('socket.io');
const io = socket(server);

// Create a new comments array
const comments = [];

// Create a new connection listener
io.on('connection', (socket) => {
  console.log('A user has connected', socket.id);

  // Emit all comments to the user when they connect
  socket.emit('allComments', comments);

  // Create a new comment listener
  socket.on('comment', (comment) => {
    console.log('A user has commented', comment);
    comments.push(comment);

    // Emit the new comment to all users
    io.emit('newComment', comment);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});