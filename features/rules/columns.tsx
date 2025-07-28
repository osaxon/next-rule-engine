"use client";

import { Separator } from "@/components/ui/separator";
import { RuleDefinition } from "@/types";
import { ruleDefinitionInputs } from "@/types/schemas/rules";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<RuleDefinition>[] = [
  {
    accessorKey: "ruleName",
    header: "Rule name",
    cell: ({ row }) => {
      const ruleName = row.getValue("ruleName") as string;
      return <Link href={`/rules/${ruleName}/add`}>{ruleName}</Link>;
    },
  },
  {
    accessorKey: "type",
  },
  {
    accessorKey: "inputs",
    header: "Input Parameters",
    cell: ({ row }) => {
      const inputs = row.getValue("inputs");
      const parsed = ruleDefinitionInputs.safeParse(inputs);

      if (!parsed.success) {
        console.log(parsed.error);
        return <p>failed to parse</p>;
      }

      return (
        <>
          {parsed.data.map((input) => (
            <div key={input.name} className="flex gap-2">
              <span>{input.name}</span>
              <Separator orientation="vertical" />
              <p className="text-muted-foreground">{input.type}</p>
            </div>
          ))}
        </>
      );
    },
  },
];
