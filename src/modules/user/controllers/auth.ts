import { signIn, signUp, verifyOTP } from "@user/services/auth"
import { SignInReq, SignUpReq, VerifyOTPReq } from "@user/types/auth"
import { Context } from "elysia"

export const handleSignUp = async ({ body, server }: Context) => {
  return await signUp(body as SignUpReq)
}

export const handleSignIn = async ({ body }: Context) => {
  return await signIn(body as SignInReq)
}

export const handleVerifyOTP = async ({ body }: Context) => {
  return await verifyOTP(body as VerifyOTPReq)
}
