import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

export async function createToken(payload: {
    userId: string
    email: string
    [key: string]: any
}): Promise<string> {

    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error("JWT_SECRET is not defined")
    }

    const secretKey = new TextEncoder().encode(secret)

    const token = await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secretKey)
    
        return token
}


export async function verifyToken(token: string): Promise<{
    userId: string
    email: string
    [key: string]: any
} | null > {
    try {
        const secret = process.env.JWT_SECRET

        if (!secret) {
            console.error("JWT_SECRET is not defined")
            return null
        }

        const secretKey = new TextEncoder().encode(secret)
        const {payload} = await jwtVerify(token, secretKey, {
            algorithms: ['HS256']
        })

        return payload as { userId: string; email: string; [key: string]: any }
    } catch (error) {
      if (error instanceof Error) {
      console.error('Token verification failed:', error.message)
    }
    
    return null
  }
}


