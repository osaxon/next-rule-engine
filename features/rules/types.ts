import {
  Application,
  TRuleConfiguration,
  RuleInputs,
  RuleInputTypes,
} from "@/types";

export interface IRule {
  shouldRun: (_application: Application) => boolean;
  run: (_application: Application) => Promise<RuleResult>;
  ruleName: string;
  products: string[];
  company: string;
  enabled: boolean;
}

export type RuleFactory = (_rule: TRuleConfiguration) => IRule;

export type RuleResults = {
  total: number;
  failing: number;
  passing: number;
  data: ProductRuleResult[];
};

export type ProductRuleResult = {
  product: string;
  company: string;
  rule: string;
  result: RuleResult;
};

export type RuleResult = {
  result: "PASS" | "FAIL";
  ruleConfig: RuleInputs;
  inputValue: RuleInputTypes;
};

export const rules = ["min-credit-score", "max-engine-size"] as const;

export type Rules = (typeof rules)[number];
