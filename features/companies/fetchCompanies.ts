"use server";

import { db } from "@/db";

export async function fetchCompanies() {
  const companies = await db.query.companies.findMany();

  return companies;
}
