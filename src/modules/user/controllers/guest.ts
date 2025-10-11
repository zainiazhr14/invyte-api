import { User } from "@db/schemas/user"
import { createGuest } from "@user/services/guest"
import { CreateGuestReq } from "@user/types/guest"

export const handleCreateGuest = async ({ body, user }: {
  body: CreateGuestReq,
  user: User
}) => {
  return await createGuest(body, user)
}

export const handleUpdateGuest = () => {}
export const handleGetListGuest = () => {}
export const handleGetGuest = () => {}