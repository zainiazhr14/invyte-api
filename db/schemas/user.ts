import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";


export const UserSchema = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('full_name').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  phone: varchar('phone').notNull().unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



export type User = InferSelectModel<typeof UserSchema>;
