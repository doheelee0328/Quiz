import io from 'socket.io-client'
const serverEndpoint = 'https://quiz-socket-backend.onrender.com'
const socket = io(serverEndpoint)

export { socket }
