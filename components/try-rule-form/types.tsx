import { ruleInstanceInputsV2 } from "@/types/schemas/rules";
import z from "zod";

export const tryRuleFormSchema = z.object({
  ruleConfig: ruleInstanceInputsV2,
  inputValues: ruleInstanceInputsV2,
});

export type TryRuleForm = z.infer<typeof tryRuleFormSchema>;
