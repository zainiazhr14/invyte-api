import Elysia from "elysia";
import { UploadFileReq } from "@file/types/file";
import AuthMiddleware from "@libs/middleware/auth-middleware";
import { handleUploadFile } from "@file/controllers/file";

export const userRoutes = new Elysia({
  prefix: 'api/v1/'
})
  .group('file', (app) =>
    app
      .use(AuthMiddleware)
      .post('', handleUploadFile, {
        body: UploadFileReq,
        tags: ['File']
      })
  )