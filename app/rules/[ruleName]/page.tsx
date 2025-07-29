import { AppContainer } from "@/components/app-container";
import { TryRule } from "@/components/try-rule-form/try-rule-form";
import { Button } from "@/components/ui/button";
import { fetchRuleDefinitions } from "@/features/rules/fetchRules";
import { TRuleNames } from "@/features/rules/types";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function RulePage({
  params,
}: {
  params: Promise<{ ruleName: TRuleNames }>;
}) {
  const { ruleName } = await params;
  const rules = await fetchRuleDefinitions();
  const thisRule = rules?.find((r) => r.ruleName === ruleName);

  return (
    <AppContainer>
      <div>Rule info</div>
      <div>
        <Button asChild>
          <Link href={`/rules/${ruleName}/add`}>
            <PlusCircleIcon />
            Add Rule
          </Link>
        </Button>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Try Rule</h2>
      </div>
      <TryRule ruleName={ruleName} />
    </AppContainer>
  );
}
