import { productSchema } from "@/types/schemas/rules";
import z from "zod";

export const minCreditScoreInputs = z.array(
  z.object({
    name: z.literal("min-score"),
    type: z.literal("number"),
    value: z.coerce.number(),
  })
);

export const minCreditScoreRuleSchema = z.object({
  ruleName: z.literal("min-credit-score"),
  products: z.array(productSchema),
  inputValues: minCreditScoreInputs,
  enabled: z.boolean(),
});
