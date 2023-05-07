const express = require('express');
const app = express();
const cors = require('cors')
const uuid = require('uuid')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const messages = [];
const usersState = [];
let usersTyping = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.on("client-message-sent", (message) => {
    const receivedMessage = JSON.parse(message);
    if (receivedMessage?.text && receivedMessage?.userId) {
      const user = usersState.find(user => user.id === receivedMessage.userId);
      if (user) {
        const newMessage = { text: receivedMessage.text, id: uuid.v4(), user };
        messages.push(newMessage);
        io.emit('server-message-received', newMessage);
      }
    }
  })
  socket.on("client-started-typing", (userId) => {
    if (usersTyping.indexOf(userId) < 0) {
      usersTyping.push(userId);
      socket.broadcast.emit('server-user-typing', usersState.find(user => user.id === userId));
    }
  })
  socket.on("client-stopped-typing", (userId) => {
    if (usersTyping.indexOf(userId) >= 0) {
      usersTyping = usersTyping.filter(user => user !== userId);
      socket.broadcast.emit('server-user-stopped-typing', userId);
    }
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send("hi, this is back for ws chat")
});

app.get('/messages', (req, res) => {
  res.send(JSON.stringify(messages));
})

app.post('/users', (req, res) => {
  if (req.body) {
    if (usersState.some(user => user.name === req.body.title)) {
      res.send(JSON.stringify(usersState.find(user => user.name === req.body.title)));
    } else {
      const newUser = { name: req.body.title, id: uuid.v4() };
      usersState.push(newUser);
      res.send(JSON.stringify(newUser));
    }
  } else {
    res.status(400).send(JSON.stringify({ ok: false, reason: 'There is no req body' }));
  }
})

const port = 8080;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});