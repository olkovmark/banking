import { GenerateCode } from '../utils/Generators'
import fs = require('fs')

export interface Transaction {
  id: number
  userID: number
  amount: number
  date: Date
}

export class User {
  private static list: User[] = []
  public isEmailValid = false
  private emailCode: string | null = null
  private passwordCode: string | null = null
  public img: string = ''
  public cash: number = 0
  public transactions: Transaction[] = []
  private static id = 0
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public username: string,
  ) {}

  generateEmailCode(): string {
    this.emailCode = GenerateCode('1234567890', 4)
    return this.emailCode
  }

  generatePasswordCode(): string {
    this.passwordCode = GenerateCode('1234567890', 4)
    return this.passwordCode
  }

  validEmail(code: string): boolean {
    const isValid = code === this.emailCode
    if (isValid) {
      this.emailCode = null
      this.isEmailValid = true
    }

    return isValid
  }

  updatePassword(password: string) {
    this.password = password
  }

  setImg(imgData: string) {
    this.img = imgData
  }

  static getUser(email: string) {
    return this.list.find((v) => v.email === email) || null
  }
  static getUserById(id: number) {
    return this.list.find((v) => v.id === id) || null
  }

  static getUserByCode(code: string) {
    return (
      this.list.find((v) => v.passwordCode === code) || null
    )
  }

  static create(
    email: string,
    password: string,
    username: string,
  ): User {
    if (this.getUser(email))
      throw Error(
        'A user with the same name is already exist',
      )

    const user = new User(
      this.id++,
      email,
      password,
      username,
    )
    try {
      const image = fs.readFileSync(
        'store/icons/human.svg',
        'base64',
      )
      user.setImg('data:image/svg+xml;base64, ' + image)
    } catch (error) {}
    this.list.push(user)
    return user
  }
}
