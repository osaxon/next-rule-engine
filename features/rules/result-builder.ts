import { TRuleInputs, RuleInputTypes } from "@/types";
import { RuleResult } from "./types";

export class RuleResultBuilder {
  private result;

  constructor(base?: Partial<RuleResult>) {
    this.result = {
      ...base,
    } as RuleResult;
    return this;
  }

  setResult(result: boolean) {
    this.result.result = result ? "PASS" : "FAIL";
    return this;
  }

  setRuleConfig(config: TRuleInputs) {
    this.result.ruleConfig = config;
    return this;
  }

  setInput(val: RuleInputTypes) {
    this.result.inputValue = val;
    return this;
  }

  build = () => this.result;
}
