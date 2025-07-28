import {
  Application,
  TMustBeHomeownerInputs,
  TRuleConfiguration,
} from "@/types";
import { IRule } from "../types";
import { RuleInstanceConfig } from "../rule-configuration";
import { RuleResultBuilder } from "../result-builder";
import { mustBeHomeownerSchema } from "@/types/schemas/rules";

export class MustBeHomeowner implements IRule {
  ruleName: string;
  products: string[];
  company: string;
  enabled: boolean;
  mustBeHomeowner: boolean;
  schema = mustBeHomeownerSchema;

  config: RuleInstanceConfig<TMustBeHomeownerInputs>;

  constructor(ruleConfiguration: TRuleConfiguration) {
    const parsed = this.schema.safeParse(ruleConfiguration);

    if (!parsed.success) throw new Error("error parsing min credit score rule");

    // sets the instance configuration values
    this.config = new RuleInstanceConfig<TMustBeHomeownerInputs>(parsed.data);
    this.company = this.config.getCompany();

    this.enabled = this.config.isEnabled();
    this.company = this.config.getCompany() ?? "";
    this.products = this.config.getProductNames() ?? [];
    this.ruleName = "must-be-homeowner";
    console.log(this.enabled, "is enabled");
    this.mustBeHomeowner = this.config.getInputValue("must-be-homeowner");
  }

  shouldRun = (_application: Application) => this.enabled;

  async run(application: Application) {
    const result =
      (this.mustBeHomeowner && application.mainApplicant.homeowner) ||
      !this.mustBeHomeowner;

    console.log(application.mainApplicant.homeowner, "the result");

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
