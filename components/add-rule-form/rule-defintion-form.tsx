import { TRuleNames } from "@/features/rules/types";
import { cn } from "@/lib/utils";
import { ruleNameUnion } from "@/types/schemas/rules";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CommandItem, CommandList } from "cmdk";
import { Check } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "../ui/command";
import { Popover } from "../ui/popover";
import { TAddRuleForm } from "./types";

export function RuleDefinitionForm() {
  const [open, setOpen] = useState(false);
  const form = useFormContext<TAddRuleForm>();

  const ruleName = form.watch("ruleName");

  console.log(ruleNameUnion.options.map((r) => r.value));

  const handleSelect = (value: TRuleNames) => {
    form.setValue("ruleName", value);
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="outline"
            className={cn(
              "w-[200px] justify-between",
              !ruleName && "text-muted-foreground"
            )}
          >
            {ruleName
              ? ruleNameUnion.options.find((r) => r.value === ruleName)?.value
              : "Select rule"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="rule..." className="h-9" />
            <CommandList>
              <CommandEmpty>None found</CommandEmpty>
              <CommandGroup>
                {ruleNameUnion.options.map((rule) => (
                  <CommandItem
                    value={rule.value}
                    key={rule.value}
                    onSelect={() => handleSelect(rule.value)}
                  >
                    {rule.value}
                    <Check
                      className={cn(
                        "ml-auto",
                        rule.value === ruleName ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
