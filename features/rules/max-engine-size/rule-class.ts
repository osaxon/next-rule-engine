import { Application, TRuleConfiguration } from "@/types";
import { IRule, RuleResult } from "../types";
import { RuleInstanceConfig } from "../rule-configuration";
import { TMaxEngineSizeInputs } from "./types";
import { maxEngineSizeSchema } from "./schemas";
import { RuleResultBuilder } from "../result-builder";

export class MaxEngineSize implements IRule {
  company: string;
  ruleName = "max-engine-size";
  products: string[];
  enabled: boolean;
  schema = maxEngineSizeSchema;

  maxEngineSize: number;
  config: RuleInstanceConfig<TMaxEngineSizeInputs>;

  constructor(ruleConfiguration: TRuleConfiguration) {
    const parsed = this.schema.safeParse(ruleConfiguration);

    if (!parsed.success) throw new Error("error parsing min credit score rule");

    // sets the instance configuration values
    this.config = new RuleInstanceConfig<TMaxEngineSizeInputs>(parsed.data);
    this.company = this.config.getCompany();

    this.maxEngineSize = this.config.getInputValue("max-engine-size");

    this.enabled = this.config.isEnabled();
    this.products = this.config.getProductNames();
  }

  shouldRun = (application: Application) =>
    this.enabled && application.vehicle.registrationDate !== null;

  async run(application: Application): Promise<RuleResult> {
    const appliedEngineSize = application.vehicle.engineSize;
    const result = appliedEngineSize < this.maxEngineSize;

    const ruleResult = new RuleResultBuilder()
      .setResult(result)
      .setRuleConfig({
        name: "max-engine-size",
        type: "number",
        value: this.maxEngineSize,
      })
      .setInput(appliedEngineSize)
      .build();

    return ruleResult;
  }
}
