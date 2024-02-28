const express = require('express')
const app = express()
const connectDB = require('./database/setup')
const playerRouter = require('./routers/playerRouter')

const cors = require('cors')

connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'hello world' })
})

app.use('/player', playerRouter)

module.exports = app
