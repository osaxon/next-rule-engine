import { TRuleConfiguration } from "@/types";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { TryRuleForm } from "./types";

export default function RuleConfigForm({ rule }: { rule: TRuleConfiguration }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TryRuleForm>();

  return (
    <div className="space-y-4">
      {rule.inputValues.map((input, index) => (
        <div key={input.name} className="space-y-2">
          <Label htmlFor={`ruleConfig.${index}.value`}>
            Paramter name: {input.name}
          </Label>

          {input.type === "boolean" ? (
            <Switch {...register(`ruleConfig.${index}.value`)} />
          ) : input.type === "number" ? (
            <Input
              type="number"
              id={`ruleConfig.${index}.value`}
              {...register(`ruleConfig.${index}.value`, {
                valueAsNumber: true,
              })}
            />
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
