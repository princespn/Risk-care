import { timestamp } from "drizzle-orm/mysql-core";

export const createdAt = {
  created_at: timestamp("created_at").defaultNow().notNull(),
};

export const updatedAt = {
  updated_at: timestamp("updated_at").defaultNow().notNull(),
};