import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const ruleDefinitions = sqliteTable("rule_definitions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ruleName: text("rule_name").notNull(),
  type: text("type"),
  inputs: text("inputs", { mode: "json" }),
});

export const companies = sqliteTable("companies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const companyRelations = relations(companies, ({ many }) => ({
  products: many(products),
}));

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productName: text("product_name").notNull(),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
}));

export const ruleInstances = sqliteTable("rule_instances", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ruleName: text("rule_name"),
  inputValues: text("inputs", { mode: "json" }),
  products: text("products", { mode: "json" }),
  enabled: integer("enabled", { mode: "boolean" }).default(true),
});

type Products = InferSelectModel<typeof products>;
