const express = require('express')
const router = express.Router()

const { createPlayer } = require('../controller/playerController')

router.post('/', createPlayer)

module.exports = router
