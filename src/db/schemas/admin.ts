import { serial, pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";


export const Admin = pgTable('admins', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('full_name').notNull(),
  username: varchar('username').notNull().unique(),
  password: varchar('password').notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

