import { serial, pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";


export const userSetting = pgTable('user_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

