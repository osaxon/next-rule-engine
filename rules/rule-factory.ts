import { MaxVehicleAgeInputs, MinCreditScoreInputs } from "@/types";
import { MinCreditScoreRule } from "./min-credit-score";
import { MaxVehicleAge } from "./max-vehicle-age";
import {
  maxVehicleAgeRuleSchema,
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
      new RuleConfiguration<MinCreditScoreInputs>(parsedRule.data)
    );
  },
  "max-vehicle-age": (rule) => {
    const parsedRule = maxVehicleAgeRuleSchema.safeParse(rule);

    if (!parsedRule.success) {
      console.error("error parsing rule");
      throw new Error();
    }

    return new MaxVehicleAge(
      new RuleConfiguration<MaxVehicleAgeInputs>(parsedRule.data)
    );
  },
} as const;
