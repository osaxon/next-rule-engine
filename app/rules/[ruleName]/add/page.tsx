import { insertRule } from "@/app/actions/insertRule";
import { AddRule } from "@/components/add-rule-form";
import { AppContainer } from "@/components/app-container";
import { Rules } from "@/features/rules/types";

export default async function AddRulePage({
  params,
}: {
  params: Promise<{ ruleName: string }>;
}) {
  const { ruleName } = (await params) as { ruleName: Rules };

  return (
    <AppContainer>
      <AddRule ruleName={ruleName} insertRule={insertRule} />
    </AppContainer>
  );
}
