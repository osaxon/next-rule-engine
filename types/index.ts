import { z } from "zod";
import { applicantSchema, applicationSchema } from "./schemas";
import {
  inputValueSchema,
  maxEngineSizeInputs,
  maxEngineSizeSchema,
  minCreditScoreInputs,
  minCreditScoreRuleSchema,
  productSchema,
  ruleDefinitionSchema,
  ruleConfigurationSchema,
} from "./schemas/rules";

export type Applicant = z.infer<typeof applicantSchema>;
export type Application = z.infer<typeof applicationSchema>;

export type RuleDefinition = z.infer<typeof ruleDefinitionSchema>;
export type TRuleConfiguration = z.infer<typeof ruleConfigurationSchema>;

export type InputValues = z.infer<typeof inputValueSchema>;

export type Product = z.infer<typeof productSchema>;

export type TMinCreditScoreRule = z.infer<typeof minCreditScoreRuleSchema>;
export type TMaxVehicleAgeRule = z.infer<typeof maxEngineSizeSchema>;

export type TMinCreditScoreInputs = z.infer<typeof minCreditScoreInputs>;
export type TMaxEngineSize = z.infer<typeof maxEngineSizeInputs>;

//
// |
export type RuleInputs = TMinCreditScoreInputs[number] | TMaxEngineSize[number];

export type TRuleNames =
  | TMaxVehicleAgeRule["ruleName"]
  | TMinCreditScoreRule["ruleName"];

export type RuleInputKeys = RuleInputs["name"];
export type RuleInputTypes = RuleInputs["type"] extends infer T
  ? T extends "number"
    ? number
    : T extends "string"
    ? string
    : never
  : never;

export type InputValueType<K extends RuleInputKeys> = Extract<
  RuleInputs,
  { name: K }
>["value"];
