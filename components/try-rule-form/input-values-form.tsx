import { TRuleNames } from "@/features/rules/types";
import { getSafeRuleInputTypes } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormDescription } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { TryRuleForm } from "./types";

export function InputValuesForm({ ruleName }: { ruleName: TRuleNames }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TryRuleForm>();

  const inputValues = getSafeRuleInputTypes(ruleName);

  return (
    <div className="space-y-4">
      {inputValues.map((input, index) => (
        <div key={input.name} className="space-y-2">
          <FormDescription>
            This the actual value to test the rule with. The value provided here
            will be added to a test application and passed to the rule.
          </FormDescription>
          <Label htmlFor={`inputValues.${index}.value`}>
            Value for {input.name}
          </Label>

          {input.type === "number" ? (
            <Input
              type="number"
              id={`inputValues.${index}.value`}
              {...register(`inputValues.${index}.value`, {
                valueAsNumber: true,
              })}
            />
          ) : input.type === "boolean" ? (
            <div className="flex items-center gap-2">
              <Switch
                id={`inputValues.${index}.value`}
                checked={undefined}
                {...register(`inputValues.${index}.value`, {
                  setValueAs: (v) => Boolean(v === true || v === "true"),
                })}
              />
              <Label htmlFor={`inputValues.${index}.value`} className="ml-2">
                {`Set ${input.name} to ${input.type}`}
              </Label>
            </div>
          ) : (
            <Input
              type="text"
              id={`inputValues.${index}.value`}
              {...register(`inputValues.${index}.value`)}
            />
          )}
          {errors.inputValues?.[index]?.value && (
            <span className="text-red-500 text-xs">
              {errors.inputValues[index]?.value?.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
