export interface ReturnJwt {
  id: number;
  username: string;
  role: string;
  iat?: number
}

export interface Token {
  token: string;
}
