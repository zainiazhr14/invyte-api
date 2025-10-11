import { pgTable, varchar, timestamp, uuid, unique, pgEnum } from "drizzle-orm/pg-core";
import { UserSchema } from "./user";
import { InferSelectModel } from "drizzle-orm";


export const SendWithEnum = pgEnum("send_with", ["email", "phone"]);

export const GuestSchema = pgTable('guests', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('full_name').notNull(),
  email: varchar('email'),
  phone: varchar('phone'),
  send_at: timestamp('send_at'),
  send_with: SendWithEnum('send_with').array().notNull().default(['email']),
  user_id: uuid('user_id').notNull().references(() => UserSchema.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
  unique('guest_email_phone_user_id_unique').on(t.email, t.user_id, t.phone)
]);

export type Guest = InferSelectModel<typeof GuestSchema>

