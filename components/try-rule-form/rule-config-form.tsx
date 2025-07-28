import { TRuleNames } from "@/features/rules/types";
import { getSafeRuleInputTypes } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { TryRuleForm } from "./types";

export default function RuleConfigForm({ ruleName }: { ruleName: TRuleNames }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TryRuleForm>();

  const inputValues = getSafeRuleInputTypes(ruleName);

  return (
    <div className="space-y-4">
      {inputValues.map((input, index) => (
        <div key={input.name} className="space-y-2">
          <Label htmlFor={`ruleConfig.${index}.value`}>
            Paramter name: {input.name}
          </Label>

          {input.type === "number" ? (
            <Input
              type="number"
              id={`ruleConfig.${index}.value`}
              {...register(`ruleConfig.${index}.value`, {
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
                {`Set ${input.name} to `}
              </Label>
            </div>
          ) : (
            <Input
              type="text"
              id={`ruleConfig.${index}.value`}
              {...register(`ruleConfig.${index}.value`)}
            />
          )}
          {errors.ruleConfig?.[index]?.value && (
            <span className="text-red-500 text-xs">
              {errors.ruleConfig[index]?.value?.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
