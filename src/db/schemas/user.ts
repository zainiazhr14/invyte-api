import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";


export const User = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('full_name').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  phone: varchar('phone').notNull().unique(),

  verified_at: timestamp('verified_at'),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



export type User = InferSelectModel<typeof User>;
