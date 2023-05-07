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

const store = {
  messages: [],
  usersState: [],
  usersTyping: []
}

const TransportKeys = {
  CLIENT_SET_USER: 'client-set-user',
  SERVER_SET_USER: 'server-set-user',
  CLIENT_MESSAGE_SENT: 'client-message-sent',
  SERVER_MESSAGE_RECEIVED: 'server-message-received',
  CLIENT_STARTED_TYPING: 'client-started-typing',
  SERVER_USER_TYPING: 'server-user-typing',
  CLIENT_STOPPED_TYPING: 'client-stopped-typing',
  SERVER_USER_STOPPED_TYPING: 'server-user-stopped-typing',
}

io.on('connection', (socket) => {
  console.log(`New user just connected with id ${socket.id}`);

  socket.on(TransportKeys.CLIENT_SET_USER, (title) => {
    const newTitle = title.trim();
    if (newTitle) {
      if (store.usersState.some(user => user.name === newTitle)) {
        store.usersState = store.usersState.map(user => user.name === newTitle ? { ...user, sessionId: socket.id } : user);
        socket.emit(TransportKeys.SERVER_SET_USER, store.usersState.find(user => user.name === newTitle))
      } else {
        const newUser = { name: newTitle, id: uuid.v4(), sessionId: socket.id };
        store.usersState.push(newUser);
        socket.emit(TransportKeys.SERVER_SET_USER, newUser)
      }
    } else {
      socket.emit(TransportKeys.SERVER_SET_USER, 'Title was not provided')
    }
  });

  socket.on(TransportKeys.CLIENT_MESSAGE_SENT, (message) => {
    const receivedMessage = JSON.parse(message);
    if (receivedMessage?.text && receivedMessage?.userId) {
      const user = store.usersState.find(user => user.id === receivedMessage.userId);
      if (user) {
        store.usersState = store.usersState.map(user => user.id === receivedMessage.userId ? { ...user, sessionId: socket.id } : user);
        const newMessage = { text: receivedMessage.text, id: uuid.v4(), user };
        store.messages.push(newMessage);
        io.emit(TransportKeys.SERVER_MESSAGE_RECEIVED, newMessage);
      }
    }
  })

  socket.on(TransportKeys.CLIENT_STARTED_TYPING, (userId) => {
    if (store.usersTyping.indexOf(userId) < 0) {
      store.usersState = store.usersState.map(user => user.id === userId ? { ...user, sessionId: socket.id } : user);
      store.usersTyping.push(userId);
      socket.broadcast.emit(TransportKeys.SERVER_USER_TYPING, store.usersState.find(user => user.id === userId));
    }
  })

  socket.on(TransportKeys.CLIENT_STOPPED_TYPING, (userId) => {
    store.usersState = store.usersState.map(user => user.id === userId ? { ...user, sessionId: socket.id } : user);
    if (store.usersTyping.indexOf(userId) >= 0) {
      store.usersTyping = store.usersTyping.filter(user => user !== userId);
      socket.broadcast.emit(TransportKeys.SERVER_USER_STOPPED_TYPING, userId);
    }
  })

  socket.on('disconnect', () => {
    const disconnectedUser = store.usersState.find(user => user.sessionId === socket.id);
    if (disconnectedUser) {
      store.usersTyping = store.usersTyping.filter(user => user !== disconnectedUser.id);
      socket.broadcast.emit(TransportKeys.SERVER_USER_STOPPED_TYPING, disconnectedUser.id);
    }
    console.log('User has been disconnected', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send("hi, this is back for ws chat")
});

app.get('/messages', (req, res) => {
  res.send(JSON.stringify(store.messages));
})

app.post('/users', (req, res) => {
  if (req.body) {
    if (store.usersState.some(user => user.name === req.body.title)) {
      res.send(JSON.stringify(store.usersState.find(user => user.name === req.body.title)));
    } else {
      const newUser = { name: req.body.title, id: uuid.v4() };
      store.usersState.push(newUser);
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