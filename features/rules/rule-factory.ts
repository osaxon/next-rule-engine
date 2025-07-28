import { MinCreditScoreRule } from "./min-credit-score/rule-class";
import { MaxEngineSize } from "./max-engine-size/rule-class";

import { IRule, TRuleNames } from "./types";
import { TRuleConfiguration } from "@/types";
import { MustBeHomeowner } from "./must-be-homeowner/rule-class";

export class RuleFactoryClass {
  ruleClass: IRule | null = null;
  ruleConfig: TRuleConfiguration;

  constructor(ruleConfig: TRuleConfiguration) {
    this.ruleConfig = ruleConfig;
  }

  InitRule = (): IRule | null => {
    switch (this.ruleConfig.ruleName) {
      case "min-credit-score":
        return new MinCreditScoreRule(this.ruleConfig);
      case "max-engine-size":
        return new MaxEngineSize(this.ruleConfig);
      case "must-be-homeowner":
        return new MustBeHomeowner(this.ruleConfig);
      default:
        return null;
    }
  };
}
