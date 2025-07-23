"use server";

import { RuleEngine } from "@/rules/engine";
import { Application, TRuleConfiguration } from "@/types";

export async function runRuleAction(
  rule: TRuleConfiguration,
  application: Application
) {
  const e = new RuleEngine();
  const result = await e.RunRule(rule, application);
  return result;
}
