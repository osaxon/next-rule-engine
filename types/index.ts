import { z } from "zod";
import { applicantSchema, applicationSchema } from "./schemas";
import {
  inputValueSchema,
  minCreditScoreInputs,
  productSchema,
  ruleDefinitionSchema,
  ruleConfigurationSchema,
  mustBeHomeownerInputs,
  mustBeHomeownerSchema,
} from "./schemas/rules";
import { TMaxEngineSizeInputs } from "@/features/rules/max-engine-size/types";

export type Applicant = z.infer<typeof applicantSchema>;
export type Application = z.infer<typeof applicationSchema>;

export type RuleDefinition = z.infer<typeof ruleDefinitionSchema>;
export type TRuleConfiguration = z.infer<typeof ruleConfigurationSchema>;

export type InputValues = z.infer<typeof inputValueSchema>;
export type InputValueTypes = InputValues["type"];

export type Product = z.infer<typeof productSchema>;
export type TMustBeHomeownerRule = z.infer<typeof mustBeHomeownerSchema>;

export type TMinCreditScoreInputs = z.infer<typeof minCreditScoreInputs>;
export type TMustBeHomeownerInputs = z.infer<typeof mustBeHomeownerInputs>;

export type TRuleInputs =
  | TMinCreditScoreInputs[number]
  | TMaxEngineSizeInputs[number]
  | TMustBeHomeownerInputs[number];

export type RuleInputKeys = TRuleInputs["name"];
export type RuleInputTypes = TRuleInputs["type"] extends infer T
  ? T extends "number"
    ? number
    : T extends "string"
    ? string
    : T extends "boolean"
    ? boolean
    : never
  : never;

export type InputValueType<K extends RuleInputKeys> = Extract<
  TRuleInputs,
  { name: K }
>["value"];
