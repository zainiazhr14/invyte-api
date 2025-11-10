import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { admin } from "@db/schemas/admin";
import { User } from "@db/schemas/user";
import { setting } from "@db/schemas/setting";
import { userSetting } from "@db/schemas/user-setting";
import { Guest } from "@db/schemas/guest";
import { OneTimePassword } from "@db/schemas/one-time-password";
import { env } from "@config/env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export default drizzle(pool, {
  schema: {
    admin,
    User,
    setting,
    userSetting,
    Guest,
    OneTimePassword
  }
});
