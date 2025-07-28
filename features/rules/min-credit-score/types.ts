import z from "zod";
import { minCreditScoreInputs, minCreditScoreRuleSchema } from "./schemas";

export type TMinCreditScoreInputs = z.infer<typeof minCreditScoreInputs>;

export type TMinCreditScoreRule = z.infer<typeof minCreditScoreRuleSchema>;
