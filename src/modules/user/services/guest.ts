import db from "@db/index"
import { GuestSchema } from "@db/schemas/guest"
import { User } from "@db/schemas/user"
import { CreateGuestReq } from "@user/types/guest"

export const createGuest = async (body: CreateGuestReq, user: User) => {
  // TODO: MAKE QUEUE FOR SEND EMAIL
  const { send_now, ...res } = body
  await db.insert(GuestSchema).values({
    ...res,
    user_id: user.id
  })
}