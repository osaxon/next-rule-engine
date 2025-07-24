"use server";

import { ruleDefinitions, ruleInstances } from "@/types/schemas/rules";
import { Rules } from "./types";
import { db } from "@/db";

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
  // const json = await import("../rule-instances.json").then((d) => d.default);

  const data = await db.query.ruleDefinitions.findMany();

  const rules = ruleDefinitions.safeParse(data);

  if (!rules.success) {
    console.error(rules.error);
    return null;
  }

  return rules.data;
}

export async function fetchSingleRule(name: Rules) {
  const allRules = await fetchRuleDefinitions();

  if (!allRules) return null;

  return allRules.filter((rule) => rule.ruleName === name);
}
