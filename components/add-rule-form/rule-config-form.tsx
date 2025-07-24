import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rules } from "@/features/rules/types";
import { getSafeRuleInputTypes } from "@/lib/utils";
import { InfoIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TAddRuleForm } from "./types";

export default function RuleConfigForm({ ruleName }: { ruleName: Rules }) {
  const {
    register,
    formState: { errors },
    ...form
  } = useFormContext<TAddRuleForm>();
  const [enableEditKey, setEnableEditKey] = useState(false);

  const inputValues = getSafeRuleInputTypes(ruleName);

  return (
    <div className="space-y-4">
      <Label htmlFor="company">Rule</Label>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            disabled
            value={ruleName}
            {...register("ruleName")}
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Rule Info</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          {...register("company", {
            onChange: (e) => {
              const kebabCaseCompany = e.target.value.replaceAll(" ", "-");
              form.setValue("key", `${kebabCaseCompany}.${ruleName}`);
            },
          })}
        />
      </div>
      <div className="space-y-2 relative">
        <Label className="flex justify-between" htmlFor="key">
          Key
          <PencilIcon
            role="button"
            className="size-4 cursor-pointer hover:opacity-70"
            onClick={() => setEnableEditKey(!enableEditKey)}
          />
        </Label>
        <Input type="text" disabled={!enableEditKey} {...register("key")} />
      </div>
      {inputValues?.map((input, index) => (
        <div key={input.name} className="space-y-2">
          <p>Rule Parameters</p>
          <Label htmlFor={`inputValues.${index}`}>{input.name}</Label>

          {input.type === "number" ? (
            <Input
              type="number"
              id={`inputValues.${index}.value`}
              {...register(`ruleConfig.${index}.value`, {
                valueAsNumber: true,
              })}
            />
          ) : (
            <Input
              type="text"
              id={`inputValues.${index}.value`}
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
