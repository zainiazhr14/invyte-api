import { Guest } from "@db/schemas/guest";
import { createInsertSchema } from "drizzle-typebox";
import { Static, t } from "elysia";

const _CreateGuestReq = createInsertSchema(Guest, {
  email: t.String({
    format: 'email'
  }),
})

export const CreateGuestReq = t.Intersect([
  t.Omit(_CreateGuestReq, ["id", "createdAt", "updatedAt", "user_id"]),
  t.Object({
    send_now: t.Boolean({
      default: false
    }),
  }),
]);


export type CreateGuestReq = Static<typeof CreateGuestReq>