import { InputValues, TRuleConfiguration } from "@/types";

export interface IRuleInstanceConfig {
  getCompany: () => string;
  getProductNames: () => string[];
  getRuleName: () => string;
  isEnabled: () => boolean;
  getRuleConfig: () => InputValues[];
}

export class RuleInstanceConfig<TInputValues extends InputValues[]>
  implements IRuleInstanceConfig
{
  rule: {
    inputValues: TInputValues;
  } & TRuleConfiguration;

  constructor(rule: { inputValues: TInputValues } & TRuleConfiguration) {
    this.rule = rule;
  }

  getInputValue<
    K extends TInputValues[number]["name"],
    T extends TInputValues[number]["type"]
  >(key: K): Extract<TInputValues[number], { name: K; type: T }>["value"] {
    const val = this.rule.inputValues.find((r) => r.name === key);
    const type = val?.type;

    if (!val)
      throw new Error(`Input value '${key}' of type '${type}' not found.`);
    return val.value as Extract<
      TInputValues[number],
      { name: K; type: T }
    >["value"];
  }

  getCompany = () => this.rule.products[0]?.company ?? "";
  getProductNames = () => this.rule.products.map((p) => p.productName);
  getRuleName = () => this.rule.ruleName;
  isEnabled = () => this.rule.enabled;
  getRuleConfig = () => this.rule.inputValues;
}
