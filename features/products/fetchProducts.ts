"use server";

import { db } from "@/db";

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

export type ProductsWithCompany = NonNullable<
  Awaited<ReturnType<typeof fetchProducts>>
>;
