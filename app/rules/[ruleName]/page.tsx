import { AppContainer } from "@/components/app-container";
import { TryRule } from "@/components/try-rule-form/try-rule-form";
import { TRuleNames } from "@/features/rules/types";

export default async function RulePage({
  params,
}: {
  params: Promise<{ ruleName: TRuleNames }>;
}) {
  const { ruleName } = await params;

  return (
    <AppContainer>
      <TryRule ruleName={ruleName} />
    </AppContainer>
  );
}
