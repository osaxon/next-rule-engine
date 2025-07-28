import { productSchema } from "@/types/schemas/rules";
import z from "zod";

export const maxEngineSizeInputs = z.array(
  z.object({
    name: z.literal("max-engine-size"),
    type: z.literal("number"),
    value: z.coerce.number(),
  })
);

export const maxEngineSizeSchema = z.object({
  ruleName: z.literal("max-engine-size"),
  products: z.array(productSchema),
  inputValues: maxEngineSizeInputs,
  enabled: z.boolean(),
});
