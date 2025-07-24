"use server";

import { db } from "@/db";
import { RuleEngine } from "../rules/engine";
import { Application } from "@/types";
import { fetchRuleInstances } from "../rules/fetchRules";
import { ApplicationBuilder } from "../applications/builder";

const engine = new RuleEngine();

export async function fetchProducts() {
  const products = await db.query.products.findMany({
    columns: {
      companyId: false,
    },
    with: {
      company: {
        columns: {
          id: false,
        },
      },
    },
  });

  return products;
}

export async function fetchProductsWithRuleOutcomes(application: Application) {
  const rules = await fetchRuleInstances();

  const products = await fetchProducts();

  if (!rules) return null;

  await engine.SetupRules(rules).RunRules(application);

  return engine.ProductOutcomes(products);
}

export type ProductsWithCompany = NonNullable<
  Awaited<ReturnType<typeof fetchProducts>>
>;
