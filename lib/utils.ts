import { TAddRuleForm } from "@/components/add-rule-form/types";
import { Rules } from "@/rules/types";
import {
  MaxVehicleAgeInputs,
  MinCreditScoreInputs,
  TRuleConfiguration,
  TRuleNames,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSafeRuleInputTypes(ruleName: TRuleNames) {
  switch (ruleName) {
    case "min-credit-score":
      return [
        { name: "min-score", type: "number", value: 0 },
      ] as MinCreditScoreInputs;
    case "max-vehicle-age":
      return [
        { name: "max-age", type: "number", value: 0 },
      ] as MaxVehicleAgeInputs;
    default:
      return [];
  }
}
