import { Application, TMaxEngineSize } from "@/types";
import { differenceInMonths } from "date-fns";

import { IRule, RuleResult } from "./types";
import { RuleConfiguration } from "./rule-configuration";
import { setTimeout } from "node:timers/promises";

export class MaxEngineSize implements IRule {
  company: string;
  ruleName = "max-engine-size";
  products: string[];
  enabled: boolean;

  maxEngineSize: number;

  constructor(config: RuleConfiguration<TMaxEngineSize>) {
    this.maxEngineSize = config.getInputValue("max-engine-size");
    this.company = config.getCompany();
    this.products = config.getProductNames();
    this.enabled = config.rule.enabled;
  }

  shouldRun = (application: Application) =>
    this.enabled && application.vehicle.registrationDate !== null;

  async run(application: Application): Promise<RuleResult> {
    const appliedEngineSize = application.vehicle.engineSize;
    const result = appliedEngineSize < this.maxEngineSize;

    const ruleResult: RuleResult = {
      result: result ? "PASS" : "FAIL",
      ruleConfig: {
        name: "max-engine-size",
        type: "number",
        value: this.maxEngineSize,
      },
      inputValue: appliedEngineSize,
    };

    return ruleResult;
  }
}
