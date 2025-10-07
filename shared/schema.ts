import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  scores: jsonb("scores").notNull().default(sql`'{}'::jsonb`),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
}).extend({
  scores: z.record(z.string(), z.number()).optional(),
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
