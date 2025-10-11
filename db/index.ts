import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { admin } from "./schemas/admin";
import { UserSchema } from "./schemas/user";
import { setting } from "./schemas/setting";
import { userSetting } from "./schemas/user-setting";
import { GuestSchema } from "./schemas/guest";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default drizzle(pool, {
  schema: {
    admin,
    UserSchema,
    setting,
    userSetting,
    GuestSchema
  }
});
