const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

const rooms = {}

// Define event listeners for socket connections
io.on('connection', (socket) => {
  // Event listener for sending messages
  socket.on('send-message', (message, room, character) => {
    io.to(room).emit('receive-message', {
      message,
      nickname: socket.nickname,
      character,
    })

    // Store message in room's message history
    if (!rooms[room]) {
      rooms[room] = { nicknames: [], messages: [] }
    }

    rooms[room].messages.push({ message, nickname: socket.nickname, character })
  })
  socket.on('create-room', (room, nickname, callback) => {
    if (rooms[room]) {
      // Room already exists
      callback(false)
      console.log('The name already exists')
    } else {
      // Room doesn't exist, create it
      socket.join(room)
      socket.nickname = nickname
      if (!rooms[room]) {
        rooms[room] = { nicknames: [], messages: [] }
      }

      if (!rooms[room].nicknames.includes(nickname)) {
        rooms[room].nicknames.push(nickname)
      }
      callback(room)
      io.to(room).emit('update-nicknames', rooms[room].nicknames)
      io.to(room).emit('update-players', rooms[room].nicknames)
      console.log('Room created:', room, 'with player:', nickname)
    }
  })

  // Event listener for joining a room
  socket.on('join-room', (room, nickname, callback) => {
    if (!rooms[room]) {
      // Room doesn't exist
      callback(false)
    } else {
      // Room exists and nickname doesn't exist
      socket.join(room)
      socket.nickname = nickname
      if (!rooms[room]) {
        rooms[room] = { nicknames: [], messages: [] }
      }

      if (!rooms[room].nicknames.includes(nickname)) {
        rooms[room].nicknames.push(nickname)
      }

      callback(true)
      io.to(room).emit('update-nicknames', rooms[room].nicknames)

      // Send previous messages to the newly joined player
      if (rooms[room].messages.length > 0) {
        socket.emit('previous-messages', rooms[room].messages)
      }

      // Emit event to update players in the room
      io.to(room).emit('update-players', rooms[room].nicknames)
    }
  })

  socket.on('start-game', (room) => {
    io.to(room).emit('start-game')
  })
})

// Export the server
module.exports = server
