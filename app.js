const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
var co = "";
io.on('connection', (socket) => {
    socket.on('active', (coordinates) => {
        io.emit('active',coordinates);
    });
    socket.on('submit', (submission) => {
        io.emit('submit',submission);
    });
    socket.on('go', (coordinates) => {
        co = coordinates;
    });
    socket.on('clear', (coordinates) => {
        io.emit('clear',coordinates);
    });
    socket.on('reset', () => {
        io.emit('reset');
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('wall', (something) => {
        io.emit('wall',something);
    });
    socket.on('red', (something) => {
        io.emit('red',something);
    });
    socket.on('green', (something) => {
        io.emit('green',something);
    });
    socket.on('blue', (something) => {
        io.emit('blue',something);
    });
    socket.on('cat', (something) => {
        io.emit('cat',something);
    });
    socket.on('mouse', (something) => {
        io.emit('mouse',something);
    });
});
app.get('/api', (req, res) => {
    res.send(co);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
