import AuthMiddleware from "@libs/middleware/auth-middleware";
import Elysia from "elysia";
import { handleSignIn, handleSignUp, handleVerifyOTP } from "./controllers/auth";
import { SignInReq, SignUpReq, VerifyOTPReq } from "@user/types/auth";
import { handleCreateGuest } from "./controllers/guest";
import { CreateGuestReq } from "./types/guest";

export const userRoutes = new Elysia({
  prefix: 'api/v1/'
})
  .group('user', (app) =>
    app
      .use(AuthMiddleware)
      .group('/guest', (app) => 
        app
          .post('', handleCreateGuest, {
            body: CreateGuestReq,
            tags: ['User Guest']
          })
      )
  )
  .group('auth', (app) =>
    app
      .post('/sign-up', handleSignUp, {
        body: SignUpReq,
        tags: ['Auth']
      })
      .post('/sign-in', handleSignIn, {
        body: SignInReq,
        tags: ['Auth']
      })
      .post('/verify-otp', handleVerifyOTP, {
        body: VerifyOTPReq,
        tags: ['Auth']
      })
  )