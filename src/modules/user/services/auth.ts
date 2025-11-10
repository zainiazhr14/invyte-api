import { 
  SignInReq, 
  SignUpReq, 
  VerifyOTPReq
} from "@user/types/auth";
import { 
  checkAvailability, 
  hashPassword, 
  verifyPassword 
} from "@user/utils/auth";
import { User } from "@db/schemas/user";
import ApiError from "@libs/response/error";

import db from "@db/index";
import { 
  generateAccessToken, 
  generateRefreshToken 
} from "@libs/auth/jwt";
import { OneTimePassword } from "@db/schemas/one-time-password";
import { 
  generateNumericOTP, 
  generateRandomString 
} from "@libs/core/generator";
import { eq } from "drizzle-orm";


export const signUp = async (body: SignUpReq) => {
  const { email, phone, password } = body;

  try {
    const avail = await checkAvailability({
      email, phone
    });

    if (!avail) throw new ApiError('Email / Phone number already registered', 400)

    const hashedPassword = await hashPassword(password)
    
    const [newUser] = await db.insert(
      User
    ).values({
      ...body,
      password: hashedPassword
    })
    .returning()

    await db.insert(
      OneTimePassword
    ).values({
      user_id: newUser.id,
      token: generateRandomString(64),
      code: generateNumericOTP(6).toString(),
      expired_at: new Date(Date.now() + 10 * 60 * 1000)
    })
    .returning()

    const { password: _pass, createdAt, updatedAt, ...response } = newUser;

    return {
      user: response
    };
  } catch(e: unknown) {
    console.log('Sign Up => ', e)
    throw e
  }
}

export const signIn = async (body: SignInReq) => {
  const { email, password } = body;

  let checkPassword = false
  try {
    const userData = await db.query.User.findFirst({
      where: ((user, { eq }) => eq(user.email, email))
    })

    if (userData) {
      checkPassword = await verifyPassword(userData.password, password);
    }

    if (!userData || !checkPassword) throw new ApiError('Incorrect Email / Password', 401);
    
    const { password: _pass, ...response } = userData;

    const accessToken = await generateAccessToken(response)
    const refreshToken = await generateRefreshToken(response)

    return {
      accessToken,
      refreshToken,
      user: response
    };
  } catch(e) {
    console.log('SIGN IN => ', e)
    throw e;
  }
}

export const verifyOTP = async (body: VerifyOTPReq) => {
  const { token, code } = body;

  try {
    const otpData = await db.query.OneTimePassword.findFirst({
      where: ((otp, { eq, and }) => and(eq(otp.token, token), eq(otp.code, code))),
      with: {
        user: true
      }
    })

    if (!otpData || otpData.code !== code) throw new ApiError('Invalid Token', 400);

    if (otpData.expired_at! < new Date()) throw new ApiError('Expired Code', 400);

    const { password: _pass, createdAt, updatedAt, ...response } = otpData.user as User;

    await db.delete(
      OneTimePassword
    ).where(eq(OneTimePassword.id, otpData.id))

    await db.update(
      User
    ).set({
      verified_at: new Date()
    }).where(eq(User.id, response.id))

    const accessToken = await generateAccessToken(response)
    const refreshToken = await generateRefreshToken(response)

    return {
      accessToken,
      refreshToken,
    };
  } catch(e) {
    console.log('VERIFY OTP => ', e)
    throw e;
  }
}