import express = require('express')
import { User } from '../class/User'
import { Session } from '../class/Session'
import { Transaction } from '../class/Transaction'
import fs = require('fs')
import { PaymentSystem } from '../class/PaymentSystem'
import { Wallet } from '../class/Wallet'
export const AuthRouter = express.Router()

const test_init = () => {
  const s1 = PaymentSystem.create('Stripe')
  try {
    const image = fs.readFileSync(
      'store/icons/logo-S.svg',
      'base64',
    )
    s1.setImg('data:image/svg+xml;base64, ' + image)
  } catch (error) {}

  s1.cash = Infinity
  const s2 = PaymentSystem.create('Stripe')
  s2.cash = Infinity

  const user1 = User.create(
    '123@ga.com',
    'qwertyW123',
    'Username',
  )

  user1.isEmailValid = true

  const user2 = User.create(
    '124@ga.com',
    'qwertyW123',
    'Username',
  )

  Transaction.create(123, 0, 2)

  user2.isEmailValid = true

  try {
    const image = fs.readFileSync(
      'store/icons/logo-C.svg',
      'base64',
    )
    s2.setImg('data:image/svg+xml;base64, ' + image)
  } catch (error) {}
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
