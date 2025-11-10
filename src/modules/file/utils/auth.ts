import db from "@db/index";
import { User } from "@db/schemas/user";
import { 
  argon2id, 
  hash, 
  verify 
} from "argon2";
import { eq, sql } from "drizzle-orm";

export const checkAvailability = async ({
  email,
  phone
}: {
  email: string | null,
  phone: string | null
}) => {
  const queryCondition = [];

  if (email && !phone) {
    queryCondition.push(eq(User.email, email))
  } else if (!email && phone) {
    queryCondition.push(eq(User.phone, phone))
  } else if (email && phone) {
    queryCondition.push(eq(User.email, email), eq(User.phone, phone))
  }

  let result = await db
    .select({ total: sql<string>`COUNT(*)`.as('total') })
    .from(User)
    .where(sql`${queryCondition.join(' AND ')}`)
    .execute();

  const total = result[0]['total']

  if (!total || total == '0') {
    return true
  }

  return false
}

export const hashPassword = async (password: string) => {
  return await hash(password, {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  })
}

export const verifyPassword = async (hashed: string, password: string) => {
  return await verify(hashed, password)
}