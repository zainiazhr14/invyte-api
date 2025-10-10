import Elysia from "elysia";
import ApiError from "./api-error";
import jwt from "@elysiajs/jwt";
import db from "@db/index";
import { verifyAccessToken } from "./jwt";

const AuthMiddleware = new Elysia({
  name: "auth-middleware",
})
.derive({
  as: 'scoped'
}, async ({ headers, set }) => {
  const bearerToken: string = headers?.['authorization'] ?? '';
  const token = bearerToken?.startsWith('Bearer ')
      ? bearerToken.replace(/^Bearer /, '')
      : undefined;


  if (!token) throw new ApiError('Unauthorized', 401);
  
  const payload = await verifyAccessToken(token);
  if (!payload) throw new ApiError('Unauthorized', 401);

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, String(payload.id))
  });

  return { user }
})

export default AuthMiddleware;