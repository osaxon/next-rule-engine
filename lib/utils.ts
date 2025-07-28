import type { TMaxEngineSizeInputs } from "@/features/rules/max-engine-size/types";
import type { TMinCreditScoreInputs } from "@/features/rules/min-credit-score/types";
import { type TRuleNames } from "@/features/rules/types";
import type { TMustBeHomeownerInputs } from "@/types";
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
      ] as TMinCreditScoreInputs;
    case "max-engine-size":
      return [
        { name: "max-engine-size", type: "number", value: 0 },
      ] as TMaxEngineSizeInputs;
    case "must-be-homeowner":
      return [
        { name: "must-be-homeowner", type: "boolean", value: true },
      ] as TMustBeHomeownerInputs;
  }
}
