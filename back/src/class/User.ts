import { GenerateCode } from '../utils/Generators'

export class User {
  private static list: User[] = []
  public isEmailValid = false
  private emailCode: string | null = null
  constructor(
    public email: string,
    public password: string,
  ) {}

  generateEmailCode(): string {
    this.emailCode = GenerateCode('1234567890', 4)
    return this.emailCode
  }

  validEmail(code: string): boolean {
    const isValid = code === this.emailCode
    if (isValid) {
      this.emailCode = null
      this.isEmailValid = true
    }

    return isValid
  }

  static getUser(email: string) {
    return this.list.find((v) => v.email === email) || null
  }

  static create(email: string, password: string): User {
    if (this.getUser(email))
      throw Error(
        'A user with the same name is already exist',
      )
    const user = new User(email, password)
    this.list.push(user)
    return user
  }
}
