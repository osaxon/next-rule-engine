import {
  Application,
  TMinCreditScoreInputs,
  TRuleConfiguration,
} from "@/types";
import { Rules } from "@/types/constants";
import { IRule, RuleResult } from "../types";
import { RuleInstanceConfig } from "../rule-configuration";
import { RuleResultBuilder } from "../result-builder";
import { minCreditScoreRuleSchema } from "./schemas";

export class MinCreditScoreRule implements IRule {
  company: string;
  // the value which will be set by the ruleConfig
  minScore: number;
  products: string[];
  ruleName = Rules.minCreditScore;

  enabled: boolean;
  schema = minCreditScoreRuleSchema;

  config: RuleInstanceConfig<TMinCreditScoreInputs>;

  constructor(ruleConfiguration: TRuleConfiguration) {
    const parsed = this.schema.safeParse(ruleConfiguration);

    if (!parsed.success) throw new Error("error parsing min credit score rule");

    // sets the instance configuration values
    this.config = new RuleInstanceConfig<TMinCreditScoreInputs>(parsed.data);
    this.company = this.config.getCompany();

    const inputValue = this.config.getInputValue("min-score");

    this.minScore = inputValue;
    this.enabled = this.config.isEnabled();
    this.products = this.config.getProductNames();
  }

  shouldRun = () => this.enabled;

  async run(application: Application): Promise<RuleResult> {
    const input = application.mainApplicant.creditReport.score;
    const result = input >= this.minScore;

    const ruleResult = new RuleResultBuilder()
      .setResult(result)
      .setRuleConfig({
        name: "min-score",
        type: "number",
        value: this.minScore,
      })
      .setInput(input)
      .build();

    return ruleResult;
  }
}
