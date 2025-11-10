import { env } from "@config/env";
import app from "./app";

app.listen(env.APP_PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${env.APP_PORT!}`
);
