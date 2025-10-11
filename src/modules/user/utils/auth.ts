import db from "@db/index";
import { UserSchema } from "@db/schemas/user";
import { argon2id, hash, verify } from "argon2";
import { password } from "bun";
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
    queryCondition.push(eq(UserSchema.email, email))
  } else if (!email && phone) {
    queryCondition.push(eq(UserSchema.phone, phone))
  } else if (email && phone) {
    queryCondition.push(eq(UserSchema.email, email), eq(UserSchema.phone, phone))
  }

  let result = await db
    .select({ total: sql<string>`COUNT(*)`.as('total') })
    .from(UserSchema)
    .where(...queryCondition)
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