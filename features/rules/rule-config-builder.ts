import { TRuleInputs, TRuleConfiguration } from "@/types";
import { Rules } from "./types";

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

  setRule(ruleName: Rules) {
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
