import { signIn, signUp } from "@user/services/auth"
import { SignInReq, SignUpReq } from "@user/types"
import { Context } from "elysia"

export const handleSignUp = async ({ body }: Context) => {
  return await signUp(body as SignUpReq)
}

export const handleSignIn = async ({ body }: Context) => {
  return await signIn(body as SignInReq)
}