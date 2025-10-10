import AuthMiddleware from "@libs/auth-middleware";
import Elysia from "elysia";
import { handleSignIn, handleSignUp } from "./controllers/auth";
import { SignInReq, SignUpReq } from "./types";
import jwt from "@elysiajs/jwt";

export const userRoutes = new Elysia({
  prefix: 'api/v1/'
})
  .group('user', (app) =>
    app
      .use(AuthMiddleware)
      .get('/dashboard', () => 'Admin Dashboard')
      .post('/create', () => 'Create Admin')
  )
  .group('auth', (app) =>
    app
      .post('/sign-up', handleSignUp, {
        body: SignUpReq,
        detail: {
          tags: ['Auth']
        }
      })
      .post('/sign-in', handleSignIn, {
        body: SignInReq,
        detail: {
          tags: ['Auth']
        }
      })
  )