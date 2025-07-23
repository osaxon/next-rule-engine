import { TMaxEngineSize, TMinCreditScoreInputs } from "@/types";
import { MinCreditScoreRule } from "./min-credit-score";
import { MaxEngineSize } from "./max-engine-size";
import {
  maxEngineSizeSchema,
  minCreditScoreRuleSchema,
} from "@/types/schemas/rules";
import { RuleFactory, Rules } from "./types";
import { RuleConfiguration } from "./rule-configuration";

export const ruleFactoryRegistry: Record<Rules | (string & {}), RuleFactory> = {
  "min-credit-score": (rule) => {
    const parsedRule = minCreditScoreRuleSchema.safeParse(rule);

    if (!parsedRule.success) {
      console.error("error parsing rule");
      throw new Error();
    }

    return new MinCreditScoreRule(
      new RuleConfiguration<TMinCreditScoreInputs>(parsedRule.data)
    );
  },
  "max-engine-size": (rule) => {
    const parsedRule = maxEngineSizeSchema.safeParse(rule);

    if (!parsedRule.success) {
      console.error("error parsing rule");
      throw new Error();
    }

    return new MaxEngineSize(
      new RuleConfiguration<TMaxEngineSize>(parsedRule.data)
    );
  },
} as const;
