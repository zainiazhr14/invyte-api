import db from "@db/index";
import { User } from "@db/schemas/user";
import { 
  argon2id, 
  hash, 
  verify 
} from "argon2";
import { eq, or, sql } from "drizzle-orm";

export const checkAvailability = async ({
  email,
  phone
}: {
  email: string | null,
  phone: string | null
}) => {
  let condition;

  if (email && phone) {
    condition = or(eq(User.email, email), eq(User.phone, phone));
  } else if (email) {
    condition = eq(User.email, email);
  } else if (phone) {
    condition = eq(User.phone, phone);
  } else {
    return true;
  }

  const [result] = await db
      .select({ total: sql<number>`COUNT(*)`.as('total') })
      .from(User)
      .where(condition);

  console.log(result)

  return result.total != 0;
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