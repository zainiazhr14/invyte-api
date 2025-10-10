import Elysia from "elysia";
import ApiError from "./api-error";
import jwt from "@elysiajs/jwt";
import db from "@db/index";

const AuthMiddleware = new Elysia({
  name: "auth-middleware"
})
.use(jwt({
  name: 'jwt',
  secret: Bun.env.JWT_SECRET_KEY!
}))
.derive({
  as: 'scoped'
}, async ({ headers, set, jwt }) => {
  const bearerToken: string = headers?.['authorization'] ?? '';
  const token = bearerToken?.startsWith('Bearer ')
      ? bearerToken.replace(/^Bearer /, '')
      : undefined;


  if (!token) throw new ApiError('Unauthorized', 401);
  
  const payload = await jwt.verify(token);
  if (!payload) throw new ApiError('Unauthorized', 401);

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, String(payload.id))
  });

  return { user }
})

export default AuthMiddleware;