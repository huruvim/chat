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
let usersState = [];
let usersTyping = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // no user, but user creation is here
  socket.on('client-set-user', (title) => {
    const newTitle = title.trim();
    if (newTitle) {
      if (usersState.some(user => user.name === newTitle)) {
        usersState = usersState.map(user => user.name === newTitle ? { ...user, sessionId: socket.id } : user);
        socket.emit('server-set-user', usersState.find(user => user.name === newTitle))
      } else {
        const newUser = { name: newTitle, id: uuid.v4(), sessionId: socket.id };
        usersState.push(newUser);
        socket.emit('server-set-user', newUser)
      }
    } else {
      socket.emit('server-set-user', 'Title was not provided')
    }
  });

  // with user
  socket.on("client-message-sent", (message) => {
    console.log(message);
    const receivedMessage = JSON.parse(message);
    if (receivedMessage?.text && receivedMessage?.userId) {
      const user = usersState.find(user => user.id === receivedMessage.userId);
      if (user) {
        console.log(7777);
        usersState = usersState.map(user => user.id === receivedMessage.userId ? { ...user, sessionId: socket.id } : user);
        const newMessage = { text: receivedMessage.text, id: uuid.v4(), user };
        messages.push(newMessage);
        io.emit('server-message-received', newMessage);
      }
    }
  })

  // with user
  socket.on("client-started-typing", (userId) => {
    if (usersTyping.indexOf(userId) < 0) {
      usersState = usersState.map(user => user.id === userId ? { ...user, sessionId: socket.id } : user);
      usersTyping.push(userId);
      socket.broadcast.emit('server-user-typing', usersState.find(user => user.id === userId));
    }
  })

  // with user
  socket.on("client-stopped-typing", (userId) => {
    usersState = usersState.map(user => user.id === userId ? { ...user, sessionId: socket.id } : user);
    if (usersTyping.indexOf(userId) >= 0) {
      usersTyping = usersTyping.filter(user => user !== userId);
      socket.broadcast.emit('server-user-stopped-typing', userId);
    }
  })

  // with user
  socket.on('disconnect', () => {
    const disconnectedUser = usersState.find(user => user.sessionId === socket.id);
    if (disconnectedUser) {
      usersTyping = usersTyping.filter(user => user !== disconnectedUser.id);
      socket.broadcast.emit('server-user-stopped-typing', disconnectedUser.id);
    }
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