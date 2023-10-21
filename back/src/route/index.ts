import express = require('express')
import { AuthRouter } from './auth'
import { BalanceRouter } from './balance'
import { authMiddleware } from '../middleware/authMiddleware'

export const router = express.Router()

router.use(AuthRouter)
router.use(authMiddleware, BalanceRouter)

// router.post('/test', (req, res) => {
//   res.status(200).json('main')
// })
