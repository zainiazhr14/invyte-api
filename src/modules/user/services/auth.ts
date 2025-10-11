import { SignInReq, SignUpReq } from "@user/types/auth";
import { checkAvailability, hashPassword, verifyPassword } from "@user/utils/auth";
import { UserSchema } from "@db/schemas/user";
import ApiError from "@libs/api-error";

import db from "@db/index";
import { generateAccessToken, generateRefreshToken } from "@libs/jwt";


export const signUp = async (body: SignUpReq) => {
  const { email, phone, password } = body;

  try {
    const avail = await checkAvailability({
      email, phone
    });

    if (!avail) throw new ApiError('Email / Phone number already registered', 400)

    const hashedPassword = await hashPassword(password)
    
    const [newUser] = await db.insert(
      UserSchema
    ).values({
      ...body,
      password: hashedPassword
    })
    .returning()

    const { password: _pass, createdAt, updatedAt, ...response } = newUser;

    const accessToken = await generateAccessToken(response)
    const refreshToken = await generateRefreshToken(response)

    return {
      accessToken,
      refreshToken,
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
    const userData = await db.query.UserSchema.findFirst({
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