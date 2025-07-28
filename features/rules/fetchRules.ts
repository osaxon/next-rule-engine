"use server";

import { ruleDefinitions, ruleInstances } from "@/types/schemas/rules";
import { db } from "@/db";
import { TRuleNames } from "./types";

export async function fetchRuleInstances() {
  const data = await db.query.ruleInstances.findMany();

  const rules = ruleInstances.safeParse(data);

  if (!rules.success) {
    console.error(rules.error);
    return null;
  }

  return rules.data;
}

export async function fetchRuleDefinitions() {
  const data = await db.query.ruleDefinitions.findMany();

  const rules = ruleDefinitions.safeParse(data);

  if (!rules.success) {
    console.error(rules.error);
    return null;
  }

  return rules.data;
}

export async function fetchSingleRule(name: TRuleNames) {
  const allRules = await fetchRuleDefinitions();

  if (!allRules) return null;

  return allRules.filter((rule) => rule.ruleName === name);
}
