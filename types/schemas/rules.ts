import { products } from "@/db/schema";
import { z } from "zod";

export const productSchema = z.object({
  productName: z.string(),
  company: z.string(),
});

export const ruleInputSchema = z.object({
  name: z.string(),
  type: z.union([
    z.literal("number"),
    z.literal("string"),
    z.literal("boolean"),
  ]),
});

export const ruleDefinitionInputs = z.array(ruleInputSchema);

export const inputValueSchema = z.discriminatedUnion("type", [
  z.object({ name: z.string(), type: z.literal("string"), value: z.string() }),
  z.object({
    name: z.string(),
    type: z.literal("number"),
    value: z.coerce.number(),
  }),
  z.object({
    name: z.string(),
    type: z.literal("boolean"),
    value: z.boolean(),
  }),
]);

export const ruleInstanceInputs = z.array(inputValueSchema);

export const ruleDefinitionSchema = z.object({
  ruleName: z.string(),
  type: z.union([z.literal("credit"), z.literal("vehicle")]),
  inputs: z.array(ruleInputSchema).nullable(),
});

export const ruleConfigurationSchema = z.object({
  ruleName: z.union([
    z.literal("min-credit-score"),
    z.literal("max-engine-size"),
    z.literal("must-be-homeowner"),
  ]),
  products: z.array(productSchema),
  inputValues: ruleInstanceInputs,
  enabled: z.boolean(),
});

export const ruleNameUnion = ruleConfigurationSchema.shape.ruleName;

export const minCreditScoreInputs = z.array(
  z.object({
    name: z.literal("min-score"),
    type: z.literal("number"),
    value: z.coerce.number(),
  })
);

export const ruleInstanceInputsV2 = z.array(
  z.discriminatedUnion("name", [
    z.object({
      name: z.literal("min-score"),
      type: z.literal("number"),
      value: z.number(),
    }),
    z.object({
      name: z.literal("max-engine-size"),
      type: z.literal("number"),
      value: z.number(),
    }),
    z.object({
      name: z.literal("must-be-homeowner"),
      type: z.literal("boolean"),
      value: z.boolean(),
    }),
  ])
);

export const genericRuleInstanceInputs = z.array(
  z.object({
    name: z.string(),
    type: z.union([z.literal("string"), z.literal("number")]),
    value: z.string(),
  })
);

export const mustBeHomeownerInputs = z.array(
  z.object({
    name: z.literal("must-be-homeowner"),
    type: z.literal("boolean"),
    value: z.boolean(),
  })
);

export const mustBeHomeownerSchema = z.object({
  ruleName: z.literal("must-be-homeowner"),
  products: z.array(productSchema),
  inputValues: mustBeHomeownerInputs,
  enabled: z.boolean(),
});

export const ruleInstances = z.array(ruleConfigurationSchema);
export const ruleDefinitions = z.array(ruleDefinitionSchema);
