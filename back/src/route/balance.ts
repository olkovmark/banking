import express = require('express')
import { User } from '../class/User'
export const BalanceRouter = express.Router()

BalanceRouter.get('/balance', (req, res) => {
  try {
    res.status(200).json({
      count: 200,
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})
