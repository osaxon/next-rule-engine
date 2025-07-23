import { Application, MaxVehicleAgeInputs } from "@/types";
import { differenceInMonths } from "date-fns";

import { IRule, RuleResult } from "./types";
import { RuleConfiguration } from "./rule-configuration";
import { setTimeout } from "node:timers/promises";

export class MaxVehicleAge implements IRule {
  company: string;
  ruleName = "max-vehicle-age";
  products: string[];
  enabled: boolean;

  maxAge: number;

  constructor(config: RuleConfiguration<MaxVehicleAgeInputs>) {
    this.maxAge = config.getInputValue("max-age");
    this.company = config.getCompany();
    this.products = config.getProductNames();
    this.enabled = config.rule.enabled;
  }

  shouldRun = (application: Application) =>
    this.enabled && application.vehicle.registrationDate !== null;

  async run(application: Application): Promise<RuleResult> {
    await setTimeout(500);
    const now = new Date();
    const registrationDate = new Date(application.vehicle.registrationDate);

    const ageInMonths = differenceInMonths(now, registrationDate);

    const result = ageInMonths <= this.maxAge;

    const ruleResult: RuleResult = {
      result: result ? "PASS" : "FAIL",
      ruleConfig: { name: "max-age", type: "number", value: this.maxAge },
      inputValue: ageInMonths,
    };

    return ruleResult;
  }
}
