import z from "zod";
import { maxEngineSizeInputs, maxEngineSizeSchema } from "./schemas";

export type TMaxEngineSizeRule = z.infer<typeof maxEngineSizeSchema>;
export type TMaxEngineSizeInputs = z.infer<typeof maxEngineSizeInputs>;
