import { TRuleInputs, TRuleConfiguration } from "@/types";
import { TRuleNames } from "./types";

export class RuleConfigBuilder {
  private rule;

  constructor(base?: Partial<TRuleConfiguration>) {
    this.rule = {
      products: [
        {
          productName: "",
          company: "",
        },
      ],
      enabled: true,
      ...base,
    };
  }

  setRule(ruleName: TRuleNames) {
    this.rule.ruleName = ruleName;
    return this;
  }

  setInputValues(inputs: TRuleInputs[]) {
    this.rule.inputValues = inputs;
    return this;
  }

  build() {
    return this.rule as TRuleConfiguration;
  }
}
