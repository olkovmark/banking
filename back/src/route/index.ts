import express = require('express')
import { AuthRouter } from './auth'

export const router = express.Router()

router.use(AuthRouter)

// router.post('/test', (req, res) => {
//   res.status(200).json('main')
// })
