"use server";

import { ruleInstances } from "@/types/schemas/rules";
import { Rules } from "./types";

export async function fetchRules() {
  const json = await import("../rule-instances.json").then((d) => d.default);

  const rules = ruleInstances.safeParse(json);

  if (!rules.success) return null;

  return rules.data;
}

export async function fetchSingleRule(name: Rules) {
  const allRules = await fetchRules();

  if (!allRules) return null;

  return allRules.filter((rule) => rule.ruleName === name);
}
