import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { User } from "./user";
import { InferSelectModel } from "drizzle-orm";


export const OneTimePassword = pgTable('one_time_passwords', {
  id: uuid('id').primaryKey().defaultRandom(),
  token: varchar('token').unique(),
  code: varchar('code'),
  expired_at: timestamp('expired_at'),

  user_id: uuid('user_id').references(() => User.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type OneTimePassword = InferSelectModel<typeof OneTimePassword>

