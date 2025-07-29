import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductsWithCompany } from "@/features/products/fetchProducts";
import { TRuleNames } from "@/features/rules/types";
import { getSafeRuleInputTypes } from "@/lib/utils";
import { InfoIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { TAddRuleForm } from "./types";

export default function RuleConfigForm({
  ruleName,
  products,
}: {
  ruleName: TRuleNames;
  products: ProductsWithCompany;
}) {
  const {
    register,
    formState: { errors },
    ...form
  } = useFormContext<TAddRuleForm>();
  const [enableEditKey, setEnableEditKey] = useState(false);

  const inputValues = getSafeRuleInputTypes(ruleName);

  const companies = Array.from(new Set(products.map((p) => p.company.name)));

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
        <Select
          onValueChange={(val) => {
            console.log(val);
            const kebabCaseCompany = val.replaceAll(" ", "-");
            form.setValue("key", `${kebabCaseCompany}.${ruleName}`);
            form.setValue("company", val);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a company to apply the rule to" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                {...register(`ruleConfig.${index}.value`, {
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
