"use server";
import { TAddRuleForm } from "@/components/add-rule-form/types";
import { db } from "@/db";
import { ruleInstances } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function insertRule(values: TAddRuleForm) {
  await db.insert(ruleInstances).values({
    ruleName: values.ruleName,
    inputValues: values.ruleConfig.map((c) => ({
      ...c,
      value: c.value.toString(),
    })),
    enabled: values.enabled,
    products: values.products,
  });
  revalidatePath("/product-results", "page");
}
