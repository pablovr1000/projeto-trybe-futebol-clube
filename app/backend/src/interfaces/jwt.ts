export default interface TokenInterface {
  id: number;
  username: string;
  email: string;
  role: string;
}
export interface ReturnJwt {
  id: number;
  username: string;
  role: string;
  iat?: number
}

export interface Token {
  token: string;
}
