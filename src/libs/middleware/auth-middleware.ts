import Elysia from "elysia";
import ApiError from "../response/error";
import db from "@db/index";
import { verifyAccessToken } from "../auth/jwt";

const AuthMiddleware = new Elysia({
  name: "auth-middleware",
})
.derive({
  as: 'global'
}, async ({ headers, set }) => {
  const bearerToken: string = headers?.['authorization'] ?? '';
  const token = bearerToken?.startsWith('Bearer ')
      ? bearerToken.replace(/^Bearer /, '')
      : undefined;


  if (!token) throw new ApiError('Unauthorized', 401);
  
  const payload = await verifyAccessToken(token);
  if (!payload) throw new ApiError('Unauthorized', 401);

  const user = await db.query.User.findFirst({
    where: (user, { eq }) => eq(user.id, String(payload.id))
  });
  
  if (!user) throw new ApiError('Unauthorized', 401);

  return { user }
})

export default AuthMiddleware;