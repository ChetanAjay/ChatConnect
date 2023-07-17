const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

    socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

    socket.on('chat message', (data) => {
    console.log(`Message received: ${data.message}`);

    
    io.to(data.room).emit('chat message', data.message);
  });

   socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
