import { ruleInstanceInputs } from "@/types/schemas/rules";
import z from "zod";

export const tryRuleFormSchema = z.object({
  ruleConfig: ruleInstanceInputs,
  inputValues: ruleInstanceInputs,
});

export type TryRuleForm = z.infer<typeof tryRuleFormSchema>;
