"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductsWithCompany } from "./fetchProducts";

export const columns: ColumnDef<ProductsWithCompany[number]>[] = [
  {
    accessorKey: "productName",
  },
  {
    accessorKey: "company",
    cell: ({ row }) => {
      const company = row.getValue(
        "company"
      ) as ProductsWithCompany[number]["company"];
      return <div>{company.name}</div>;
    },
  },
];
