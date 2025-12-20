import cors from "@elysiajs/cors";
import Elysia, { t } from "elysia";
import { adminRoutes } from "./modules/admin/routes";
import { userRoutes } from "./modules/user/routes";
import openapi from "@elysiajs/openapi";
import { Logestic } from "logestic";
import ApiError from "@libs/response/error";

const app = new Elysia()
  .use(
    cors({
      origin: Bun.env.NODE_ENV !== 'production' ? ['*'] : ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .use(openapi({
    path: '/documentation'
  }))
  .use(Logestic.preset('fancy'))
  .mapResponse(({ response, set }) => {
      if ([200, 201].includes(set.status)) {
        response = {
          ok: true,
          data: response
        }
      }

      return response
  })
  .onError(({ code, error, set }) => {
    if (error instanceof ApiError) {
      return { ok: false, error: error.message };
    } else if (code == 'VALIDATION') {
      return { ok: false, error: JSON.parse(error.message) };
    }
  })
  .guard(
    {
      headers: t.Object({
        authorization: t.Optional(
          t.TemplateLiteral('Bearer ${string}')
        ),
      }),
    },
    (app) => 
      app
        .use(adminRoutes)
        .use(userRoutes)
  )

export default app;