import express = require('express')
import { User } from '../class/User'
import {
  TRANSACTION_TYPE,
  Transaction,
} from '../class/Transaction'
export const BalanceRouter = express.Router()

BalanceRouter.get('/balance', (req: any, res) => {
  const email = req.email
  if (!email)
    return res.status(400).json({ message: 'error' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'Error'
    res.status(200).json({
      count: user?.cash,
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

BalanceRouter.get('/transactions', (req: any, res) => {
  const email = req.email
  if (!email)
    return res.status(400).json({ message: 'error' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'Error'

    const data = getTransactionsFormat(user)

    res.status(200).json({
      data,
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

BalanceRouter.get('/transaction', (req: any, res) => {
  const email = req.email
  const { id } = req.query

  if (!email || !String(id))
    return res.status(400).json({ message: 'error' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'Email not found'

    const transaction = Transaction.getByID(id)
    if (!transaction) throw 'Transaction not found'
    const data = transactionFormat(transaction, user.id)

    res.status(200).json({
      data,
    })
  } catch (error: any) {
    console.log(error)
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

function getTransactionsFormat(user: User): any[] {
  const transactions = Transaction.getUserTransactions(
    user.id,
  )
  const transactionDTO: any[] = []
  transactions.forEach((tran) => {
    const format = transactionFormat(tran, user.id)
    if (!format) return
    transactionDTO.push(format)
  })

  return transactionDTO
}

function transactionFormat(
  transaction: Transaction,
  userID: number,
) {
  const { type, targetID } =
    transaction.from_id === userID
      ? {
          type: TRANSACTION_TYPE.SEND,
          targetID: transaction.to_id,
        }
      : {
          type: TRANSACTION_TYPE.RECIVE,
          targetID: transaction.from_id,
        }
  const userT = User.getUserById(targetID)
  if (!userT) return null

  return {
    id: transaction.id,
    type,
    email: userT.email,
    amount: transaction.amount,
    date: transaction.date,
    username: userT.username,
    img: userT.img,
  }
}
