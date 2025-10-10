import { pgTable, varchar, timestamp, uuid, unique } from "drizzle-orm/pg-core";
import { user } from "./user";


export const guest = pgTable('guests', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('full_name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  user_id: uuid('user_id').notNull().references(() => user.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
  unique('guest_email_phone_user_id_unique').on(t.email, t.user_id, t.phone)
]);

