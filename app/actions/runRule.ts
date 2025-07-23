"use server";

import { RuleEngine } from "@/rules/engine";
import { Application, TRuleConfiguration } from "@/types";
import { setTimeout } from "node:timers/promises";

export async function runRuleAction(
  rule: TRuleConfiguration,
  application: Application
) {
  const e = new RuleEngine();
  await setTimeout(1500);
  const result = await e.RunRule(rule, application);
  return result;
}
