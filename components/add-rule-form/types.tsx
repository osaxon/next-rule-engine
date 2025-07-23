import { productSchema, ruleInstanceInputs } from "@/types/schemas/rules";
import z from "zod";

export const addRuleFormSchema = z.object({
  ruleName: z.string(),
  company: z.string(),
  ruleConfig: ruleInstanceInputs,
  products: z.array(productSchema),
  key: z.string(),
  documentation: z.string(),
  enabled: z.boolean(),
});

export type TAddRuleForm = z.infer<typeof addRuleFormSchema>;
