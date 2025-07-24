import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const ruleDefinitions = sqliteTable("rule_definitions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ruleName: text("rule_name").notNull(),
  type: text("type"),
  inputs: text("inputs", { mode: "json" }),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productName: text("product_name").notNull(),
  company: text("company").notNull(),
});

export const ruleInstances = sqliteTable("rule_instances", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ruleName: text("rule_name"),
  inputValues: text("inputs", { mode: "json" }),
  products: text("products", { mode: "json" }),
  enabled: integer("enabled", { mode: "boolean" }).default(true),
});
