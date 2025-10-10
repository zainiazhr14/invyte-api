import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";


export const user = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('50').notNull(),
  email: varchar('100').notNull().unique(),
  password: varchar('256').notNull(),


  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


