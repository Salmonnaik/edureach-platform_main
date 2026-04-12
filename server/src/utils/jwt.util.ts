import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET || "edureach-jwt-secret-key-development-only-2024";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!secret) {
    console.warn("⚠️  JWT_SECRET is not defined, using default for development");
  }

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET || "edureach-jwt-secret-key-development-only-2024";

  if (!secret) {
    console.warn("⚠️  JWT_SECRET is not defined, using default for development");
  }

  return jwt.verify(token, secret) as JWTPayload;
};