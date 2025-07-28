import {
  Application,
  TRuleConfiguration,
  TRuleInputs,
  RuleInputTypes,
  TMustBeHomeownerRule,
  InputValues,
} from "@/types";
import { ProductsWithCompany } from "../products/fetchProducts";
import { TMinCreditScoreRule } from "./min-credit-score/types";
import { ZodType } from "zod";
import { RuleInstanceConfig } from "./rule-configuration";
import { TMaxEngineSizeRule } from "./max-engine-size/types";

export interface IRule {
  shouldRun: (_application: Application) => boolean;
  run: (_application: Application) => Promise<RuleResult>;
  ruleName: string;
  enabled: boolean;
  schema: ZodType; // used to parse ruleConfig data from the database into usable input values
  products: string[];
  company: string;
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
  ruleConfig: TRuleInputs;
  inputValue: RuleInputTypes;
};

export type RuleOutcome<T extends InputValues[]> = {
  result: "PASS" | "FAIL";
  ruleConfig: RuleInstanceConfig<T>;
};

export type RuleResultSummary = {
  total: number;
  passing: number;
  failing: number;
  skipped: number;
  data: ProductRuleResult[];
};

export type ProductsWithOutcomes = ProductsWithCompany & {
  ruleOutcomes: Array<{
    ruleName: string;
    input: TRuleInputs["value"];
    ruleConfig: TRuleInputs["value"];
  }>;
};

// All rule names
export type TRuleNames =
  | TMaxEngineSizeRule["ruleName"]
  | TMinCreditScoreRule["ruleName"]
  | TMustBeHomeownerRule["ruleName"];
