import { GenerateCode } from '../utils/Generators'

export class Session {
  constructor(public code: string, public email: string) {}
  public static sessions: Session[] = []

  static add(email: string): Session {
    const session = new Session(
      GenerateCode('asdvafAasd', 10),
      email,
    )
    this.sessions.push(session)
    return session
  }

  static check(code: string, email: string): Boolean {
    return this.sessions.some(
      (value) =>
        value.code === code && value.email === email,
    )
  }
}
