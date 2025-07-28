import { Application } from "@/types";
import { IRule } from "./types";
import { IRuleInstanceConfig } from "./rule-configuration";
import { RuleResultBuilder } from "./result-builder";
import { mustBeHomeownerSchema } from "@/types/schemas/rules";

export class MustBeHomeowner implements IRule {
  ruleName: string;
  products: string[];
  company: string;
  enabled: boolean;
  mustBeHomeowner: boolean;
  schema = mustBeHomeownerSchema;

  constructor(config: IRuleInstanceConfig) {
    this.enabled = config.isEnabled();
    this.company = config.getCompany() ?? "";
    this.products = config.getProductNames() ?? [];
    this.ruleName = "must-be-homeowner";
    this.mustBeHomeowner = true;
  }

  shouldRun = (_application: Application) => this.enabled;

  async run(application: Application) {
    const result =
      (this.mustBeHomeowner && application.mainApplicant.homeowner) ||
      !this.mustBeHomeowner;

    return new RuleResultBuilder()
      .setResult(result)
      .setRuleConfig({
        name: "must-be-homeowner",
        type: "boolean",
        value: this.mustBeHomeowner,
      })
      .setInput(application.mainApplicant.homeowner)
      .build();
  }
}
