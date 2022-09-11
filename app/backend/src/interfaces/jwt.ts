export interface ReturnJwt {
  id: number;
  role: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface Token {
  token: string;
}
