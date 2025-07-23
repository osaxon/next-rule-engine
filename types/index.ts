import { z } from "zod";
import { applicantSchema, applicationSchema } from "./schemas";
import {
  inputValueSchema,
  maxVehicleAgeInputs,
  maxVehicleAgeRuleSchema,
  minCreditScoreInputs,
  minCreditScoreRuleSchema,
  productSchema,
  ruleDefinition,
  ruleConfigurationSchema,
} from "./schemas/rules";

export type Applicant = z.infer<typeof applicantSchema>;
export type Application = z.infer<typeof applicationSchema>;

export type RuleDefinition = z.infer<typeof ruleDefinition>;
export type TRuleConfiguration = z.infer<typeof ruleConfigurationSchema>;

export type InputValues = z.infer<typeof inputValueSchema>;

export type Product = z.infer<typeof productSchema>;

export type TMinCreditScoreRule = z.infer<typeof minCreditScoreRuleSchema>;
export type TMaxVehicleAgeRule = z.infer<typeof maxVehicleAgeRuleSchema>;

export type MinCreditScoreInputs = z.infer<typeof minCreditScoreInputs>;
export type MaxVehicleAgeInputs = z.infer<typeof maxVehicleAgeInputs>;

export type RuleInputs =
  | MinCreditScoreInputs[number]
  | MaxVehicleAgeInputs[number];

export type TRuleNames =
  | TMaxVehicleAgeRule["ruleName"]
  | TMinCreditScoreRule["ruleName"];

export type RuleInputKeys = RuleInputs["name"];
export type RuleInputTypes = RuleInputs["type"] extends "number"
  ? number
  : never;

export type InputValueType<K extends RuleInputKeys> = Extract<
  RuleInputs,
  { name: K }
>["value"];
