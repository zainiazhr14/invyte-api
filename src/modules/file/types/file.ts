import { Static, t } from 'elysia'

export const UploadFileReq = t.Object({
  file: t.File(),
})

export type UploadFileReq = Static<typeof UploadFileReq>