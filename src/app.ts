import cors from "@elysiajs/cors";
import Elysia, { t } from "elysia";
import { adminRoutes } from "./modules/admin/routes";
import { userRoutes } from "./modules/user/routes";
import openapi from "@elysiajs/openapi";
import { Logestic } from "logestic";

const app = new Elysia()
  .use(
    cors({
      origin: Bun.env.NODE_ENV !== 'production' ? ['*'] : ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .use(openapi())
  .use(Logestic.preset('fancy'))
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