import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = Bun.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = Bun.env.JWT_REFRESH_SECRET!;

interface TokenPayload {
  id: string;
  email: string;
  phone: string;
  full_name: string
}

// Generate access token
export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

// Generate refresh token
export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};


export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload | Record<string, unknown>
}

export const verifyRefresjToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload | Record<string, unknown>
}