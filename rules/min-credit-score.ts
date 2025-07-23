import { Application, MinCreditScoreInputs } from "@/types";
import { Rules } from "@/types/constants";
import { IRule, RuleResult } from "./types";
import { RuleConfiguration } from "./rule-configuration";

export class MinCreditScoreRule implements IRule {
  minScore: number;
  ruleName = Rules.minCreditScore;
  products: string[];
  company: string;
  enabled: boolean;

  constructor(config: RuleConfiguration<MinCreditScoreInputs>) {
    const inputValue = config.getInputValue("min-score");

    this.minScore = inputValue;
    this.enabled = config.rule.enabled;
    this.company = config.getCompany() ?? "";
    this.products = config.getProductNames() ?? [];
  }

  shouldRun = () => this.enabled;

  async run(application: Application): Promise<RuleResult> {
    const result =
      application.mainApplicant.creditReport.score >= this.minScore;

    const ruleResult: RuleResult = {
      result: result ? "PASS" : "FAIL",
      ruleConfig: { name: "min-score", type: "number", value: this.minScore },
      inputValue: application.mainApplicant.creditReport.score,
    };

    return ruleResult;
  }
}
