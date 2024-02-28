const Player = require('../models/playerModel')

const createPlayer = async (req, res) => {
  const { name, score } = req.body
  try {
    const newPlayer = await Player.create({
      name,
      score,
    })
    res.status(201).json(newPlayer)
  } catch (error) {
    res.status(500).send({ message: 'failed to create a new player' })
  }
}

module.exports = { createPlayer }
