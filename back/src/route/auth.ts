import express = require('express')
import { User } from '../class/User'
import { Session } from '../class/Session'
import { Transaction } from '../class/Transaction'
export const AuthRouter = express.Router()

const test_init = () => {
  const user1 = User.create(
    '123@ga.com',
    'qwertyW123',
    'Username',
  )
  user1
  user1.isEmailValid = true
  user1.cash = 25

  const user2 = User.create(
    '124@ga.com',
    'qwertyW123',
    'USER2',
  )
  user2
  user2.isEmailValid = true
  user2.cash = 11000

  Array(3)
    .fill(10)
    .forEach((v) => {
      Transaction.create(12341, user1.id, user2.id)
    })
  Array(3)
    .fill(10)
    .forEach((v) => {
      Transaction.create(12341, user2.id, user1.id)
    })

  Session.sessions.push(
    new Session('RIqyqIpeeU', '123@ga.com'),
  )
}

test_init()

AuthRouter.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUser(email)
    if (!user || user.password !== password)
      throw { message: 'Email or password incorrect' }

    const session = Session.add(user.email)
    const { isEmailValid: isConfirm } = user

    res.status(200).json({
      token: session.code,
      user: { email, isConfirm },
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

AuthRouter.post('/signup', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.create(
      email,
      password,
      'TestUsername',
    )
    if (!user) throw { message: 'error' }
    const session = Session.add(user.email)

    const { isEmailValid: isConfirm } = user

    console.log(user.generateEmailCode())
    res.status(200).json({
      token: session.code,
      user: { email, isConfirm },
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

AuthRouter.post('/signup-confirm', (req, res) => {
  const { email, code } = req.body
  if (!email || !code)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUser(email)
    if (!user) throw { message: 'Code error' }

    const isValid = user.validEmail(code)
    if (!isValid) throw { message: 'Code error' }
    const { isEmailValid: isConfirm } = user

    res.status(200).json({ user: { email, isConfirm } })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

AuthRouter.post('/recovery', (req, res) => {
  const { email } = req.body
  if (!email)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUser(email)
    if (!user) throw { message: 'Email error' }

    console.log(user.generatePasswordCode())

    res.status(200).json({})
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})
AuthRouter.post('/recovery-confirm', (req, res) => {
  const { code, password } = req.body
  if (!code || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUserByCode(code)
    if (!user) throw { message: 'Code error' }
    user.password = password
    res.status(200).json({})
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})
