import { Static, t } from 'elysia'

export const UploadFileReq = t.Object({
  file: t.File({
    maxSize: 10 * 1024 * 1024
  }),
  files: t.Files({
    maxItems: 10
  })
})

export type UploadFileReq = Static<typeof UploadFileReq>
