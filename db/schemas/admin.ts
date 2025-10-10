import { serial, pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";


export const admin = pgTable('admins', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('50').notNull(),
  username: varchar('50').notNull().unique(),
  password: varchar('256').notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

