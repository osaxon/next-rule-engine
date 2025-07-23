import { TMaxEngineSize, TMinCreditScoreInputs, TRuleNames } from "@/types";
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
      ] as TMaxEngineSize;
  }
}
