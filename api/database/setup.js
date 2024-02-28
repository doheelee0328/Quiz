require('dotenv').config()

const mongoose = require('mongoose')

const connectionUrl = process.env.DB_CONNECTION

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionUrl)
    console.log(`MongoDB Connected!`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
