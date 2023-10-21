import express = require('express')
import { User } from '../class/User'
import { Session } from '../class/Session'
export const AuthRouter = express.Router()

AuthRouter.post('/signin', (req, res) => {
  console.log('message')
  res.status(200).json('Auth')
})

AuthRouter.post('/signup', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.create(email, password)
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
